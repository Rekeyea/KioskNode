import React, { Component } from 'react';
import { connect } from "react-redux";
import { 
    RequestArticulosAsync, SetSearchCriteria, RequestDestroyArticuloAsync, RequestOneArticleAsync 
} from "./../actions";
import { filter_list, current } from "./../selectors";
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
        this.props.RequestDestroyArticuloAsync(id,() => {
            this.props.RequestArticulosAsync()
            this.props.ChangeUrl("/articulos");
        });
    }
    componentDidMount() {
        this.props.RequestArticulosAsync();
        
        if(this.props.params.artId){
            this.props.RequestOneArticleAsync(this.props.params.artId);
        }
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
                                leftAvatar={<Avatar src={v.PImagen} />}
                                primaryText={`${v.Nombre} - $${money.format("EUR", money.floatToAmount(v.PrecioVenta))}`}
                                secondaryText={v.Dimensiones}
                                onClick={evt => this.props.RequestOneArticleAsync(v.Id)}
                                />
                        ))}
                    </List>
                </Paper>
                <div className="col-xs-9" style={{ height: "100%" }}>
                    <FloatingActionButton onClick={this.construirNuevo} secondary={true} style={{position:"fixed",top:"40px",zIndex:"10000",right:"6rem"}}>
                        <ContentAdd/>
                    </FloatingActionButton>
                    {
                        this.props.Current
                            ? <ArticuloDetalleComponent 
                                eliminar={this.eliminarExistente} 
                                editar={this.editarExistente} 
                                articulo={this.props.Current}
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
        Articulos: filter_list(state),
        Current: current(state)
    };
};

const mapActionsToProps = {
    RequestArticulosAsync,
    ChangeUrl : push,
    SetSearchCriteria,
    RequestDestroyArticuloAsync,
    RequestOneArticleAsync
};

export const ArticulosComponent = connect(mapStateToProps, mapActionsToProps)(ArticulosComponentNotYetConnected);