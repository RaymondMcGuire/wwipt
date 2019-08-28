import { Vector3 } from '../egmath/vector3'
import { Ray } from './ray'
import { Utils } from '../util'

export class Camera {
  lowerLeftCorner: Vector3
  horizontal: Vector3
  vertical: Vector3
  origin: Vector3

  lensRadius: number

  w: Vector3
  u: Vector3
  v: Vector3
  constructor(
    lookFrom: Vector3,
    lookAt: Vector3,
    vup: Vector3,
    vfov: number,
    aspect: number,
    aperture: number,
    focusDist: number
  ) {
    this.lensRadius = aperture / 2

    let theta = (vfov * Math.PI) / 180
    let halfHeight = Math.tan(theta / 2)
    let halfWidth = halfHeight * aspect

    this.origin = lookFrom
    this.w = lookFrom.sub(lookAt).unitVec3()
    this.u = vup.cross(this.w).unitVec3()
    this.v = this.w.cross(this.u)

    this.lowerLeftCorner = this.origin
      .sub(this.u.mul(halfWidth * focusDist))
      .sub(this.v.mul(halfHeight * focusDist))
      .sub(this.w.mul(focusDist))
    this.horizontal = this.u.mul(2 * halfWidth * focusDist)
    this.vertical = this.v.mul(2 * halfHeight * focusDist)
  }

  getRay(u: number, v: number) {
    let rd = Utils.RandomInUnitDisk().mul(this.lensRadius)
    let offset = this.u.mul(rd.x()).add(this.v.mul(rd.y()))
    return new Ray(
      this.origin.add(offset),
      this.lowerLeftCorner
        .add(this.horizontal.mul(u))
        .add(this.vertical.mul(v))
        .sub(this.origin)
        .sub(offset)
    )
  }
}
