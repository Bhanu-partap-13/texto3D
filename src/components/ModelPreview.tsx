import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

interface ModelPreviewProps {
  modelUrl?: string
  thumbnailUrl?: string
}

const LoadedModel: React.FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  useEffect(() => {
    if (scene) {
      // Center and scale the model
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2 / maxDim
      
      scene.position.sub(center)
      scene.scale.setScalar(scale)
    }
  }, [scene])

  return <primitive ref={modelRef} object={scene} />
}

const PlaceholderModel = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

const ModelPreview: React.FC<ModelPreviewProps> = ({ modelUrl, thumbnailUrl }) => {
  const [loadError, setLoadError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-96 bg-gray-900/50 rounded-xl overflow-hidden relative"
    >
      {thumbnailUrl && !modelUrl && (
        <div className="absolute inset-0 z-10">
          <img
            src={thumbnailUrl}
            alt="Model thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-lg font-semibold mb-2">Preview Ready</div>
              <div className="text-sm opacity-75">3D model is being processed...</div>
            </div>
          </div>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        shadows
        onError={() => setLoadError(true)}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        <Suspense fallback={<PlaceholderModel />}>
          {modelUrl && !loadError ? (
            <LoadedModel url={modelUrl} />
          ) : (
            <PlaceholderModel />
          )}
          <Environment preset="studio" />
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
        </Suspense>
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="glass-effect p-3 rounded-lg">
          <p className="text-white text-sm">
            {modelUrl ? '🎉 Your 3D model is ready!' : '⏳ Generating your 3D model...'}
          </p>
          <p className="text-gray-300 text-xs mt-1">
            Use mouse to rotate, zoom, and pan around the model
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default ModelPreview