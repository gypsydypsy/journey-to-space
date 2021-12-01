import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { scene, camera } from './scene.js'

export function introZoom() {
    const cameraPosition = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
    }


    const targetPosition = {
        x: 0,
        y: 0,
        z: 80
    }

    return  new TWEEN.Tween(cameraPosition)
      .to(targetPosition, 10000)
      .onUpdate(() =>
          camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
      )
      .easing(TWEEN.Easing.Quintic.InOut)
      .start();

}

export function resetScenePosition() {
    const sceneRotation = {
        x: scene.rotation.x,
        y: scene.rotation.y,
        z: scene.rotation.z
    }

    const targetSceneRotation = {
        x: 0,
        y: 0,
        z: 0
    }

    const sceneCoords = {
        x: scene.position.x,
        y: scene.position.y,
        z: scene.position.z
    }

    const targetCoords = {
        x: 0,
        y: 0,
        z: 0
    }

    const cameraRotation = {
        x: camera.rotation.x,
        y: camera.rotation.y, 
        z: camera.rotation.z
    }

    const camTargetRotation = {
        x: 0, 
        y: 0.55, 
        z: 0
    }

    new TWEEN.Tween(sceneRotation)
    .to(targetSceneRotation, 2000)
    .onUpdate(() =>
        scene.rotation.set(sceneRotation.x, sceneRotation.y, sceneRotation.z)
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
    .onComplete( ()=> {
        new TWEEN.Tween(sceneCoords)
            .to(targetCoords, 2000)
            .onUpdate(() =>
                scene.position.set(sceneCoords.x, sceneCoords.y, sceneCoords.z)
            )
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start()
            .onComplete( ()=> {
            new TWEEN.Tween(cameraRotation)
                .to(camTargetRotation, 2000)
                .onUpdate(() =>
                camera.rotation.set(cameraRotation.x, cameraRotation.y, cameraRotation.z)
                )
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start()
            })
        })
} 

export function moveCameraTo(planet, time){
    const camCoords = {
      x: camera.position.x,
      y: camera.position.y,
      z : camera.position.z
    }
  
    const planetCoords = {
      x: planet.getPosition().x,
      y: planet.getPosition().y,
      z: planet.getPosition().z + (planet.size * 2.5)
    }
  
    return  new TWEEN.Tween(camCoords)
      .to(planetCoords, time)
      .onUpdate(() =>
          camera.position.set(camCoords.x, camCoords.y, camCoords.z)
      )
      .easing(TWEEN.Easing.Quintic.InOut)
      .start();
}
  