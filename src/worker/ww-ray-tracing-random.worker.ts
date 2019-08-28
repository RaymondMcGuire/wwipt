import { Vector3 } from '../egmath/vector3'
import { Ray } from '../egrender/ray'
import { Hitable, HitRecord } from '../egrender/hitable'
import { Camera } from '../egrender/camera'
import { Sphere } from '../egrender/sphere'
import { HitableList } from '../egrender/hitable-list'
import { Lambertian } from '../egrender/lambertian'
import { Metal } from '../egrender/metal'
import { Dielectric } from '../egrender/dielectric'
import { Material } from '../egrender/material'

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

  let _scene = param.scene

  // process end
  if (end > endMax) {
    end = endMax
  }

  // init scene
  let objList = _scene.list
  let listSize = _scene.listSize
  let list = new Array<Hitable>(listSize)
  for (let index = 0; index < list.length; index++) {
    const hitable = objList[index] as Hitable
    let className = hitable.name
    switch (className) {
      case 'Sphere':
        let _s = hitable as Sphere

        // material
        let m: Material
        switch (_s.material.name) {
          case 'Lambertian':
            let _m = _s.material as Lambertian
            m = new Lambertian(
              new Vector3(
                _m.albedo._elements[0],
                _m.albedo._elements[1],
                _m.albedo._elements[2]
              )
            )
            break
          case 'Metal':
            let _m1 = _s.material as Metal
            m = new Metal(
              new Vector3(
                _m1.albedo._elements[0],
                _m1.albedo._elements[1],
                _m1.albedo._elements[2]
              ),
              _m1.fuzz
            )
            break
          case 'Dielectric':
            let _m2 = _s.material as Dielectric
            m = new Dielectric(_m2.refIdx)
            break

          default:
            let _m3 = _s.material as Lambertian
            m = new Lambertian(
              new Vector3(
                _m3.albedo._elements[0],
                _m3.albedo._elements[1],
                _m3.albedo._elements[2]
              )
            )
            break
        }

        let _center = _s.center._elements
        let center: Vector3
        center = new Vector3(_center[0], _center[1], _center[2])
        let s = new Sphere(center, _s.radius, m)
        list[index] = s
        break
    }
  }

  let scene = new HitableList(list, listSize)

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
