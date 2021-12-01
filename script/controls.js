import { transformControls } from './scene.js'
import { orbitControls } from './scene.js'

function attachTransformControls(element){
    transformControls.detach();
    transformControls.attach(element.planet);
    transformControls.visible = false;
}

function enableOrbitControls() {
    orbitControls.enablePan = true;
    orbitControls.enableRotate = true;
    orbitControls.enableZoom = true;
}

function disableOrbitControls(){
    orbitControls.enableRotate = false;
    orbitControls.enablePan = false;
    orbitControls.enableZoom = false;
}

export { attachTransformControls, enableOrbitControls, disableOrbitControls}
