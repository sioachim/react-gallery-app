import { Component } from 'react';
import Header from '../Header';
import SearchForm from '../SearchForm';
import Nav from '../Nav';
import Pagination from '../Pagination';
import Gallery from '../Gallery';
import Pexels from '../../services/Pexels';
import './index.css';
import config from '../../config';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {value: '', results: [], currentPage: 1, totalResults: 0, loading: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    /**
     * Sets the state value for "value" when user inputs some text in the search input field
     * and resets the current page to 1
     * @param {Object} event
     */
    handleChange(event) {
        this.setState({value: event.target.value, currentPage: 1});
    }

    /**
     * Stops the default action of the submit event and makes an API call that gets
     * the results for the searched value stored in state.value
     * @param {Object} event 
     */
    handleSubmit(event) {
        event.preventDefault();
        let context = this;
        this.setState({ loading: true });

        Pexels.searchImages(this.state.value, this.state.currentPage)
        .then(function (data) {
            // reduce the total results from thousands or hundreds to tens of results
            let total = 0;
            if (data.total_results > 1000) {
                total = data.total_results / 100;
            } else if (data.total_results > 100) {
                total = data.total_results / 10;
            }
            total = Math.floor(total);
            // for last page subtract from total the number of results from all previous pages
            let max = total - context.state.currentPage * config.perPage;
            data.photos = data.photos.slice(0, max);
            context.setState({results: data.photos, totalResults: total, loading: false});
        });
    }

    /**
     * Stops the default action of the click event and chains the actions
     * taken by handleChange and handleSubmit
     * @param {Object} event 
     */
    async handleClick(event) {
        event.preventDefault();
        // init the value of the event with the proper value to be used by handleChange
        event.target.value = event.target.textContent;

        await this.handleChange(event);
        await this.handleSubmit(event);
    }

    /**
     * Retrieves a new page of results from Pexels server
     * @param {Object} event 
     * @param {Number} page 
     */
    async onPageChange(event, page) {
        await this.setState({currentPage: page});
        await this.handleSubmit(event);
    }

    render() {
        return (
            <div className="app">
                <Header />
                <SearchForm
                    value={this.state.value}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
                <Nav
                    items={[
                        'Cats',
                        'Dogs',
                        'Computers'
                    ]}
                    handleClick={this.handleClick}
                />

                <div className="d-flex flex-row py-4 align-items-center">
                    <Pagination
                        currentPage={this.state.currentPage}
                        total={this.state.totalResults}
                        onPageChange={this.onPageChange}
                    />
                </div>

                <Gallery
                    items={this.state.results}
                    total={this.state.totalResults}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

