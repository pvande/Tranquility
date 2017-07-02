const { createStore } = require('redux')
const reducer = require('./redux/reducer')

module.exports = createStore(reducer)
