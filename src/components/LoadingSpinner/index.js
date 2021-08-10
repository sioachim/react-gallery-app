import React, { Component } from 'react';
import spinner from './spinner.gif';

export default class LoadingSpinner extends Component {
    render() {
        return (
            <img src={spinner} alt="Loading ..." />
        );
    }
}
