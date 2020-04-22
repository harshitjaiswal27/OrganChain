import React, { Component } from 'react';
import {Grid, Segment, Header, Form, Button, Divider, Message} from 'semantic-ui-react';
import axios from 'axios';

class HospitalLogin extends Component{
    state ={
        username : '',
        password : '',
        errMsg :''
    }

    onSubmit = event =>{
        event.preventDefault();

        this.setState( {  errMsg :'' } );

        const { username , password} = this.state;
        const user = { username , password};

        axios.post("/api/hospitals/login",user)
            .then((res) => {
                localStorage.setItem("isAuthenticated","true");
                window.localStorage.setItem("token",res.data.token);
                window.location = "/";
            })
            .catch(err=> this.setState({ errMsg : err.message }));

    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render(){
        return (
            <Grid centered columns={2} style={{marginTop:'20px'}}>
                <Grid.Column width={6}>
                    <Segment>
                        <Header as="h3" color="grey" style={{textAlign:"center"}}>
                            Hospital Log In
                        </Header>
                        <Divider/>
                        <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
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
                            <Message error header="Oops!" content={this.state.errMsg} />
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