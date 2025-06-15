import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#0ea5e9"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  )
}

const FloatingCubes = () => {
  const cubesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (cubesRef.current) {
      cubesRef.current.rotation.y = state.clock.elapsedTime * 0.1
      
      // Update each cube's Y position dynamically
      cubesRef.current.children.forEach((cube, i) => {
        const y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.5
        cube.position.y = y
      })
    }
  })

  // Create cubes with static initial positions
  const cubes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    const radius = 4
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius

    return (
      <mesh key={i} position={[x, 0, z]} scale={0.3}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#d946ef" metalness={0.8} roughness={0.2} />
      </mesh>
    )
  })

  return <group ref={cubesRef}>{cubes}</group>
}

const Hero3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d946ef" />
      
      <AnimatedSphere />
      <FloatingCubes />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}

export default Hero3D