import {createStore} from 'redux'
import musciReducer from './reducer'

const initialState = {
    music: ['sss'],
  };
  
const store = createStore(musciReducer, initialState);

export default store