
import React, { Component } from 'react';
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
     * Calls the onPageChange event defined in App top component
     * @param {Object} event 
     * @param {Number} page 
     */
    setCurrentPage(event, page)  {
        this.props.onPageChange(event, page);
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
    getPaginationGroup() {
        let start = Math.floor((this.props.currentPage - 1) / config.perPage) * config.perPage;
        let pages = Math.floor(this.props.total/config.perPage);
        return new Array(pages).fill().map((_, idx) => start + idx + 1);
    }

    render() {
        const hasItems = this.props.total > 0;
        const firstPage = this.props.currentPage === 1;
        const lastPage = this.props.currentPage === Math.floor(this.props.total/config.perPage) || this.props.total < config.perPage;

        return (
            <div className="pagination">
            {
                hasItems
                ? <div>
                        <button
                            onClick={this.goToPreviousPage}
                            className={`prev ${firstPage ? 'disabled' : ''}`}
                        >
                            prev
                        </button>

                        {
                            this.getPaginationGroup().map((item, index) => (
                                <button
                                    key={index}
                                    onClick={this.changePage}
                                    className={`paginationItem ${this.props.currentPage === item ? 'active' : ''}`}
                                >
                                    <span>{item}</span>
                                </button>
                            ))
                        }

                        <button
                            onClick={this.goToNextPage}
                            className={`next ${lastPage ? 'disabled' : ''}`}
                        >
                            next
                        </button>
                    </div>
                : ''
            }
            </div>
        );
    }
}


export default Pagination;
