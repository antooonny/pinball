import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import "./styles.css";
import { Sphere, useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { TextureLoader } from "three";
import img from "./textures/ball.jpg";

export function Ball(props) {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const ball = useRef();
  useFrame((_, delta) => {
    const { forward, backward, left, right } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 50 * delta;
    const torqueStrength = 1 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (left) {
      impulse.x -= impulseStrength;
      torque.z -= torqueStrength;
    }
    if (right) {
      impulse.x += impulseStrength;
      torque.z += torqueStrength;
    }

    ball.current.applyImpulse(impulse);
    ball.current.applyTorqueImpulse(torque);
    const velocity = ball.current.linvel();
    ball.current.setLinvel({ x: velocity.x, y: velocity.y, z: 0 });
    if (velocity.y > 70) {
      ball.current.setLinvel({ x: velocity.x, y: 50, z: 0 });
    }
    if (Math.abs(velocity.x) > 30) {
      ball.current.setLinvel({ x: 30, y: velocity.y, z: 0 });
    }
  });

  const texture = useLoader(TextureLoader, img);

  return (
    <RigidBody
      name="Ball"
      colliders={"ball"}
      ref={ball}
      gravityScale={3}
      restitution={1}
      linearDamping={0}
      angularDamping={50}
      {...props}
    >
      <Sphere castShadow={true} position={[0, 45, 3.5]} args={[1, 16, 16]}>
        <meshStandardMaterial map={texture} />
      </Sphere>
    </RigidBody>
  );
}
