import {NAME,LIST,SEARCH,CURRENT} from "./constants";
import Fuse from "fuse.js";

export const list = (state) =>state[NAME][LIST];

export const current = state => state[NAME][CURRENT];

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
                "Nombre",
                "PTags",
                "Dimensiones",
                "Marca",
                "Barcode"
            ]
        });
        const articulos = f.search(text);
        return articulos;
    }else{
        return list(state);
    }
}

export const get = state => id => list(state).find(v => v.Id === Number(id));