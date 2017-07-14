const set = (obj, key, val) => Object.assign({}, obj, { [key]: val })

const initialState = {}
module.exports = (state, action) => {
  if (action.type == '@@redux/INIT') {
    return initialState
  }

  // Action types will be one of:
  // * an HTTP method (other than GET or HEAD)
  // * `POLL/SUCCESS`
  // * `POLL/FAILURE`
  // * `POLL/ERROR`

  return set(state, action.path.join('/'), action.data)
}
