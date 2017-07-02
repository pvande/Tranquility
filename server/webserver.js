const express = require('express')
const bodyParser = require('body-parser')

module.exports = (store) => {
  const app = express()

  // Incoming HTTP requests should have their bodies automatically parsed.
  // Works with JSON and form-encoded HTTP bodies.
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Serve requests for content from /static directly.
  app.use(express.static(__dirname + '/../static/', { extensions: ['html'] }))

  // Incoming data endpoint; dispatches the incoming path and (parsed) HTTP body
  // to the Redux store.  The action type corresponds to the HTTP verb.
  app.all('/*path', (req, res, next) => {
    if (req.method == 'GET') { return next() }
    if (req.method == 'HEAD') { return next() }
    if (req.method == 'OPTIONS') { return next() }

    console.log(req.params)

    store.dispatch({ type: req.method, path: req.params.path, data: req.body })
    res.end()
  })

  // Catch all failure case.
  app.all('*', (_, res) => res.sendStatus(404))

  return app
}
