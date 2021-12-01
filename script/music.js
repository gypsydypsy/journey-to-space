const musicBtn = document.getElementById('music')
const musicIcon = document.querySelector('#music img')
const musicText = document.querySelector('#music span')

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

const music = new Audio('../src/sound/music.mp3')
const hoverSFX = new Audio('../src/sound/hover.wav');
const clickSFX = new Audio('../src/sound/click.wav');

music.volume = 0.2;
music.loop = true;
hoverSFX.volume = 0.2;
clickSFX.volume = 0.4;

let isPlaying = false;

function toggleMusic() {
    if (isPlaying){
        music.pause();
        music.currentTime = 0;
        musicIcon.src = 'src/icons/soundoff.png';
        musicText.textContent = 'Music off'
        isPlaying = false;
    }
    else {
        music.play();
        musicIcon.src = 'src/icons/soundon.png';
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