import React, { Component } from 'react';
import {TextField,FontIcon} from "material-ui";
import ActionSearch from 'material-ui/svg-icons/action/search';

export class SearchBox extends Component{
    render(){
        return (
            <div className="row">
                <FontIcon style={{lineHeight:"48px"}}>
                    <ActionSearch/>
                </FontIcon>
                <TextField name="search" hintText={this.props.hintText} onChange={evt => this.props.change(evt.target.value)}/>
            </div>
        );
    }
}