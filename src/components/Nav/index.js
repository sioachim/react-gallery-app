import React, { Component } from 'react';
import './index.css';

export default class Nav extends Component {
    render() {
        return (
            <nav className="main-nav">
                <ul>
                    <li><a href='/#'>Cats</a></li>
                    <li><a href='/#'>Dogs</a></li>
                    <li><a href='/#'>Computers</a></li>
                </ul>
            </nav>
        );
    }
}
