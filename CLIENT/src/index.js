import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';

class App extends Component {

    state = {
        authenticated: false,
        user: null,
      };

    componentDidMount(){
        const x = window.localStorage.getItem("isAuthenticated")==="true";
        this.setState({authenticated: x});
    }

    loginUser = async (token) =>{
        console.log(token);
        
        this.setState({authenticated : true});
    }

    logoutUser(){
        this.setState({authenticated:false});
        window.localStorage.removeItem("isAuthenticated");
        window.localStorage.removeItem("token");
    }

    render(){
        return (
            <Router>
                <Routes />
            </Router>
        );
    }
}
ReactDOM.render(<App/>, document.querySelector('.container'));