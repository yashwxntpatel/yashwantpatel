import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { useRef, useMemo, memo } from "react";
import * as THREE from "three";

const FloatingCard = memo(({ position, rotation, color, size = [1.4, 1.9, 0.05] }: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  size?: [number, number, number];
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, rotation[0] + mouse.y * 0.15, 0.05);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, rotation[1] + mouse.x * 0.25, 0.05);
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} position={position} rotation={rotation}>
        <boxGeometry args={size} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.4}
          chromaticAberration={0.05}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color={color}
          roughness={0.1}
          ior={1.4}
          transmission={0.95}
        />
      </mesh>
    </Float>
  );
});

FloatingCard.displayName = "FloatingCard";

const Particles = memo(({ count = 200 }: { count?: number }) => {
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
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#ff9a3c" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
});

Particles.displayName = "Particles";

export const HeroScene = memo(() => (
  <Canvas
    camera={{ position: [0, 0, 6], fov: 45 }}
    dpr={[1, 1.5]}
    gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    className="!absolute inset-0"
    style={{ willChange: "transform" }}
  >
    <ambientLight intensity={0.4} />
    <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffaa55" />
    <directionalLight position={[-5, -3, 2]} intensity={0.6} color="#88aaff" />
    <pointLight position={[0, 0, 4]} intensity={2} color="#ff8833" />
    <FloatingCard position={[-2.4, 0.3, -1]} rotation={[0.1, 0.4, 0.05]} color="#1a1a1a" />
    <FloatingCard position={[0, -0.2, 0]} rotation={[-0.05, -0.15, 0]} color="#2a1810" size={[1.6, 2.1, 0.06]} />
    <FloatingCard position={[2.4, 0.4, -0.5]} rotation={[0.05, -0.45, -0.08]} color="#1a1a1a" />
    <FloatingCard position={[-1.2, -1.4, -2]} rotation={[0.2, 0.2, 0.1]} color="#1a1a1a" size={[1.2, 1.6, 0.05]} />
    <FloatingCard position={[1.5, 1.5, -2.5]} rotation={[-0.15, -0.3, -0.1]} color="#1a1a1a" size={[1.2, 1.6, 0.05]} />
    <Particles count={250} />
    <Environment preset="city" />
  </Canvas>
));

HeroScene.displayName = "HeroScene";
