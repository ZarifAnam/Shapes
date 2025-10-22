import React from 'react'
import { calculateShapeProperties } from '../utils/calculations'

const InfoPanel = ({ shapeData, onPropertyClick, highlightedProperty }) => {
  const { type, params } = shapeData
  const properties = calculateShapeProperties(type, params)

  return (
    <div className="info-panel">
      <h4>{type.charAt(0).toUpperCase() + type.slice(1)} Properties</h4>
      
      <div 
        className={`info-item ${highlightedProperty === 'surfaceArea' ? 'highlighted' : ''}`}
        onClick={() => onPropertyClick('surfaceArea')}
        style={{ cursor: 'pointer' }}
      >
        <span>Surface Area:</span>
        <span>{properties.surfaceArea.toFixed(2)} units²</span>
      </div>
      
      <div 
        className={`info-item ${highlightedProperty === 'volume' ? 'highlighted' : ''}`}
        onClick={() => onPropertyClick('volume')}
        style={{ cursor: 'pointer' }}
      >
        <span>Volume:</span>
        <span>{properties.volume.toFixed(2)} units³</span>
      </div>
      
      {type === 'cylinder' && (
        <>
          <div 
            className={`info-item ${highlightedProperty === 'baseArea' ? 'highlighted' : ''}`}
            onClick={() => onPropertyClick('baseArea')}
            style={{ cursor: 'pointer' }}
          >
            <span>Base Area:</span>
            <span>{properties.baseArea.toFixed(2)} units²</span>
          </div>
          <div 
            className={`info-item ${highlightedProperty === 'lateralArea' ? 'highlighted' : ''}`}
            onClick={() => onPropertyClick('lateralArea')}
            style={{ cursor: 'pointer' }}
          >
            <span>Lateral Area:</span>
            <span>{properties.lateralArea.toFixed(2)} units²</span>
          </div>
          <div 
            className={`info-item ${highlightedProperty === 'radius' ? 'highlighted' : ''}`}
            onClick={() => onPropertyClick('radius')}
            style={{ cursor: 'pointer' }}
          >
            <span>Radius:</span>
            <span>{params.radius.toFixed(2)} units</span>
          </div>
          <div 
            className={`info-item ${highlightedProperty === 'height' ? 'highlighted' : ''}`}
            onClick={() => onPropertyClick('height')}
            style={{ cursor: 'pointer' }}
          >
            <span>Height:</span>
            <span>{params.height.toFixed(2)} units</span>
          </div>
        </>
      )}
      
      {type === 'cube' && (
        <>
          <div 
            className={`info-item ${highlightedProperty === 'faceArea' ? 'highlighted' : ''}`}
            onClick={() => onPropertyClick('faceArea')}
            style={{ cursor: 'pointer' }}
          >
            <span>Face Area:</span>
            <span>{properties.faceArea.toFixed(2)} units²</span>
          </div>
          <div 
            className={`info-item ${highlightedProperty === 'edgeLength' ? 'highlighted' : ''}`}
            onClick={() => onPropertyClick('edgeLength')}
            style={{ cursor: 'pointer' }}
          >
            <span>Edge Length:</span>
            <span>{params.size.toFixed(2)} units</span>
          </div>
        </>
      )}
      
      {type === 'pyramid' && (
        <>
          <div 
            className={`info-item ${highlightedProperty === 'baseArea' ? 'highlighted' : ''}`}
            onClick={() => onPropertyClick('baseArea')}
            style={{ cursor: 'pointer' }}
          >
            <span>Base Area:</span>
            <span>{properties.baseArea.toFixed(2)} units²</span>
          </div>
          <div 
            className={`info-item ${highlightedProperty === 'lateralArea' ? 'highlighted' : ''}`}
            onClick={() => onPropertyClick('lateralArea')}
            style={{ cursor: 'pointer' }}
          >
            <span>Lateral Area:</span>
            <span>{properties.lateralArea.toFixed(2)} units²</span>
          </div>
          <div 
            className={`info-item ${highlightedProperty === 'baseWidth' ? 'highlighted' : ''}`}
            onClick={() => onPropertyClick('baseWidth')}
            style={{ cursor: 'pointer' }}
          >
            <span>Base Width:</span>
            <span>{params.baseWidth.toFixed(2)} units</span>
          </div>
          <div 
            className={`info-item ${highlightedProperty === 'baseDepth' ? 'highlighted' : ''}`}
            onClick={() => onPropertyClick('baseDepth')}
            style={{ cursor: 'pointer' }}
          >
            <span>Base Depth:</span>
            <span>{params.baseDepth.toFixed(2)} units</span>
          </div>
          <div 
            className={`info-item ${highlightedProperty === 'height' ? 'highlighted' : ''}`}
            onClick={() => onPropertyClick('height')}
            style={{ cursor: 'pointer' }}
          >
            <span>Height:</span>
            <span>{params.height.toFixed(2)} units</span>
          </div>
        </>
      )}
      
      {type === 'sphere' && (
        <>
          <div 
            className={`info-item ${highlightedProperty === 'radius' ? 'highlighted' : ''}`}
            onClick={() => onPropertyClick('radius')}
            style={{ cursor: 'pointer' }}
          >
            <span>Radius:</span>
            <span>{params.radius.toFixed(2)} units</span>
          </div>
          <div 
            className={`info-item ${highlightedProperty === 'diameter' ? 'highlighted' : ''}`}
            onClick={() => onPropertyClick('diameter')}
            style={{ cursor: 'pointer' }}
          >
            <span>Diameter:</span>
            <span>{(params.radius * 2).toFixed(2)} units</span>
          </div>
        </>
      )}
    </div>
  )
}

export default InfoPanel