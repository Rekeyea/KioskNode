import {createAction} from "redux-actions";
import * as ActionTypes from "./actionTypes";
import {HttpClient} from "./../common/http";

export const RequestArticulos = createAction(ActionTypes.GET_ARTICULOS_REQUEST);
export const RequestArticulosSuccess = createAction(ActionTypes.GET_ARTICULOS_SUCCESS);
export const RequestArticulosFail = createAction(ActionTypes.GET_ARTICULOS_FAIL);
export const RequestArticulosAsync = () => dispatch => {
    dispatch(RequestArticulos());
    return HttpClient.get("api/articulos")
        .catch(err => {
            dispatch(RequestArticulosFail())
        })
        .then(data => {
            if(!data){
                return;
            }
            const articulos = data.data;
            // **** change when having server
            dispatch(RequestArticulosSuccess(articulos));
        })
};

export const RequestOneArticle = createAction(ActionTypes.GET_ONE_ARTICLE_REQUEST);
export const RequestOneArticleSuccess = createAction(ActionTypes.GET_ONE_ARTICLE_SUCCESS);
export const RequestOneArticleFail = createAction(ActionTypes.GET_ONE_ARTICLE_FAIL);
export const RequestOneArticleAsync = id => dispatch => {
    dispatch(RequestOneArticle());
    HttpClient.get(`/api/articulos/${id}`)
        .catch(err => {
            dispatch(RequestOneArticleFail())
        })
        .then(data => {
            if(!data){
                return;
            }
            const articulo = data.data;
            // **** change when having server
            dispatch(RequestOneArticleSuccess(articulo));
        })
};

export const RequestBuildArticulo = createAction(ActionTypes.BUILD_ARTICULOS_REQUEST);
export const RequestBuildArticuloSuccess = createAction(ActionTypes.BUILD_ARTICULOS_SUCCESS);
export const RequestBuildArticuloFail = createAction(ActionTypes.BUILD_ARTICULOS_FAIL);
export const RequestBuildArticuloAsync = (articulo,callback) => dispatch => {
    dispatch(RequestBuildArticulo());
    if(articulo.Id){
        HttpClient.put(`/api/articulos/${articulo.Id}`,articulo)
        .catch(err => dispatch(RequestBuildArticuloFail()))
        .then(data => {
            dispatch(RequestBuildArticuloSuccess());
            callback();
        });
    }else{
        HttpClient.post("/api/articulos",articulo)
        .catch(err => dispatch(RequestBuildArticuloFail()))
        .then(data => {
            dispatch(RequestBuildArticuloSuccess());
            callback();
        });
    }
     
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