export namespace Utils {
  export function Random(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1 - min)) + min
  }

  export function Write2Canvas(
    context: any,
    imageBuf: Array<number>,
    size: number
  ) {
    let canvasImage = context.getImageData(0, 0, size, size)
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let idx = (i * size + j) * 4
        canvasImage.data[idx + 0] = imageBuf[(i * size + j) * 3 + 0]
        canvasImage.data[idx + 1] = imageBuf[(i * size + j) * 3 + 1]
        canvasImage.data[idx + 2] = imageBuf[(i * size + j) * 3 + 2]
        canvasImage.data[idx + 3] = 255
      }
    }
    context.putImageData(canvasImage, 0, 0)
  }
}
