
interface STLStats {
  surfaceArea: number;
  volume: number;
  triangleCount: number;
  boundingBox: {
    min: { x: number; y: number; z: number };
    max: { x: number; y: number; z: number };
  };
}

export class STLProcessor {
  static async processFile(file: File): Promise<STLStats> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          const stats = this.parseSTL(arrayBuffer);
          resolve(stats);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  }

  private static parseSTL(buffer: ArrayBuffer): STLStats {
    const dataView = new DataView(buffer);
    
    // Check if binary STL (header + triangle count)
    if (buffer.byteLength < 84) {
      throw new Error('Invalid STL file: too small');
    }

    // Skip 80-byte header, read triangle count
    const triangleCount = dataView.getUint32(80, true);
    
    // Expected file size for binary STL
    const expectedSize = 80 + 4 + (triangleCount * 50);
    
    if (buffer.byteLength !== expectedSize) {
      // Try parsing as ASCII STL
      return this.parseASCIISTL(buffer);
    }

    return this.parseBinarySTL(dataView, triangleCount);
  }

  private static parseBinarySTL(dataView: DataView, triangleCount: number): STLStats {
    let surfaceArea = 0;
    let volume = 0;
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    const triangles: Array<{
      v1: { x: number; y: number; z: number };
      v2: { x: number; y: number; z: number };
      v3: { x: number; y: number; z: number };
    }> = [];

    let offset = 84; // Skip header and triangle count

    for (let i = 0; i < triangleCount; i++) {
      // Skip normal vector (12 bytes)
      offset += 12;

      // Read vertices
      const v1 = {
        x: dataView.getFloat32(offset, true),
        y: dataView.getFloat32(offset + 4, true),
        z: dataView.getFloat32(offset + 8, true)
      };
      offset += 12;

      const v2 = {
        x: dataView.getFloat32(offset, true),
        y: dataView.getFloat32(offset + 4, true),
        z: dataView.getFloat32(offset + 8, true)
      };
      offset += 12;

      const v3 = {
        x: dataView.getFloat32(offset, true),
        y: dataView.getFloat32(offset + 4, true),
        z: dataView.getFloat32(offset + 8, true)
      };
      offset += 12;

      // Skip attribute byte count
      offset += 2;

      triangles.push({ v1, v2, v3 });

      // Update bounding box
      [v1, v2, v3].forEach(v => {
        minX = Math.min(minX, v.x);
        minY = Math.min(minY, v.y);
        minZ = Math.min(minZ, v.z);
        maxX = Math.max(maxX, v.x);
        maxY = Math.max(maxY, v.y);
        maxZ = Math.max(maxZ, v.z);
      });

      // Calculate triangle area
      const edge1 = {
        x: v2.x - v1.x,
        y: v2.y - v1.y,
        z: v2.z - v1.z
      };
      const edge2 = {
        x: v3.x - v1.x,
        y: v3.y - v1.y,
        z: v3.z - v1.z
      };

      // Cross product for area calculation
      const cross = {
        x: edge1.y * edge2.z - edge1.z * edge2.y,
        y: edge1.z * edge2.x - edge1.x * edge2.z,
        z: edge1.x * edge2.y - edge1.y * edge2.x
      };

      const triangleArea = 0.5 * Math.sqrt(cross.x * cross.x + cross.y * cross.y + cross.z * cross.z);
      surfaceArea += triangleArea;

      // Volume calculation using divergence theorem
      volume += (v1.x * (v2.y * v3.z - v3.y * v2.z)) / 6;
    }

    volume = Math.abs(volume);

    return {
      surfaceArea: Math.round(surfaceArea * 100) / 100,
      volume: Math.round(volume * 100) / 100,
      triangleCount,
      boundingBox: {
        min: { x: minX, y: minY, z: minZ },
        max: { x: maxX, y: maxY, z: maxZ }
      }
    };
  }

  private static parseASCIISTL(buffer: ArrayBuffer): STLStats {
    const text = new TextDecoder().decode(buffer);
    const lines = text.split('\n').map(line => line.trim());
    
    let triangleCount = 0;
    let surfaceArea = 0;
    let volume = 0;
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('facet normal')) {
        const vertices: Array<{ x: number; y: number; z: number }> = [];
        
        // Find vertices for this facet
        for (let j = i + 1; j < lines.length; j++) {
          if (lines[j].startsWith('vertex')) {
            const coords = lines[j].replace('vertex', '').trim().split(/\s+/).map(Number);
            if (coords.length === 3) {
              const vertex = { x: coords[0], y: coords[1], z: coords[2] };
              vertices.push(vertex);
              
              // Update bounding box
              minX = Math.min(minX, vertex.x);
              minY = Math.min(minY, vertex.y);
              minZ = Math.min(minZ, vertex.z);
              maxX = Math.max(maxX, vertex.x);
              maxY = Math.max(maxY, vertex.y);
              maxZ = Math.max(maxZ, vertex.z);
            }
          } else if (lines[j].startsWith('endfacet')) {
            break;
          }
        }

        if (vertices.length === 3) {
          triangleCount++;
          
          // Calculate triangle area and volume contribution
          const [v1, v2, v3] = vertices;
          const edge1 = {
            x: v2.x - v1.x,
            y: v2.y - v1.y,
            z: v2.z - v1.z
          };
          const edge2 = {
            x: v3.x - v1.x,
            y: v3.y - v1.y,
            z: v3.z - v1.z
          };

          const cross = {
            x: edge1.y * edge2.z - edge1.z * edge2.y,
            y: edge1.z * edge2.x - edge1.x * edge2.z,
            z: edge1.x * edge2.y - edge1.y * edge2.x
          };

          const triangleArea = 0.5 * Math.sqrt(cross.x * cross.x + cross.y * cross.y + cross.z * cross.z);
          surfaceArea += triangleArea;

          volume += (v1.x * (v2.y * v3.z - v3.y * v2.z)) / 6;
        }
      }
    }

    volume = Math.abs(volume);

    return {
      surfaceArea: Math.round(surfaceArea * 100) / 100,
      volume: Math.round(volume * 100) / 100,
      triangleCount,
      boundingBox: {
        min: { x: minX, y: minY, z: minZ },
        max: { x: maxX, y: maxY, z: maxZ }
      }
    };
  }
}
