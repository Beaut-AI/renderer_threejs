// Import necessary Three.js components
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create a scene, camera, and renderer
const scene = new THREE.Scene();

const fov_degrees = 75
const near_clipping_plane = 0.1
const far_clipping_plane = 1000
const camera = new THREE.PerspectiveCamera(fov_degrees, window.innerWidth / window.innerHeight, near_clipping_plane, far_clipping_plane);
camera.position.set( 0, 0, 5 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();

// Set renderer size and append to DOM
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Example: Add a cube to the scene
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

if ( WebGL.isWebGLAvailable() ) {
	// Initiate function or other initializations here
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}
