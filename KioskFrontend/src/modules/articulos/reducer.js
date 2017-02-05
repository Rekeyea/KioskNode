import {LIST,SEARCH} from "./constants";
import {GET_ARTICULOS_SUCCESS,SET_SEARCH_CRITERIA} from "./actionTypes";
const initialState = {
    [LIST]:[],
    [SEARCH]:""
}

export const reducer = (state = initialState,action) => {
    switch(action.type){
        case GET_ARTICULOS_SUCCESS:
            return Object.assign({},state,{[LIST]:action.payload});
        case SET_SEARCH_CRITERIA:
            return Object.assign({},state,{[SEARCH]:action.payload});
        default:
            return state;       
    }
}