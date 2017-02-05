import {createAction} from "redux-actions";
import * as ActionTypes from "./actionTypes";
import {HttpClient} from "./../common/http";

export const RequestArticulos = createAction(ActionTypes.GET_ARTICULOS_REQUEST);
export const RequestArticulosSuccess = createAction(ActionTypes.GET_ARTICULOS_SUCCESS);
export const RequestArticulosFail = createAction(ActionTypes.GET_ARTICULOS_FAIL);
export const RequestArticulosAsync = () => dispatch => {
    dispatch(RequestArticulos());
    HttpClient.get("api/articulos")
        .catch(err => dispatch(RequestArticulosFail()))
        .then(data => {
            if(!data){
                return;
            }
            const articulos = data.data;
            // **** change when having server
            dispatch(RequestArticulosSuccess(articulos));
        })
};

export const RequestBuildArticulo = createAction(ActionTypes.BUILD_ARTICULOS_REQUEST);
export const RequestBuildArticuloSuccess = createAction(ActionTypes.BUILD_ARTICULOS_SUCCESS);
export const RequestBuildArticuloFail = createAction(ActionTypes.BUILD_ARTICULOS_FAIL);
export const RequestBuildArticuloAsync = (articulo,callback) => dispatch => {
    dispatch(RequestBuildArticulo());
    const data = new FormData();
    for(const key in articulo){
        if(articulo.hasOwnProperty(key)){
            data.append(key,articulo[key]);
        }
    }
    HttpClient.post("/api/articulos",data,{"Content-Type":"multipart/form-data"})
        .catch(err => dispatch(RequestBuildArticuloFail()))
        .then(data => {
            console.log("pasa por aca",data);
            dispatch(RequestBuildArticuloSuccess());
            callback();
        }); 
};

export const RequestDestroyArticulo = createAction(ActionTypes.DESTROY_ARTICULOS_REQUEST);
export const RequestDestroyArticuloSuccess = createAction(ActionTypes.DESTROY_ARTICULOS_SUCCESS);
export const RequestDestroyArticuloFail = createAction(ActionTypes.DESTROY_ARTICULOS_FAIL);
export const RequestDestroyArticuloAsync = (id, callback) => dispatch => {
    dispatch(RequestDestroyArticulo());
    HttpClient.delete(`api/articulos/${id}`)
        .catch(err => dispatch(RequestDestroyArticuloFail()))
        .then(data => {
            if(!data){
                return;
            }
            dispatch(RequestDestroyArticuloSuccess());
            callback();
        })
};

export const SetSearchCriteria = createAction(ActionTypes.SET_SEARCH_CRITERIA);