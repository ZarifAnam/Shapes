import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import CylinderShape from './shapes/CylinderShape'
import CubeShape from './shapes/CubeShape'
import PyramidShape from './shapes/PyramidShape'
import SphereShape from './shapes/SphereShape'

const Scene3D = ({ activeShape, shapeParams, onShapeSelect, highlightedProperty, onParamsDrag }) => {
  const groupRef = useRef()
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartPos, setDragStartPos] = useState(null)
  const [dragProperty, setDragProperty] = useState(null)

  const handlePropertyDragStart = (property, event) => {
    setIsDragging(true)
    setDragProperty(property)
    setDragStartPos({ x: event.clientX, y: event.clientY })
    event.stopPropagation()
  }

  const handlePropertyDragEnd = () => {
    setIsDragging(false)
    setDragProperty(null)
    setDragStartPos(null)
  }

  const renderShape = () => {
    const commonProps = {
      onShapeSelect,
      position: [0, 0, 0],
      highlightedProperty,
      onPropertyDragStart: handlePropertyDragStart,
      onParamsDrag,
      isDragging: isDragging && dragProperty,
      dragProperty,
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
      onPointerUp={handlePropertyDragEnd}
      onPointerLeave={handlePropertyDragEnd}
    >
      {renderShape()}
    </group>
  )
}

export default Scene3D