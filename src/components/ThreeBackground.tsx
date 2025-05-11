
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/ThemeProvider";

interface ThreeBackgroundProps {
  isDarkMode: boolean;
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ isDarkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Set background color based on theme
    scene.background = new THREE.Color(isDarkMode ? "#0f0f0f" : "#f9f9ff");
    
    // Camera setup with enhanced perspective
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    camera.position.y = 2;
    
    // Advanced renderer setup with higher quality
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      precision: 'highp',
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit for performance
    
    // Clear any existing canvases
    if (containerRef.current.querySelector("canvas")) {
      containerRef.current.querySelector("canvas")?.remove();
    }
    
    containerRef.current.appendChild(renderer.domElement);
    
    // Create more particles for a richer effect based on screen size
    const particleCount = window.innerWidth < 768 ? 150 : 300;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    
    // Enhanced colors based on theme
    const primaryColor = new THREE.Color(isDarkMode ? "#4f46e5" : "#4f46e5");
    const secondaryColor = new THREE.Color(isDarkMode ? "#a5b4fc" : "#818cf8");
    const accentColor = new THREE.Color(isDarkMode ? "#ffffff" : "#000000");
    
    // Populate particles with more sophisticated distribution
    for (let i = 0; i < particleCount; i++) {
      // Create a more interesting spatial distribution
      const radius = Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      // Spherical distribution with variation
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta); // x
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6; // y (flattened)
      positions[i * 3 + 2] = radius * Math.cos(phi) * 0.8; // z (flattened)
      
      // Varied size distribution for more visual interest
      sizes[i] = Math.random() * 1.5 + 0.2;
      
      // Speed variation for animation
      speeds[i] = Math.random() * 0.1 + 0.05;
      
      // More sophisticated color distribution
      const colorChoice = Math.random();
      if (colorChoice > 0.85) {
        // Accent particles (fewer)
        colors[i * 3] = accentColor.r;
        colors[i * 3 + 1] = accentColor.g;
        colors[i * 3 + 2] = accentColor.b;
      } else if (colorChoice > 0.4) {
        // Primary particles (many)
        colors[i * 3] = primaryColor.r;
        colors[i * 3 + 1] = primaryColor.g;
        colors[i * 3 + 2] = primaryColor.b;
      } else {
        // Secondary particles (some)
        colors[i * 3] = secondaryColor.r;
        colors[i * 3 + 1] = secondaryColor.g;
        colors[i * 3 + 2] = secondaryColor.b;
      }
    }
    
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particles.setAttribute("speed", new THREE.BufferAttribute(speeds, 1));
    
    // Using enhanced vertex and fragment shaders for more sophisticated particle effects
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePosition: { value: new THREE.Vector2(0, 0) },
        pointTexture: { 
          value: new THREE.TextureLoader().load(
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAAsTAAALEwEAmpwYAAABnUlEQVR4nO3bMQEAIAgEQUGtf2ZqAB8RduZuswQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC5ug7g6a5buOVPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHzY3ibHOsu5/vQAAAABJRU5ErkJggg=='
          )
        }
      },
      vertexShader: `
        uniform float time;
        attribute float size;
        attribute vec3 color;
        attribute float speed;
        varying vec3 vColor;
        uniform vec2 mousePosition;

        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Complex animation patterns
          float waveX = sin(time * speed + pos.x * 0.1) * 0.8;
          float waveY = cos(time * speed + pos.z * 0.1) * 0.8;
          float waveZ = sin(time * speed * 0.5 + pos.y * 0.1) * 0.8;
          
          // Apply wave motion
          pos.x += waveX;
          pos.y += waveY;
          pos.z += waveZ;
          
          // Mouse interaction effect (subtle movement)
          vec2 mouseEffect = mousePosition * 0.01;
          pos.x += mouseEffect.x * (40.0 - abs(pos.z)) * 0.05;
          pos.y -= mouseEffect.y * (40.0 - abs(pos.z)) * 0.05;
          
          // Calculate size based on distance and breathing effect
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float breathing = (sin(time * 0.5) * 0.5 + 1.0) * 0.3 + 0.7;
          float distanceFactor = min(50.0 / -mvPosition.z, 3.0); // Limit the size growth
          gl_PointSize = size * breathing * distanceFactor;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        
        void main() {
          // Improved soft particle effect
          vec4 texColor = texture2D(pointTexture, gl_PointCoord);
          
          // Enhanced glow effect
          float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
          float glow = 0.3 * (1.0 - distanceFromCenter);
          
          vec3 finalColor = vColor + glow;
          gl_FragColor = vec4(finalColor, texColor.a);
          
          // Discard nearly transparent pixels
          if (gl_FragColor.a < 0.1) discard;
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Add a subtle fog effect
    scene.fog = new THREE.FogExp2(isDarkMode ? '#090909' : '#f0f0ff', 0.015);
    
    // Create central attractor
    const geometry = new THREE.SphereGeometry(1, 16, 16);
    const material = new THREE.MeshBasicMaterial({ 
      color: isDarkMode ? 0x4f46e5 : 0x4f46e5,
      transparent: true,
      opacity: 0.1
    });
    const centralSphere = new THREE.Mesh(geometry, material);
    scene.add(centralSphere);
    
    // Add subtle light sources
    const light1 = new THREE.PointLight(0x4f46e5, 1, 100);
    light1.position.set(15, 15, 15);
    scene.add(light1);
    
    const light2 = new THREE.PointLight(0xa5b4fc, 1, 100);
    light2.position.set(-15, -15, 15);
    scene.add(light2);
    
    // Mouse interaction tracking
    const mousePosition = new THREE.Vector2(0, 0);
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
      particleMaterial.uniforms.mousePosition.value = mousePosition;
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    // Advanced animation with mouse interaction
    const animate = (time: number) => {
      const t = time * 0.001; // Convert to seconds
      
      // Update shader time uniform
      particleMaterial.uniforms.time.value = t;
      
      // Complex rotation patterns
      particleSystem.rotation.x = Math.sin(t * 0.05) * 0.3;
      particleSystem.rotation.y = Math.cos(t * 0.1) * 0.2;
      
      // Pulse effect for central attractor
      const pulseScale = 0.9 + Math.sin(t * 0.5) * 0.1;
      centralSphere.scale.set(pulseScale, pulseScale, pulseScale);
      centralSphere.rotation.y = t * 0.2;
      centralSphere.rotation.z = t * 0.1;
      
      // Light animation
      light1.position.x = Math.sin(t * 0.1) * 15;
      light1.position.y = Math.cos(t * 0.15) * 15;
      light2.position.x = Math.sin(t * 0.12 + Math.PI) * 15;
      light2.position.y = Math.cos(t * 0.11 + Math.PI) * 15;
      
      // Advanced camera movement for increased parallax
      camera.position.x = Math.sin(t * 0.05) * 1.5;
      camera.position.y = Math.sin(t * 0.04) * 0.8;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate(0);
    
    // Enhanced resize handler for better mobile performance
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      // Adjust pixel ratio based on device for performance
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      
      // Cleanup Three.js resources
      particles.dispose();
      particleMaterial.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isDarkMode, theme]); // Re-create when theme changes

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 opacity-60" 
      style={{ pointerEvents: "none" }}
    />
  );
};

export default ThreeBackground;
