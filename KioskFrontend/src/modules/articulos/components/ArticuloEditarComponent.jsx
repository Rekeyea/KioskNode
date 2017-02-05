import React, { Component } from 'react';
import { connect } from "react-redux";
import { get } from "./../selectors";
import { TextField, Chip, FlatButton } from "material-ui";
import { RequestArticulosAsync, RequestBuildArticuloAsync } from "./../actions";
import { push } from 'react-router-redux';


class ArticuloEditarComponentNotYetConnected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: props.params.artId,
            artId: props.params.artId,
            articulo: this.defaultArticulo
        };
    }
    defaultArticulo = {
        nombre: "",
        dimensiones: "",
        tags: [
        ],
        precioUnitario: "",
        precioVenta: "",
        imagen: "",
        stock: 0,
        barcode: "",
        marca: ""
    };
    componentDidMount() {
        this.props.RequestArticulosAsync();
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.isEdit) {
            const articulo = nextProps.Get(this.state.artId) || this.defaultArticulo;
            this.setState({ articulo });
        }
    }
    agregarCategoria = (evt) => {
        if (evt.key === "Enter") {
            const articulo = this.state.articulo;
            articulo.tags.push(evt.target.value);
            this.setState({ articulo });
            evt.target.value = "";
        }
    };
    deleteTag = val => evt => {
        const articulo = this.state.articulo;
        articulo.tags = articulo.tags.filter(v => v !== val);
        this.setState({ articulo });
    };
    articleProperty = nombre => evt => {
        const articulo = this.state.articulo;
        articulo[nombre] = evt.target.value;
        this.setState({ articulo });
    };
    changeFile = evt => {
        const imagen = evt.target.files[0];
        const articulo = this.state.articulo;
        articulo.imagen = imagen;
        this.setState({ articulo });
    };
    save = evt => {
        this.props.RequestBuildArticuloAsync(this.state.articulo, () => this.props.ChangeUrl("/articulos"));
    };

    render() {
        const textStyle = {
            width: "100%"
        };
        return (
            <div className="row" style={{ padding: "1rem", height: "calc(100% - 40px)" }}>
                <div className="col-xs-6">
                    <label><b>Nombre</b></label><br />
                    <TextField onChange={this.articleProperty("nombre")} style={textStyle} hintText="Nombre del Artículo" value={this.state.articulo.nombre} />
                </div>
                <div className="col-xs-6">
                    <label><b>Dimensiones</b></label><br />
                    <TextField onChange={this.articleProperty("dimensiones")} style={textStyle} hintText="Dimensiones del Artículo" value={this.state.articulo.dimensiones} />
                </div>
                <div className="col-xs-6">
                    <label><b>Precio Unitario</b></label><br />
                    <TextField onChange={this.articleProperty("precioUnitario")} style={textStyle} hintText="Precio Unitario del Artículo" value={this.state.articulo.precioUnitario} />
                </div>
                <div className="col-xs-6">
                    <label><b>Precio de Venta</b></label><br />
                    <TextField onChange={this.articleProperty("precioVenta")} style={textStyle} hintText="Precio de Venta del Artículo" value={this.state.articulo.precioVenta} />
                </div>
                <div className="col-xs-6">
                    <label><b>Codigo de Barras</b></label><br />
                    <TextField onChange={this.articleProperty("barcode")} style={textStyle} hintText="Código de Barras del Artículo" value={this.state.articulo.barcode} />
                </div>
                <div className="col-xs-6">
                    <label><b>Marca</b></label><br />
                    <TextField onChange={this.articleProperty("marca")} style={textStyle} hintText="Marca del Artículo" value={this.state.articulo.marca} />
                </div>
                <div className="col-xs-6">
                    <label><b>Categorías</b></label><br />
                    <TextField style={textStyle} hintText="Categorias del Artículo" onKeyPress={this.agregarCategoria} />
                    <div style={{ display: "flex" }}>
                        {this.state.articulo.tags.map((v, i) => <Chip key={i} onRequestDelete={this.deleteTag(v)} style={{ margin: 4 }}>{v}</Chip>)}
                    </div>
                </div>
                <div className="col-xs-6">
                    <label><b>Imagen</b></label><br />
                    <input type="file" name="imagen" onChange={this.changeFile} />
                </div>
                <FlatButton onClick={this.save} style={{ position: "fixed", bottom: "1.5rem", right: "6rem" }} label="Guardar" />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        Get: get(state)
    };
};

const mapActionsToProps = {
    RequestArticulosAsync,
    RequestBuildArticuloAsync,
    ChangeUrl: push
};

export const ArticuloEditarComponent = connect(mapStateToProps, mapActionsToProps)(ArticuloEditarComponentNotYetConnected);