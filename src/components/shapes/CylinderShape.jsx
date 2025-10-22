import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const CylinderShape = ({ radius, height, onShapeSelect, position, highlightedProperty }) => {
  const meshRef = useRef()
  const radiusLineRef = useRef()
  const topCircleRef = useRef()
  const bottomCircleRef = useRef()

  useEffect(() => {
    if (onShapeSelect) {
      onShapeSelect({
        type: 'cylinder',
        params: { radius, height }
      })
    }
  }, [radius, height, onShapeSelect])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  const handleClick = (event) => {
    event.stopPropagation()
    if (onShapeSelect) {
      onShapeSelect({
        type: 'cylinder',
        params: { radius, height }
      })
    }
  }

  return (
    <group position={position}>
      {/* Main cylinder */}
      <mesh ref={meshRef} onClick={handleClick} position={[0, 0, 0]}>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshStandardMaterial 
          color={highlightedProperty === 'lateralArea' ? '#ffd700' : '#64ffda'} 
          transparent 
          opacity={highlightedProperty === 'lateralArea' ? 0.95 : 0.8}
          wireframe={false}
          emissive={highlightedProperty === 'lateralArea' ? '#ffd700' : '#000000'}
          emissiveIntensity={highlightedProperty === 'lateralArea' ? 0.5 : 0}
        />
      </mesh>

      {/* Top circle highlight */}
      <mesh ref={topCircleRef} position={[0, height / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 32]} />
        <meshBasicMaterial 
          color={highlightedProperty === 'baseArea' ? '#ff00ff' : highlightedProperty === 'radius' ? '#00ffff' : '#ff6b6b'} 
          transparent 
          opacity={highlightedProperty === 'baseArea' || highlightedProperty === 'radius' ? 0.9 : 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bottom circle highlight */}
      <mesh ref={bottomCircleRef} position={[0, -height / 2 - 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 32]} />
        <meshBasicMaterial 
          color={highlightedProperty === 'baseArea' ? '#ff00ff' : highlightedProperty === 'radius' ? '#00ffff' : '#ff6b6b'} 
          transparent 
          opacity={highlightedProperty === 'baseArea' || highlightedProperty === 'radius' ? 0.9 : 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Radius line */}
      <line ref={radiusLineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([0, height / 2, 0, radius, height / 2, 0])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color={highlightedProperty === 'radius' ? '#00ffff' : '#ffeb3b'} 
          linewidth={highlightedProperty === 'radius' ? 5 : 3} 
        />
      </line>

      {/* Height line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([radius + 0.2, -height / 2, 0, radius + 0.2, height / 2, 0])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color={highlightedProperty === 'height' ? '#00ff00' : '#4caf50'} 
          linewidth={highlightedProperty === 'height' ? 5 : 3} 
        />
      </line>

      {/* Wireframe outline */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[radius, radius, height, 32]} />
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

export default CylinderShape