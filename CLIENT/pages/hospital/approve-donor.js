import React, { Component } from 'react';
import { Grid, Form, Segment, Header, Button, Label} from 'semantic-ui-react';
import ipfs from '../../ipfs';
import Layout from '../../components/Layout';

class ApproveDonor extends Component{
    state ={
        name : '',
        email : '',
        buffer : null,
        ipfsHash : ''
    }

    onApprove = event =>{
        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    captureFile = event => {
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = ()=>{
            this.setState({buffer : Buffer(reader.result)});
        }
    }

    onApprove = async (event) => {
        event.preventDefault();

        const { name , email, buffer, ipfsHash } = this.state;

        await ipfs.add(this.state.buffer, (err, result)=>{
            if(err) console.log(err);
            else this.setState({ ipfsHash : result[0].hash });
        });

        const donor = { name, email, ipfsHash };
        console.log(donor);
    }

    render(){
        return(
            <Layout>
                <div style={{marginTop:"20px"}}>
                <Grid centered columns={2} style={{marginTop:'20px'}}>
                        <Grid.Column width={7}>
                            <Segment>
                                <Header as="h3" color="grey" style={{textAlign:"center"}}>
                                    Approve Donor
                                </Header>
                            </Segment>
                            <Form onSubmit={this.onApprove}>
                                <Form.Input 
                                    value={this.state.name} 
                                    onChange={this.onChange} 
                                    name="name"  
                                    label='Name' 
                                    placeholder='Name' 
                                    required
                                />
                                <Form.Input 
                                    value={this.state.email}   
                                    onChange={this.onChange} 
                                    name="email" 
                                    label='Email' 
                                    placeholder='Email' 
                                    type="email"
                                    focus
                                    required
                                />
                                <Form.Input
                                    onChange={this.captureFile}
                                    name="EMR"
                                    label="EMR"
                                    type="file"
                                    focus
                                    required
                                />
                                <Segment basic textAlign={"center"}>
                                    <Button positive style={{textAlign:"center"}} type='submit'>Approve</Button>
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </div>
            </Layout>
        )
    }
}

export default ApproveDonor;