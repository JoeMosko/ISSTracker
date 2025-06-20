import * as THREE from 'three'; 
import { GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';


export async function createForest(n){


    const gltf = await new GLTFLoader().loadAsync(
        'static/models/trees/fixedTrees.glb'
      );

      
    const forest = new THREE.Group();


    const treeModel = gltf.scene;

    for(let i = 1; i <= n; i++){
        const tree = treeModel.clone(true);
        tree.position.set(
            THREE.MathUtils.randFloatSpread(60),
            0,
            THREE.MathUtils.randFloatSpread(60),
        );

        forest.add(tree);
    }
    return forest;
}