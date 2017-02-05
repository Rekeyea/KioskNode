import {NAME,LIST,SEARCH} from "./constants";
import Fuse from "fuse.js";

export const list = (state) => {
    return state[NAME][LIST].map(v => {
        const articulo = v;
        articulo.imagen = articulo.imagen.indexOf("http") === -1 ? process.env.REACT_APP_API_URL + articulo.imagen : articulo.imagen;
        return articulo;
    });
}

export const filter_list = state => {
    const text = state[NAME][SEARCH];
    if(text && text !== ""){
        const f = new Fuse(list(state),{
            shouldSort: true,
            threshold: 0.35,
            location: 0,
            distance: 20,
            maxPatternLength: 32,
            keys: [
                "nombre",
                "tags",
                "dimensiones",
                "marca",
                "barcode"
            ]
        });
        const articulos = f.search(text);
        return articulos;
    }else{
        return list(state);
    }
}

export const get = state => id => {
    return list(state).find(v => v.id === Number(id));
}