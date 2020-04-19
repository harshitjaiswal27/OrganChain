import React, { Component } from 'react';
import {Grid, Segment, Header, Form, Button, Divider} from 'semantic-ui-react';
import axios from 'axios';

class HospitalLogin extends Component{
    state ={
        username : '',
        password : ''
    }

    onSubmit = event =>{
        event.preventDefault();

        const { username , password} = this.state;
        const user = { username , password};

        axios.post("/api/hospitals/login",user)
            .then((res) => {
                if (!res.data.token) 
                    window.alert("Wrong Credentials");
                localStorage.setItem("isAuthenticated","true");
                window.localStorage.setItem("token",res.data.token);
                window.location = "/";
            })
            .catch(err=> window.alert("Invalid Credentials"));

    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render(){
        return (
            <Grid centered columns={2} style={{marginTop:'20px'}}>
                <Grid.Column width={7}>
                    <Segment>
                        <Header as="h3" color="grey" style={{textAlign:"center"}}>
                            Hospital Log In
                        </Header>
                        <Divider/>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Input 
                                value={this.state.username} 
                                onChange={this.onChange} 
                                name="username"  
                                label='Username' 
                                placeholder='Username' 
                                required
                            />
                            <Form.Input 
                                value={this.state.password}   
                                onChange={this.onChange} 
                                name="password" 
                                label='Password' 
                                placeholder='Password' 
                                type="password"
                                required
                            />
                            <Segment basic textAlign={"center"}>
                                <Button positive style={{textAlign:"center"}} type='submit'>Submit</Button>
                            </Segment>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default HospitalLogin;