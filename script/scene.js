import * as THREE from 'three';
import { Planet } from './Planet.js';
import { Ring } from './Ring.js';
import { Moon } from './Moon.js';
import { getTexture, createStar, createAsteroid } from './utils.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

/********** Scene **********/

const scene = new THREE.Scene();
scene.position.set(-60, 10, -70)
scene.rotation.set(0.1, 0, 0.2)
scene.background = getTexture('universe');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10000);
camera.position.set(0,0,5000)

const renderer = new THREE.WebGLRenderer(
  {
    canvas: document.getElementById('canvas'),
  }
)
renderer.setPixelRatio(window.devicePixelRatio),
renderer.setSize(window.innerWidth, window.innerHeight)

/********** Controls **********/

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableZoom = false;
orbitControls.enableRotate = false,
orbitControls.enablePan = false;

const transformControls = new TransformControls(camera, renderer.domElement)
transformControls.mode = 'rotate'
transformControls.size = 50;
transformControls.showX = false;
transformControls.showZ = false;
scene.add(transformControls)

/********** Light **********/

const sunPointLight = new THREE.PointLight(0xFEF79D, 1, 3000, 1);
sunPointLight.position.set(0,0,0);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(sunPointLight, ambientLight);

/********** Planets **********/

const sun = new Planet(30, getTexture('sun'), null, 0,0.0005, 0)
scene.add(sun.planet);

 const planets = {
  mercury: new Planet(0.38, getTexture('mercury'), getTexture('mercury', 'bump'), 55, 0.005, 0.0047), 
  venus:  new Planet(0.95, getTexture('venus'), getTexture('venus', 'bump'), 84, 0.002, 0.0035), 
  earth: new Planet(1, getTexture('earth'), getTexture('earth', 'bump'), 110, 0.002, 0.003), 
  mars: new Planet(0.6, getTexture('mars'), getTexture('mars', 'bump'), 156, 0.003, 0.0024), 
  jupiter: new Planet(11.19, getTexture('jupiter'), null, 486, 0.002, 0.0013), 
  saturn: new Planet(9.4, getTexture('saturn'), null, 876, 0.003, 0.002), 
  uranus: new Planet(4.04, getTexture('uranus'), null, 1742, 0.003, 0.0007), 
  neptune: new Planet(3.88, getTexture('neptune'), null, 2718, 0.002, 0.0005)
}; 

for (let element in planets){
  scene.add(planets[element].planet)
}

/********** Other stellar objects **********/

// Rings
const saturnRing = new Ring(planets.saturn, 12, 5, 20, getTexture('saturnring'), getTexture('saturnring', 'alpha'));
scene.add(saturnRing.ring)

// Moons
const moon = new Moon(planets.earth, 3, 0.15, 0.008, getTexture('moon'), getTexture('moon', 'bump'))
scene.add(moon.moon);

// Stars
const stars = [];

for (let starCount = 0; starCount < 2000; starCount ++)
{
  createStar(stars);
}

for (let star of stars){
  scene.add(star);
}

// Asteroids
const asteroids = [];

for (let asteroidCount = 0; asteroidCount < 500; asteroidCount ++){
  createAsteroid(asteroids)
}

for (let asteroid of asteroids){
  scene.add(asteroid);
}

export { sun, planets, moon, saturnRing, scene, camera, renderer, orbitControls, transformControls }






