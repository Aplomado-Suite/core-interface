import '@react-three/fiber'

// Manually augment JSX.IntrinsicElements for React 19 compatibility
// @react-three/fiber v8 doesn't properly augment JSX in React 19
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any
      group: any
      scene: any
      ambientLight: any
      pointLight: any
      directionalLight: any
      spotLight: any
      hemisphereLight: any
      sphere: any
      boxGeometry: any
      sphereGeometry: any
      planeGeometry: any
      meshStandardMaterial: any
      meshBasicMaterial: any
      meshPhongMaterial: any
      points: any
      pointsMaterial: any
      bufferGeometry: any
      bufferAttribute: any
      perspectiveCamera: any
      orthographicCamera: any
      [key: string]: any
    }
  }
}

export {}