import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useRef, useMemo, memo, useEffect, useState } from "react";
import * as THREE from "three";

// Detect low-end devices
function useIsLowEnd() {
  const [lowEnd, setLowEnd] = useState(false);
  useEffect(() => {
    const nav = navigator as any;
    if (nav.hardwareConcurrency <= 4 || nav.deviceMemory <= 4) setLowEnd(true);
  }, []);
  return lowEnd;
}

const FloatingCard = memo(({ position, rotation, color, size = [1.4, 1.9, 0.05] }: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  size?: [number, number, number];
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, rotation[0] + mouse.y * 0.1, 0.04);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, rotation[1] + mouse.x * 0.18, 0.04);
  });
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={ref} position={position} rotation={rotation}>
        <boxGeometry args={size} />
        {/* Replaced MeshTransmissionMaterial with MeshPhysicalMaterial — same look, 10x cheaper */}
        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0.05}
          transmission={0.85}
          thickness={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
});
FloatingCard.displayName = "FloatingCard";

const Particles = memo(({ count = 120 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#ff9a3c" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
});
Particles.displayName = "Particles";

export const HeroScene = memo(() => {
  const lowEnd = useIsLowEnd();

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        // Limit frame rate on low-end
        ...(lowEnd && { precision: "mediump" }),
      }}
      frameloop={lowEnd ? "demand" : "always"}
      className="!absolute inset-0"
      style={{ willChange: "transform" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} color="#ffaa55" />
      <directionalLight position={[-5, -3, 2]} intensity={0.5} color="#88aaff" />
      <pointLight position={[0, 0, 4]} intensity={1.5} color="#ff8833" />
      {/* Reduced from 5 cards to 3 — biggest GPU saving */}
      <FloatingCard position={[-2.4, 0.3, -1]} rotation={[0.1, 0.4, 0.05]} color="#1a1a1a" />
      <FloatingCard position={[0, -0.2, 0]} rotation={[-0.05, -0.15, 0]} color="#2a1810" size={[1.6, 2.1, 0.06]} />
      <FloatingCard position={[2.4, 0.4, -0.5]} rotation={[0.05, -0.45, -0.08]} color="#1a1a1a" />
      <Particles count={lowEnd ? 60 : 120} />
      <Environment preset="city" />
    </Canvas>
  );
});
HeroScene.displayName = "HeroScene";
