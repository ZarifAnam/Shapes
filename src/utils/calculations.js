/**
 * Calculate geometric properties for various 3D shapes
 */

export const calculateShapeProperties = (type, params) => {
  switch (type) {
    case 'cylinder':
      return calculateCylinderProperties(params)
    case 'cube':
      return calculateCubeProperties(params)
    case 'pyramid':
      return calculatePyramidProperties(params)
    case 'sphere':
      return calculateSphereProperties(params)
    default:
      return { surfaceArea: 0, volume: 0 }
  }
}

const calculateCylinderProperties = ({ radius, height }) => {
  const baseArea = Math.PI * radius * radius
  const lateralArea = 2 * Math.PI * radius * height
  const surfaceArea = 2 * baseArea + lateralArea
  const volume = baseArea * height

  return {
    baseArea,
    lateralArea,
    surfaceArea,
    volume,
    radius,
    height,
    diameter: radius * 2,
    circumference: 2 * Math.PI * radius
  }
}

const calculateCubeProperties = ({ size }) => {
  const faceArea = size * size
  const surfaceArea = 6 * faceArea
  const volume = size * size * size

  return {
    faceArea,
    surfaceArea,
    volume,
    edgeLength: size,
    facePerimeter: 4 * size,
    spaceDiagonal: size * Math.sqrt(3)
  }
}

const calculatePyramidProperties = ({ baseWidth, baseDepth, height }) => {
  const baseArea = baseWidth * baseDepth
  
  // Calculate slant heights for rectangular base pyramid
  const slantHeight1 = Math.sqrt((baseDepth / 2) ** 2 + height ** 2)
  const slantHeight2 = Math.sqrt((baseWidth / 2) ** 2 + height ** 2)
  
  // Lateral area for rectangular base pyramid
  const lateralArea = (baseWidth * slantHeight1) + (baseDepth * slantHeight2)
  const surfaceArea = baseArea + lateralArea
  const volume = (baseArea * height) / 3

  return {
    baseArea,
    lateralArea,
    surfaceArea,
    volume,
    basePerimeter: 2 * (baseWidth + baseDepth),
    slantHeight1,
    slantHeight2
  }
}

const calculateSphereProperties = ({ radius }) => {
  const surfaceArea = 4 * Math.PI * radius * radius
  const volume = (4 / 3) * Math.PI * radius * radius * radius

  return {
    surfaceArea,
    volume,
    radius,
    diameter: radius * 2,
    circumference: 2 * Math.PI * radius,
    greatCircleArea: Math.PI * radius * radius
  }
}

/**
 * Format number to specified decimal places
 */
export const formatNumber = (num, decimals = 2) => {
  return Number(num.toFixed(decimals))
}

/**
 * Convert between different units
 */
export const convertUnits = (value, fromUnit, toUnit) => {
  const conversions = {
    // Length conversions (to meters)
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144
  }

  if (fromUnit === toUnit) return value
  
  const meters = value * conversions[fromUnit]
  return meters / conversions[toUnit]
}

/**
 * Validate shape parameters
 */
export const validateShapeParams = (type, params) => {
  const errors = []

  switch (type) {
    case 'cylinder':
      if (params.radius <= 0) errors.push('Radius must be positive')
      if (params.height <= 0) errors.push('Height must be positive')
      break
    case 'cube':
      if (params.size <= 0) errors.push('Size must be positive')
      break
    case 'pyramid':
      if (params.baseWidth <= 0) errors.push('Base width must be positive')
      if (params.baseDepth <= 0) errors.push('Base depth must be positive')
      if (params.height <= 0) errors.push('Height must be positive')
      break
    case 'sphere':
      if (params.radius <= 0) errors.push('Radius must be positive')
      break
  }

  return errors
}