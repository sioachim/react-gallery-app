import config from '../../config';

const Pexels = {
    searchImages: function(term, currentPage) {
        const perPage = config.perPage;

        return fetch('https://api.pexels.com/v1/search?query=' + term + '&per_page=' + perPage + '&page=' + currentPage, {
            method: 'GET',
            headers: new Headers({
                'Authorization': config.pexelsApiKey
            })
        }).then(response => {
            return response.json();
        }).catch(err => {
            console.log(err);
        });
    }
};

export default Pexels;
