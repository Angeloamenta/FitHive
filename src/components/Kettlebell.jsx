import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { useFrame } from '@react-three/fiber';

import { useRef } from "react";

const Kettlebell = ()=> {

    function KettlebellModel() {
      
      const ref = useRef();
    const { scene } = useGLTF('/model/dumbbells.glb');

    useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y -= 0.005;

    }
  });

  return <primitive ref={ref} object={scene} scale={16} position={[0,-1,0]}  />;
}

    return (
        <div className="h-96">
      <Canvas className="canvas">
        <ambientLight intensity={2} />
        <directionalLight position={[0, 5, 0]} intensity={45} />
        <KettlebellModel />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
    )
}

export default Kettlebell