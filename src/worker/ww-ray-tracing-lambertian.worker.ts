import { Vector3 } from '../egmath/vector3'
import { Ray } from '../egrender/ray'
import { Hitable, HitRecord } from '../egrender/hitable'
import { Camera } from '../egrender/camera'
import { Sphere } from '../egrender/sphere'
import { HitableList } from '../egrender/hitable-list'
import { Lambertian } from '../egrender/lambertian'

const ctx: Worker = self as any

function Color(r: Ray, world: Hitable, depth: number): Vector3 {
  let col = new Vector3(0, 0, 0)

  let attenuationSum = new Vector3(1, 1, 1)
  for (let n = 0; n < Number.MAX_VALUE; n++) {
    let rec = new HitRecord(
      0,
      new Vector3(0, 0, 0),
      new Vector3(0, 0, 0),
      new Lambertian(new Vector3(0, 0, 0))
    )
    let bHit = world.hit(r, 0.001, Number.MAX_VALUE, rec)
    if (!bHit) {
      break
    }
    let bScatter = rec.material.scatter(r, rec)
    let scattered = rec.material.scattered
    let attenuation = rec.material.attenuation
    if (bScatter && depth < 50) {
      depth++
      r = scattered
      attenuationSum.imul(attenuation)
    } else {
      attenuationSum = new Vector3(0, 0, 0)
      break
    }
  }

  let unitDir = r.direction().unitVec3()
  let t = 0.5 * (unitDir.y() + 1.0)
  col = new Vector3(1.0, 1.0, 1.0)
    .mul(1.0 - t)
    .add(new Vector3(0.5, 0.7, 1.0).mul(t))
  col.imul(attenuationSum)

  return col
}

ctx.onmessage = function(message) {
  let param = message.data
  let id = param.id
  let start = param.start
  let end = param.end
  let endMax = param.endMax

  let nx = param.width
  let ny = param.height
  let ns = param.samplingNum

  // process end
  if (end > endMax) {
    end = endMax
  }

  // object
  let cam = new Camera()
  let list = new Array<Hitable>(2)
  list[0] = new Sphere(
    new Vector3(0, 0, -1),
    0.5,
    new Lambertian(new Vector3(0.8, 0.3, 0.3))
  )
  list[1] = new Sphere(
    new Vector3(0, -100.5, -1),
    100,
    new Lambertian(new Vector3(0.8, 0.8, 0.0))
  )

  let world = new HitableList(list, 2)

  let colArray = new Array<Number>()

  for (let j = start; j <= end; j++) {
    for (let i = 0; i < nx; i++) {
      let col = new Vector3(0, 0, 0)
      for (let s = 0; s < ns; s++) {
        let u = (i + Math.random()) / nx
        let v = (ny - 1 - (j + Math.random())) / ny
        let r = cam.getRay(u, v)
        col.iadd(Color(r, world, 0))
      }
      col.idiv(ns)
      col = col.gamma2()

      colArray.push(Math.floor(255.99 * col.r()))
      colArray.push(Math.floor(255.99 * col.g()))
      colArray.push(Math.floor(255.99 * col.b()))
      colArray.push(255)
    }
  }

  ctx.postMessage({
    col: colArray,
    startVal: start,
    endVal: end,
    id: id,
    endMaxVal: endMax
  })
}
