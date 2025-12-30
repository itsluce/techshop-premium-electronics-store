'use client';

import { Suspense, useRef, useEffect, useState, useId, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import { webglManager } from '@/lib/webgl-manager';

type ProductViewer3DProps = {
  modelPath: string;
};

function GeometricFallback({ category }: { category: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const getGeometry = () => {
    switch (category) {
      case 'phone':
        return <boxGeometry args={[1, 2, 0.1]} />;
      case 'laptop':
        return <boxGeometry args={[2, 1.3, 0.1]} />;
      case 'headphones':
        return <torusGeometry args={[0.7, 0.2, 16, 32]} />;
      case 'camera':
        return <boxGeometry args={[1.2, 0.9, 0.8]} />;
      default:
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  const getColor = () => {
    switch (category) {
      case 'phone': return '#3b82f6';
      case 'laptop': return '#a855f7';
      case 'headphones': return '#14b8a6';
      case 'camera': return '#f97316';
      default: return '#6b7280';
    }
  };

  return (
    <Center>
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshStandardMaterial color={getColor()} metalness={0.7} roughness={0.3} />
      </mesh>
    </Center>
  );
}

function LoadingPlaceholder() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#888" wireframe />
    </mesh>
  );
}

function Model({ url, onError }: { url: string; onError?: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(url);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const getModelScale = (modelUrl: string) => {
    if (modelUrl.includes('samsung_phone')) return 0.03;
    if (modelUrl.includes('iphone')) return 3;
    if (modelUrl.includes('laptop')) return 0.5;
    if (modelUrl.includes('airpods')) return 0.5;
    if (modelUrl.includes('headphones')) return 6.0;
    if (modelUrl.includes('camera')) return 10.0;
    return 1.5;
  };

  if (!gltf?.scene) {
    return null;
  }

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={gltf.scene} scale={getModelScale(url)} />
      </group>
    </Center>
  );
}

function Scene({ modelPath, onError }: { modelPath: string; onError?: () => void }) {
  const [useFallback, setUseFallback] = useState(false);

  const getCategory = (modelUrl: string) => {
    if (modelUrl.includes('phone') || modelUrl.includes('iphone') || modelUrl.includes('samsung') || modelUrl.includes('pixel')) return 'phone';
    if (modelUrl.includes('laptop') || modelUrl.includes('macbook') || modelUrl.includes('dell') || modelUrl.includes('thinkpad') || modelUrl.includes('asus')) return 'laptop';
    if (modelUrl.includes('headphones') || modelUrl.includes('airpods') || modelUrl.includes('sony') || modelUrl.includes('bose') || modelUrl.includes('sennheiser')) return 'headphones';
    if (modelUrl.includes('camera') || modelUrl.includes('canon') || modelUrl.includes('nikon') || modelUrl.includes('fujifilm')) return 'camera';
    return 'default';
  };

  const handleError = useCallback(() => {
    setUseFallback(true);
    if (onError) onError();
  }, [onError]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        minDistance={2}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={1}
      />

      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />
      <spotLight position={[0, 10, 0]} intensity={0.4} angle={0.3} penumbra={1} />

      <Suspense fallback={<LoadingPlaceholder />}>
        {useFallback ? (
          <GeometricFallback category={getCategory(modelPath)} />
        ) : (
          <Model key={modelPath} url={modelPath} onError={handleError} />
        )}
      </Suspense>

      <Environment preset="city" />
    </>
  );
}

export function ProductViewer3D({ modelPath }: ProductViewer3DProps) {
  const id = useId();
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    webglManager.activate(id);

    return () => {
      webglManager.deactivate(id);
      if (canvasRef.current?.gl) {
        canvasRef.current.gl.dispose();
        canvasRef.current = null;
      }
    };
  }, [id]);

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden">
      <Canvas
        ref={canvasRef}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
          preserveDrawingBuffer: false,
        }}
        dpr={[1, 1.5]}
      >
        <Scene key={modelPath} modelPath={modelPath} />
      </Canvas>
    </div>
  );
}
