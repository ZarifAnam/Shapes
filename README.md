# 3D Shapes Calculator

An interactive React.js application for drawing, manipulating, and calculating properties of 3D geometric shapes.

## Features

- **Interactive 3D Shapes**: Create and manipulate cylinders, cubes, pyramids, and spheres
- **Real-time Calculations**: Automatic calculation of surface area, volume, and other geometric properties
- **Visual Measurements**: Visual indicators for radius, area highlights, and dimension lines
- **Drag Controls**: Interactive drag-and-drop functionality for shape positioning
- **Parameter Controls**: Precise input controls for shape dimensions

## Supported Shapes

### Cylinder
- Radius and height controls
- Base area and lateral area visualization
- Radius and height measurement lines

### Cube
- Size control for all dimensions
- Face area highlighting
- Edge length measurements

### Pyramid (Square Base)
- Base width, depth, and height controls
- Base area highlighting
- Slant height calculations

### Sphere
- Radius control
- Equator and meridian circles
- Diameter and radius visualization

## Technology Stack

- **React.js** - UI framework with hooks
- **React Three Fiber** - React renderer for Three.js
- **Three.js** - 3D graphics library
- **React Three Drei** - Helper components for R3F
- **Vite** - Fast development build tool

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-3d-shapes
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Usage

1. **Select Shape**: Choose from cylinder, cube, pyramid, or sphere using the control buttons
2. **Adjust Parameters**: Use the input controls to modify shape dimensions
3. **Drag Shapes**: Click and drag shapes in the 3D scene to reposition them
4. **View Calculations**: Click on a shape to see detailed measurements and calculations
5. **Visual Indicators**: Observe the colored lines and highlights showing measurements

## Project Structure

```
src/
├── components/
│   ├── shapes/           # Individual 3D shape components
│   │   ├── CylinderShape.jsx
│   │   ├── CubeShape.jsx
│   │   ├── PyramidShape.jsx
│   └── └── SphereShape.jsx
│   ├── Scene3D.jsx       # Main 3D scene container
│   ├── ShapeControls.jsx # UI controls for shape parameters
│   └── InfoPanel.jsx     # Display panel for calculations
├── utils/
│   └── calculations.js   # Geometric calculation functions
├── App.jsx               # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

## Calculations

The application calculates the following properties:

### Cylinder
- Surface Area: 2πr² + 2πrh
- Volume: πr²h
- Base Area: πr²
- Lateral Area: 2πrh

### Cube
- Surface Area: 6s²
- Volume: s³
- Face Area: s²

### Pyramid
- Surface Area: Base Area + Lateral Area
- Volume: (1/3) × Base Area × Height
- Base Area: width × depth

### Sphere
- Surface Area: 4πr²
- Volume: (4/3)πr³

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Shapes

To add a new shape:

1. Create a new component in `src/components/shapes/`
2. Add calculation logic in `src/utils/calculations.js`
3. Update the shape selector in `ShapeControls.jsx`
4. Add the shape case in `Scene3D.jsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Three.js community for the excellent 3D graphics library
- React Three Fiber team for the React integration
- Vite team for the fast build tool