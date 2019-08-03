"use strict";

console.log('hello from a webworker');
addEventListener('message', function (message) {
  console.log('in webworker', message);
  postMessage('this is the response ' + message.data);
});