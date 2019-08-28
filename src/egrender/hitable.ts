import { Vector3 } from '../egmath/vector3'
import { Ray } from './ray'
import { Material } from './material'

export class HitRecord {
  t: number
  p: Vector3
  normal: Vector3
  material: Material

  constructor(_t: number, _p: Vector3, _normal: Vector3, _material: Material) {
    this.t = _t
    this.p = _p
    this.normal = _normal
    this.material = _material
  }
}

export abstract class Hitable {
  abstract name: string
  abstract hit(r: Ray, tMin: number, tMax: number, rec: HitRecord): boolean
}
