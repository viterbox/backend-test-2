import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reviewReducer from './revDuck'
import reducerUser from './userDuck'

const rootReducer = combineReducers({
    review: reviewReducer,
    user: reducerUser
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generarStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store
}