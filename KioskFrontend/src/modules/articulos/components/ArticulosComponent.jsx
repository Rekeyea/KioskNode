import React, { Component } from 'react';
import { connect } from "react-redux";
import { RequestArticulosAsync, SetSearchCriteria, RequestDestroyArticuloAsync } from "./../actions";
import { filter_list } from "./../selectors";
import { 
    FloatingActionButton, List, ListItem, Avatar, Subheader, Paper 
} from "material-ui";
import ContentAdd from 'material-ui/svg-icons/content/add';
import {ArticuloDetalleComponent} from "./ArticuloDetalleComponent";
import {SearchBox} from "./../../common/components/SearchBox";
import { push } from 'react-router-redux';
import money from "money-math";

class ArticulosComponentNotYetConnected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search:"",
            deleteModalIsOpened:false
        };
    }
    construirNuevo = () => {
        this.props.ChangeUrl("/construir-articulo");
    };
    editarExistente = (id) => () => {
        this.props.ChangeUrl(`/construir-articulo/${id}`);
    };
    eliminarExistente = id => () => {
        this.props.RequestDestroyArticuloAsync(id,() => {this.setState({articulo:undefined}); this.props.RequestArticulosAsync();});
    }
    componentDidMount() {
        this.props.RequestArticulosAsync();
    }
    render() {
        return (
            <div style={{ height: "100%" }} className="row">
                <Paper className="col-xs-3" style={{ height: "100%" }} zDepth={2}>
                    <SearchBox hintText="Buscar Artículos" change={search => this.props.SetSearchCriteria(search)}/>
                    <List>
                        <Subheader>Articulos</Subheader>
                        {this.props.Articulos.map((v, i) => (
                            <ListItem
                                key={i}
                                leftAvatar={<Avatar src={v.imagen} />}
                                primaryText={`${v.nombre} - $${money.format("EUR", money.floatToAmount(v.precioVenta))}`}
                                secondaryText={v.dimensiones}
                                onClick={evt => this.setState({ articulo: v, edit:false })}
                                />
                        ))}
                    </List>
                </Paper>
                <div className="col-xs-9" style={{ height: "100%" }}>
                    <FloatingActionButton onClick={this.construirNuevo} secondary={true} style={{position:"fixed",top:"40px",zIndex:"10000",right:"6rem"}}>
                        <ContentAdd/>
                    </FloatingActionButton>
                    {
                        this.state.articulo
                            ? <ArticuloDetalleComponent 
                                eliminar={this.eliminarExistente} 
                                editar={this.editarExistente} 
                                articulo={this.state.articulo}
                               />
                            : null
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        Articulos: filter_list(state)
    };
};

const mapActionsToProps = {
    RequestArticulosAsync,
    ChangeUrl : push,
    SetSearchCriteria,
    RequestDestroyArticuloAsync
};

export const ArticulosComponent = connect(mapStateToProps, mapActionsToProps)(ArticulosComponentNotYetConnected);