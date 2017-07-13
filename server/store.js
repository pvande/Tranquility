const { createStore } = require('redux')
const reducer = require('../config/reducer')

module.exports = createStore(reducer)
