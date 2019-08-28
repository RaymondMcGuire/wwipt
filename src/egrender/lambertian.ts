import { Material } from './material'
import { Vector3 } from '../egmath/vector3'
import { Ray } from './ray'
import { HitRecord } from './hitable'
import { Utils } from '../util'

export class Lambertian extends Material {
  albedo: Vector3
  scattered: Ray
  attenuation: Vector3
  name: string

  constructor(a: Vector3) {
    super()
    this.name = 'Lambertian'
    this.albedo = a
    this.scattered = new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0))
    this.attenuation = new Vector3(0, 0, 0)
  }

  scatter(r: Ray, rec: HitRecord): boolean {
    let target = rec.p.add(rec.normal).add(Utils.RandomInUnitSphere())
    this.scattered = new Ray(rec.p, target.sub(rec.p))
    this.attenuation = new Vector3(
      this.albedo.x(),
      this.albedo.y(),
      this.albedo.z()
    )
    return true
  }
}
