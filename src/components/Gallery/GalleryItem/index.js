import React, { Component } from 'react';

export default class Gallery extends Component {
    render() {
        return (
            <li>
                <img src={this.props.src} alt="" />
            </li>
        );
    }
}
