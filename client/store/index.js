import {createStore, combineReducers, applyMiddleware} from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { user, receivers, list, loading } from '../reducers'

const reducer = combineReducers({ user, receivers, list, loading })
const middlewares = [thunkMiddleware]

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({collapsed: true})
  middlewares.push(logger)
}

const middleware = composeWithDevTools(
  applyMiddleware(...middlewares)
)
const store = createStore(reducer, middleware)

export default store
