import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const fov_degrees = 75;
const near_clipping_plane = 0.1;
const far_clipping_plane = 1000;
const camera = new THREE.PerspectiveCamera(fov_degrees, window.innerWidth / window.innerHeight, near_clipping_plane, far_clipping_plane);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

const loader = new GLTFLoader();
loader.load('./public/untitled.glb', function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0);
    model.scale.set(10, 10, 10);
});

function animate() {
    requestAnimationFrame(animate);

    // Rotate the model inside the animate function
    scene.traverse(function (object) {
        if (object.isMesh) {
            object.rotation.x += 0.03; // Rotate around x-axis
            object.rotation.y += 0.01; // Rotate around y-axis
            // Add more rotation as needed
        }
    });

    renderer.render(scene, camera);
}

if ( WebGL.isWebGLAvailable() ) {
       // Initiate function or other initializations here
       animate();
} else {
       const warning = WebGL.getWebGLErrorMessage();
       document.getElementById( 'container' ).appendChild( warning );
}