
import React, { Component } from 'react';
import Button from '../Pagination/Button';
import config from '../../config';
import './index.css';


class Pagination extends Component {
    constructor(props) {
        super(props);

        this.changePage = this.changePage.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.goToNextPage = this.goToNextPage.bind(this);
        this.goToPreviousPage = this.goToPreviousPage.bind(this);
    }

    /**
     * Calls the handlePageChange event defined in App top component
     * @param {Object} event 
     * @param {Number} page 
     */
    setCurrentPage(event, page)  {
        this.props.handlePageChange(event, page);
    }

    /**
     * Changes the page when clicking the next page button
     * @param {Object} event 
     */
    goToNextPage(event) {
        this.setCurrentPage(event, this.props.currentPage + 1);
    }

    /**
     * Changes the page when clicking the previous page button
     * @param {Object} event 
     */
    goToPreviousPage(event) {
        this.setCurrentPage(event, this.props.currentPage - 1);
    }

    /**
     * Changes the page when clicking the page numbers buttons
     * @param {Object} event 
     */
    changePage(event) {
        const pageNumber = Number(event.target.textContent);
        this.setCurrentPage(event, pageNumber);
    }

    /**
     * Builds an array of pages based on total results and items per page
     * @returns {Array}
     */
    getPages() {
        let pages = Math.ceil(this.props.total/config.perPage);
        return new Array(pages).fill().map((_, idx) => idx + 1);
    }

    render() {
        const hasItems = this.props.total > 0;
        const firstPage = this.props.currentPage === 1;
        const lastPage = this.props.currentPage === Math.floor(this.props.total/config.perPage) || this.props.total < config.perPage;

        return (
            <ul className="pagination">
                <li>
                    <Button
                        key="prev"
                        value="prev"
                        onClick={this.goToPreviousPage}
                        className="prev"
                        active={false}
                        disabled={firstPage}
                        display={hasItems}
                    />
                </li>

                {
                    this.getPages().map((item, index) => (
                        <li key={item}>
                            <Button
                                key={item}
                                value={item}
                                onClick={this.changePage}
                                disabled={false}
                                active={this.props.currentPage === item}
                                className="paginationItem"
                                display={hasItems}
                            />
                        </li>
                    ))
                }

                <li>
                    <Button
                        key="next"
                        value="next"
                        onClick={this.goToNextPage}
                        className="next"
                        disabled={lastPage}
                        active={false}
                        display={hasItems}
                    />
                </li>
            </ul>
        );
    }
}


export default Pagination;
