import { Utils } from '../util'

export function GenerateNoiseDemo() {
  // config
  const w = 420
  const h = 210
  let canvas = document.getElementById('canvas') as any
  canvas.height = h
  canvas.width = w
  let context = canvas.getContext('2d')

  // init image buffer
  let imageBuffer = new Array<number>(h * w * 4)
  for (let idx = 0; idx < imageBuffer.length; idx++) {
    imageBuffer[idx] = 0
  }

  let currentProgress = 0
  function render() {
    if (currentProgress < h) {
      imageBuffer = Utils.GenerateNoise(
        imageBuffer,
        w * currentProgress * 4,
        w * (1 + currentProgress) * 4
      )
      Utils.Write2Canvas(context, imageBuffer, w, h)
      currentProgress++
      requestAnimationFrame(render)
    }
  }
  render()
}
