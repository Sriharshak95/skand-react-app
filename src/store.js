import {createStore} from 'redux';
import reducer from './redux-store/reducer';

const store = createStore(reducer);

export default store;