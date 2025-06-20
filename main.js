import * as THREE from 'three';
//To run the project, type 'npx vite'
//Orbit controls allow the user to move the camera slightly
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
//To allow for GLTF files (blender models, ect) to be used in scene
import { GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

//import my functions I created 
import { createRunway } from './runway';
import { createForest } from './forest';

//Create 3 most important parts of the website
//Scene, Camera, and renderor

const scene = new THREE.Scene();
{
  //Create fog for the scene
  const near = 10;
  const far = 100; 
  const color = 0xffffff;
  //Add to scene
  scene.fog = new THREE.Fog(color, near, far); 
}

//camera components
                                    //(fov,         aspect ratio,               near/far clipping plane)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//Add global light
const sun = new THREE.HemisphereLight();
scene.add(sun);
//Call createRunway method 
const runway = createRunway();
scene.add(runway);


//Create grass ground (ADD MAPPING LATER)
const grassGeo = new THREE.PlaneGeometry(175, 175, 175);
const grassColor = new THREE.MeshBasicMaterial({color: 0x62972c});
const grass = new THREE.Mesh(grassGeo, grassColor);

grass.rotation.x = -Math.PI / 2;
grass.position.y = -0.02;
grass.position.z = -40;
scene.add(grass);



//Create a loader that will load a mesh into the scene
const loader = new GLTFLoader(); 

loader.load('static/models/plane/scene.gltf', function(gltf) {
  const planeModel = gltf.scene;
  //Adjust rotation and position of the plane on the y axis to patch runway
  planeModel.position.y = 1.40;
  planeModel.rotation.y = 9.42;

  planeModel.position.z = 35;

  scene.add(planeModel);
})

//move starting position for camera
camera.position.z = 40;
camera.position.y = 8;
camera.rotation.z = 10;





const treeLoader = new GLTFLoader();

    treeLoader.load('static/models/trees/fixedTrees.glb', function(gltf){
        const treeModel = gltf.scene;

        treeModel.scale.set(.005, .005, .005); 
      
        scene.add(treeModel);
    })




//Set background
const backgroundTexture = new THREE.TextureLoader().load('static/images/light-blue-polygon-abstract-backdrop-vector.jpg');
scene.background = backgroundTexture;



//Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(5, 0, 5);



//Ambient light
const light = new THREE.PointLight( 0xffffff ); // soft white light
light.position.z = 1.0;

scene.add(light);

//Light helper
const lightHelper1 = new THREE.PointLightHelper(light);
scene.add(lightHelper1);


function animate() {
    updatePlaneScroll();
    renderer.render( scene, camera );
    controls.update();

  }
  renderer.setAnimationLoop( animate );