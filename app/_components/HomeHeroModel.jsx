import React, { useRef, useState, useEffect } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";
import { useDeviceType } from "../_lib/useDeviceType";
import { useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollToPlugin, Observer);

export default function HomeHeroModel(props) {
  const { nodes, materials } = useGLTF("/models/home-hero.glb");

  const [hoverText, setHoverText] = useState("");
  const [initialTransforms, setInitialTransforms] = useState({});
  const parentRef = useRef();
  const htmlRef = useRef();
  const { contextSafe } = useGSAP();
  const { isMobile } = useDeviceType();

  const shapeRefs = useRef([
    useRef(), // shape1
    useRef(), // shape2
    useRef(), // shape3
    useRef(), // shape4
    useRef(), // shape5
  ]);

  useEffect(() => {
    if (nodes) {
      const transforms = {};
      Object.entries(nodes).forEach(([nodeName, node]) => {
        if (node.position && nodeName !== "floor" && nodeName !== "Scene") {
          transforms[nodeName] = {
            position: {
              x: node.position.x,
              y: node.position.y,
              z: node.position.z,
            },
            rotation: {
              x: node.rotation.x,
              y: node.rotation.y,
              z: node.rotation.z,
            },
          };
        }
      });
      setInitialTransforms(transforms);
    }
  }, [nodes]);

  useGSAP(
    () => {
      gsap.defaults({ duration: 0.2 });
      if (!htmlRef.current) return;
      const canvas = document.getElementById("hero-3d");
      const quickX = gsap.quickTo(htmlRef.current, "x", {
        ease: "power2.out",
      });
      const quickY = gsap.quickTo(htmlRef.current, "y", {
        ease: "power2.out",
      });
      const animate = (e) => {
        const { clientX, clientY } = e;
        quickX(clientX);
        quickY(clientY);
      };

      window.addEventListener("mousemove", animate);

      return () => window.removeEventListener("mousemove", animate);
    },
    { dependencies: [hoverText], scope: parentRef, revert: true },
  );

  const hoverAnimation = contextSafe((target, name, isIn = true) => {
    setHoverText(name);
    window.document.body.style.cursor = isIn ? "pointer" : "default";
    const shapeName = target.current.name;
    const initialTransform = initialTransforms[shapeName];
    // gsap.to(target.current.position, {
    //   y: isIn ? initialTransform.position.y + 0.1 : initialTransform.position.y,
    //   duration: 0.7,
    // });
    gsap.to(target.current.rotation, {
      y: isIn
        ? initialTransform.rotation.y + Math.PI * 2
        : initialTransform.rotation.y,
      duration: 0.8,
    });
    gsap.to(htmlRef.current, {
      scale: isIn ? 1 : 0,
      duration: 0.1,
    });
  });

  const shapeConfig = [
    {
      name: "shape1",
      position: [-1.651, 0.824, 0.46],
      hoverText: "X-ray protection",
      url: "/categories/x-ray-protection",
    },
    {
      name: "shape2",
      position: [-0.834, 0.784, -0.533],
      hoverText: "Dialysis",
      url: "/categories/dialysis",
    },
    {
      name: "shape3",
      position: [0.111, 0.707, 0.978],
      hoverText: "Angiography",
      url: "/categories/angiography",
    },
    {
      name: "shape4",
      position: [0.787, 1, -0.596],
      hoverText: "Endovascular solutions",
      url: "/categories/endovascular",
    },
    {
      name: "shape5",
      position: [1.716, 0.725, 0.275],
      hoverText: "Neuro",
      url: "/categories/neuro",
    },
  ];

  const router = useRouter();
  return (
    <>
      <Html wrapperClass="pointer-events-none size-full -translate-x-1/2 -translate-y-1/2 !fixed top-0 left-0 ">
        <div
          ref={htmlRef}
          className="!fixed -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-[#e7d9c1] px-2 py-1 text-sm font-bold text-black lg:px-4 lg:py-2 lg:text-xl"
        >
          {hoverText}
        </div>
      </Html>
      <group
        ref={parentRef}
        scale={isMobile ? 0.35 : 0.75}
        rotation={[0.3, 0, 0]}
        position={[0, -1, 1]}
      >
        <mesh
          receiveShadow
          scale={0.95}
          geometry={nodes.floor.geometry}
          name="floor"
        >
          <meshStandardMaterial color={"#d7a18d"} />
        </mesh>

        {shapeConfig.map((shape, index) => (
          <mesh
            key={shape.name}
            ref={shapeRefs.current[index]}
            name={shape.name}
            onPointerOver={(e) =>
              hoverAnimation(shapeRefs.current[index], shape.hoverText, true)
            }
            onPointerOut={(e) =>
              hoverAnimation(shapeRefs.current[index], shape.hoverText, false)
            }
            onClick={() => {
              router.push(shape.url);
              hoverAnimation(shapeRefs.current[index], shape.hoverText, true);
            }}
            geometry={nodes[shape.name].geometry}
            material={materials["Material.001"]}
            position={shape.position}
            scale={0.9}
            castShadow
          >
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
          </mesh>
        ))}
      </group>
    </>
  );
}

useGLTF.preload("/models/home-hero.glb");
