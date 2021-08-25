import { Component } from 'react';
import SearchForm from '../SearchForm';
import Gallery from '../Gallery';
import Pagination from '../Pagination';
import Pexels from '../../services/Pexels';
import config from '../../config';


export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {value: '', results: [], currentPage: 1, totalResults: 0, loading: false};
        this.searchImages = this.searchImages.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    /**
     * Stops the default action of the submit event and makes an API call that gets
     * the results for the searched value stored in state.value
     * @param {Object} event 
     */
    async handleSubmit(event) {
        let form = event.target;
        let input = form[0];
        await this.setState({value: input.value, currentPage: 1});
        event.preventDefault();
        this.searchImages();
    }

    /**
     * Retrieves a new page of results from Pexels server
     * @param {Object} event
     * @param {Number} page
     */
    async handlePageChange(_event, page) {
        await this.setState({currentPage: page});
        this.searchImages();
    }

    searchImages() {
        let context = this;
        let value = this.state.value;

        if (value === null || value === '') {
            return;
        }

        this.setState({ loading: true });

        Pexels.searchImages(value, this.state.currentPage)
        .then(function (data) {
            if (!data || !data.photos) {
                context.setState({results: [], totalResults: 0, loading: false});
                return;
            }
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
     * This hook will fetch images when first rendering the component, e.g. when first clicking cats
     */
    componentDidMount() {
        this.searchImages();
    }

    /**
     * This hook will render whenever a property or state changes, fetching images only in response
     * to value property change
     * @param {Object} prevProps
     */
    async componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            await this.setState({value: this.props.value, currentPage: 1});
            this.searchImages();
        }
    }

    render() {
        return (
            <div>
                <SearchForm
                    handleSubmit={this.handleSubmit}
                />

                <Pagination
                    currentPage={this.state.currentPage}
                    total={this.state.totalResults}
                    handlePageChange={this.handlePageChange}
                />

                <Gallery
                    items={this.state.results}
                    total={this.state.totalResults}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}
