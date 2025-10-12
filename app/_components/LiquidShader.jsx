"use client";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { EffectComposer } from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";

const LiquidShader = () => {
  return (
    <Canvas className="!pointer-events-none !fixed !top-0 left-0 z-10 h-screen w-full opacity-5">
      <EffectComposer>
        <Fluid
          rainbow={true}
          showBackground={false}
          distortion={0.1}
          curl={5}
          radius={0.3}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default LiquidShader;
