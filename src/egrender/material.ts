import { Ray } from './ray'
import { HitRecord } from './hitable'
import { Vector3 } from '../egmath/vector3'

export abstract class Material {
  abstract name: string
  abstract scattered: Ray
  abstract attenuation: Vector3
  abstract scatter(r: Ray, rec: HitRecord): boolean
}
