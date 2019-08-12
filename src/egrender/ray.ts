/* =========================================================================
 *
 *  ray.ts
 *  ray function for p(t) = A + t * B
 *  T:type,default setting is number
 *  D:dimension
 * ========================================================================= */
import { Vector3 } from '../egmath/vector3'

export class Ray {
  private _A: Vector3
  private _B: Vector3

  constructor(a: Vector3, b: Vector3) {
    this._A = a
    this._B = b
  }

  origin() {
    return this._A
  }
  direction() {
    return this._B
  }
  pointAtParam(t: number) {
    return this._A.add(this._B.imul(t))
  }
}
