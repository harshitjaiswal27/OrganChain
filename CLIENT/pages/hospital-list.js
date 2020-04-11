import React, {Component} from 'react';
import axios from 'axios';
import { Card} from 'semantic-ui-react';
import Layout from '../components/Layout';

class HospitalList extends Component{
    static async getInitialProps(props){
        var hospitals = [];
        await axios.get(`http://localhost:5000/hospitals/${props.query.city}`)
            .then(res => {
                for(let i = 0;i<res.data.length;i++){
                    const hospital = {
                      address: `Address : ${res.data[i].address}`,
                      city: res.data[i].city,
                      name: res.data[i].username,
                      contact: `Contact : ${res.data[i].contact}`,
                      img: `../static/images/${res.data[i].img}`
                    }
                    hospitals.push(hospital)
               }
            })
            return {hospitals};
    }

    renderHospitals(){
        var hospitals = this.props.hospitals.map( hospital =>{
            return {
                image : hospital.img,
                header : hospital.name,
                meta : hospital.contact,
                description : hospital.address
            };
        });
        return <Card.Group divided items={hospitals} />;
    }

    render(){
        return(
            <Layout>
                <div style={{marginTop:"20px"}}>
                    {this.renderHospitals()}
                </div>
            </Layout>
        );
    }
}

export default HospitalList;