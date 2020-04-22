import React, {Component} from 'react';
import axios from 'axios';
import { Card, Segment, Header, Divider, Grid} from 'semantic-ui-react';

class HospitalList extends Component{
    state={
        hospitals : []
    }

    componentDidMount(){
        var hospitals = [];
        axios.get(`/api/hospitals/${this.props.match.params.city}`)
            .then(res => {
                for(let i = 0;i<res.data.length;i++){
                    const hospital = {
                      address: `Address : ${res.data[i].address}`,
                      city: res.data[i].city,
                      name: res.data[i].username,
                      contact: `Contact : ${res.data[i].contact}`,
                      img: `../images/${res.data[i].img}`
                    }
                    hospitals.push(hospital)
               }
               this.setState({hospitals});
            })
            .catch(err => console.log("Error:"+err));
    }

    renderHospitals(){
        var hospitals = this.state.hospitals.map( hospital =>{
            return {
                image : hospital.img,
                header : hospital.name,
                meta : hospital.contact,
                description : hospital.address
            };
        });
        return <Card.Group items={hospitals} centered />;
    }

    render(){
        return(
            <Grid centered columns={2} style={{marginTop:'20px'}}>
                <Grid.Column width={12}>
                    <Segment>
                        <Header as="h3" color="grey" style={{textAlign:"center"}}>
                            Please visit any one hospital from the given list, to get yourself approved!
                        </Header>
                        <Divider/>
                        {this.renderHospitals()}
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default HospitalList;