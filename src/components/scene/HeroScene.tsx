"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion, useIsMobile } from "@/lib/useReducedMotion";

type Orbit = {
  center: [number, number, number];
  radius: number;
  speed: number;
  phase: number;
  yWobble: number;
  zWobble: number;
};

function DriftingShape({
  orbit,
  color,
  scale = 1,
  parallax,
}: {
  orbit: Orbit;
  color: string;
  scale?: number;
  parallax: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const angle = orbit.phase + t * orbit.speed;
    const x = orbit.center[0] + Math.cos(angle) * orbit.radius;
    const y =
      orbit.center[1] +
      Math.sin(angle * 0.7) * orbit.radius * orbit.yWobble;
    const z =
      orbit.center[2] +
      Math.sin(angle * 1.1) * orbit.radius * orbit.zWobble;
    // Soft lean toward cursor — deeper shapes lean less for parallax depth cue.
    const mx = state.mouse.x;
    const my = state.mouse.y;
    ref.current.position.x = x + mx * parallax;
    ref.current.position.y = y + my * parallax * 0.7;
    ref.current.position.z = z;
    ref.current.rotation.x = t * 0.12;
    ref.current.rotation.y = t * 0.18;
  });
  return (
    <Float speed={1.0} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          distort={0.32}
          speed={1.4}
          roughness={0.4}
          metalness={0.35}
          emissive={color}
          emissiveIntensity={0.12}
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
  // Two-color palette only — lime accent + soft off-white. Calmer than the
  // previous five-color rainbow; still readable as "alive".
  const PALETTE = ["#c7f25b", "#e8eaef"] as const;

  const shapes = useMemo(() => {
    const rand = mulberry32(density * 1337 + 7);
    const out: {
      orbit: Orbit;
      color: string;
      scale: number;
      parallax: number;
    }[] = [];
    for (let i = 0; i < density; i++) {
      const depth = (rand() - 0.5) * 6 - 4;
      out.push({
        orbit: {
          center: [(rand() - 0.5) * 4, (rand() - 0.5) * 2, depth],
          radius: 1.4 + rand() * 3.6,
          speed: 0.12 + rand() * 0.22,
          phase: rand() * Math.PI * 2,
          yWobble: 0.4 + rand() * 0.5,
          zWobble: 0.25 + rand() * 0.45,
        },
        color: PALETTE[i % PALETTE.length],
        scale: 0.3 + rand() * 0.5,
        // Closer shapes (depth nearer 0) get more parallax shift.
        parallax: 0.6 - (Math.abs(depth) / 14) * 0.5,
      });
    }
    return out;
  }, [density]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
      <directionalLight
        position={[-5, -3, -5]}
        intensity={0.65}
        color="#c7f25b"
      />
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
  const density = mobile ? 5 : 10;
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
            "radial-gradient(60% 60% at 50% 30%, rgba(199,242,91,0.15), transparent 60%), radial-gradient(60% 60% at 70% 70%, rgba(232,234,239,0.10), transparent 60%)",
        }}
      />
    </div>
  );
}
