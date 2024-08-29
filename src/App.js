import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useProgress, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { a, useTransition } from "@react-spring/web";
import Header from "./components/Header";
import "./App.scss";
import state from "./components/state";

function Model({ modelPath, ...props }) {
  const { scene } = useGLTF(modelPath, true); // Load GLTF model
  return <primitive object={scene} {...props} />;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
    </>
  );
}

function HTMLContent({ bgColor, domContent, children, modelPath, positionY }) {
  const modelRef = useRef();
  const [refItem, inView] = useInView({
    threshold: 0,
  });

  useFrame((state, delta) => (modelRef.current.rotation.y -= delta)); // Rotate the model

  useEffect(() => {
    if (inView) document.body.style.background = bgColor; // Change background color when in view
  }, [inView, bgColor]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={modelRef} position={[0, -35, 0]}>
          <Model modelPath={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className="container" ref={refItem}>
            {children}
          </div>
        </Html>
      </group>
    </Section>
  );
}

function Loader() {
  const { active, progress } = useProgress();
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0 },
    update: { progress },
  });

  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className="loading" style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width: `${progress}%` }} />
          </div>
        </a.div>
      )
  );
}

function App() {
  const domContent = useRef();
  const scrollArea = useRef();
  
  const onScroll = (e) => {
    state.top.current = e.target.scrollTop;
  };

  useEffect(() => {
    onScroll({ target: scrollArea.current });
  }, []);

  return (
    <>
      <Header />
      <Canvas camera={{ position: [0, 0, 120], fov: 70 }}>
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            bgColor="#f15946"
            domContent={domContent}
            modelPath="./assets/armchairYellow.gltf"
            positionY={250}
          >
            <h1 className="title">Hello Tuba</h1>
          </HTMLContent>
          <HTMLContent
            bgColor="#571ec1"
            domContent={domContent}
            modelPath="./assets/armchairGreen.gltf"
            positionY={0}
          >
            <h1 className="title">Hello Tuba</h1>
          </HTMLContent>
          <HTMLContent
            bgColor="#636567"
            domContent={domContent}
            modelPath="./assets/armchairGray.gltf"
            positionY={-250}
          >
            <h1 className="title">Hello Tuba</h1>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <Loader />
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.sections * 100}vh` }}></div>
      </div>
    </>
  );
}

export default App;
