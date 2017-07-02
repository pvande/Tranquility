const set = (obj, key, val) => Object.assign({}, obj, { [key]: val })

module.exports = (state, action) => {
  if (action.type == '@@redux/INIT') {
    return {}
  }

  return set(state, action.path.join('/'), action.data)
}
