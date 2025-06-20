import * as THREE from 'three'; 

//Create a singleStripe function 
function singleStripe(){
    //Create white material
    const stripeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
    //Create the actual mesh
    const stripeMesh = new THREE.PlaneGeometry(2, 0.25, 5);
    //Create stripe that combines the mesh and the color
    const stripe = new THREE.Mesh(stripeMesh, stripeMaterial);
    //Rotate it to be flat
    stripe.rotation.x = -Math.PI / 2;
    //Rotate it to match the camera
    stripe.rotation.z = 1.57;

    //Set the y position slighly above the runway (no overlap)
    stripe.position.y = 0.01;
    //Return the stripe
    return stripe;
}

export function createRunway(){
    //Create a result group to hold all meshes
    const result = new THREE.Group();
    //Create the base runway (material and size)
    const runwayMaterial = new THREE.MeshStandardMaterial({color: 0x656e67});
    const runwayMesh = new THREE.PlaneGeometry(125, 5, 125);
    //Initialize it into a real object
    const runway = new THREE.Mesh(runwayMesh, runwayMaterial);
    //Set rotation to match the camera
    runway.rotation.x = -Math.PI / 2;
    runway.rotation.z = 1.57;
    //Add to result group
    result.add(runway)


    //Create a group to hold all the stripes
    const runwayStripes = new THREE.Group();

    //For loop to make 25 stripes
    for(let i = 0; i < 25; i++){
        //Create a local stripe and add it to the runwayStripes group
        const stripe = singleStripe();
        //Change z position each time for spacing
        stripe.position.z = (i * 3) -35; 
        //Add to group
        runwayStripes.add(stripe);
    }
    //Add stripe group to result group
    result.add(runwayStripes);
    //Return result
    return result;
    
}//End method