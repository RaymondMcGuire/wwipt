import { Vector3 } from '../egmath/vector3'
import { Ray } from './ray'

export class Camera {
  lowerLeftCorner: Vector3
  horizontal: Vector3
  vertical: Vector3
  origin: Vector3
  constructor() {
    this.lowerLeftCorner = new Vector3(-2, -1, -1)
    this.horizontal = new Vector3(4, 0, 0)
    this.vertical = new Vector3(0, 2, 0)
    this.origin = new Vector3(0, 0, 0)
  }

  getRay(u: number, v: number) {
    return new Ray(
      this.origin,
      this.lowerLeftCorner
        .add(this.horizontal.mul(u))
        .add(this.vertical.mul(v))
        .sub(this.origin)
    )
  }
}
