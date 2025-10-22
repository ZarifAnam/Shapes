import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import CylinderShape from './shapes/CylinderShape'
import CubeShape from './shapes/CubeShape'
import PyramidShape from './shapes/PyramidShape'
import SphereShape from './shapes/SphereShape'

const Scene3D = ({ activeShape, shapeParams, onShapeSelect }) => {
  const groupRef = useRef()

  const renderShape = () => {
    const commonProps = {
      onShapeSelect,
      position: [0, 0, 0],
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
    <group ref={groupRef}>
      {renderShape()}
    </group>
  )
}

export default Scene3D