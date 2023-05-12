import { Cylinder, Box, Html } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useState, useRef, useEffect } from "react";
import bigHit from "./audio/key1.mp3";
import diamondHit from "./audio/key2.mp3";
import smallHit from "./audio/key3.mp3";
import "./styles.css";
import { Spinners } from "./Spinner";
import { db } from "./config/firebase";
import {
  updateDoc,
  doc,
  query,
  orderBy,
  limit,
  getDocs,
  collection,
} from "firebase/firestore";

export function Obstacle(props) {
  const [scoreChild, setScore] = useState(0);
  const [userList, setUserList] = useState([]);
  const userRef = collection(db, "scores");
  const htmlRef = useRef();
  const docID = props.id;
  const [docRef, setDocRef] = useState(null);

  //re-renders once the props change
  useEffect(() => {
    if (docID) {
      const newDocRef = doc(db, "scores", docID);
      setDocRef(newDocRef);
    }
  }, [props]);

  //update scores in firestore
  const databaseUpdate = async () => {
    try {
      await updateDoc(docRef, { score: scoreChild });
      const querySnapshot = await getDocs(
        query(userRef, orderBy("score", "desc"))
      );
      const filterdQuerySnapchat = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserList(filterdQuerySnapchat);
      console.log(filterdQuerySnapchat);
    } catch (err) {
      console.error(err);
    }
  };

  function updateScore(value) {
    setScore((prevScore) => prevScore + value);
    htmlRef.current.innerHTML = "Score: " + scoreChild;
    htmlRef.current.className = "score";
    databaseUpdate();
  }

  function BigBallAudio() {
    new Audio(bigHit).play();
    updateScore(100);
  }

  function DiamondAudio() {
    new Audio(diamondHit).play();
    updateScore(50);
  }

  function SmallHit() {
    new Audio(smallHit).play();
    updateScore(250);
  }

  function BigBalls({ position }) {
    return (
      <group position={position}>
        <RigidBody
          gravityScale={0}
          restitution={2}
          type="fixed"
          colliders={"trimesh"}
          rotation={[0, 0, 0]}
          onContactForce={BigBallAudio}
        >
          <Cylinder
            castShadow
            receiveShadow
            args={[4, 4, 2.2]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
          >
            <meshStandardMaterial
              metalness={0.8}
              roughness={0.145}
              color="#13C4A3"
              wireframe={false}
            />
          </Cylinder>
        </RigidBody>
      </group>
    );
  }

  function SmallBalls({ position }) {
    return (
      <group position={position}>
        <RigidBody
          gravityScale={0}
          restitution={2}
          type="fixed"
          colliders={"trimesh"}
          rotation={[0, 0, 0]}
          onContactForce={SmallHit}
        >
          <Cylinder
            castShadow
            args={[2, 2, 2]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
          >
            <meshStandardMaterial
              metalness={0.8}
              roughness={0.145}
              color="#79AEA3"
              wireframe={false}
            />
          </Cylinder>
        </RigidBody>
      </group>
    );
  }

  function Diamond({ position }) {
    return (
      <group position={position}>
        <RigidBody
          gravityScale={0}
          restitution={2}
          type="fixed"
          colliders={"trimesh"}
          rotation={[0, 0, -Math.PI / 4]}
          onContactForce={DiamondAudio}
        >
          <Box
            castShadow
            args={[7, 3, 7]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
          >
            <meshStandardMaterial
              metalness={0.8}
              roughness={0.145}
              color="#39A0ED"
              wireframe={false}
            />
          </Box>
        </RigidBody>
      </group>
    );
  }

  return (
    <>
      <Html ref={htmlRef} position={[-35, 100, 0]}>
        <div className="cyan score">Score: 0</div>
      </Html>
      <Html position={[-90, 70, 0]}>
        <div className="cyan">Leaderboard: </div>
        <ol>
          {userList.slice(0, 10).map((user) =>
            user.id !== docID ? (
              <li>
                {user.username} - {user.score}
              </li>
            ) : (
              <li className="current">
                {user.username} - {user.score}
              </li>
            )
          )}
        </ol>
      </Html>
      <Spinners />
      <Diamond position={[0, 10, 3]} />
      <Diamond position={[0, 30, 3]} />
      <BigBalls position={[12, 20, 3.4]} />
      <BigBalls position={[-12, 20, 3.4]} />
      <SmallBalls position={[8, 42, 3.4]} />
      <SmallBalls position={[-8, 42, 3.4]} />
    </>
  );
}
