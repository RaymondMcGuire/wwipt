import { Utils } from './util'
import { wwSum } from './ww-sum'
// config
const size = 420
let canvas = document.getElementById('canvas') as any
canvas.height = size
canvas.width = size
let context = canvas.getContext('2d')

// init image buffer
let imageBuffer = new Array<number>(size * size * 3)
for (let idx = 0; idx < imageBuffer.length; idx++) {
  imageBuffer[idx] = 0
}

function GenerateNoise(
  imageBuffer: Array<number>,
  startIdx: number,
  endIdx: number
) {
  for (let index = startIdx; index < endIdx; index += 3) {
    let r = Utils.Random(0, 255)
    let g = Utils.Random(0, 255)
    let b = Utils.Random(0, 255)

    imageBuffer[index] = r
    imageBuffer[index + 1] = g
    imageBuffer[index + 2] = b
  }
  return imageBuffer
}

let currentProgress = 0

function render() {
  if (currentProgress < size) {
    imageBuffer = GenerateNoise(
      imageBuffer,
      size * currentProgress * 3,
      size * (1 + currentProgress) * 3
    )
    Utils.Write2Canvas(context, imageBuffer, size)
    currentProgress++
    requestAnimationFrame(render)
  }
}

render()

wwSum()
