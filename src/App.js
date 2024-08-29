import Header from "./components/header";
import "./App.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html,useProgress, useGLTF } from "@react-three/drei";
import { Section } from "./components/section";
import { Suspense, useEffect, useRef } from "react";
import state from "./components/state";
import { useInView } from "react-intersection-observer";
import { a, useTransition } from "@react-spring/web";


function Model(props) {
  const { scene } = useGLTF(props.modelPath,true) // Replace with your GLTF file path
  return <primitive object={scene} {...props} />;
}

const Lights=()=>{
  return(<>
  <ambientLight intensity={0.5}/>
  <directionalLight position={[10,10,5]} intensity={1}/>
  <directionalLight position={[0,10,0]} intensity={1.5}/>
  {/* <spotLight position={[0, 50, 100]} intensity={2} /> */}

  </>)
}

const HTMLContent= ({bgColor,domContent,children,modelPath, positionY})=>{
  const ref = useRef()
  useFrame((state, delta) =>(ref.current.rotation.y -=delta ))
  const [refItem, inView] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);
  return(<>
  <Section factor={1.5} offset={1}>
    <group position={[0,positionY,0]}>
    <mesh ref={ref} position={[0,-35,0]}>
    <Model modelPath={modelPath}/>
    </mesh>
   <Html portal={domContent} fullscreen>
   <div className="container" ref={refItem}>
     {children}
   </div>

</Html>
</group>
</Section>
  </>)
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
        <a.div className='loading' style={{ opacity }}>
          <div className='loading-bar-container'>
            <a.div className='loading-bar' style={{ width: progress }}></a.div>
          </div>
        </a.div>
      )
  );
}



function App() {

  const domContent = useRef()
  const scrollArea = useRef()
  const onScroll =(e)=>(state.top.current = e.target.scrollTop)
  useEffect(()=>void onScroll({target:scrollArea.current}),[])

  return (
  <>
  <Header/>
  <Canvas
   colorManagement
   camera={{position:[0,0,120], fov:70}}
  >
    <Lights/>

 <Suspense fallback={null}>
  <HTMLContent  bgColor='#f15946'  domContent={domContent} modelPath='./assets/armchairYellow.gltf' positionY={250}>

    <h1 className="title">yellow Chair</h1>

  </HTMLContent>


  <HTMLContent  bgColor='#571ec1' domContent={domContent} modelPath='./assets/armchairGreen.gltf' positionY={0}>

    <h1 className="title">Green Chair</h1>

  </HTMLContent>

  
  <HTMLContent     bgColor='#636567' domContent={domContent} modelPath='./assets/armchairGray.gltf' positionY={-250}>
 
    <h1 className="title">Gray Chair</h1>

  </HTMLContent>
  </Suspense>   
  </Canvas>
<Loader/>

  <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
   <div style={{position:'sticky' , top:0} }ref={domContent}></div>
   <div style={{height:`${state.sections * 100}vh`}}></div>
  </div>
  </>
  );
}

export default App;
