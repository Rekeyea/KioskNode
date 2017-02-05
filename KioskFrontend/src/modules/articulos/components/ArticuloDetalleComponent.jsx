import React, { Component } from 'react';
import money from "money-math";


import { 
    Card, CardActions, Chip,  
    CardHeader, CardMedia, CardTitle, CardText, FlatButton 
} from "material-ui";

export class ArticuloDetalleComponent extends Component{
    render(){
        const precioStyle = {
            fontSize: "2rem"
        };
        const precioContainerStyle = {
            width: "25%",
            display: "inline-block"
        };
        const unitario = money.floatToAmount(this.props.articulo.precioUnitario);
        const venta = money.floatToAmount(this.props.articulo.precioVenta);
        const ganancia = money.subtract(venta,unitario);
        const porcentaje = money.div(money.mul(ganancia,"100.00"),unitario); 
        let titulo = this.props.articulo.nombre;
        if(this.props.articulo.marca){
            titulo += ` | ${this.props.articulo.marca}`;
        }
        if(this.props.articulo.barcode){
            titulo += ` | ${this.props.articulo.barcode}`;
        }
        return (
            <Card 
                style={{ height: "100%"}}
                containerStyle={{display: "flex", flexDirection: "column", minHeight:"100%", maxHeight:"100%" }}
            >
                <CardHeader
                    title={titulo}
                    subtitle={
                        <span style={{display: 'flex',flexWrap: 'wrap'}}>
                            {this.props.articulo.tags.map((v,i) => (<Chip style={{margin:"3px"}} key={i}>{v}</Chip>))}
                        </span>
                    }
                    avatar={this.props.articulo.imagen}
                    />
                <CardMedia
                    style={{ 
                        display:"flex",
                        flexDirection:"column",
                        borderTop:"solid 1px gainsboro",
                        borderBottom:"solid 1px gainsboro",
                        height:"100%",
                        flex:"1"
                    }}
                    mediaStyle={{ height: "100%", textAlign: "center", flex:"1", display:"flex" }}
                    >
                    <div>
                        <img
                            style={{height:"100%"}} 
                            src={this.props.articulo.imagen} 
                            alt={this.props.articulo.nombre}
                        />
                    </div>
                </CardMedia>
                <CardTitle
                    title={this.props.articulo.nombre}
                    subtitle={this.props.articulo.dimensiones}
                    />
                <CardText>
                    <div style={{ width: "100%" }}>
                        <div style={precioContainerStyle}>
                            <label>Precio de Compra</label><br />
                            <span style={precioStyle}>$ {money.format("EUR", unitario)}</span>
                        </div>
                        <div style={precioContainerStyle}>
                            <label>Precio de Venta</label><br />
                            <span style={precioStyle}>$ {money.format("EUR", venta)}</span>
                        </div>
                        <div style={precioContainerStyle}>
                            <label>Ganancia</label><br />
                            <span style={precioStyle}>$ {money.format("EUR", ganancia)}</span>
                        </div>
                        <div style={precioContainerStyle}>
                            <label>Porcentaje de Ganancia</label><br />
                            <span style={precioStyle}>{money.format("EUR", porcentaje)} %</span>
                        </div>
                    </div>
                </CardText>
                <CardActions style={{borderTop:"solid 1px gainsboro"}}>
                    <FlatButton label="Históricos"/>
                    <FlatButton label="Editar" primary={true} onClick={this.props.editar(this.props.articulo.id)}/>
                    <FlatButton label="Eliminar" secondary={true} onClick={this.props.eliminar(this.props.articulo.id)}/>
                </CardActions>
            </Card>
        );
    }
}