// The exported object is a series of key-value pairs, where the key name
// describes the "path" that will be sent to the reducer, and the value is the
// arguments that the polling instance will be created with.
//
// The default reducer will take the response data and assign it to the given
// "path".
//
// We're using the `polliwog` npm module as our polling manager; please see that
// documentation for available options.

module.exports = {
  // "jquery": [
  //   "https://api.npmjs.org/downloads/range/last-month/jquery",
  //   {
  //     json: true,
  //     interval: 3600,
  //   }
  // ],
}
