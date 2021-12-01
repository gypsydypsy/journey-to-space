import * as THREE from 'three';
import { fadeIn, fadeOut } from './utils';
import { introZoom } from './tweens';
import { enableOrbitControls } from './controls';

const loader = THREE.DefaultLoadingManager ;
const HomeScreen = document.getElementById('home')
const loadingScreen = document.getElementById('loading');

export function load () {
    loader.onLoad = function () {
        fadeOut(loadingScreen);
        introZoom()
            .onComplete(() => {
                fadeIn(HomeScreen);
                enableOrbitControls();
            })
    };
}

