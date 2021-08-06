import './index.css';
import GalleryItem from './GalleryItem';

function Gallery(props) {
    const hasResults = props.items.length > 0;

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {
                    hasResults
                    ? props.items.map(
                        ( _item, _index ) => (
                            <GalleryItem
                                key={'gallery-item-' + _index}
                                src={ _item }
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


export default Gallery;
