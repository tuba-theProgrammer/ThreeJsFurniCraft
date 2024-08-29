
# ThreeJsFurniCraft

## Overview
ThreeJsFurniCraft is a 3D interactive website built using React, Three.js, and @react-three/fiber. The project showcases a series of 3D models (e.g., armchairs) that animate and respond to the user's scroll actions. The background color changes dynamically based on the scroll position, providing an immersive browsing experience.

## Features
- **3D Model Integration**: Display and animate 3D models using Three.js and @react-three/fiber.
- **Smooth Scrolling**: Synchronize scroll position with 3D model animations and background color transitions.
- **Dynamic Backgrounds**: Change the background color based on the scroll position for a visually engaging effect.
- **Lazy Loading**: Use of `Suspense` to handle lazy loading of 3D models.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tuba-theProgrammer/ThreeJsFurniCraft.git
   cd ThreeJsFurniCraft
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm start
   ```

   The project will be available at `http://localhost:3000`.

## Usage
- Open the project in your browser.
- Scroll through the page to see the 3D models rotate and the background color change.

## Project Structure
- **`src/`**: Contains the main source code for the project.
  - **`components/`**: Reusable components such as `Header`, `Section`, and others.
  - **`assets/`**: Stores the 3D model files (`.gltf`) used in the project.
  - **`App.js`**: The main entry point of the application.
  - **`App.scss`**: Contains the styling for the project.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **Three.js**: 3D graphics library used to create and display animated 3D computer graphics.
- **@react-three/fiber**: React renderer for Three.js.
- **@react-three/drei**: Useful helpers for working with `@react-three/fiber`.

## Contributing
Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a pull request.

