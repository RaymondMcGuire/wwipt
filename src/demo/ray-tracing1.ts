import { Vector3 } from '../egmath/vector3'
import { Ray } from '../egrender/ray'
import { Utils } from '../util'
import { Hitable, HitRecord } from '../egrender/hitable'
import { Sphere } from '../egrender/sphere'
import { HitableList } from '../egrender/hitable-list'
import { Camera } from '../egrender/camera'

function RandomInUnitSphere() {
  let p = new Vector3(0, 0, 0)
  do {
    p = new Vector3(Math.random(), Math.random(), Math.random())
      .sub(new Vector3(1, 1, 1))
      .mul(2)
  } while (p.lengthSquared() >= 1.0)
  return p
}

function Color(r: Ray, world: Hitable): Vector3 {
  let rec = new HitRecord(0, new Vector3(0, 0, 0), new Vector3(0, 0, 0))
  if (world.hit(r, 0.0, Number.MAX_VALUE, rec)) {
    let target = rec.p.add(rec.normal).add(RandomInUnitSphere())
    return Color(new Ray(rec.p, target.sub(rec.p)), world).mul(0.5)
  } else {
    let unitDir = r.direction().unitVec3()
    let t = 0.5 * (unitDir.y() + 1.0)
    return new Vector3(1.0, 1.0, 1.0)
      .mul(1.0 - t)
      .add(new Vector3(0.5, 0.7, 1.0).mul(t))
  }
}

export function rayTracingDemo1() {
  const nx = 200
  const ny = 100
  const ns = 100

  let canvas = document.getElementById('canvas') as any
  canvas.height = ny
  canvas.width = nx
  let context = canvas.getContext('2d')

  // init image buffer
  let imageBuffer = new Array<number>(nx * ny * 4)
  for (let idx = 0; idx < imageBuffer.length; idx++) {
    imageBuffer[idx] = 0
  }

  let list = new Array<Hitable>(2)
  list[0] = new Sphere(new Vector3(0, 0, -1), 0.5)
  list[1] = new Sphere(new Vector3(0, -100.5, -1), 100)

  let world = new HitableList(list, 2)
  let cam = new Camera()

  let j = ny - 1
  function render() {
    if (j >= 0) {
      for (let i = 0; i < nx; i++) {
        let col = new Vector3(0, 0, 0)
        for (let s = 0; s < ns; s++) {
          let u = (i + Math.random()) / nx
          let v = (ny - 1 - (j + Math.random())) / ny
          let r = cam.getRay(u, v)
          col.iadd(Color(r, world))
        }
        col.idiv(ns)

        let idx = (i + j * nx) * 4
        imageBuffer[idx] = Math.floor(255.99 * col.r())
        imageBuffer[idx + 1] = Math.floor(255.99 * col.g())
        imageBuffer[idx + 2] = Math.floor(255.99 * col.b())
        imageBuffer[idx + 3] = 255
      }
      Utils.Write2Canvas(context, imageBuffer, nx, ny)
      j--
      requestAnimationFrame(render)
    }
  }

  render()
}
