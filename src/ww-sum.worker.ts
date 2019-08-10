onmessage = function(message) {
  let param = message.data
  let id = param.id
  let start = param.start
  let end = param.end
  let em = param.endMAX

  let total = 0

  for (let i = start; i <= end; i++) {
    if (i > em) {
      end = em
      break
    }
    total += i
  }

  console.log(
    'thread id: ' + id,
    'start: ' + start,
    'end:' + end,
    'total:' + total
  )
  postMessage({ data: total, endVal: end, endMAX: em, id: id })
}
