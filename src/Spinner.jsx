import { Cylinder, Box, Html } from "@react-three/drei";
import { RigidBody, quat } from "@react-three/rapier";
import { useState, useRef, props } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import "./styles.css";

function Spinner1({ position }) {
  const spinnerRef = useRef();

  useFrame((_state, delta) => {
    const curRotation = quat(spinnerRef.current.rotation());
    const incrementRotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0.5, 0),
      0.01 * 5
    );
    curRotation.multiply(incrementRotation);
    spinnerRef.current.setNextKinematicRotation(curRotation);
  });

  return (
    <group position={position}>
      <RigidBody
        type="kinematicPosition"
        position={[0, 30, 3]}
        ref={spinnerRef}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <group position={[2.5, 0, 10]}>
          <Box castShadow args={[5, 0.5, 0.5]}>
            <meshStandardMaterial
              metalness={0.8}
              roughness={0.145}
              color="peachpuff"
            />
          </Box>
        </group>
      </RigidBody>
    </group>
  );
}

function Spinner2({ position }) {
  const spinner = useRef();
  useFrame(() => {
    const curRotation = quat(spinner.current.rotation());
    const incrementRotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      0.003 * -5
    );
    curRotation.multiply(incrementRotation);
    spinner.current.setNextKinematicRotation(curRotation);
  });

  return (
    <group position={position}>
      <RigidBody
        type="kinematicPosition"
        position={[0, 30, 3]}
        ref={spinner}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <group position={[2.5, 0, 10]}>
          <Box castShadow args={[5, 0.5, 0.5]}>
            <meshStandardMaterial
              metalness={0.8}
              roughness={0.145}
              color="peachpuff"
            />
          </Box>
        </group>
      </RigidBody>
    </group>
  );
}

export function Spinners() {
  return (
    <>
      <Spinner1 />
      <Spinner2 />
    </>
  );
}
