import { createStore, applyMiddleware  } from 'redux';
import {reducer} from "./reducer";  
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

const logger = createLogger();
const router = routerMiddleware(browserHistory);
export const store = createStore(reducer,applyMiddleware(router,thunk,logger));