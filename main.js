import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class SceneSetup {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(100, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.light = new THREE.AmbientLight(0xffffff, 1);
        this.pointLight = new THREE.PointLight(0xffffff, 1);

        this.init();
    }

    init() {
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.container.appendChild(this.renderer.domElement);
        this.pointLight.position.set(10, 10, 10);
        this.scene.add(this.light);
        this.scene.add(this.pointLight);
        this.scene.background = new THREE.Color(0x1a1b1e);
        this.camera.position.z = 2;
    }

    updateSize() {
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

class ModelLoader {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.model = null;
    }

    loadModel(modelPath, callback) {
        this.loader.load(
            modelPath, 
            (gltf) => {
                this.model = gltf.scene;
                this.scene.add(this.model);
                callback(this.model);
            }, 
            undefined, 
            (error) => {
                console.error(error);
            }
        );
    }

    getModel() {
        return this.model;
    }
}

class Interaction {
    constructor(model) {
        this.model = model;
        this.model.position.set(0, 0, -7);
        this.rotationSpeed = 0.01;
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('wheel', (event) => this.onWheel(event));
    }

    onWheel(event) {
        if (this.model) {
            if (event.deltaY > 0) {
                this.rotationSpeed += 0.01;
                this.model.rotation.y += this.rotationSpeed;
            } else {
                this.rotationSpeed -= 0.01;
                this.model.rotation.y -= this.rotationSpeed;
            }
        }
    }
}

class App {
    constructor(containerId, modelPath) {
        this.container = document.getElementById(containerId);
        this.modelPath = modelPath;
        this.sceneSetup = new SceneSetup(this.container);
        this.modelLoader = new ModelLoader(this.sceneSetup.scene);
        
        this.modelLoader.loadModel(this.modelPath, (model) => {
            this.interaction = new Interaction(model);
            this.model = model;
        });

        this.animate();
        this.setupResizeListener();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.model) {
            this.model.rotation.y += 0.005;
        }
        
        this.sceneSetup.render();
    }

    setupResizeListener() {
        window.addEventListener('resize', () => {
            this.sceneSetup.updateSize();
        });
    }
}

const app = new App('redbullBox', 'planet_earth.glb');
