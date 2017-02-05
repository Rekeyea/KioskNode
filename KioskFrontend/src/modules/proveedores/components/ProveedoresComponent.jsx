import React, { Component } from 'react';
import { connect } from "react-redux";
import { } from "./../actions";
import { } from "./../selectors";
import { 
    FloatingActionButton, List, ListItem, Avatar, Subheader, Paper 
} from "material-ui";
import ContentAdd from 'material-ui/svg-icons/content/add';
import {} from "./ArticuloDetalleComponent";
import {SearchBox} from "./../../common/components/SearchBox";
import { push } from 'react-router-redux';
import money from "money-math";

class ProveedoresComponentNotYetConnected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search:"",
            deleteModalIsOpened:false
        };
    }
    construirNuevo = () => {
        this.props.ChangeUrl("/construir-proveedor");
    };
    editarExistente = (id) => () => {
        this.props.ChangeUrl(`/construir-proveedor/${id}`);
    };
    eliminarExistente = id => () => {
        this.props.RequestDestroyProveedorAsync(id,() => {this.setState({proveedor:undefined}); this.props.RequestProveedoresAsync();});
    }
    componentDidMount() {
        this.props.RequestProveedoresAsync();
    }
    render() {
        return (
            <div style={{ height: "100%" }} className="row">
                <Paper className="col-xs-3" style={{ height: "100%" }} zDepth={2}>
                    <SearchBox hintText="Buscar Artículos" change={search => this.props.SetSearchCriteria(search)}/>
                    <List>
                        <Subheader>Proveedores</Subheader>
                        {this.props.Proveedores.map((v, i) => (
                            <ListItem
                                key={i}
                                leftAvatar={<Avatar src={v.imagen} />}
                                primaryText={`${v.nombre}`}
                                secondaryText={v.razonSocial}
                                onClick={evt => this.setState({ proveedor: v, edit:false })}
                                />
                        ))}
                    </List>
                </Paper>
                <div className="col-xs-9" style={{ height: "100%" }}>
                    <FloatingActionButton onClick={this.construirNuevo} secondary={true} style={{position:"fixed",top:"40px",zIndex:"10000",right:"6rem"}}>
                        <ContentAdd/>
                    </FloatingActionButton>
                    {
                        this.state.proveedor
                            ? <ProveedorDetalleComponent 
                                eliminar={this.eliminarExistente} 
                                editar={this.editarExistente} 
                                proveedor={this.state.proveedor}
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
        
    };
};

const mapActionsToProps = {
   
};

export const ProveedoresComponent = connect(mapStateToProps, mapActionsToProps)(ProveedoresComponentNotYetConnected);