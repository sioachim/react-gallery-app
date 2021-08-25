import React, { Component } from 'react';
import Search from '../Search';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import './index.css';

export default class Nav extends Component {
    render() {
        return (
            <div>
                <Router>
                    <nav className="main-nav">
                        <ul>
                            <li>
                                <Link to={'/search/cats'}>Cats</Link>
                            </li>
                            <li>
                                <Link to={'/search/dogs'}>Dogs</Link>
                            </li>
                            <li>
                                <Link to={'/search/computers'}>Computers</Link>
                            </li>
                        </ul>

                        <Switch>
                            <Route exact path="/">
                                <Search value="" />
                            </Route>
                            <Route exact path="/search/cats">
                                <Search value="cats" />
                            </Route>
                            <Route exact path="/search/dogs">
                                <Search value="dogs" />
                            </Route>
                            <Route exact path="/search/computers">
                                <Search value="computers" />
                            </Route>
                        </Switch>
                    </nav>
                </Router>
            </div>
        );
    }
}
