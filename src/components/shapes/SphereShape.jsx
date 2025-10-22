import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SphereShape = ({ radius, onShapeSelect, position }) => {
  const meshRef = useRef()
  const radiusLineRef = useRef()
  const equatorRef = useRef()

  useEffect(() => {
    if (onShapeSelect) {
      onShapeSelect({
        type: 'sphere',
        params: { radius }
      })
    }
  }, [radius, onShapeSelect])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
    if (equatorRef.current) {
      equatorRef.current.rotation.z += 0.01
    }
  })

  const handleClick = (event) => {
    event.stopPropagation()
    if (onShapeSelect) {
      onShapeSelect({
        type: 'sphere',
        params: { radius }
      })
    }
  }

  return (
    <group position={position}>
      {/* Main sphere */}
      <mesh ref={meshRef} onClick={handleClick} position={[0, 0, 0]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial 
          color="#e74c3c" 
          transparent 
          opacity={0.8}
        />
      </mesh>

      {/* Equator circle */}
      <mesh ref={equatorRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial 
          color="#ffeb3b" 
          transparent 
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Meridian circle */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial 
          color="#4caf50" 
          transparent 
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Radius line */}
      <line ref={radiusLineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([0, 0, 0, radius, 0, 0])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffeb3b" linewidth={4} />
      </line>

      {/* Diameter line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([-radius, 0, 0, radius, 0, 0])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff5722" linewidth={2} />
      </line>

      {/* Vertical radius line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([0, 0, 0, 0, radius, 0])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#2196f3" linewidth={4} />
      </line>

      {/* Wireframe outline */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={0.2}
        />
      </mesh>
    </group>
  )
}

export default SphereShape