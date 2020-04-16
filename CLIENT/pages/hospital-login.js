import React, { Component } from 'react';
import {Grid, Segment, Header, Form, Button} from 'semantic-ui-react';
import Layout from '../components/Layout';

class HospitalLogin extends Component{
    state ={
        username : '',
        password : ''
    }

    onSubmit = event =>{
        event.preventDefault();

        
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render(){
        return (
            <Layout>
                <div style={{marginTop:"20px"}}>
                <Grid centered columns={2} style={{marginTop:'20px'}}>
                        <Grid.Column width={7}>
                            <Segment>
                                <Header as="h3" color="grey" style={{textAlign:"center"}}>
                                    Hospital Log In
                                </Header>
                            </Segment>
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
                                    focus
                                    required
                                />
                                <Segment basic textAlign={"center"}>
                                    <Button positive style={{textAlign:"center"}} type='submit'>Submit</Button>
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </div>
            </Layout>
        )
    }
}

export default HospitalLogin;