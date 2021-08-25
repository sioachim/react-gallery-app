
import React, { Component } from 'react';
import './index.css';


class Button extends Component {
    render() {
        let className = this.props.className;
        className = className + (this.props.active ? ' active' : '');

        if (this.props.display) {
            if (this.props.disabled) {
                return <span>{this.props.value}</span>;
            }
            return (
                <button
                    onClick={this.props.onClick}
                    className={className}
                >
                    {this.props.value}
                </button>
            );
        }
        return '';
    }
}


export default Button;
