import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Grid } from '@react-three/drei'
import ShapeControls from './components/ShapeControls'
import Scene3D from './components/Scene3D'
import InfoPanel from './components/InfoPanel'
import './App.css'

function App() {
  const [activeShape, setActiveShape] = useState('cylinder')
  const [shapeParams, setShapeParams] = useState({
    cylinder: { radius: 1, height: 2 },
    cube: { size: 2 },
    pyramid: { baseWidth: 2, baseDepth: 2, height: 2 },
    sphere: { radius: 1.5 }
  })
  const [selectedShapeData, setSelectedShapeData] = useState(null)

  const handleShapeChange = (shape) => {
    setActiveShape(shape)
    setSelectedShapeData(null)
  }

  const handleParamsChange = (shape, params) => {
    setShapeParams(prev => ({
      ...prev,
      [shape]: { ...prev[shape], ...params }
    }))
  }

  return (
    <div className="app">
      <h1>3D Shapes Calculator</h1>
      
      <ShapeControls
        activeShape={activeShape}
        shapeParams={shapeParams}
        onShapeChange={handleShapeChange}
        onParamsChange={handleParamsChange}
      />
      
      <div className="canvas-container">
        <Canvas
          camera={{ position: [5, 5, 5], fov: 60 }}
          style={{ background: 'linear-gradient(to bottom, #1e3a8a, #0f172a)' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <directionalLight position={[0, 10, 5]} intensity={0.5} />
            
            <OrbitControls 
              enablePan={true} 
              enableZoom={true} 
              enableRotate={true}
              minDistance={3}
              maxDistance={20}
            />
            
            <Grid
              position={[0, -2, 0]}
              args={[10, 10]}
              cellSize={1}
              cellThickness={0.5}
              cellColor="#6f6f6f"
              sectionSize={5}
              sectionThickness={1}
              sectionColor="#9d4edd"
              fadeDistance={25}
              fadeStrength={1}
            />
            
            <Scene3D
              activeShape={activeShape}
              shapeParams={shapeParams}
              onShapeSelect={setSelectedShapeData}
            />
            
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
        
        {selectedShapeData && (
          <InfoPanel shapeData={selectedShapeData} />
        )}
      </div>
    </div>
  )
}

export default App