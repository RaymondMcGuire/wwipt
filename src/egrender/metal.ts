import { Material } from './material'
import { Vector3 } from '../egmath/vector3'
import { Ray } from './ray'
import { HitRecord } from './hitable'
import { Utils } from '../util'

export class Metal extends Material {
  albedo: Vector3
  scattered: Ray
  attenuation: Vector3
  fuzz: number

  constructor(a: Vector3, f: number) {
    super()
    this.albedo = a
    this.scattered = new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0))
    this.attenuation = new Vector3(0, 0, 0)

    if (f < 1) this.fuzz = f
    else this.fuzz = 1
  }

  scatter(r: Ray, rec: HitRecord): boolean {
    let reflected = Utils.reflect(r.direction().unitVec3(), rec.normal)
    this.scattered = new Ray(
      rec.p,
      reflected.add(Utils.RandomInUnitSphere().mul(this.fuzz))
    )
    this.attenuation = new Vector3(
      this.albedo.x(),
      this.albedo.y(),
      this.albedo.z()
    )
    return this.scattered.direction().dot(rec.normal) > 0
  }
}
