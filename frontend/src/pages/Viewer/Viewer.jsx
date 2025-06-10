import React, { useState, useEffect, useRef, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Canvas, useFrame} from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows, Html, useProgress } from "@react-three/drei";
import * as THREE from "three";
import "./Viewer.css";

// Enhanced Model component with animations and error handling
const Model = ({ url, wireframe, autoRotate }) => {
  const { scene, animations } = useGLTF(url);
  const mixer = useRef();
  const modelRef = useRef();
  
  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  useEffect(() => {
    if (animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      action.play();
    }
    
    // Apply wireframe to all meshes and enhance materials
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          if (child.material) {
            child.material.wireframe = wireframe;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        }
      });
    }

    return () => {
      if (mixer.current) mixer.current.stopAllAction();
    };
  }, [scene, animations, wireframe]);

  return <primitive ref={modelRef} object={scene} dispose={null} />;
};

// Enhanced Loading component
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="enhanced-loader">
        <div className="spinner"></div>
        <div className="loader-content">
          <p className="loader-title">Loading 3D Model</p>
          <p className="loader-progress">{Math.round(progress)}% complete</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Html>
  );
};



const Viewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef();

  const modelUrl = location.state?.modelUrl;
  const downloadModel = () => {
  if (modelUrl) {
    const link = document.createElement('a');
    link.href = modelUrl;
    link.download = modelUrl.split('/').pop() || 'model.glb';
    link.click();
  }
};
  // Enhanced state management
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [settings, setSettings] = useState({
    autoRotate: false,
    wireframe: false,
    showGrid: true,
    showShadows: true,
    darkMode: true,
    environment: "studio",
    cameraSpeed: 1,
    lightIntensity: 1
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  // const [cameraReset, setCameraReset] = useState(0);
  const [modelInfo, setModelInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    if (!modelUrl) {
      setError("Model URL not provided.");
      setIsLoading(false);
      return;
    }

    // Extract model info from URL
    const fileName = modelUrl.split("/").pop();
    setModelInfo({ fileName, fileSize: "Loading..." });

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [modelUrl]);

  const handleBack = () => {
    navigate(-1);
  };

  // const resetCamera = () => {
  //   setCameraReset(prev => prev + 1);
  // };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      canvasRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const captureScreenshot = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.querySelector('canvas');
      if (canvas) {
        const link = document.createElement('a');
        link.download = `model-screenshot-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    }
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Something went wrong</h2>
          <p className="error-message">{error}</p>
          <div className="error-actions">
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
            <button 
              onClick={handleBack}
              className="btn btn-secondary"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`enhanced-viewer ${settings.darkMode ? 'dark' : 'light'}`}>
      {/* Enhanced Header */}
      <header className="enhanced-header">
        <div className="header-content">
          <div className="header-left">
            <button 
              onClick={handleBack}
              className="btn-icon"
              title="Go Back"
            >
              ←
            </button>
            <div className="header-info">
              <h1 className="header-title">3D Model Viewer</h1>
              <p className="header-subtitle">
                {modelInfo?.fileName || 'Loading...'}
              </p>
            </div>
          </div>
          
          <div className="header-controls">
            <button
              onClick={() => updateSetting('darkMode', !settings.darkMode)}
              className="btn-icon"
              title="Toggle Theme"
            >
              {settings.darkMode ? '☀️' : '🌙'}
            </button>
            
            <button
              onClick={captureScreenshot}
              className="btn-icon"
              title="Screenshot"
            >
              📷
            </button>
            
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="btn-icon"
              title="Model Info"
            >
              ℹ️
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="btn-icon"
              title="Fullscreen"
            >
              {isFullscreen ? '⛶' : '⛶'}
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`btn-icon ${showSettings ? 'active' : ''}`}
              title="Settings"
            >
              ⚙️
            </button>
            <button
  onClick={downloadModel}
  className="btn-icon"
  title="Download Model"
>
  📥
</button>
          </div>
        </div>
      </header>

      <div className="enhanced-content">
        {/* Main Canvas Area */}
        <div className="canvas-container">
          <div ref={canvasRef} className="canvas-wrapper">
            {isLoading ? (
              <div className="initial-loader">
                <div className="spinner large"></div>
                <p>Preparing 3D viewer...</p>
              </div>
            ) : (
              <Canvas
                shadows={settings.showShadows}
                camera={{ position: [5, 5, 5], fov: 50 }}
                gl={{ preserveDrawingBuffer: true, antialias: true }}
              >
                {/* Enhanced Lighting */}
                <ambientLight intensity={0.4 * settings.lightIntensity} />
                <directionalLight
                  castShadow={settings.showShadows}
                  position={[10, 10, 5]}
                  intensity={1 * settings.lightIntensity}
                  shadow-mapSize={[2048, 2048]}
                  shadow-camera-near={0.5}
                  shadow-camera-far={50}
                  shadow-camera-left={-10}
                  shadow-camera-right={10}
                  shadow-camera-top={10}
                  shadow-camera-bottom={-10}
                />
                <pointLight 
                  position={[-10, -10, -5]} 
                  intensity={0.3 * settings.lightIntensity} 
                />

                {/* Environment */}
                <Environment preset={settings.environment} />

                {/* Ground with shadows */}
                {settings.showShadows && (
                  <>
                    <mesh
                      rotation-x={-Math.PI / 2}
                      position={[0, -1.5, 0]}
                      receiveShadow
                    >
                      <planeGeometry args={[100, 100]} />
                      <shadowMaterial transparent opacity={0.3} />
                    </mesh>
                    <ContactShadows 
                      position={[0, -1.4, 0]} 
                      opacity={0.4} 
                      scale={20} 
                      blur={1.5} 
                      far={4.5} 
                    />
                  </>
                )}

                {/* Grid */}
                {settings.showGrid && (
                  <gridHelper args={[20, 20, '#4f46e5', '#6366f1']} />
                )}

                {/* Model */}
                <Suspense fallback={<Loader />}>
                  <Model 
                    url={modelUrl} 
                    wireframe={settings.wireframe}
                    autoRotate={settings.autoRotate}
                  />
                </Suspense>

                {/* Enhanced Controls */}
                <OrbitControls
                  enablePan
                  enableZoom
                  enableRotate
                  autoRotate={settings.autoRotate}
                  autoRotateSpeed={2 * settings.cameraSpeed}
                  target={[0, 0, 0]}
                  maxPolarAngle={Math.PI / 1.5}
                  minDistance={2}
                  maxDistance={20}
                  enableDamping
                  dampingFactor={0.05}
                />
                
                {/* Camera Controller */}
                {/* <CameraController resetTrigger={cameraReset} /> */}
              </Canvas>
            )}
          </div>

          {/* Floating Controls */}
          <div className="floating-controls">
          
            <button
              onClick={() => updateSetting('autoRotate', !settings.autoRotate)}
              className={`control-btn ${settings.autoRotate ? 'active' : ''}`}
              title="Auto Rotate"
            >
              {settings.autoRotate ? '⏸️' : '▶️'}
            </button>
          </div>
        </div>

        {/* Info Panel */}
        {showInfo && (
          <div className="info-panel">
            <div className="panel-header">
              <h3>Model Information</h3>
              <button 
                onClick={() => setShowInfo(false)}
                className="btn-close"
              >
                ✕
              </button>
            </div>
            <div className="panel-content">
              {modelInfo && (
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">File Name:</span>
                    <span className="info-value">{modelInfo.fileName}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status:</span>
                    <span className="info-value status-loaded">✅ Loaded</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Format:</span>
                    <span className="info-value">GLTF/GLB</span>
                  </div>
                </div>
              )}
              
              <div className="controls-info">
                <h4>Controls:</h4>
                <ul>
                  <li><strong>Mouse:</strong> Rotate view</li>
                  <li><strong>Scroll:</strong> Zoom in/out</li>
                  <li><strong>Right-click + drag:</strong> Pan</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="settings-panel">
            <div className="panel-header">
              <h3>Settings</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="btn-close"
              >
                ✕
              </button>
            </div>
            
            <div className="panel-content">
              {/* Model Controls */}
              <div className="settings-group">
                <h4>Model Controls</h4>
                
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.autoRotate}
                      onChange={(e) => updateSetting('autoRotate', e.target.checked)}
                    />
                    <span>Auto Rotate</span>
                  </label>
                </div>

                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.wireframe}
                      onChange={(e) => updateSetting('wireframe', e.target.checked)}
                    />
                    <span>Wireframe Mode</span>
                  </label>
                </div>

                <div className="setting-item">
                  <label>Camera Speed</label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={settings.cameraSpeed}
                    onChange={(e) => updateSetting('cameraSpeed', parseFloat(e.target.value))}
                  />
                  <span className="range-value">{settings.cameraSpeed}x</span>
                </div>
              </div>

              {/* Display Options */}
              <div className="settings-group">
                <h4>Display Options</h4>
                
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showGrid}
                      onChange={(e) => updateSetting('showGrid', e.target.checked)}
                    />
                    <span>Show Grid</span>
                  </label>
                </div>

                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showShadows}
                      onChange={(e) => updateSetting('showShadows', e.target.checked)}
                    />
                    <span>Show Shadows</span>
                  </label>
                </div>

                <div className="setting-item">
                  <label>Light Intensity</label>
                  <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={settings.lightIntensity}
                    onChange={(e) => updateSetting('lightIntensity', parseFloat(e.target.value))}
                  />
                  <span className="range-value">{settings.lightIntensity}x</span>
                </div>
              </div>

            
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewer;