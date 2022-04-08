import "./style.css";
import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

const pmremGenerator = new THREE.PMREMGenerator(renderer);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xff5d0f);
// scene.environment = pmremGenerator.fromScene(
//   new RoomEnvironment(),
//   0.04
// ).texture;
renderer.render(scene, camera);

const geometry = new THREE.PlaneGeometry( 1, 1 );
const textureColor = new THREE.TextureLoader().load( 'assets/texture/Leather_007_ROUGH.jpg' );
const textureNorm = new THREE.TextureLoader().load( 'assets/texture/Paper_Recycled_001_NORM.jpg' );
const material = new THREE.MeshBasicMaterial( { map:textureColor,color:0xa5500f } );

const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
plane.position.z = -1;
const plane1 = new THREE.Mesh( geometry, material );
scene.add( plane1 );
plane1.position.z = +1;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
