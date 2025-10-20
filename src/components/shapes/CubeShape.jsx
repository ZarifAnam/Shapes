import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const CubeShape = ({ size, onShapeSelect, position }) => {
  const meshRef = useRef()

  useEffect(() => {
    if (onShapeSelect) {
      onShapeSelect({
        type: 'cube',
        params: { size }
      })
    }
  }, [size, onShapeSelect])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x += 0.003
    }
  })

  const handleClick = () => {
    if (onShapeSelect) {
      onShapeSelect({
        type: 'cube',
        params: { size }
      })
    }
  }

  return (
    <group position={position}>
      {/* Main cube */}
      <mesh ref={meshRef} onClick={handleClick} position={[0, 0, 0]}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial 
          color="#9d4edd" 
          transparent 
          opacity={0.8}
        />
      </mesh>

      {/* Face highlights */}
      {/* Top face */}
      <mesh position={[0, size / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial 
          color="#ff6b6b" 
          transparent 
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Front face */}
      <mesh position={[0, 0, size / 2 + 0.01]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial 
          color="#4fc3f7" 
          transparent 
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Edge lines for measurements */}
      {/* Width line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([-size / 2, -size / 2 - 0.3, size / 2 + 0.2, size / 2, -size / 2 - 0.3, size / 2 + 0.2])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffeb3b" linewidth={3} />
      </line>

      {/* Height line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([size / 2 + 0.2, -size / 2, size / 2 + 0.2, size / 2 + 0.2, size / 2, size / 2 + 0.2])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4caf50" linewidth={3} />
      </line>

      {/* Depth line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([size / 2 + 0.2, -size / 2 - 0.3, -size / 2, size / 2 + 0.2, -size / 2 - 0.3, size / 2])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#e91e63" linewidth={3} />
      </line>

      {/* Wireframe outline */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

export default CubeShape