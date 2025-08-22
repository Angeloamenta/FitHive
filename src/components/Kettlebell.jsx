import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";

const Kettlebell = () => {

  function KettlebellModel() {
    const ref = useRef();
    const { scene } = useGLTF("/model/dumbbells.glb");

    // Rotazione lenta continua + lieve oscillazione verticale
    useFrame(() => {
      if (ref.current) {
        ref.current.rotation.y -= 0.003;
        ref.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
      }
    });

    return <primitive ref={ref} object={scene} scale={16} position={[0, 0, 0]} />;
  }

  return (
    <div className="h-96 w-full">
      <Canvas
        style={{ background: "none" }}
        gl={{ alpha: true }}
      >
        {/* Luci più forti per risaltare su sfondo nero */}
        <ambientLight intensity={1.2} />             {/* luce globale più intensa */}
        <directionalLight position={[5, 5, 5]} intensity={2} />   {/* luce principale */}
        <directionalLight position={[-5, 5, -5]} intensity={4} /> {/* luce di riempimento */}
        <directionalLight position={[0, -5, 5]} intensity={1} />  {/* luce di backlight */}

        {/* Modello */}
        <KettlebellModel />

        {/* Controlli */}
        <OrbitControls
          enableZoom={false}
          enablePan={true}
          rotateSpeed={0.4}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </div>
  );
};

export default Kettlebell;


