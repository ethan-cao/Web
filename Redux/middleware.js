import redux from "redux";
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'

const { createStore, applyMiddleware } = redux;
const { logger } = reduxLogger;
const { thunk } = reduxThunk;

const rootReducer = (state = {}, action) => {
    return state;
}

// enhancer applyMiddleware() injects functionality into dispatch by writing a function, that returns a function, that returns a function
const store = createStore(rootReducer, applyMiddleware(logger, thunk))


// the inner-most function runs on each dispatch
// the 1st param store only has .getState() and dispatch
// the 2nd param next passes the action to the next middleware
const loggingMiddleware = store => next => action => {
    console.log('action:', action)
    const result = next(action)
    console.log('state after action:', store.getState())
    return result
  }
