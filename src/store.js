import {createStore} from 'redux';
import reducer from './reduximp/reducer';

const store = createStore(reducer);

export default store;