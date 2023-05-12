import React, { Suspense, useRef, useEffect, useState, useFrame } from "react";
import { useLoader } from "@react-three/fiber";
import "./styles.css";
import { Box, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { RigidBody, Physics } from "@react-three/rapier";
import { Pusher } from "./Pusher";
import { Ramp } from "./Ramp";
import { Obstacle } from "./Obstacles";
import { MeshReflectorMaterial } from "@react-three/drei";
import { LinearSRGBColorSpace, RepeatWrapping, TextureLoader } from "three";
import machine from "./textures/pinball.jpg";

export function Pinmachine({ position }) {
  const texture = useLoader(TextureLoader, machine);

  useEffect(() => {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.colorSpace = LinearSRGBColorSpace;
  }, texture);

  function Peg({ position }) {
    return (
      <group position={position}>
        <RigidBody type="fixed" rotation={[0, 0, 0]}>
          <Box castShadow args={[3, 3, 40]}>
            <meshStandardMaterial map={texture} color={"#BF9972"} />
          </Box>
        </RigidBody>
      </group>
    );
  }

  function WallFront() {
    return (
      <RigidBody type="fixed" rotation={[-Math.PI / 2, 0, 0]}>
        <Box position={[0, -5.1, 24]} args={[40, 1, 50]}>
          <meshStandardMaterial
            color="black"
            transparent={true}
            opacity={0.5}
          />
        </Box>
      </RigidBody>
    );
  }

  function SideWallLeft() {
    return (
      <RigidBody type="fixed" rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
        <Box castShadow position={[0, 19.65, 24]} args={[10, 1, 50]}>
          <meshStandardMaterial
            map={texture}
            color={"#C4A484"}
            transparent
            opacity={0.8}
          />
        </Box>
      </RigidBody>
    );
  }

  function SideWallRight() {
    return (
      <RigidBody type="fixed" rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
        <Box castShadow position={[0, -19.65, 24]} args={[10, 1, 50]}>
          <meshStandardMaterial
            map={texture}
            color={"#C4A484"}
            transparent
            opacity={0.8}
          />
        </Box>
      </RigidBody>
    );
  }

  function Plane() {
    return (
      <RigidBody
        type="fixed"
        rotation={[-Math.PI / 2, 0, 0]}
        restitution={0.2}
        friction={4}
      >
        <Box
          castShadow
          receiveShadow={true}
          position={[0, -1.94, 24]}
          args={[40, 1, 50]}
        >
          <MeshReflectorMaterial
            envMapIntensity={0}
            normalScale={[0.15, 0.15]}
            dithering={true}
            color={[0.015, 0.015, 0.015]}
            roughness={0.7}
            blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
            mixBlur={30} // How much blur mixes with surface roughness (default = 1)
            mixStrength={80} // Strength of the reflections
            mixContrast={1} // Contrast of the reflections
            resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
            mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
            depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
            minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
            maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
            depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
            debug={0}
            reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
          />
        </Box>
      </RigidBody>
    );
  }

  function Platform() {
    return (
      <RigidBody
        type="fixed"
        rotation={[0, 0, 0]}
        restitution={0.2}
        friction={4}
      >
        <Box position={[0, -1.5, 0]} args={[40, 1, 12]}>
          <meshStandardMaterial map={texture} color={"#C4A484"} />
        </Box>
      </RigidBody>
    );
  }

  function Roof() {
    return (
      <RigidBody
        type="fixed"
        rotation={[0, 0, 0]}
        restitution={0.2}
        friction={4}
      >
        <Box castShadow position={[0, 49.5, 0]} args={[40, 1, 12]}>
          <meshStandardMaterial map={texture} color={"#C4A484"} />
        </Box>
      </RigidBody>
    );
  }

  return (
    <group position={position}>
      <Peg position={[20, 0, -18.55]} />
      <Peg position={[-20, 0, -18.55]} />
      <Peg position={[20, 48, -18.55]} />
      <Peg position={[-20, 48, -18.55]} />
      <WallFront />
      <Roof />
      <SideWallRight />
      <SideWallLeft />
      <Pusher position={[7, 0, 0]} />
      <Pusher position={[-7, 0, 0]} />
      <Platform />
      <Plane />
      <Ramp />
    </group>
  );
}
