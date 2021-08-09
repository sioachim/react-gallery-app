import React, { Component } from 'react';

export default class Nav extends Component {
    render() {
        return (
            <li><a href={'/#' + this.props.name} onClick={this.props.handleClick}>{this.props.name}</a></li>
        );
    }
}
