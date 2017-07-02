const io = require('socket.io')

module.exports = (server, store) => {
  const socket = io(server)

  socket.on('connect', s => s.emit('data', store.getState()))
  store.subscribe(() => socket.emit('data', store.getState()))
}
