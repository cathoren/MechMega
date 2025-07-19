import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface STLPreviewProps {
  geometry: THREE.BufferGeometry;
  className?: string;
}

const STLPreview: React.FC<STLPreviewProps> = ({ geometry, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const frameRef = useRef<number>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const meshRef = useRef<THREE.Mesh>();
  const [isDragging, setIsDragging] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current || !geometry) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create mesh from geometry
    const material = new THREE.MeshPhongMaterial({ 
      color: 0xf59e0b, // Amber orange
      shininess: 30,
      transparent: true,
      opacity: 0.9
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    meshRef.current = mesh;
    scene.add(mesh);

    // Auto-resize and center the model
    const resizeAndCenter = () => {
      if (!mountRef.current || !mesh) return;
      
      const containerWidth = mountRef.current.clientWidth;
      const containerHeight = mountRef.current.clientHeight;
      
      // Update renderer size
      renderer.setSize(containerWidth, containerHeight);
      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();
      
      // Center and scale the model
      geometry.computeBoundingBox();
      const boundingBox = geometry.boundingBox!;
      const center = boundingBox.getCenter(new THREE.Vector3());
      const size = boundingBox.getSize(new THREE.Vector3());
      
      mesh.position.sub(center);
      
      // Calculate scale to fit in view with some padding
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const distance = Math.abs(maxDim / (2 * Math.tan(fov / 2)));
      
      // Position camera at appropriate distance
      camera.position.set(distance * 0.8, distance * 0.8, distance * 0.8);
      camera.lookAt(0, 0, 0);
    };

    // Mouse event handlers - updated to handle middle and right mouse buttons
    const handleMouseDown = (event: MouseEvent) => {
      // Only respond to middle mouse button (1) or right mouse button (2)
      if (event.button === 1 || event.button === 2) {
        event.preventDefault();
        setIsDragging(true);
        mouseRef.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !mesh) return;

      const deltaMove = {
        x: event.clientX - mouseRef.current.x,
        y: event.clientY - mouseRef.current.y
      };

      mesh.rotation.y += deltaMove.x * 0.01;
      mesh.rotation.x += deltaMove.y * 0.01;

      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (event.button === 1 || event.button === 2) {
        setIsDragging(false);
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault(); // Prevent right-click context menu
    };

    // Add event listeners to the canvas
    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.style.cursor = 'grab';

    // Initial resize
    resizeAndCenter();

    // Animation loop (no auto-rotation)
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      resizeAndCenter();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('contextmenu', handleContextMenu);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      material.dispose();
    };
  }, [geometry, isDragging]);

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-64 rounded-lg border border-border overflow-hidden bg-gray-900 ${className}`}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    />
  );
};

export default STLPreview;
