export namespace TimeStatistic {
  let s: any
  let e: any
  export function start() {
    s = new Date()
  }

  export function end() {
    e = new Date()
    let timeDiff = e - s
    // console.log(timeDiff + ' ms')
    return timeDiff
  }
}
