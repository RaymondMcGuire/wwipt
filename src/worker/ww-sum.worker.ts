onmessage = function(message) {
  let param = message.data
  let id = param.id
  let start = param.start
  let end = param.end
  let em = param.endMAX
  let debug = param.debug

  let total = 0

  for (let i = start; i <= end; i++) {
    if (i > em) {
      end = em
      break
    }
    total += i
  }

  if (debug) {
    console.log(
      'thread id: ' + id,
      'start: ' + start,
      'end:' + end,
      'total:' + total
    )
  }

  postMessage({ data: total, endVal: end, endMAX: em, id: id })
}
