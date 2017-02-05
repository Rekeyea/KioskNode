import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import articulos from "./modules/articulos";

export const reducer = combineReducers({
    [articulos.NAME]: articulos.reducer,
    routing: routerReducer
});