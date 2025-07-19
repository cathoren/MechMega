
import * as THREE from 'three';

interface STLStats {
  surfaceArea: number;
  volume: number;
  triangleCount: number;
  boundingBox: {
    min: { x: number; y: number; z: number };
    max: { x: number; y: number; z: number };
  };
}

export class ThreeSTLProcessor {
  static async processFile(file: File): Promise<{ stats: STLStats; geometry: THREE.BufferGeometry }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          const { stats, geometry } = this.parseSTLWithThree(arrayBuffer);
          resolve({ stats, geometry });
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  }

  private static parseSTLWithThree(buffer: ArrayBuffer): { stats: STLStats; geometry: THREE.BufferGeometry } {
    const geometry = new THREE.BufferGeometry();
    const dataView = new DataView(buffer);
    
    // Check if binary STL
    if (buffer.byteLength < 84) {
      throw new Error('Invalid STL file: too small');
    }

    // Skip 80-byte header, read triangle count
    const triangleCount = dataView.getUint32(80, true);
    const expectedSize = 80 + 4 + (triangleCount * 50);
    
    let vertices: number[] = [];
    let normals: number[] = [];

    if (buffer.byteLength === expectedSize) {
      // Binary STL
      const result = this.parseBinarySTL(dataView, triangleCount);
      vertices = result.vertices;
      normals = result.normals;
    } else {
      // ASCII STL
      const result = this.parseASCIISTL(buffer);
      vertices = result.vertices;
      normals = result.normals;
    }

    // Set geometry attributes
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    
    // Compute bounding box and vertex normals
    geometry.computeBoundingBox();
    geometry.computeVertexNormals();
    const boundingBox = geometry.boundingBox!;
    
    // Calculate surface area and volume using improved methods
    const surfaceAreaMm2 = this.calculateSurfaceArea(geometry);
    const volumeMm3 = this.computeMeshVolume(geometry);
    
    // Convert units: mm² to in², mm³ to cm³
    const surfaceAreaIn2 = surfaceAreaMm2 * 0.00155; // 1 mm² = 0.00155 in²
    const volumeCm3 = volumeMm3 / 1000; // mm³ to cm³
    
    const stats: STLStats = {
      surfaceArea: Math.round(surfaceAreaIn2 * 100) / 100,
      volume: Math.round(volumeCm3 * 100) / 100,
      triangleCount: vertices.length / 9, // 3 vertices per triangle, 3 coords per vertex
      boundingBox: {
        min: { x: boundingBox.min.x, y: boundingBox.min.y, z: boundingBox.min.z },
        max: { x: boundingBox.max.x, y: boundingBox.max.y, z: boundingBox.max.z }
      }
    };

    return { stats, geometry };
  }

  private static parseBinarySTL(dataView: DataView, triangleCount: number): { vertices: number[]; normals: number[] } {
    const vertices: number[] = [];
    const normals: number[] = [];
    let offset = 84;

    for (let i = 0; i < triangleCount; i++) {
      // Read normal vector
      const nx = dataView.getFloat32(offset, true);
      const ny = dataView.getFloat32(offset + 4, true);
      const nz = dataView.getFloat32(offset + 8, true);
      offset += 12;

      // Read three vertices
      for (let j = 0; j < 3; j++) {
        vertices.push(
          dataView.getFloat32(offset, true),
          dataView.getFloat32(offset + 4, true),
          dataView.getFloat32(offset + 8, true)
        );
        normals.push(nx, ny, nz);
        offset += 12;
      }

      offset += 2; // Skip attribute byte count
    }

    return { vertices, normals };
  }

  private static parseASCIISTL(buffer: ArrayBuffer): { vertices: number[]; normals: number[] } {
    const text = new TextDecoder().decode(buffer);
    const lines = text.split('\n').map(line => line.trim());
    
    const vertices: number[] = [];
    const normals: number[] = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('facet normal')) {
        const normalParts = lines[i].replace('facet normal', '').trim().split(/\s+/).map(Number);
        const [nx, ny, nz] = normalParts;
        
        const faceVertices: number[] = [];
        
        for (let j = i + 1; j < lines.length; j++) {
          if (lines[j].startsWith('vertex')) {
            const coords = lines[j].replace('vertex', '').trim().split(/\s+/).map(Number);
            if (coords.length === 3) {
              faceVertices.push(...coords);
            }
          } else if (lines[j].startsWith('endfacet')) {
            break;
          }
        }

        if (faceVertices.length === 9) { // 3 vertices × 3 coordinates
          vertices.push(...faceVertices);
          // Add normal for each vertex
          normals.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
        }
      }
    }

    return { vertices, normals };
  }

  private static calculateSurfaceArea(geometry: THREE.BufferGeometry): number {
    const position = geometry.attributes.position;
    let surfaceArea = 0;
    
    for (let i = 0; i < position.count; i += 3) {
      const ax = position.getX(i);
      const ay = position.getY(i);
      const az = position.getZ(i);
      
      const bx = position.getX(i + 1);
      const by = position.getY(i + 1);
      const bz = position.getZ(i + 1);
      
      const cx = position.getX(i + 2);
      const cy = position.getY(i + 2);
      const cz = position.getZ(i + 2);
      
      // Calculate triangle area using cross product
      const edge1x = bx - ax;
      const edge1y = by - ay;
      const edge1z = bz - az;
      
      const edge2x = cx - ax;
      const edge2y = cy - ay;
      const edge2z = cz - az;
      
      // Cross product
      const crossX = edge1y * edge2z - edge1z * edge2y;
      const crossY = edge1z * edge2x - edge1x * edge2z;
      const crossZ = edge1x * edge2y - edge1y * edge2x;
      
      // Magnitude of cross product gives twice the triangle area
      const crossMagnitude = Math.sqrt(crossX * crossX + crossY * crossY + crossZ * crossZ);
      surfaceArea += crossMagnitude * 0.5;
    }
    
    return surfaceArea;
  }

  // Improved volume calculation method from your script
  private static computeMeshVolume(geometry: THREE.BufferGeometry): number {
    const position = geometry.attributes.position;
    let volume = 0;
    
    for (let i = 0; i < position.count; i += 3) {
      const ax = position.getX(i);
      const ay = position.getY(i);
      const az = position.getZ(i);
      
      const bx = position.getX(i + 1);
      const by = position.getY(i + 1);
      const bz = position.getZ(i + 1);
      
      const cx = position.getX(i + 2);
      const cy = position.getY(i + 2);
      const cz = position.getZ(i + 2);

      // Volume calculation using the determinant method from your script
      volume += (ax * by * cz + ay * bz * cx + az * bx * cy
               - az * by * cx - ay * bx * cz - ax * bz * cy);
    }
    
    return Math.abs(volume / 6); // Return volume in mm³
  }
}
