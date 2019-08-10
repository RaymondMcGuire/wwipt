"use strict";

onmessage = function onmessage(message) {
  var param = message.data;
  var id = param.id;
  var start = param.start;
  var end = param.end;
  var em = param.endMAX;
  var total = 0;

  for (var i = start; i <= end; i++) {
    if (i > em) {
      end = em;
      break;
    }

    total += i;
  }

  console.log('thread id: ' + id, 'start: ' + start, 'end:' + end, 'total:' + total);
  postMessage({
    data: total,
    endVal: end,
    endMAX: em,
    id: id
  });
};