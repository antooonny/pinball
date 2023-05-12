import React, { Suspense, useEffect, useState, useRef} from "react";
import {Canvas} from "@react-three/fiber";
import "./styles.css";
import {OrbitControls, PerspectiveCamera, Sky, Stars} from "@react-three/drei";
import { Ball } from "./Ball";
import { Physics } from "@react-three/rapier";
import { NavigationControls } from "./useControls.jsx";
import { Pinmachine } from "./Pinmachine";
import backgroundMusic from "./audio/background.mp3"
import { Title } from "./Title.jsx";
import { db } from "./config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { Obstacle } from "./Obstacles";
function App() {

  const [play, setPlay] = useState(false);
  const [name, setName] = useState("test")
  const [score, setScore] = useState(0)
  const [id, setID] = useState("");
  const userRef = collection(db, "scores")


  //function to add a new user to the documents
  const onStart = async () => {
    try
    {
      const newDoc = await addDoc(userRef, {username: name, score: 0})
      setID(newDoc.id)
    }
    catch(err) {
      console.error(err)
    }
  }

  function startGame() {
    setPlay(true);
    onStart();
    playAudio();

  }

  function playAudio() {
    const audio = new Audio(backgroundMusic)
    audio.volume = 0.01
    audio.play()

  }

  function handleChange(e) {
    setName(e.target.value);
    console.log(name);
  }

  return (
    <group>
      {!play && (
        <div className="flex-container">
          <h1>communiCad Project!</h1>
          <label htmlFor="name">Enter a Name</label>
          <input type="text" required name="name" id="name" onChange={handleChange} maxLength="10"></input>
          <button onClick={startGame}>Start</button>
        </div>
      )}

      {play && (<NavigationControls>
      <Suspense fallback={null}>
        <Canvas shadows>
        <Sky distance={450000} sunPosition={[0, 80, 30]} inclination={0} azimuth={0.25} />
        <Stars radius={100} depth={0} count={5000} factor={4} saturation={10} fade speed={1} />

          <color args={[0xA3F7B5]} attach="background"/> 
          <PerspectiveCamera makeDefault
            position={[0, -20, 55]}
            rotation={[Math.PI / 4.5, 0, 0]}    
            />
          <spotLight 
            castShadow color={[1, 0.25, 0.7]}
            intensity={1.5}
            angle={0.6}
            penumbra={0.5}
            position={[11, 80, 50]}
            shadow-bias={-0.0001}
            helper/>
          <spotLight
            color={[0.14, 0.5, 1]}
            intensity={1}
            angle={0.6}
            penumbra={0.5}
            position={[-11, 40, 50]}
            castShadow
            shadow-bias={-0.0001}
          />
          <spotLight
            color={[0.14, 0.5, 1]}
            intensity={2}
            angle={0.6}
            penumbra={0.5}
            position={[-11, 70, 50]}
            castShadow
            shadow-bias={-0.0001}
          />
          <ambientLight intensity={0.5}/>
          <Physics>
            <Pinmachine/>
            <Title/>
            <Obstacle id={id} name={name}/>
            <Ball/>
          </Physics>
        </Canvas>
      </Suspense>
      </NavigationControls>)}
    </group>
  );
}

export default App;
