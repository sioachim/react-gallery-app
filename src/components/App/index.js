import { Component } from 'react';
import Header from '../Header';
import Nav from '../Nav';
import './index.css';



export default class App extends Component {
    render() {
        return (
            <div className="app">
                <Header />

                <Nav />
            </div>
        );
    }
}
