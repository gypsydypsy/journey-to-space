import * as THREE from 'three'

export class Ring {
    constructor(parent, distance, width, tilt, texture, alpha) {
      this.parent = parent, 
      this.distance = distance,
      this.width = width, 
      this.tilt = tilt,
      this.texture = texture,
      this.alpha = alpha,
      this.ring = new THREE.Mesh(
        new THREE.TorusGeometry(parent.size + distance, width, 2, 100), 
        new THREE.MeshStandardMaterial({
          map: texture,
          alphaMap : alpha
        })
      )

      this.ring.position.set(this.parent.getPosition().x, this.parent.getPosition().y, this.parent.getPosition().z);
      this.ring.rotation.set(this.tilt, 0, 0);
    }

    orbit(){
    this.ring.position.x = this.parent.getPosition().x;
    this.ring.position.y = this.parent.getPosition().y;
    this.ring.position.z = this.parent.getPosition().z;
    }
  }