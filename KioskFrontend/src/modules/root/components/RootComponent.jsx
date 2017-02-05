import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {Link} from "react-router";

export class RootComponent extends Component{
    items = [
        {
            Titulo : "Administrar Articulos",
            Descripcion: "Puedes listar, crear, modificar y eliminar artículos",
            Url: "/articulos"
        },
        {
            Titulo : "Administrar Categorías de Articulos",
            Descripcion: "Puedes listar, crear, modificar y eliminar categorías de artículos",
            Url: "/categorias"
        }
    ];
    render(){
        return (
            <div className="row">
                {this.items.map(v => (
                    <Link to={v.Url} className="col-xs-3" style={{textDecoration: "none", height:"100%"}}>
                        <Card>
                            <CardTitle title={v.Titulo}/>
                            <CardText>{v.Descripcion}</CardText>
                        </Card>
                    </Link>    
                ))}        
            </div>
        );
    }
}