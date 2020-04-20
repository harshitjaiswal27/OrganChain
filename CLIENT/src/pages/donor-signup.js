import React,{ Component} from 'react';
import axios from 'axios';
import { Form , Button, Grid, Segment, Header, Divider, Message} from 'semantic-ui-react';

class DonorSignUp extends Component {
    state = {
        fname : '',
        lname : '',
        gender : 'Male',
        city : 'Gwalior',
        phone : '',
        email : '',
        bloodgroup : 'A+',
        organ : 'Eyes',
        errMsg : ''
    }

    onSubmit = event => {
        event.preventDefault();
        
        this.setState( {  errMsg :'' } );

        const { fname, lname, gender, city, phone, email,bloodgroup, organ } = this.state;
        const donor = { fname, lname, gender, city, phone, email,bloodgroup, organ };

        axios.post("/api/donors",donor)
            .then((res) => {
                console.log("Donor Added Successfully");
                window.location = "/hospital-list/" + city;
            })
            .catch(err=> this.setState({ errMsg : err.message }));
            
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      }

    render(){
        return(
            <Grid centered columns={2} style={{marginTop:'20px'}}>
                <Grid.Column width={11}>
                    <Segment>
                        <Header as="h3" color="grey" style={{textAlign:"center"}}>
                            New Donor? PLease Sign Up Here!
                        </Header>
                        <Divider/>
                        <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
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
                                    required
                                >
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                    <option value='Other'>Other</option>
                                </Form.Field>
                                <Form.Field 
                                    value={this.state.city}
                                    onChange={this.onChange} 
                                    name="city"
                                    label='City' 
                                    control='select'
                                    required
                                >
                                    <option value='Gwalior'>Gwalior</option>
                                    <option value='New Delhi'>New Delhi</option>
                                    <option value='Pune'>Pune</option>
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths={2}>
                                <Form.Input 
                                    value={this.state.phone} 
                                    onChange={this.onChange} 
                                    name="phone"   
                                    label='Phone' 
                                    placeholder='Phone' 
                                    required
                                />
                                <Form.Input 
                                    value={this.state.email} 
                                    onChange={this.onChange} 
                                    name="email"   
                                    type="email"
                                    label='Email' 
                                    placeholder='Email' 
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
                                    required
                                >
                                    <option value='A+'>A+</option>
                                    <option value='A-'>A-</option>
                                    <option value='B+'>B+</option>
                                    <option value='B-'>B-</option>
                                    <option value='AB+'>AB+</option>
                                    <option value='AB-'>AB-</option>
                                    <option value='O+'>O+</option>
                                    <option value='O-'>O-</option>
                                </Form.Field>
                                <Form.Field 
                                    value={this.state.organ}
                                    onChange={this.onChange} 
                                    name="organ"
                                    label='Organ' 
                                    control='select'
                                    required
                                >
                                    <option value='Eyes'>Eyes</option>
                                    <option value='Kidney'>Kidney</option>
                                </Form.Field>
                            </Form.Group>
                            <Message error header="Oops!" content={this.state.errMsg} />
                            <Segment basic textAlign={"center"}>
                                <Button positive style={{textAlign:"center"}} type='submit'>Submit</Button>
                            </Segment>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default DonorSignUp;