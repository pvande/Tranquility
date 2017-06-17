const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const store = require('./redux/store')


app.use(express.static(__dirname + '/dashboards/', { extensions: ['html'] }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('/:key', (req, res, next) => {
  if (req.method == 'GET') { next() }
  if (req.method == 'HEAD') { next() }

  store.dispatch({ type: req.method, key: req.params.key, data: req.body })
  res.end()
})

app.listen(80)


store.subscribe(() => {
  console.warn(store.getState())
})
