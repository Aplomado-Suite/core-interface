'use client'

import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei'

function FloatingSphere() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} scale={2}>
        <MeshDistortMaterial
          color="#0ea5e9"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

export default function AboutOrb() {
  return (
    <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-6 relative">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        {/* @ts-expect-error r3f types not compatible with React 19 */}
        <ambientLight intensity={0.5} />
        {/* @ts-expect-error r3f types not compatible with React 19 */}
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FloatingSphere />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  )
}
