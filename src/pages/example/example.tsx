import ReactDOM from 'react-dom'

import App from './App'
import '@/common/inject'
import '@/common/polyfill'
import polyfill from '@/common/promise-rejection-polyfill'

if (process.env.NODE_ENV === 'production') {
  polyfill()

  ReactDOM.render(<App />, document.getElementById('root'))
} else {
  ReactDOM.render(<App />, document.getElementById('root'))
}
