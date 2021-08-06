import './index.css';
import Header from '../Header';
import Nav from '../Nav';
import Gallery from '../Gallery';

function App() {
    return (
        <div className="App">
            <header className="App-header">
            <div class="container">
                <Header/>
                <Nav/>
                <Gallery/>
            </div>
            </header>
        </div>
    );
}

export default App;
