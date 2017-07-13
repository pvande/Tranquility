const { createStore } = require('redux')
const reducer = require('/user/reducer')

module.exports = createStore(reducer)
