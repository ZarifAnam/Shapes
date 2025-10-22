import React, { useRef, useEffect, useMemo, useState } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PyramidShape = ({ baseWidth, baseDepth, height, onShapeSelect, position, highlightedProperty, onPropertyDragStart, onParamsDrag }) => {
  const meshRef = useRef()
  const { viewport, camera } = useThree()
  const [isDraggingParam, setIsDraggingParam] = useState(null)

  useEffect(() => {
    if (onShapeSelect) {
      onShapeSelect({
        type: 'pyramid',
        params: { baseWidth, baseDepth, height }
      })
    }
  }, [baseWidth, baseDepth, height, onShapeSelect])

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDraggingParam) {
        const movementX = event.movementX * 0.02
        const movementY = -event.movementY * 0.02
        
        if (isDraggingParam === 'baseWidth') {
          const newWidth = Math.max(0.1, baseWidth + movementX)
          onParamsDrag('pyramid', { baseWidth: newWidth })
        } else if (isDraggingParam === 'baseDepth') {
          const newDepth = Math.max(0.1, baseDepth + movementX)
          onParamsDrag('pyramid', { baseDepth: newDepth })
        } else if (isDraggingParam === 'height') {
          const newHeight = Math.max(0.1, height + movementY)
          onParamsDrag('pyramid', { height: newHeight })
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
  }, [isDraggingParam, baseWidth, baseDepth, height, onParamsDrag])

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
      {/* Base width with draggable sphere */}
      <group>
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
        
        {/* Draggable control for base width */}
        <mesh 
          position={[baseWidth / 2, -height / 2 - 0.3, 0]}
          onPointerDown={(e) => {
            e.stopPropagation()
            setIsDraggingParam('baseWidth')
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
          <meshBasicMaterial color={isDraggingParam === 'baseWidth' ? '#ffffff' : '#00ffff'} />
        </mesh>
      </group>

      {/* Base depth with draggable sphere */}
      <group>
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
        
        {/* Draggable control for base depth */}
        <mesh 
          position={[0, -height / 2 - 0.3, baseDepth / 2]}
          onPointerDown={(e) => {
            e.stopPropagation()
            setIsDraggingParam('baseDepth')
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
          <meshBasicMaterial color={isDraggingParam === 'baseDepth' ? '#ffffff' : '#ff00ff'} />
        </mesh>
      </group>

      {/* Height line with draggable sphere */}
      <group>
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
        
        {/* Draggable control for height */}
        <mesh 
          position={[Math.max(baseWidth, baseDepth) / 2 + 0.3, height / 2, 0]}
          onPointerDown={(e) => {
            e.stopPropagation()
            setIsDraggingParam('height')
          }}
          onPointerOver={(e) => {
            e.stopPropagation()
            document.body.style.cursor = 'ns-resize'
          }}
          onPointerOut={(e) => {
            document.body.style.cursor = 'default'
          }}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color={isDraggingParam === 'height' ? '#ffffff' : '#00ff00'} />
        </mesh>
      </group>

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