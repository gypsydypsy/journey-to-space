import * as THREE from 'three';
import { planets } from './scene.js'

function getTexture(planetName, type = 'map'){
    const path = new URL(`/public/textures/${planetName}${type}.jpg`, import.meta.url).href
    return new THREE.TextureLoader().load(path);
}
  
function createStar(array) {
const star = new THREE.Mesh(
new THREE.SphereGeometry(0.5, 10, 10),
new THREE.MeshStandardMaterial({
    color: 0xFFFFFF
})
)

const [x, y, z] = Array(3).fill().map((el) => THREE.MathUtils.randFloatSpread(5000));

star.position.set(x, y, z);

array.push(star)
}
  
function createAsteroid(array){
const size = THREE.MathUtils.randFloat(0.2, 1.5);
const asteroid = new THREE.Mesh(
    new THREE.DodecahedronGeometry(size, 0),
    new THREE.MeshStandardMaterial({
    map: getTexture('asteroid')
    })
    )

const beltWidth = 50;
const angle = THREE.MathUtils.randFloat(0, 360);
const distance = THREE.MathUtils.randFloat(planets.jupiter.distance - planets.mars.distance - (beltWidth * 0.5), planets.jupiter.distance - planets.mars.distance + (beltWidth * 0.5));

const x = distance * Math.cos(angle)
const y = THREE.MathUtils.randFloat(-5, 5); 
const z = distance * Math.sin(angle)

asteroid.position.set(x, y, z);
array.push(asteroid);
}

function fadeIn(element) {
    element.classList.remove('fade-out');
    element.classList.add('visible');
    element.classList.add('fade-in');
}

function fadeOut(element) {
    const fadeDuration = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fadeOutDuration')));

    element.classList.remove('fade-in');
    element.classList.add('fade-out');
    setTimeout(()=>{
        element.classList.remove('visible');
    }, fadeDuration)
}

export { getTexture, createStar, createAsteroid, fadeIn, fadeOut }