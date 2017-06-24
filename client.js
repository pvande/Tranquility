import ReactDOM from 'react-dom'

const target = document.getElementById('dashboard')
io().on('data', function(data) {
  ReactDOM.render(<Dashboard {...data} />, target)
});
