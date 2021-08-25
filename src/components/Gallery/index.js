import React, { Component } from 'react';
import GalleryItem from './GalleryItem';
import LoadingSpinner from '../LoadingSpinner';
import './index.css';

export default class Gallery extends Component {
    render() {
        const hasItems = this.props.items && this.props.items.length > 0;
        return (
            <div className="photo-container">
                <h2>{this.props.total + ' results'}</h2>
                {
                    this.props.loading ? <LoadingSpinner /> : ''
                }
                <ul>
                    {
                        this.props.loading
                        ? ''
                        : hasItems
                        ? this.props.items.map(
                            ( _item, _index ) => (
                                <GalleryItem
                                    key={'gallery-item-' + _index}
                                    src={_item.src.medium}
                                />
                            )
                        )
                        :
                        <li className="not-found">
                            <h3>No Results Found</h3>
                            <p>You search did not return any results. Please try again.</p>
                        </li>
                    }
                </ul>
            </div>
        );
    }
}
