import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import backend from './../../middleware/backend'
import rootReducer from '../redux/reducer'

const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk,backend)
)

export default configureStore
