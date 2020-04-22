import React, { Component } from 'react';
import { Grid, Form, Segment, Header, Button, Icon, Divider, Message} from 'semantic-ui-react';
import OrganChain from '../../ethereum/organchain';

class PatientRecord extends Component{
    state ={
        publicKey : '',
        ipfsHash : '',
        loading : false,
        errMsg : ''
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState( { loading :true , errMsg :'' } );

        const { publicKey} = this.state;

        try{
            const ipfsHash = await OrganChain.methods.getEMR(publicKey).call();
            if(!ipfsHash)
                throw Object.assign(
                    new Error("Patient Doesn't Exists!")
                );
            this.setState({ipfsHash});
        }
        catch(err){
            this.setState({ errMsg : err.message })
        }
        this.setState( { loading : false} );
    }

    render(){
        return(
            <Grid centered columns={2} style={{marginTop:'20px'}}>
                <Grid.Column width={6}>
                    <Segment>
                        <Header as="h3" color="grey" style={{textAlign:"center"}}>
                            Get Patient's EMR 
                        </Header>
                        <Divider/>   
                        <Form onSubmit={this.onSubmit}  error={!!this.state.errMsg}>
                            <Form.Input 
                                value={this.state.publicKey} 
                                onChange={this.onChange} 
                                name="publicKey"  
                                label='Public Key' 
                                placeholder='Public Key' 
                                required
                            />
                            <Message error header="Oops!" content={this.state.errMsg} />
                            <Segment basic textAlign={"center"}>
                                <Button loading={this.state.loading} positive type='submit'>Get EMR</Button>
                            </Segment>
                        </Form>
                        <Segment basic textAlign={"center"}>
                            {   this.state.ipfsHash ? 
                                <Button 
                                    primary 
                                    style={{textAlign:"center"}} 
                                    href= {`https://ipfs.io/ipfs/${this.state.ipfsHash}`}
                                    target="_blank"
                                >
                                    <Icon name="download"/> Download EMR
                                </Button>
                                : null 
                            }
                        </Segment>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default PatientRecord; 