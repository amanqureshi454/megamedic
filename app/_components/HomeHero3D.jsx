"use client";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import HomeHeroModel from "./HomeHeroModel";
import { Environment, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import { useDeviceType } from "@/app/_lib/useDeviceType";

export const Scene = () => {
  const groupRef = useRef();
  const { pointer } = useThree();
  const { isDesktop } = useDeviceType();
  const particlesRef = useRef();
  useFrame(() => {
    if (groupRef.current && isDesktop) {
      groupRef.current.rotation.y = pointer.x * 0.08;
      groupRef.current.position.y = pointer.y * 0.03;
    }
  });

  return (
    <group>
      {isDesktop && (
        <Sparkles
          count={50}
          speed={0.3}
          opacity={1}
          size={3}
          scale={[3, 2, 3]}
          position={[0, -0.5, 1]}
          color="#fff"
        />
      )}

      <directionalLight position={[-1.7, 0, 1.2]} intensity={1.9} />
      <directionalLight position={[2, 0, 1.5]} intensity={1.8} />
      <directionalLight position={[0, 1, -1.4]} intensity={2.1} />
      <directionalLight position={[0, 0.5, 2]} intensity={2} />
      <directionalLight
        position={[-3.5, 2.5, 2.2]}
        intensity={0.5}
        castShadow
      />

      <Environment files="/models/studio.hdr" environmentIntensity={0.3} />

      <group ref={groupRef}>
        <HomeHeroModel />
      </group>
    </group>
  );
};

const HomeHero3D = () => {
  return (
    <Canvas
      id="hero-3d"
      className="!absolute bottom-[15%] lg:bottom-[8%] left-0 !size-full"
      flat
      shadows
      camera={{
        fov: 50,
        near: 0.1,
        far: 200,
      }}
    >
      <Scene />
    </Canvas>
  );
};

export default HomeHero3D;
