import { Vector3 } from '../egmath/vector3'
import { Ray } from './ray'

export class HitRecord {
  t: number
  p: Vector3
  normal: Vector3

  constructor(_t: number, _p: Vector3, _normal: Vector3) {
    this.t = _t
    this.p = _p
    this.normal = _normal
  }
}

export abstract class Hitable {
  abstract hit(r: Ray, tMin: number, tMax: number, rec: HitRecord): boolean
}
