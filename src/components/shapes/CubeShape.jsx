import React, { useRef, useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

const CubeShape = ({ size, onShapeSelect, position, highlightedProperty, onPropertyDragStart, onParamsDrag }) => {
  const meshRef = useRef()
  const { viewport, camera } = useThree()
  const [isDraggingParam, setIsDraggingParam] = useState(null)

  useEffect(() => {
    if (onShapeSelect) {
      onShapeSelect({
        type: 'cube',
        params: { size }
      })
    }
  }, [size, onShapeSelect])

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDraggingParam) {
        const movementX = event.movementX * 0.02
        
        if (isDraggingParam === 'size') {
          const newSize = Math.max(0.1, size + movementX)
          onParamsDrag('cube', { size: newSize })
        }
      }
    }

    const handleMouseUp = () => {
      setIsDraggingParam(null)
    }

    if (isDraggingParam) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDraggingParam, size, onParamsDrag])

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
      {/* Width line with draggable sphere */}
      <group>
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
        
        {/* Draggable control for size */}
        <mesh 
          position={[size / 2, -size / 2 - 0.3, size / 2 + 0.2]}
          onPointerDown={(e) => {
            e.stopPropagation()
            setIsDraggingParam('size')
          }}
          onPointerOver={(e) => {
            e.stopPropagation()
            document.body.style.cursor = 'ew-resize'
          }}
          onPointerOut={(e) => {
            document.body.style.cursor = 'default'
          }}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color={isDraggingParam === 'size' ? '#ffffff' : '#ffd700'} />
        </mesh>
      </group>

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