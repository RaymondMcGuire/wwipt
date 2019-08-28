import { Hitable, HitRecord } from './hitable'
import { Vector3 } from '../egmath/vector3'
import { Ray } from './ray'
import { Lambertian } from './lambertian'

export class HitableList extends Hitable {
  list: Array<Hitable>
  listSize: number
  name: string
  constructor(l: Array<Hitable>, n: number) {
    super()
    this.name = 'HitableList'
    this.list = l
    this.listSize = n
  }

  hit(r: Ray, tMin: number, tMax: number, rec: HitRecord): boolean {
    let tmpRec = new HitRecord(
      0,
      new Vector3(0, 0, 0),
      new Vector3(0, 0, 0),
      new Lambertian(new Vector3(0, 0, 0))
    )
    let hitAnything = false
    let closestSoFar = tMax
    for (let i = 0; i < this.listSize; i++) {
      if (this.list[i].hit(r, tMin, closestSoFar, tmpRec)) {
        hitAnything = true
        closestSoFar = tmpRec.t
        rec.t = tmpRec.t
        rec.p = tmpRec.p
        rec.normal = tmpRec.normal
        rec.material = tmpRec.material
      }
    }
    return hitAnything
  }
}
