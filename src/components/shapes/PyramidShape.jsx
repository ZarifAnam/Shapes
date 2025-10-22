import React, { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'

const PyramidShape = ({ baseWidth, baseDepth, height, onShapeSelect, position, highlightedProperty }) => {
  const meshRef = useRef()

  useEffect(() => {
    if (onShapeSelect) {
      onShapeSelect({
        type: 'pyramid',
        params: { baseWidth, baseDepth, height }
      })
    }
  }, [baseWidth, baseDepth, height, onShapeSelect])

  const pyramidGeometry = useMemo(() => {
    const geometry = new THREE.ConeGeometry(Math.max(baseWidth, baseDepth) / 2, height, 4)
    geometry.rotateY(Math.PI / 4)
    return geometry
  }, [baseWidth, baseDepth, height])

  const handleClick = (event) => {
    event.stopPropagation()
    if (onShapeSelect) {
      onShapeSelect({
        type: 'pyramid',
        params: { baseWidth, baseDepth, height }
      })
    }
  }

  return (
    <group position={position}>
      {/* Main pyramid */}
      <mesh ref={meshRef} onClick={handleClick} position={[0, 0, 0]} geometry={pyramidGeometry}>
        <meshStandardMaterial 
          color={highlightedProperty === 'lateralArea' || highlightedProperty === 'volume' ? '#ffd700' : '#f39c12'} 
          transparent 
          opacity={highlightedProperty === 'lateralArea' || highlightedProperty === 'volume' ? 0.95 : 0.8}
          emissive={highlightedProperty === 'lateralArea' || highlightedProperty === 'volume' ? '#ffd700' : '#000000'}
          emissiveIntensity={highlightedProperty === 'lateralArea' || highlightedProperty === 'volume' ? 0.4 : 0}
        />
      </mesh>

      {/* Base highlight */}
      <mesh position={[0, -height / 2 - 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[Math.max(baseWidth, baseDepth), Math.max(baseWidth, baseDepth)]} />
        <meshBasicMaterial 
          color={highlightedProperty === 'baseArea' || highlightedProperty === 'baseWidth' || highlightedProperty === 'baseDepth' ? '#00ffff' : '#ff6b6b'} 
          transparent 
          opacity={highlightedProperty === 'baseArea' || highlightedProperty === 'baseWidth' || highlightedProperty === 'baseDepth' ? 0.85 : 0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Measurement lines */}
      {/* Base width */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([-baseWidth / 2, -height / 2 - 0.3, 0, baseWidth / 2, -height / 2 - 0.3, 0])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color={highlightedProperty === 'baseWidth' ? '#00ffff' : '#ffeb3b'} 
          linewidth={highlightedProperty === 'baseWidth' ? 5 : 3} 
        />
      </line>

      {/* Base depth */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([0, -height / 2 - 0.3, -baseDepth / 2, 0, -height / 2 - 0.3, baseDepth / 2])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color={highlightedProperty === 'baseDepth' ? '#ff00ff' : '#e91e63'} 
          linewidth={highlightedProperty === 'baseDepth' ? 5 : 3} 
        />
      </line>

      {/* Height line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([Math.max(baseWidth, baseDepth) / 2 + 0.3, -height / 2, 0, Math.max(baseWidth, baseDepth) / 2 + 0.3, height / 2, 0])}
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
      <mesh position={[0, 0, 0]} geometry={pyramidGeometry}>
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

export default PyramidShape