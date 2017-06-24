import ReactDOM from 'react-dom'

require('./baseline.css')

const target = document.getElementById('dashboard')
io().on('data', function(data) {
  ReactDOM.render(<Dashboard {...data} />, target)
})
