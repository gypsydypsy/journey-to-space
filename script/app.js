import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { planets, moon, saturnRing, scene, camera, renderer, sun } from './scene.js'
import { resetScenePosition, moveCameraTo } from './tweens.js';
import { fadeIn, fadeOut } from './utils.js'
import { toggleMusic, musicBtn, SFXElements, playClickSFX, playHoverSFX } from './music.js'
import { load } from './loader.js'
import { attachTransformControls, disableOrbitControls } from './controls.js'
import contrastOn from '../public/icons/contraston.png'
import contrastOff from '../public/icons/contrastoff.png'

// Dom Elements
const startBtn      = document.getElementById('start');
const homeBtn       = document.getElementById('backHome');
const openAboutBtn  = document.getElementById('openAbout');
const closeAboutBtn = document.getElementById('closeAboutButton');
const contrastBtn  = document.getElementById('contrast')
const homeScreen    = document.getElementById('home');
const tourScreen    = document.getElementById('tour');
const aboutScreen   = document.getElementById('about');
const previousBtn   = document.getElementById('previous');
const nextBtn       = document.getElementById('next');
const planetBullets = document.querySelector('.bullets').children;

// Init 
const planetNames = ['neptune', 'uranus', 'saturn', 'jupiter', 'mars', 'earth', 'venus', 'mercury'];
let currentPlanet = 'neptune';
let currentTween;
const TRANSITION_DURATION = 9000;
let aboutDisplayed = false;
let contrast = false;

// Funcs

function startJourney(e){
    disableOrbitControls();
    fadeOut(homeScreen);
    resetScenePosition();
    changePlanet(e);
    setTimeout(() => {
      fadeIn(tourScreen);
    }, TRANSITION_DURATION)
}
  
function changePlanet(e){
  let currentScreen = document.getElementById(currentPlanet)
  let nextPlanet = getNextPlanet(e);
  let nextRender = planets[nextPlanet];
  let nextScreen = document.getElementById(nextPlanet);

  //Prevents overriding tweens
  if (currentTween){
    currentTween.stop()
  }
  
  updateNav(nextPlanet);

  currentTween = moveCameraTo(nextRender, TRANSITION_DURATION)
    .onStart( () => {
      planets[nextPlanet].isOrbiting = false;
      if (currentPlanet != nextPlanet){
        fadeOut(currentScreen)
      }
    })
    .onComplete( () => {
      if (currentPlanet != nextPlanet){
        planets[currentPlanet].isOrbiting = true;
      }
      attachTransformControls(nextRender);
      fadeIn(nextScreen);        
      currentPlanet = nextPlanet;
    })
    .onStop( () => {
      planets[nextPlanet].isOrbiting = true;
    });   
}

function updateNav(nextBullet){
  for (let bullet of planetBullets){
    if(bullet.dataset.value === nextBullet){
      bullet.classList.add('selected');
    }
    else {
      bullet.classList.remove('selected')
    }
  }
}

function getNextPlanet(e){
  let nextPlanet;
  const action = e.currentTarget.dataset.value;

  switch (action) {
    case 'start':
      nextPlanet = currentPlanet;
      break;
    case 'next':
      nextPlanet = planetNames[planetNames.indexOf(currentPlanet) + 1]
      if (nextPlanet === undefined) {
        nextPlanet = planetNames[0];
      } 
      break;
    case 'previous':
      nextPlanet = planetNames[planetNames.indexOf(currentPlanet) - 1]
      if (nextPlanet === undefined) {
        nextPlanet = planetNames[planetNames.length - 1];
      }
      break;
    // Clicking the bullets
    default:
      nextPlanet = action;
      break;
  }

  return nextPlanet
}

function toggleAboutScreen() {
  if (aboutDisplayed){
    fadeOut(aboutScreen);
    setTimeout(() => fadeIn(tourScreen), 2000);
    aboutDisplayed = false;
  }
  else {
    fadeOut(tourScreen);
    setTimeout(() => fadeIn(aboutScreen), 2000);
    aboutDisplayed = true;
  }
}

function toggleContrast () {
  const constrastIcon = document.querySelector('#contrast img');
  const contrastText = document.querySelector('#contrast span')
  const articles = document.querySelector('.planets').children;

  if(contrast){
    constrastIcon.src = contrastOff;
    contrastText.textContent = 'Contrast off';

    for (let article of articles){
      article.classList.remove('contrast');
    }

    contrast = false;
  }
  else {
    constrastIcon.src = contrastOn;
    contrastText.textContent = 'Contrast on';

    for (let article of articles){
      article.classList.add('contrast')
    }

    contrast = true;
  }
}

/********** User events **********/

startBtn.addEventListener('click', (e) => {
  startJourney(e);
  toggleMusic();
});

previousBtn.addEventListener('click', changePlanet);
nextBtn.addEventListener('click', changePlanet);
homeBtn.addEventListener('click', () => location.reload());

for (let bullet of planetBullets){
  bullet.addEventListener('click', changePlanet);
}

musicBtn.addEventListener('click', toggleMusic);

for (let element of SFXElements){
  element.addEventListener('click', playClickSFX),
  element.addEventListener('mouseenter', playHoverSFX);
}

openAboutBtn.addEventListener('click', toggleAboutScreen);
closeAboutBtn.addEventListener('click', toggleAboutScreen);

contrastBtn.addEventListener('click', toggleContrast);

/********** Loading **********/

load();

/********** Rendering **********/

function animate (currentTime) {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update(currentTime)

  for (let planet in planets){
    planets[planet].rotate();
    planets[planet].orbit(); 
    }

  sun.rotate();
  moon.orbit(currentTime);
  saturnRing.orbit();  
}

animate();

/**********  Resizing **********/

window.addEventListener('resize', onWindowResize);

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight );
}
