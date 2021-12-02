const musicBtn = document.getElementById('music')
const musicIcon = document.querySelector('#music img')
const musicText = document.querySelector('#music span')
import soundOn from '../public/icons/soundon.png'
import soundOff from '../public/icons/soundoff.png'

const SFXElements = [
    document.getElementById('start'),
    document.getElementById('previous'),
    document.getElementById('next'),
    document.querySelector('.mercury'),
    document.querySelector('.venus'),
    document.querySelector('.earth'),
    document.querySelector('.mars'),
    document.querySelector('.jupiter'),
    document.querySelector('.saturn'),
    document.querySelector('.uranus'),
    document.querySelector('.neptune')
]

const musicPath = new URL('../public/sound/music.mp3', import.meta.url).href
const music = new Audio(musicPath)
const hoverPath = new URL('../public/sound/hover.wav', import.meta.url).href
const hoverSFX = new Audio(hoverPath);
const clickPath = new URL('../public/sound/click.wav', import.meta.url).href
const clickSFX = new Audio(clickPath);

music.volume = 0.2;
music.loop = true;
hoverSFX.volume = 0.2;
clickSFX.volume = 0.4;

let isPlaying = false;

function toggleMusic() {
    if (isPlaying){
        music.pause();
        music.currentTime = 0;
        musicIcon.src =  soundOff
        musicText.textContent = 'Music off'
        isPlaying = false;
    }
    else {
        music.play();
        musicIcon.src = soundOn
        musicText.textContent = 'Music on '
        isPlaying = true;
    }
}

function playHoverSFX() {
    hoverSFX.play();
}

function playClickSFX(){
    clickSFX.play();
}

export { musicBtn, SFXElements, toggleMusic, playHoverSFX, playClickSFX }