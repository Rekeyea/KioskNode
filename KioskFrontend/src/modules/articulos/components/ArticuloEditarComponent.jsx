import React, { Component } from 'react';
import { connect } from "react-redux";
import { current } from "./../selectors";
import { TextField, Chip, FlatButton } from "material-ui";
import { RequestOneArticleAsync, RequestBuildArticuloAsync } from "./../actions";
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
        Nombre: "",
        Dimensiones: "",
        Tags:"",
        PTags:[],
        PrecioUnitario: 0,
        precioVenta: 0,
        Imagen: "",
        Stock: 0,
        Barcode: "",
        Marca: ""
    };
    componentDidMount() {
        this.props.RequestOneArticleAsync(this.props.params.artId);
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.isEdit) {
            const articulo = nextProps.Article || this.defaultArticulo;
            this.setState({ articulo });
        }
    }
    agregarCategoria = (evt) => {
        if (evt.key === "Enter") {
            const articulo = this.state.articulo;
            articulo.PTags.push(evt.target.value);
            articulo.Tags = articulo.PTags.join(";");
            this.setState({ articulo });
            evt.target.value = "";
        }
    };
    deleteTag = val => evt => {
        const articulo = this.state.articulo;
        articulo.PTags = articulo.PTags.filter(v => v !== val);
        articulo.Tags = articulo.PTags.join(";");
        this.setState({ articulo });
    };
    articleProperty = nombre => evt => {
        const articulo = this.state.articulo;
        articulo[nombre] = evt.target.value;
        this.setState({ articulo });
    };
    save = evt => {
        this.props.RequestBuildArticuloAsync(this.state.articulo, () => {
            this.props.ChangeUrl(`/articulos/${this.state.articulo.Id}`);
        });
    };

    render() {
        const textStyle = {
            width: "100%"
        };
        const inputStyle = {
            
        };
        const colStyle = {
        };
        return (
            <div className="row" style={{ padding: "1rem", height:"100%"}}>
                <div className="col-xs-12" style={{height: "calc(100% - 40px)"}}>
                    <div className="row" style={{height:"100%"}}>
                        <div className="col-xs-6" style={colStyle}>
                            <label><b>Nombre</b></label><br />
                            <TextField onChange={this.articleProperty("Nombre")} inputStyle={inputStyle} style={textStyle} hintText="Nombre del Artículo" value={this.state.articulo.Nombre} />
                        </div>
                        <div className="col-xs-6" style={colStyle}>
                            <label><b>Dimensiones</b></label><br />
                            <TextField onChange={this.articleProperty("Dimensiones")} inputStyle={inputStyle} style={textStyle} hintText="Dimensiones del Artículo" value={this.state.articulo.Dimensiones} />
                        </div>
                        <div className="col-xs-6" style={colStyle}>
                            <label><b>Precio Unitario</b></label><br />
                            <TextField onChange={this.articleProperty("PrecioUnitario")} inputStyle={inputStyle} style={textStyle} hintText="Precio Unitario del Artículo" value={this.state.articulo.PrecioUnitario} />
                        </div>
                        <div className="col-xs-6" style={colStyle}>
                            <label><b>Precio de Venta</b></label><br />
                            <TextField onChange={this.articleProperty("PrecioVenta")} inputStyle={inputStyle} style={textStyle} hintText="Precio de Venta del Artículo" value={this.state.articulo.PrecioVenta} />
                        </div>
                        <div className="col-xs-6" style={colStyle}>
                            <label><b>Codigo de Barras</b></label><br />
                            <TextField onChange={this.articleProperty("Barcode")} inputStyle={inputStyle} style={textStyle} hintText="Código de Barras del Artículo" value={this.state.articulo.Barcode} />
                        </div>
                        <div className="col-xs-6" style={colStyle}>
                            <label><b>Marca</b></label><br />
                            <TextField onChange={this.articleProperty("Marca")} inputStyle={inputStyle} style={textStyle} hintText="Marca del Artículo" value={this.state.articulo.Marca} />
                        </div>
                        <div className="col-xs-6" style={colStyle}>
                            <label><b>Categorías</b></label><br />
                            <TextField style={textStyle} inputStyle={inputStyle} hintText="Categorias del Artículo" onKeyPress={this.agregarCategoria} />
                            <div style={{ display: "flex" }}>
                                {this.state.articulo.PTags.map((v, i) => <Chip key={i} onRequestDelete={this.deleteTag(v)} style={{ margin: 4 }}>{v}</Chip>)}
                            </div>
                        </div>
                        <div className="col-xs-6" style={colStyle}>
                            <label><b>Imagen</b></label><br />
                            <TextField onChange={this.articleProperty("Imagen")} inputStyle={inputStyle} style={textStyle} hintText="Imágen del Articulo" value={this.state.articulo.Imagen} />
                        </div>
                    </div>
                </div>
                <div className="col-xs-12" style={{ height:"40px" }}>
                    <FlatButton style={{float:"right"}} onClick={this.save} label="Guardar" />
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        Article: current(state)
    };
};

const mapActionsToProps = {
    RequestOneArticleAsync,
    RequestBuildArticuloAsync,
    ChangeUrl: push
};

export const ArticuloEditarComponent = connect(mapStateToProps, mapActionsToProps)(ArticuloEditarComponentNotYetConnected);