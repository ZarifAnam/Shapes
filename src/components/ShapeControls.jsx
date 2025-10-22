import React from 'react'

const ShapeControls = ({ activeShape, shapeParams, onShapeChange, onParamsChange }) => {
  const shapes = [
    { 
      id: 'cylinder', 
      name: 'Cylinder',
      icon: '🛢️'
    },
    { 
      id: 'cube', 
      name: 'Cube',
      icon: '📦'
    },
    { 
      id: 'pyramid', 
      name: 'Pyramid',
      icon: '🔺'
    },
    { 
      id: 'sphere', 
      name: 'Sphere',
      icon: '⚽'
    }
  ]
  
  const renderInputs = () => {
    const params = shapeParams[activeShape]
    
    switch (activeShape) {
      case 'cylinder':
        return (
          <>
            <div className="input-group">
              <label>Radius</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={params.radius}
                onChange={(e) => onParamsChange('cylinder', { radius: parseFloat(e.target.value) || 0.1 })}
              />
            </div>
            <div className="input-group">
              <label>Height</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={params.height}
                onChange={(e) => onParamsChange('cylinder', { height: parseFloat(e.target.value) || 0.1 })}
              />
            </div>
          </>
        )
      case 'cube':
        return (
          <div className="input-group">
            <label>Size</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={params.size}
              onChange={(e) => onParamsChange('cube', { size: parseFloat(e.target.value) || 0.1 })}
            />
          </div>
        )
      case 'pyramid':
        return (
          <>
            <div className="input-group">
              <label>Base Width</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={params.baseWidth}
                onChange={(e) => onParamsChange('pyramid', { baseWidth: parseFloat(e.target.value) || 0.1 })}
              />
            </div>
            <div className="input-group">
              <label>Base Depth</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={params.baseDepth}
                onChange={(e) => onParamsChange('pyramid', { baseDepth: parseFloat(e.target.value) || 0.1 })}
              />
            </div>
            <div className="input-group">
              <label>Height</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={params.height}
                onChange={(e) => onParamsChange('pyramid', { height: parseFloat(e.target.value) || 0.1 })}
              />
            </div>
          </>
        )
      case 'sphere':
        return (
          <div className="input-group">
            <label>Radius</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={params.radius}
              onChange={(e) => onParamsChange('sphere', { radius: parseFloat(e.target.value) || 0.1 })}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="controls-vertical">
      <h3 className="controls-title">Select Shape</h3>
      
      <div className="shape-buttons">
        {shapes.map(shape => (
          <button
            key={shape.id}
            className={`shape-button ${activeShape === shape.id ? 'active' : ''}`}
            onClick={() => onShapeChange(shape.id)}
          >
            <span className="shape-icon">{shape.icon}</span>
            <span className="shape-name">{shape.name}</span>
          </button>
        ))}
      </div>

      <div className="parameters-section">
        <h3 className="parameters-title">Parameters</h3>
        {renderInputs()}
      </div>
    </div>
  )
}

export default ShapeControls