import { Vector3 } from '../egmath/vector3'
import { Ray } from '../egrender/ray'
import { Hitable, HitRecord } from '../egrender/hitable'
import { Camera } from '../egrender/camera'
import { Sphere } from '../egrender/sphere'
import { HitableList } from '../egrender/hitable-list'
import { Lambertian } from '../egrender/lambertian'
import { Metal } from '../egrender/metal'
import { Dielectric } from '../egrender/dielectric'

const ctx: Worker = self as any

function RandomScene(num: number): HitableList {
  let hitList = new Array<Hitable>(num + 1)
  hitList[0] = new Sphere(
    new Vector3(0, -1000, 0),
    1000,
    new Lambertian(new Vector3(0.5, 0.5, 0.5))
  )
  let i = 1
  for (let _a = -11; _a < 11; _a++) {
    for (let _b = -11; _b < 11; _b++) {
      let chooseMat = Math.random()
      let center = new Vector3(
        _a + 0.9 * Math.random(),
        0.2,
        _b + 0.9 * Math.random()
      )
      if (center.sub(new Vector3(4, 0.2, 0)).length() > 0.9) {
        if (chooseMat < 0.8) {
          // diffuse
          hitList[i++] = new Sphere(
            center,
            0.2,
            new Lambertian(
              new Vector3(
                Math.random() * Math.random(),
                Math.random() * Math.random(),
                Math.random() * Math.random()
              )
            )
          )
        } else if (chooseMat < 0.95) {
          // metal
          hitList[i++] = new Sphere(
            center,
            0.2,
            new Metal(
              new Vector3(
                0.5 * (1 + Math.random()),
                0.5 * (1 + Math.random()),
                0.5 * (1 + Math.random())
              ),
              0.5 * Math.random()
            )
          )
        } else {
          // glass
          hitList[i++] = new Sphere(center, 0.2, new Dielectric(1.5))
        }
      }
    }
  }

  hitList[i++] = new Sphere(new Vector3(0, 1, 0), 1.0, new Dielectric(1.5))
  hitList[i++] = new Sphere(
    new Vector3(-4, 1, 0),
    1.0,
    new Lambertian(new Vector3(0.4, 0.2, 0.1))
  )
  hitList[i++] = new Sphere(
    new Vector3(4, 1, 0),
    1.0,
    new Metal(new Vector3(0.7, 0.6, 0.5), 0.0)
  )

  return new HitableList(hitList, i)
}

let scene = RandomScene(100)

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

  // camera
  let lookFrom = new Vector3(13, 2, 3)
  let lookAt = new Vector3(0, 0, 0)
  let vup = new Vector3(0, 1, 0)
  let vfov = 20
  let aspect = nx / ny
  let aperture = 0.1
  let focusDist = 10.0
  let cam = new Camera(lookFrom, lookAt, vup, vfov, aspect, aperture, focusDist)

  let colArray = new Array<Number>()

  for (let j = start; j <= end; j++) {
    for (let i = 0; i < nx; i++) {
      let col = new Vector3(0, 0, 0)
      for (let s = 0; s < ns; s++) {
        let u = (i + Math.random()) / nx
        let v = (ny - 1 - (j + Math.random())) / ny
        let r = cam.getRay(u, v)
        col.iadd(Color(r, scene, 0))
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
