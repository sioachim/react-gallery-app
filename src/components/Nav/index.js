import React, { Component } from 'react';
import NavItem from './NavItem';
import './index.css';

export default class Nav extends Component {
    render() {
        return (
            <nav className="main-nav">
                <ul>
                    {
                        this.props.items.map(
                            ( _item, _index ) => (
                                <NavItem
                                    key={'nav-item-' + _index}
                                    name={ _item }
                                />
                            )
                        )
                    }
                </ul>
            </nav>
        );
    }
}
