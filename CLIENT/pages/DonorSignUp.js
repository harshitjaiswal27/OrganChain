import React,{ Component} from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Form , Button, Grid, Segment, Header} from 'semantic-ui-react';
import { Router } from '../routes';

class DonorSignUp extends Component {
    state = {
        fname : '',
        lname : '',
        gender : 'Male',
        address : '',
        phone : '',
        email : '',
        bloodgroup : 'A',
        organ : 'Eyes'
    }

    onSubmit = event => {
        event.preventDefault();

        const { fname, lname, gender, address, phone, email,bloodgroup, organ } = this.state;

        const donor = { fname, lname, gender, address, phone, email,bloodgroup, organ };

        axios.post("http://localhost:5000/donors/add",donor)
            .then(res => console.log(res.data));

        Router.pushRoute('/');
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      }

    render(){
        return(
            <Layout>
                <Grid centered columns={2} style={{marginTop:'20px'}}>
                    <Grid.Column width={10}>
                        <Header as="h2" color="teal" style={{textAlign:"center"}}>
                            New Donor? PLease Sign Up Here!
                        </Header>
                        <Form onSubmit={this.onSubmit}>
                                <Form.Group widths={2}>
                                    <Form.Input 
                                        value={this.state.fname} 
                                        onChange={this.onChange} 
                                        name="fname"  
                                        label='First name' 
                                        placeholder='First name' 
                                        required
                                    />
                                    <Form.Input 
                                        value={this.state.lname}   
                                        onChange={this.onChange} 
                                        name="lname" 
                                        label='Last name' 
                                        placeholder='Last name' 
                                        focus
                                        required
                                    />
                                </Form.Group>
                                <Form.Group widths={2}>
                                    <Form.Field 
                                        value={this.state.gender}
                                        onChange={this.onChange} 
                                        name="gender"
                                        label='Gender' 
                                        control='select'
                                        focus
                                        required
                                        >
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                        <option value='Other'>Other</option>
                                    </Form.Field>
                                    <Form.Input 
                                        value={this.state.address}  
                                        onChange={this.onChange} 
                                        name="address"  
                                        label='Address' 
                                        placeholder='Address' 
                                        focus
                                        required
                                    />
                                </Form.Group>
                                <Form.Group widths={2}>
                                    <Form.Input 
                                        value={this.state.phone} 
                                        onChange={this.onChange} 
                                        name="phone"   
                                        label='Phone' 
                                        placeholder='Phone' 
                                        focus
                                        required
                                    />
                                    <Form.Input 
                                        value={this.state.email} 
                                        onChange={this.onChange} 
                                        name="email"   
                                        type="email"
                                        label='Email' 
                                        placeholder='Email'
                                        focus 
                                        required
                                    />
                                </Form.Group>
                                <Form.Group widths={2}>
                                    <Form.Field 
                                        value={this.state.bloodgroup}
                                        onChange={this.onChange} 
                                        name="bloodgroup"
                                        label='Blood Group' 
                                        control='select'
                                        focus
                                        required>
                                        <option value='A'>A</option>
                                        <option value='A+'>A+</option>
                                        <option value='B'>B</option>
                                        <option value='B+'>B+</option>
                                        <option value='O'>O</option>
                                        <option value='O+'>O+</option>
                                    </Form.Field>
                                    <Form.Field 
                                        value={this.state.organ}
                                        onChange={this.onChange} 
                                        name="organ"
                                        label='Organ' 
                                        control='select'
                                        focus
                                        required>
                                        <option value='Eyes'>Eyes</option>
                                        <option value='Kidney'>Kidney</option>
                                    </Form.Field>
                                </Form.Group>
                                <Segment basic textAlign={"center"}>
                                    <Button positive style={{textAlign:"center"}} type='submit'>Submit</Button>
                                </Segment>
                            </Form>
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default DonorSignUp;