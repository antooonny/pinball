import { Box } from "@react-three/drei";
import { RigidBody, Physics } from "@react-three/rapier";
import { useRef } from "react";
import sounds from "./audio/pusher.mp3";
import ballhit from "./audio/ballbounce.wav";

export function Pusher({ position }) {
  function play() {
    new Audio(sounds).play();
  }

  function WallLeft() {
    return (
      <RigidBody type="fixed" rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
        <Box position={[-0.5, -5.6, 0]} args={[10, 1, 2.5]}>
          <meshStandardMaterial color="springgreen" />
        </Box>
      </RigidBody>
    );
  }
  function WallRight() {
    return (
      <RigidBody type="fixed" rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
        <Box position={[-0.5, 5.6, 0]} args={[10, 1, 2.5]}>
          <meshStandardMaterial color="springgreen" />
        </Box>
      </RigidBody>
    );
  }

  const slope = useRef();
  const jump = (e) => {
    slope.current.applyImpulse({ x: 0, y: 1200, z: 0 });
    play();
    console.log(slope.current);
  };

  return (
    <group position={position}>
      <RigidBody
        type="Dynamic"
        rotation={[0, 0, 0]}
        friction={4}
        ref={slope}
        restitution={0}
        linearDamping={100}
        gravityScale={50}
      >
        <Box
          castShadow
          position={[0, 0, 3.5]}
          args={[10, 1, 2]}
          rotation={[0, 0, 0]}
          onClick={jump}
        >
          <meshStandardMaterial color="red" />
        </Box>
      </RigidBody>
      <WallLeft />
      <WallRight />
    </group>
  );
}
