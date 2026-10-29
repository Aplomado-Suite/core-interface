'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 128, 128]} scale={2.8}>
        <MeshDistortMaterial
          color="#38bdf8"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          emissive="#0ea5e9"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  )
}

function GlowOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * -0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * -0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.8} position={[3, -1, -2]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive="#4f46e5"
          emissiveIntensity={0.15}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#6366f1" />
        <FloatingOrb />
        <GlowOrb />
      </Canvas>
    </div>
  )
}
