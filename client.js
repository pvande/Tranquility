var socket = io();
socket.on('data', function(data) {
  console.warn(data);
});

console.info(window.Dashboard)
