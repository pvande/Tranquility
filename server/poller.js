const Poll = require('polliwog')
const polls = require('/user/poll')

module.exports = store => {
  Object.keys(polls).forEach(name => {
    const p = new Poll(...polls[name])

    p.on('success', data =>
      store.dispatch({ type: 'POLL/SUCCESS', path: [name], data }),
    )
    p.on('failure', data =>
      store.dispatch({ type: 'POLL/FAILURE', path: [name], data }),
    )
    p.on('error', error =>
      store.dispatch({ type: 'POLL/ERROR', path: [name], error }),
    )

    p.start()
  })
}
