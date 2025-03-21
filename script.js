import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidthm, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0x404040);
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

camera.position.z = 5;

const loader = new GLTFLoader();

loader.load(
    'planet_earth.glb',
    (gltf) => {
      scene.add(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% učitano');
    },
    (error) => {
      console.error('Greška pri učitavanju modela:', error);
    }
  );
  

function animate() {
requestAnimationFrame(animate);

renderer.render(scene, camera);
}

animate();
