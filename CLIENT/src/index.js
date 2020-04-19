import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';
import Layout from './components/Layout'

class App extends Component {
    render(){
        return (
            <Router>
                <Layout>
                    <div style={{marginTop:"20px"}}>
                        <Routes />
                    </div>
                </Layout>
            </Router>
        );
    }
}
ReactDOM.render(<App/>, document.querySelector('.container'));