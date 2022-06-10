// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import timer from './timer'

const rootReducer = {
  auth,
  navbar,
  layout,
  timer
}

export default rootReducer
