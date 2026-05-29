"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion, useIsMobile } from "@/lib/useReducedMotion";

function DriftingShape({
  position,
  color,
  speed = 1,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.x = t * 0.18;
    ref.current.rotation.y = t * 0.22;
    ref.current.position.y = position[1] + Math.sin(t * 0.7) * 0.2;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={1.2}
          roughness={0.3}
          metalness={0.45}
          emissive={color}
          emissiveIntensity={0.18}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Scene({ density }: { density: number }) {
  const shapes = useMemo(() => {
    const palette = ["#c7f25b", "#5b8df2", "#f25b9a", "#f2c95b", "#9a5bf2"];
    const rand = mulberry32(density * 1337 + 7);
    const out: {
      position: [number, number, number];
      color: string;
      speed: number;
      scale: number;
    }[] = [];
    for (let i = 0; i < density; i++) {
      out.push({
        position: [(rand() - 0.5) * 14, (rand() - 0.5) * 7, (rand() - 0.5) * 6 - 4],
        color: palette[i % palette.length],
        speed: 0.25 + rand() * 0.4,
        scale: 0.35 + rand() * 0.55,
      });
    }
    return out;
  }, [density]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} />
      <directionalLight position={[-5, -3, -5]} intensity={0.8} color="#5b8df2" />
      {shapes.map((s, i) => (
        <DriftingShape key={i} {...s} />
      ))}
    </>
  );
}

export function HeroScene() {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  if (reduced) return <StaticBackdrop />;
  const density = mobile ? 5 : 11;
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        dpr={mobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene density={density} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/85 via-[var(--bg)]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] pointer-events-none" />
    </div>
  );
}

function StaticBackdrop() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 30%, rgba(199,242,91,0.15), transparent 60%), radial-gradient(60% 60% at 80% 70%, rgba(91,141,242,0.15), transparent 60%)",
        }}
      />
    </div>
  );
}
