import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';

class App extends Component {
    render(){
        return (
            <Router>
                <Routes />
            </Router>
        );
    }
}
ReactDOM.render(<App/>, document.querySelector('.container'));