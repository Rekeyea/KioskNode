import React, { Component } from 'react';
import {AppBar,Paper} from "material-ui";

export class MasterComponent extends Component{
    render(){
        return (
            <div style={{height:"100%"}}>
                <AppBar title="Kiosko"/>
                <div style={{height:"calc(100% - 64px)"}} className="container">
                    <Paper style={{height:"calc(100% - 2rem)",margin:"1rem"}} zDepth={3}>
                        {this.props.children}
                    </Paper>
                </div>
            </div>
        );
    }
}