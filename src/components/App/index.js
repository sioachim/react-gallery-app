import { Component } from 'react';
import Header from '../Header';
import Nav from '../Nav';
import Gallery from '../Gallery';
import './index.css';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="container">
                    <Header/>
                    <Nav/>
                    <Gallery 
                        items={[
                            'https://farm5.staticflickr.com/4334/37032996241_4c16a9b530.jpg',
                            'https://farm5.staticflickr.com/4342/36338751244_316b6ee54b.jpg',
                            'https://farm5.staticflickr.com/4343/37175099045_0d3a249629.jpg',
                            'https://farm5.staticflickr.com/4425/36337012384_ba3365621e.jpg'
                    ]}/>
                </div>
            </div>
        );
    }
}

