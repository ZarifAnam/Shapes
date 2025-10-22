import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const SphereShape = ({ radius, onShapeSelect, position, highlightedProperty }) => {
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
          color={highlightedProperty === 'surfaceArea' || highlightedProperty === 'volume' ? '#ffd700' : '#e74c3c'} 
          transparent 
          opacity={highlightedProperty === 'surfaceArea' || highlightedProperty === 'volume' ? 0.95 : 0.8}
          emissive={highlightedProperty === 'surfaceArea' || highlightedProperty === 'volume' ? '#ffd700' : '#000000'}
          emissiveIntensity={highlightedProperty === 'surfaceArea' || highlightedProperty === 'volume' ? 0.4 : 0}
        />
      </mesh>

      {/* Equator circle */}
      <mesh ref={equatorRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial 
          color={highlightedProperty === 'radius' || highlightedProperty === 'diameter' ? '#00ffff' : '#ffeb3b'} 
          transparent 
          opacity={highlightedProperty === 'radius' || highlightedProperty === 'diameter' ? 1 : 0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Meridian circle */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial 
          color={highlightedProperty === 'radius' || highlightedProperty === 'diameter' ? '#ff00ff' : '#4caf50'} 
          transparent 
          opacity={highlightedProperty === 'radius' || highlightedProperty === 'diameter' ? 1 : 0.8}
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
        <lineBasicMaterial 
          color={highlightedProperty === 'radius' ? '#00ffff' : '#ffeb3b'} 
          linewidth={highlightedProperty === 'radius' ? 6 : 4} 
        />
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
        <lineBasicMaterial 
          color={highlightedProperty === 'diameter' ? '#ff00ff' : '#ff5722'} 
          linewidth={highlightedProperty === 'diameter' ? 4 : 2} 
        />
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
        <lineBasicMaterial 
          color={highlightedProperty === 'radius' ? '#00ffff' : '#2196f3'} 
          linewidth={highlightedProperty === 'radius' ? 6 : 4} 
        />
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