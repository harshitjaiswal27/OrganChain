import React, { Component } from 'react';
import { Grid, Form, Segment, Header, Button, Divider} from 'semantic-ui-react';
import axios from 'axios';
import ipfs from '../../ipfs';
import OrganChain from '../../ethereum/organchain'; 
import web3 from '../../ethereum/web3';

class ApproveDonor extends Component{
    state ={
        fname : '',
        lname : '',
        email : '',
        donorId : '',
        buffer : null,
        ipfsHash : '',
        EMRHash : ''
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

    onApprove = (event) => {
        event.preventDefault();

        const { fname, lname , email, buffer, ipfsHash, EMRHash, donorId } = this.state;

        axios.get(`/api/donors/${email}`)
            .then(async (res)=>{
                const {gender, city, phone, email, organ, bloodgroup } = res.data;

                const data = JSON.stringify({ fname, lname, gender, city, phone, email});
                
                const buf = Buffer.from(data);
                
                await ipfs.files.add(buf, (err, result) => {
                    if (err) console.error(err);
                    this.setState({ ipfsHash : result[0].hash });
                });
                
                await ipfs.files.add(buffer, (err, result) => {
                    if (err) console.error(err);
                    this.setState({ EMRHash: result[0].hash });
                });

                try{
                    const accounts = await web3.eth.getAccounts();
                    await OrganChain.methods.addDonor(donorId, ipfsHash, EMRHash, web3.utils.asciiToHex(organ), web3.utils.asciiToHex(bloodgroup)).send({
                                from : accounts[0],
                                gas: 1000000
                            });
                }
                catch(err){
                    console.log(err);
                }
            })
            .catch(err=> console.log("User Does Not Exist"));
    }

    render(){
        return(
            <Grid centered columns={2} style={{marginTop:'20px'}}>
                <Grid.Column width={7}>
                    <Segment>
                        <Header as="h3" color="grey" style={{textAlign:"center"}}>
                            Approve Donor
                        </Header>
                        <Divider/>
                        <Form onSubmit={this.onApprove}>
                            <Form.Input 
                                value={this.state.fname} 
                                onChange={this.onChange} 
                                name="fname"  
                                label='First Name' 
                                placeholder='First Name' 
                                required
                            />
                            <Form.Input 
                                value={this.state.lname} 
                                onChange={this.onChange} 
                                name="lname"  
                                label='Last Name' 
                                placeholder='Last Name' 
                                required
                            />
                            <Form.Input 
                                value={this.state.email}   
                                onChange={this.onChange} 
                                name="email" 
                                label='Email' 
                                placeholder='Email' 
                                type="email"
                                required
                            />
                            <Form.Input 
                                value={this.state.donorId}   
                                onChange={this.onChange} 
                                name="donorId" 
                                label='Donor Public Key' 
                                placeholder='DOnor Public Key' 
                                required
                            />
                            <Form.Input
                                onChange={this.captureFile}
                                name="EMR"
                                label="EMR"
                                type="file"
                                required
                            />
                            <Segment basic textAlign={"center"}>
                                <Button positive style={{textAlign:"center"}} type='submit'>Approve</Button>
                            </Segment>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default ApproveDonor;