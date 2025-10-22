import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const CubeShape = ({ size, onShapeSelect, position, highlightedProperty }) => {
  const meshRef = useRef()

  useEffect(() => {
    if (onShapeSelect) {
      onShapeSelect({
        type: 'cube',
        params: { size }
      })
    }
  }, [size, onShapeSelect])

  const handleClick = (event) => {
    event.stopPropagation()
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
          color={highlightedProperty === 'volume' ? '#ff00ff' : '#9d4edd'} 
          transparent 
          opacity={highlightedProperty === 'volume' ? 0.95 : 0.8}
          emissive={highlightedProperty === 'volume' ? '#ff00ff' : '#000000'}
          emissiveIntensity={highlightedProperty === 'volume' ? 0.4 : 0}
        />
      </mesh>

      {/* Face highlights */}
      {/* Top face */}
      <mesh position={[0, size / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial 
          color={highlightedProperty === 'faceArea' ? '#00ffff' : '#ff6b6b'} 
          transparent 
          opacity={highlightedProperty === 'faceArea' ? 0.8 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Front face */}
      <mesh position={[0, 0, size / 2 + 0.01]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial 
          color={highlightedProperty === 'faceArea' ? '#00ffff' : '#4fc3f7'} 
          transparent 
          opacity={highlightedProperty === 'faceArea' ? 0.8 : 0.4}
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
        <lineBasicMaterial 
          color={highlightedProperty === 'edgeLength' ? '#ffd700' : '#ffeb3b'} 
          linewidth={highlightedProperty === 'edgeLength' ? 5 : 3} 
        />
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
        <lineBasicMaterial 
          color={highlightedProperty === 'edgeLength' ? '#ffd700' : '#4caf50'} 
          linewidth={highlightedProperty === 'edgeLength' ? 5 : 3} 
        />
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
        <lineBasicMaterial 
          color={highlightedProperty === 'edgeLength' ? '#ffd700' : '#e91e63'} 
          linewidth={highlightedProperty === 'edgeLength' ? 5 : 3} 
        />
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