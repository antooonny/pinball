import "./styles.css";
import { extend } from "@react-three/fiber";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import test from "./fonts/Merriweather Black_Italic.json";
import { Center, Float, Text3D } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
extend({ TextGeometry });

const fontSettings = {
  font: test,
  bevelEnabled: true,
  curveSegments: 12,
  bevelThickness: 0.2,
  bevelSize: 0.06,
  bevelOffset: 0.02,
  bevelSegments: 3,
  scale: 5,
  letterSpacing: -0.05,
};

const fontSettings2 = {
  font: test,
  bevelEnabled: true,
  curveSegments: 12,
  bevelThickness: 0.2,
  bevelSize: 0.06,
  bevelOffset: 0.02,
  bevelSegments: 3,
  scale: 2,
  letterSpacing: -0.05,
};

function Title({ text }) {
  return (
    <group>
      <RigidBody
        position={[0, 48, 10]}
        type="fixed"
        restitution={8}
        friction={1}
        rotation={[Math.PI / 3, 0, 0]}
      >
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Center>
            <Text3D {...fontSettings}>
              {"Pinball"}
              <meshPhysicalMaterial
                color="#ffffff"
                roughness={0.4}
                thickness={1}
                transmission={1.2}
                opacity={1}
              />
            </Text3D>
          </Center>
        </Float>
      </RigidBody>

      <RigidBody //bottom '50' points
        position={[0, 11, 8]}
        type="fixed"
        restitution={8}
        friction={1}
        rotation={[Math.PI / 2.5, 0, 0]}
      >
        <Float speed={2} rotationIntensity={1} floatIntensity={10}>
          <Center>
            <Text3D castShadow {...fontSettings2}>
              {`50`}
              <meshPhysicalMaterial
                color="#ffffff"
                roughness={0.4}
                thickness={1}
                transmission={1.2}
                opacity={1}
              />
            </Text3D>
          </Center>
        </Float>
      </RigidBody>

      <RigidBody //top '50' points
        position={[0, 30, 8]}
        type="fixed"
        restitution={8}
        friction={1}
        rotation={[Math.PI / 2.5, 0, 0]}
      >
        <Float speed={2} rotationIntensity={1} floatIntensity={10}>
          <Center>
            <Text3D castShadow {...fontSettings2}>
              {`50`}
              <meshPhysicalMaterial
                color="#ffffff"
                roughness={0.4}
                thickness={1}
                transmission={1.2}
                opacity={1}
              />
            </Text3D>
          </Center>
        </Float>
      </RigidBody>

      <RigidBody //right '100' points
        position={[12, 21, 7]}
        type="fixed"
        restitution={8}
        friction={1}
        rotation={[Math.PI / 2.5, 0, 0]}
      >
        <Float speed={2} rotationIntensity={1} floatIntensity={7}>
          <Center>
            <Text3D castShadow {...fontSettings2}>
              {`100`}
              <meshPhysicalMaterial
                color="#ffffff"
                roughness={0.4}
                thickness={1}
                transmission={1.2}
                opacity={1}
              />
            </Text3D>
          </Center>
        </Float>
      </RigidBody>

      <RigidBody //left '100' points
        position={[-12, 21, 7]}
        type="fixed"
        restitution={8}
        friction={1}
        rotation={[Math.PI / 2.5, 0, 0]}
      >
        <Float speed={2} rotationIntensity={1} floatIntensity={7}>
          <Center>
            <Text3D castShadow {...fontSettings2}>
              {`100`}
              <meshPhysicalMaterial
                color="#ffffff"
                roughness={0.4}
                thickness={1}
                transmission={1.2}
                opacity={1}
              />
            </Text3D>
          </Center>
        </Float>
      </RigidBody>

      <RigidBody //left '200' points
        position={[-8, 43, 7]}
        type="fixed"
        restitution={8}
        friction={1}
        rotation={[Math.PI / 2.5, 0, 0]}
      >
        <Float speed={2} rotationIntensity={1} floatIntensity={7}>
          <Center>
            <Text3D castShadow {...fontSettings2}>
              {`200`}
              <meshPhysicalMaterial
                color="#ffffff"
                roughness={0.4}
                thickness={1}
                transmission={1.25}
                opacity={1}
              />
            </Text3D>
          </Center>
        </Float>
      </RigidBody>

      <RigidBody //left '200' points
        position={[8, 43, 7]}
        type="fixed"
        restitution={8}
        friction={1}
        rotation={[Math.PI / 2.5, 0, 0]}
      >
        <Float speed={2} rotationIntensity={1} floatIntensity={7}>
          <Center>
            <Text3D castShadow {...fontSettings2}>
              {`200`}
              <meshPhysicalMaterial
                color="#ffffff"
                roughness={0.4}
                thickness={1}
                transmission={1.25}
                opacity={1}
              />
            </Text3D>
          </Center>
        </Float>
      </RigidBody>
    </group>
  );
}

export { Title };
