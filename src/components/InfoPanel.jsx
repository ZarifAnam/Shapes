import React from 'react'
import { calculateShapeProperties } from '../utils/calculations'

const InfoPanel = ({ shapeData }) => {
  const { type, params } = shapeData
  const properties = calculateShapeProperties(type, params)

  return (
    <div className="info-panel">
      <h4>{type.charAt(0).toUpperCase() + type.slice(1)} Properties</h4>
      
      <div className="info-item">
        <span>Surface Area:</span>
        <span>{properties.surfaceArea.toFixed(2)} units²</span>
      </div>
      
      <div className="info-item">
        <span>Volume:</span>
        <span>{properties.volume.toFixed(2)} units³</span>
      </div>
      
      {type === 'cylinder' && (
        <>
          <div className="info-item">
            <span>Base Area:</span>
            <span>{properties.baseArea.toFixed(2)} units²</span>
          </div>
          <div className="info-item">
            <span>Lateral Area:</span>
            <span>{properties.lateralArea.toFixed(2)} units²</span>
          </div>
          <div className="info-item">
            <span>Radius:</span>
            <span>{params.radius.toFixed(2)} units</span>
          </div>
          <div className="info-item">
            <span>Height:</span>
            <span>{params.height.toFixed(2)} units</span>
          </div>
        </>
      )}
      
      {type === 'cube' && (
        <>
          <div className="info-item">
            <span>Face Area:</span>
            <span>{properties.faceArea.toFixed(2)} units²</span>
          </div>
          <div className="info-item">
            <span>Edge Length:</span>
            <span>{params.size.toFixed(2)} units</span>
          </div>
        </>
      )}
      
      {type === 'pyramid' && (
        <>
          <div className="info-item">
            <span>Base Area:</span>
            <span>{properties.baseArea.toFixed(2)} units²</span>
          </div>
          <div className="info-item">
            <span>Lateral Area:</span>
            <span>{properties.lateralArea.toFixed(2)} units²</span>
          </div>
          <div className="info-item">
            <span>Base Width:</span>
            <span>{params.baseWidth.toFixed(2)} units</span>
          </div>
          <div className="info-item">
            <span>Base Depth:</span>
            <span>{params.baseDepth.toFixed(2)} units</span>
          </div>
          <div className="info-item">
            <span>Height:</span>
            <span>{params.height.toFixed(2)} units</span>
          </div>
        </>
      )}
      
      {type === 'sphere' && (
        <>
          <div className="info-item">
            <span>Radius:</span>
            <span>{params.radius.toFixed(2)} units</span>
          </div>
          <div className="info-item">
            <span>Diameter:</span>
            <span>{(params.radius * 2).toFixed(2)} units</span>
          </div>
        </>
      )}
    </div>
  )
}

export default InfoPanel