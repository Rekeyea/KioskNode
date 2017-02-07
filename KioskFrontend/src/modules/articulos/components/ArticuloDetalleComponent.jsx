import React, { Component } from 'react';
import money from "money-math";


import {
    Card, CardActions, Chip,
    CardHeader, CardMedia, CardTitle, CardText, FlatButton
} from "material-ui";

export class ArticuloDetalleComponent extends Component {
    render() {
        const precioStyle = {
            fontSize: "2rem"
        };
        const precioContainerStyle = {
            width: "20%",
            display: "inline-block"
        };
        const unitario = money.floatToAmount(this.props.articulo.PrecioUnitario);
        const venta = money.floatToAmount(this.props.articulo.PrecioVenta);
        const ganancia = money.subtract(venta, unitario);
        const porcentaje = money.div(money.mul(ganancia, "100.00"), unitario);
        
        let titulo = this.props.articulo.Nombre;
        if (this.props.articulo.marca) {
            titulo += ` | ${this.props.articulo.Marca}`;
        }
        if (this.props.articulo.Barcode) {
            titulo += ` | ${this.props.articulo.Barcode}`;
        }
        return (
            <Card
                style={{ height: "100%" }}
                containerStyle={{ display: "flex", flexDirection: "column", minHeight: "100%", maxHeight: "100%" }}
            >
                <CardHeader
                    title={titulo}
                    subtitle={
                        <span style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {this.props.articulo.PTags.map((v, i) => (<Chip style={{ margin: "3px" }} key={i}>{v}</Chip>))}
                        </span>
                    }
                    avatar={this.props.articulo.PImagen}
                />
                <CardMedia
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        borderTop: "solid 1px gainsboro",
                        borderBottom: "solid 1px gainsboro",
                        height: "100%",
                        flex: "1"
                    }}
                    mediaStyle={{ height: "100%", textAlign: "center", flex: "1", display: "flex" }}
                >
                    <div>
                        <img
                            style={{ height: "100%" }}
                            src={this.props.articulo.PImagen}
                            alt={this.props.articulo.Nombre}
                        />
                    </div>
                </CardMedia>
                <CardTitle
                    title={this.props.articulo.Nombre}
                    subtitle={this.props.articulo.Dimensiones}
                >
                </CardTitle>
                <CardText>
                    <div style={{ width: "100%" }}>
                        <div style={precioContainerStyle}>
                            <label>Stock Disponible</label><br />
                            <span style={precioStyle}>{this.props.articulo.Stock}</span>
                        </div>
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
                <CardActions style={{ borderTop: "solid 1px gainsboro" }}>
                    <FlatButton label="Históricos" />
                    <FlatButton label="Editar" primary={true} onClick={this.props.editar(this.props.articulo.Id)} />
                </CardActions>
            </Card>
        );
    }
}