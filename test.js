import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
//Set up the renderer, scene, and camera
const canvas = document.getElementById('border3d');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

//Create a Scene
const scene = new THREE.Scene();

//Create a Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//Add a light source
const sun = new THREE.AmbientLight(0xffffff, 0x444444, 0.5);
scene.add(sun);

//Load background
const backgroundGeometry = new THREE.PlaneGeometry(1000, 1000);
const backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0x87CEEB }); // Light blue color
const backgroundPlane = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
backgroundPlane.position.z = -10; // Far behind everything else
scene.add(backgroundPlane);


const loader = new GLTFLoader();
loader.load('/static/gltf/fixedStation.glb', (gltf) =>{
    const spaceStation = gltf.scene;
    spaceStation.position.x = 25;

    scene.add(spaceStation);
})


//Animation loop (constantly run)
function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);