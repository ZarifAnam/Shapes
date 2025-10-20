import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import CylinderShape from './shapes/CylinderShape'
import CubeShape from './shapes/CubeShape'
import PyramidShape from './shapes/PyramidShape'
import SphereShape from './shapes/SphereShape'

const Scene3D = ({ activeShape, shapeParams, onShapeSelect }) => {
  const [dragPosition, setDragPosition] = useState([0, 0, 0])
  const [isDragging, setIsDragging] = useState(false)
  const groupRef = useRef()
  const { size, viewport } = useThree()

  const handlePointerDown = (event) => {
    setIsDragging(true)
    event.stopPropagation()
  }

  const handlePointerMove = (event) => {
    if (isDragging) {
      const x = (event.clientX / size.width) * 2 - 1
      const y = -(event.clientY / size.height) * 2 + 1
      
      setDragPosition([
        x * viewport.width / 2,
        y * viewport.height / 2,
        0
      ])
    }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.lerp(new THREE.Vector3(...dragPosition), 0.1)
    }
  })

  const renderShape = () => {
    const commonProps = {
      onShapeSelect,
      position: dragPosition,
    }

    switch (activeShape) {
      case 'cylinder':
        return (
          <CylinderShape
            {...commonProps}
            radius={shapeParams.cylinder.radius}
            height={shapeParams.cylinder.height}
          />
        )
      case 'cube':
        return (
          <CubeShape
            {...commonProps}
            size={shapeParams.cube.size}
          />
        )
      case 'pyramid':
        return (
          <PyramidShape
            {...commonProps}
            baseWidth={shapeParams.pyramid.baseWidth}
            baseDepth={shapeParams.pyramid.baseDepth}
            height={shapeParams.pyramid.height}
          />
        )
      case 'sphere':
        return (
          <SphereShape
            {...commonProps}
            radius={shapeParams.sphere.radius}
          />
        )
      default:
        return null
    }
  }

  return (
    <group 
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {renderShape()}
    </group>
  )
}

export default Scene3D