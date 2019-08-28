import { Vector3 } from './egmath/vector3'

export namespace Utils {
  export function RandomInUnitSphere() {
    let p = new Vector3(0, 0, 0)
    do {
      p = new Vector3(Math.random(), Math.random(), Math.random())
        .mul(2)
        .sub(new Vector3(1, 1, 1))
    } while (p.lengthSquared() >= 1.0)
    return p
  }

  export function RandomInUnitDisk() {
    let p = new Vector3(0, 0, 0)
    do {
      p = new Vector3(Math.random(), Math.random(), Math.random())
        .mul(2)
        .sub(new Vector3(1, 1, 0))
    } while (p.lengthSquared() >= 1.0)
    return p
  }

  export function reflect(v: Vector3, n: Vector3) {
    return v.sub(n.mul(2 * v.dot(n)))
  }

  export function schlick(cosine: number, refIdx: number) {
    let r0 = (1 - refIdx) / (1 + refIdx)
    r0 = r0 * r0
    return r0 + (1 - r0) * Math.pow(1 - cosine, 5)
  }

  export function refract(
    v: Vector3,
    n: Vector3,
    niOverNt: number,
    refracted: Vector3
  ) {
    let uv = v.unitVec3()
    let dt = uv.dot(n)
    let discriminant = 1.0 - niOverNt * niOverNt * (1 - dt * dt)
    if (discriminant > 0) {
      refracted.set(
        uv
          .sub(n.mul(dt))
          .mul(niOverNt)
          .sub(n.mul(Math.sqrt(discriminant)))
      )
      return true
    } else {
      return false
    }
  }

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
