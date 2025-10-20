import React from 'react'

const ShapeControls = ({ activeShape, shapeParams, onShapeChange, onParamsChange }) => {
  const shapes = ['cylinder', 'cube', 'pyramid', 'sphere']
  
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
    <div className="controls">
      {shapes.map(shape => (
        <div key={shape} className="shape-controls">
          <h3>{shape.charAt(0).toUpperCase() + shape.slice(1)}</h3>
          <button
            className={activeShape === shape ? 'active' : ''}
            onClick={() => onShapeChange(shape)}
          >
            Select
          </button>
          {activeShape === shape && renderInputs()}
        </div>
      ))}
    </div>
  )
}

export default ShapeControls