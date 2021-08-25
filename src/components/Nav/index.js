import React, { Component } from 'react';
import Search from '../Search';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from 'react-router-dom';
import './index.css';

function Switcher() {
    let { id } = useParams();

    return (
        <Route exact path={'/search/' + id}>
            <Search value={id} />
        </Route>
    );
}

export default class Nav extends Component {
    render() {
        return (
            <div>
                <Router>
                    <nav className="main-nav">
                        <ul>
                            <li>
                                <Link to="/search/cats">Cats</Link>
                            </li>
                            <li>
                                <Link to="/search/dogs">Dogs</Link>
                            </li>
                            <li>
                                <Link to="/search/computers">Computers</Link>
                            </li>
                        </ul>

                        <Switch>
                            <Route exact path="/">
                                <Search value="" />
                            </Route>
                            <Route path="/search/:id" children={<Switcher />} />
                        </Switch>
                    </nav>
                </Router>
            </div>
        );
    }
}
