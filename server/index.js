const webserver = require('./webserver')
const connectSocket = require('./socket')
const connectPoller = require('./poller')
const store = require('./store')

const app = webserver(store)
const server = app.listen(80)
const socket = connectSocket(server, store)

connectPoller(store)
