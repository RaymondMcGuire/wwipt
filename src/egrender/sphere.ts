import { Hitable, HitRecord } from './hitable'
import { Vector3 } from '../egmath/vector3'
import { Ray } from './ray'

export class Sphere extends Hitable {
  center: Vector3
  radius: number

  constructor(cen: Vector3, r: number) {
    super()
    this.center = cen
    this.radius = r
  }

  hit(r: Ray, tMin: number, tMax: number, rec: HitRecord): boolean {
    let oc = r.origin().sub(this.center)
    let a = r.direction().dot(r.direction())
    let b = 2.0 * oc.dot(r.direction())
    let c = oc.dot(oc) - this.radius * this.radius
    let discriminant = b * b - 4 * a * c
    if (discriminant > 0) {
      let tmp = (-b - Math.sqrt(b * b - a * c)) / a
      if (tmp < tMax && tmp > tMin) {
        rec.t = tmp
        rec.p = r.pointAtParam(rec.t)
        rec.normal = rec.p.sub(this.center).div(this.radius)
        return true
      }
    }
    return false
  }
}
