const express = require('express')
const bodyParser = require('body-parser')
const io = require('socket.io')

const store = require('./redux/store')
const app = express()
const server = app.listen(80)
const socket = io(server)

app.use(express.static(__dirname + '/../static/', { extensions: ['html'] }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('/:key', (req, res, next) => {
  if (req.method == 'GET') { next() }
  if (req.method == 'HEAD') { next() }

  store.dispatch({ type: req.method, key: req.params.key, data: req.body })
  res.end()
})

app.all('*', (_, res) => res.sendStatus(404))


socket.on('connect', (s) => {
  s.emit('data', store.getState())
})

store.subscribe(() => {
  socket.emit('data', store.getState())
})
