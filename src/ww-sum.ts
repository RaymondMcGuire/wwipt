import { TimeStatistic } from './time'
import workerPath from 'file-loader?name=[name].js!./ww-sum.worker'

export function wwSum(bDebug: boolean = true) {
  TimeStatistic.start()

  // demo for web worker, calculate 1+2+3+...+100
  let endWorkerNum = 0
  let workerNumber = 8
  let workers = []

  let TOTAL = 0
  let MAX_NUM = 200
  let processNum = 10

  for (let wn = 0; wn < workerNumber; wn++) {
    workers[wn] = new Worker(workerPath)
    let id = wn + 1
    let s = wn * Math.ceil(MAX_NUM / workerNumber) + 1
    let e = s + processNum - 1

    let em = (wn + 1) * Math.ceil(MAX_NUM / workerNumber)
    if (id === workerNumber) {
      em = MAX_NUM
    }

    let parameter = { id: id, start: s, end: e, endMAX: em, debug: bDebug }
    workers[wn].postMessage(parameter)
    workers[wn].onmessage = function(message) {
      let result = message.data
      let data = result.data
      let endVal = result.endVal
      let em = result.endMAX
      let id = result.id
      TOTAL += data
      if (endVal <= MAX_NUM && endVal < em) {
        let parameter = {
          id: id,
          start: endVal + 1,
          end: endVal + processNum,
          endMAX: em,
          debug: bDebug
        }
        this.postMessage(parameter)
      } else {
        this.terminate()
        endWorkerNum++
        if (endWorkerNum === workerNumber) {
          let time = TimeStatistic.end()
          console.log(
            'process finish!',
            'Total value is: ' + TOTAL,
            'Time: ' + time + 'ms'
          )
        }
      }
    }
  }
}
