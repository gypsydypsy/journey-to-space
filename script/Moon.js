import * as THREE from 'three';

export class Moon {
    constructor(parent, distance, size, orbitSpeed, texture, bump){
        this.parent = parent,
        this.distance = distance,
        this.size = size,
        this.orbitSpeed = orbitSpeed,
        this.texture = texture,
        this.bump = bump,
        this.moon = new THREE.Mesh(
          new THREE.SphereGeometry(size, 50, 50),
          new THREE.MeshStandardMaterial({
            map: this.texture,
            bumpMap : this.bump
          })
        )

        this.moon.position.set(this.parent.getPosition().x - this.distance, 0, 0);
    }
  
    orbit(time){
      this.moon.position.x = this.parent.getPosition().x + (this.distance * Math.cos(this.orbitSpeed * time * 0.1));
      this.moon.position.z =  this.parent.getPosition().z + (this.distance * Math.sin(this.orbitSpeed * time * 0.1));
      this.moon.position.y = 0;
    }
  }