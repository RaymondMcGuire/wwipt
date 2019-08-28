import { Material } from './material'
import { Vector3 } from '../egmath/vector3'
import { Ray } from './ray'
import { HitRecord } from './hitable'
import { Utils } from '../util'

export class Dielectric extends Material {
  scattered: Ray
  attenuation: Vector3
  refIdx: number
  name: string

  constructor(ri: number) {
    super()
    this.name = 'Dielectric'
    this.refIdx = ri
    this.scattered = new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0))
    this.attenuation = new Vector3(0, 0, 0)
  }

  scatter(r: Ray, rec: HitRecord): boolean {
    let outwardNormal = new Vector3(0, 0, 0)
    let refracted = new Vector3(0, 0, 0)

    let niOverNt = 0

    let reflected = Utils.reflect(r.direction().unitVec3(), rec.normal)
    let reflectProb = 0
    let cosine = 0
    this.attenuation = new Vector3(1, 1, 1)

    if (r.direction().dot(rec.normal) > 0) {
      outwardNormal = rec.normal.mul(-1)
      niOverNt = this.refIdx
      cosine =
        (this.refIdx * r.direction().dot(rec.normal)) / r.direction().length()
    } else {
      outwardNormal = rec.normal
      niOverNt = 1.0 / this.refIdx
      cosine = -r.direction().dot(rec.normal) / r.direction().length()
    }

    if (Utils.refract(r.direction(), outwardNormal, niOverNt, refracted)) {
      reflectProb = Utils.schlick(cosine, this.refIdx)
    } else {
      reflectProb = 1.0
    }

    if (Math.random() < reflectProb) {
      this.scattered = new Ray(rec.p, reflected)
    } else {
      this.scattered = new Ray(rec.p, refracted)
    }

    return true
  }
}
