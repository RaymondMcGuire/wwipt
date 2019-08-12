import { Vector3 } from '../egmath/vector3'
import { Ray } from '../egrender/ray'
import { Utils } from '../util'

function Color(r: Ray) {
  let unitDir = r.direction().unitVec3()
  let t = 0.5 * (unitDir.y() + 1.0)
  let v1 = new Vector3(1.0, 1.0, 1.0)
  v1.imul(1.0 - t)
  let v2 = new Vector3(0.5, 0.7, 1.0)
  v2.imul(t)

  return v1.add(v2)
}

export function rayTracingDemo1() {
  const nx = 800
  const ny = 400

  let canvas = document.getElementById('canvas') as any
  canvas.height = ny
  canvas.width = nx
  let context = canvas.getContext('2d')

  // init image buffer
  let imageBuffer = new Array<number>(nx * ny * 4)

  let lowerLeftCorner = new Vector3(-2, -1, -1)
  let horizontal = new Vector3(4, 0, 0)
  let vertical = new Vector3(0, 2, 0)
  let origin = new Vector3(0, 0, 0)

  for (let j = ny - 1; j >= 0; j--) {
    for (let i = 0; i < nx; i++) {
      let u = i / nx
      let v = (ny - 1 - j) / ny
      let r = new Ray(
        origin,
        lowerLeftCorner.add(horizontal.mul(u)).add(vertical.mul(v))
      )
      let col = Color(r)
      let idx = (i + j * nx) * 4
      imageBuffer[idx] = Math.floor(255.99 * col.r())
      imageBuffer[idx + 1] = Math.floor(255.99 * col.g())
      imageBuffer[idx + 2] = Math.floor(255.99 * col.b())
      imageBuffer[idx + 3] = 255
    }
  }

  Utils.Write2Canvas(context, imageBuffer, nx, ny)
}
