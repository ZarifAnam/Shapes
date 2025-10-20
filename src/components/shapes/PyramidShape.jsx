import React, { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PyramidShape = ({ baseWidth, baseDepth, height, onShapeSelect, position }) => {
  const meshRef = useRef()

  useEffect(() => {
    if (onShapeSelect) {
      onShapeSelect({
        type: 'pyramid',
        params: { baseWidth, baseDepth, height }
      })
    }
  }, [baseWidth, baseDepth, height, onShapeSelect])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  const pyramidGeometry = useMemo(() => {
    const geometry = new THREE.ConeGeometry(Math.max(baseWidth, baseDepth) / 2, height, 4)
    geometry.rotateY(Math.PI / 4)
    return geometry
  }, [baseWidth, baseDepth, height])

  const handleClick = () => {
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
          color="#f39c12" 
          transparent 
          opacity={0.8}
        />
      </mesh>

      {/* Base highlight */}
      <mesh position={[0, -height / 2 - 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[baseWidth, baseDepth]} />
        <meshBasicMaterial 
          color="#ff6b6b" 
          transparent 
          opacity={0.6}
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
        <lineBasicMaterial color="#ffeb3b" linewidth={3} />
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
        <lineBasicMaterial color="#e91e63" linewidth={3} />
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
        <lineBasicMaterial color="#4caf50" linewidth={3} />
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