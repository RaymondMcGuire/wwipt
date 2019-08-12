export namespace Utils {
  export function Random(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1 - min)) + min
  }

  export function Write2Canvas(
    context: any,
    imageBuf: Array<number>,
    w: number,
    h: number
  ) {
    let canvasImage = context.getImageData(0, 0, w, h)
    let data = canvasImage.data
    for (let idx = 0; idx < data.length; idx += 4) {
      data[idx + 0] = imageBuf[idx + 0]
      data[idx + 1] = imageBuf[idx + 1]
      data[idx + 2] = imageBuf[idx + 2]
      data[idx + 3] = imageBuf[idx + 3]
    }
    context.putImageData(canvasImage, 0, 0)
  }

  export function GenerateNoise(
    imageBuffer: Array<number>,
    startIdx: number,
    endIdx: number
  ) {
    for (let index = startIdx; index < endIdx; index += 4) {
      let r = Random(0, 255)
      let g = Random(0, 255)
      let b = Random(0, 255)

      imageBuffer[index] = r
      imageBuffer[index + 1] = g
      imageBuffer[index + 2] = b
      imageBuffer[index + 3] = 255
    }
    return imageBuffer
  }
}
