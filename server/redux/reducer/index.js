const set = (obj, key, val) => Object.assign({}, obj, { [key]: val })

module.exports = (state = {}, action) => {
  switch (action.type) {
  case 'POST':
    return set(state, action.key, action.data)
  default:
    return state
  }
}
