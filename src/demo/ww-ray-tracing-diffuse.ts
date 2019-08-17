// import workerPath from 'file-loader?name=[name].js!../worker/ww-ray-tracing-diffuse.worker'

import { Vector3 } from '../egmath/vector3'
import { Utils } from '../util'
import { Hitable, HitRecord } from '../egrender/hitable'
import { Sphere } from '../egrender/sphere'
import { HitableList } from '../egrender/hitable-list'
import { Camera } from '../egrender/camera'

export function wwRayTracingDiffuse(maxWorkers: number) {
  let endWorkerNum = 0
  let workers: any = []

  const nx = 800
  const ny = 400
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
      for (let wn = 0; wn < maxWorkers; wn++) {
        workers[wn] = new Worker('dist/worker.js')
        let id = wn + 1
        let s = wn * Math.ceil(nx / maxWorkers)
        let e = s + Math.ceil(nx / maxWorkers) - 1

        if (id === maxWorkers) {
          e = nx - 1
        }

        let parameter = {
          id: id,
          start: s,
          end: e,
          width: nx,
          height: ny,
          camera: cam,
          hitWorld: world,
          samplingNum: ns,
          _j: j
        }
        workers[wn].postMessage(parameter)
        workers[wn].onmessage = function(message: any) {
          let result = message.data
          let colArray = result.col
          let _s = result.startVal
          let _e = result.endVal
          let _i = 0
          for (let i = _s; i <= _e; i++) {
            let idx = (i + j * nx) * 4
            imageBuffer[idx] = colArray[_i * 4]
            imageBuffer[idx + 1] = colArray[_i * 4 + 1]
            imageBuffer[idx + 2] = colArray[_i * 4 + 2]
            imageBuffer[idx + 3] = colArray[_i * 4 + 3]
            _i++
          }

          this.terminate()
          endWorkerNum++
          if (endWorkerNum === maxWorkers) {
            // process finished
            Utils.Write2Canvas(context, imageBuffer, nx, ny)
            j--
            endWorkerNum = 0
            requestAnimationFrame(render)
          }
        }
      }
    }
  }

  render()
}
