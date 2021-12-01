import * as THREE from 'three'

export class Planet {
    constructor(size, texture, bump, distance, rotationSpeed, orbitSpeed) {
      this.size = size,
      this.texture = texture,
      this.bump = bump,
      this.distance = distance,
      this.rotationSpeed = rotationSpeed,
      this.orbitSpeed = orbitSpeed,
      this.isOrbiting = true,
      this.angle = 0;
      this.planet = new THREE.Mesh(
        new THREE.SphereGeometry( this.size,23,23),
        new THREE.MeshStandardMaterial({
          map: this.texture,
          bumpMap: this.bump,
        })
      )

      this.planet.position.set(- this.distance, 0, 0)
    }
    
    rotate(){
      this.planet.rotation.y += this.rotationSpeed;
    }
  
    orbit(){
       if (this.orbitSpeed != 0 && this.isOrbiting){
         this.planet.position.x = this.distance * Math.cos(this.orbitSpeed * this.angle * 0.1);
         this.planet.position.z = this.distance * Math.sin(this.orbitSpeed * this.angle * 0.1);
         this.planet.position.y = 0;
         this.angle += 10;
       }
    }
  
    getPosition(){
      return {
        x: this.planet.position.x,
        y: this.planet.position.y,
        z: this.planet.position.z
      }
    }
}