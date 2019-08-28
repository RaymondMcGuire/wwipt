import { Hitable, HitRecord } from './hitable'
import { Vector3 } from '../egmath/vector3'
import { Ray } from './ray'
import { Material } from './material'

export class Sphere extends Hitable {
  center: Vector3
  radius: number
  material: Material
  name: string

  constructor(cen: Vector3, r: number, mat: Material) {
    super()
    this.name = 'Sphere'
    this.center = cen
    this.radius = r
    this.material = mat
  }

  hit(r: Ray, tMin: number, tMax: number, rec: HitRecord): boolean {
    let oc = r.origin().sub(this.center)
    let a = r.direction().dot(r.direction())
    let b = oc.dot(r.direction())
    let c = oc.dot(oc) - this.radius * this.radius
    let discriminant = b * b - a * c
    if (discriminant > 0) {
      let tmp = (-b - Math.sqrt(b * b - a * c)) / a
      if (tmp < tMax && tmp > tMin) {
        rec.t = tmp
        rec.p = r.pointAtParam(rec.t)
        rec.normal = rec.p.sub(this.center).div(this.radius)
        rec.material = this.material
        return true
      }

      tmp = (-b + Math.sqrt(b * b - a * c)) / a
      if (tmp < tMax && tmp > tMin) {
        rec.t = tmp
        rec.p = r.pointAtParam(rec.t)
        rec.normal = rec.p.sub(this.center).div(this.radius)
        rec.material = this.material
        return true
      }
    }
    return false
  }
}
