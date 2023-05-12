import { Box } from "@react-three/drei";
import { RigidBody, Physics } from "@react-three/rapier";
import { useRef } from "react";
import smallramp from "./audio/smallramp.wav";

export function Ramp() {
  function SmallRamp() {
    const audio = new Audio(smallramp);
    audio.volume = 0.3;
    audio.play();
  }

  return (
    <group>
      <RigidBody type="fixed" rotation={[0, 0, 0]} friction={1}>
        <Box
          castShadow
          position={[-15.98, 4.4, 3.5]}
          args={[10, 1, 2]}
          rotation={[0, 0, -Math.PI / 4]}
        >
          <meshStandardMaterial color="springgreen" />
        </Box>
      </RigidBody>
      <RigidBody type="fixed" rotation={[0, 0, 0]} friction={1}>
        <Box
          castShadow
          position={[15.98, 4.4, 3.5]}
          args={[10, 1, 2]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <meshStandardMaterial color="springgreen" />
        </Box>
      </RigidBody>
      <RigidBody
        type="fixed"
        rotation={[0, 0, 0]}
        friction={1}
        onContactForce={SmallRamp}
      >
        <Box
          castShadow
          position={[16.4, 35, 3.5]}
          args={[5, 1, 2]}
          rotation={[0, 0, Math.PI / 5]}
        >
          <meshStandardMaterial color="springgreen" />
        </Box>
      </RigidBody>
      <RigidBody
        type="fixed"
        rotation={[0, 0, 0]}
        friction={1}
        onContactForce={SmallRamp}
      >
        <Box
          castShadow
          position={[-16.4, 35, 3.5]}
          args={[5, 1, 2]}
          rotation={[0, 0, -Math.PI / 5]}
        >
          <meshStandardMaterial color="springgreen" />
        </Box>
      </RigidBody>
    </group>
  );
}
