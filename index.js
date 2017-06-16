const express = require('express')
const app = express()

app.use(express.static(__dirname + '/dashboards/', { extensions: ['html'] }))

app.listen(80)
