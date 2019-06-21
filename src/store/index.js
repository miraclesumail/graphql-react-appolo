import { createStore, applyMiddleware } from 'redux'
import musciReducer from './reducer'

const initialState = {
    music: ['sss'],
  };

function thunk({getState, dispatch}) {
    return next => action => {
        console.log('thunk -----')
        typeof action === 'function' ?
        action(dispatch) :
        next(action)
    }
}

function logger({getState}) {
    return next => action => {
           // 这个时候的getState获得的是 prevState
           console.log(getState());
           // next 就是 dispatch
           console.log(next);
           console.log(action);
           console.log(`will dispatch action ${action}`);

           const returnValue = next(action);

           console.log(returnValue);
    }
}  
  
// 中间件 顺序logger thunk
const store = createStore(musciReducer, initialState, applyMiddleware(logger, thunk));

export default store