import { TimeStatistic } from '../time'
import { Utils } from '../util'
import { HitableList } from '../egrender/hitable-list'
import { Hitable } from '../egrender/hitable'
import { Vector3 } from '../egmath/vector3'
import { Sphere } from '../egrender/sphere'
import { Lambertian } from '../egrender/lambertian'
import { Metal } from '../egrender/metal'
import { Dielectric } from '../egrender/dielectric'

function RandomScene(step: number): HitableList {
  let hitList = new Array<Hitable>()
  hitList[0] = new Sphere(
    new Vector3(0, -1000, 0),
    1000,
    new Lambertian(new Vector3(0.5, 0.5, 0.5))
  )
  let i = 1
  for (let _a = -11; _a < 11; _a += step) {
    for (let _b = -11; _b < 11; _b += step) {
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

let scene = RandomScene(5)

export function wwRenderSceneDynamic(workerPath: string, maxWorkers: number) {
  let endWorkerNum = 0
  let workers: any = []
  let processNum = 10

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

  TimeStatistic.start()
  for (let wn = 0; wn < maxWorkers; wn++) {
    workers[wn] = new Worker(workerPath)
    let id = wn + 1
    let s = wn * Math.ceil(ny / maxWorkers)
    let e = s + processNum - 1
    let eMax = (wn + 1) * Math.ceil(ny / maxWorkers) - 1

    if (id === maxWorkers) {
      eMax = ny - 1
    }

    let parameter = {
      id: id,
      start: s,
      end: e,
      endMax: eMax,
      width: nx,
      height: ny,
      samplingNum: ns,
      scene: scene
    }
    // console.log('post: ', s,"~",e)
    workers[wn].postMessage(parameter)
    workers[wn].onmessage = function(message: any) {
      let result = message.data
      let colArray = result.col
      let _s = result.startVal
      let _e = result.endVal
      let _em = result.endMaxVal
      let _i = 0

      for (let j = _s; j <= _e; j++) {
        for (let i = 0; i < nx; i++) {
          let idx = (i + j * nx) * 4
          imageBuffer[idx] = colArray[_i * 4]
          imageBuffer[idx + 1] = colArray[_i * 4 + 1]
          imageBuffer[idx + 2] = colArray[_i * 4 + 2]
          imageBuffer[idx + 3] = colArray[_i * 4 + 3]
          _i++
        }
      }

      if (_e < _em) {
        let parameter = {
          id: id,
          start: _e + 1,
          end: _e + processNum - 1,
          endMax: _em,
          width: nx,
          height: ny,
          samplingNum: ns,
          scene: scene
        }
        // console.log('post: ', _e + 1 ,"~",_e + processNum - 1)
        this.postMessage(parameter)
      } else {
        // console.log('id: ' + id, 'finished')
        this.terminate()
        endWorkerNum++
        if (endWorkerNum === maxWorkers) {
          // process finished
          let time = TimeStatistic.end() / 1000
          console.log('process finished!', 'Time: ' + time + 'sec')
        }
      }
    }
  }

  // display the processed image
  function render() {
    Utils.Write2Canvas(context, imageBuffer, nx, ny)
    requestAnimationFrame(render)
  }

  render()
}
