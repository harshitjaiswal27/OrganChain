import React,{Component} from 'react';
import { Card, Button, Divider, Header} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import OrganChain from '../../ethereum/organchain';
import ipfs from '../../ipfs';

class RenderList extends Component{
    constructor(props){
        super(props);
        this.state = {
            fname : '',
            lname : '',
            donorId : '',
            gender : '',
            bloodgroup : '',
            organ : '',
            email : '',
            contact : '',
            city : '',
            donorFound : false
        }
    }

    onMatch = async()=>{
        const accounts = await web3.eth.getAccounts();
        try{
            const donorId = await OrganChain.methods.transplantMatch(this.props.recipient.recipientId).send({
                from : accounts[0],
                gas : 1000000
            });
            if (donorId.status === false) {
                console.log("No match found");
                window.alert("Sorry, no match found!");
            }
            else{
                const donor = await OrganChain.methods.getDonor(donorId).call();
                this.setState({donorId :donorId, organ: donor[1], bloogroup: donor[2]}); 
                
                await ipfs.cat(donor[1], (err, res) => {
                    if(err){
                        console.log(err);
                        return;
                    }
                    const temp = JSON.parse(res.toString());
                    this.setState({
                        fname: temp["fname"],
                        lname: temp["lname"],
                        gender: temp["gender"],
                        email: temp["email"],
                        contact: temp["phone"],
                        city: temp["city"],
                        f: true
                      });
                })
            }
        }
        catch(err){
            console.log(err);
        }
        
    }

    render(){
        return(
            <Card.Group centered>
                { !this.state.donorFound ? null :
                    <Card style={{width:"370px"}}>
                        <Card.Content>
                            <Card.Header style={{textAlign:"center"}}>{this.state.fname} {this.state.lname}</Card.Header>
                            <Card.Meta >{this.state.donorId}</Card.Meta>
                            <Divider/>
                            <Card.Description style={{fontSize:"16px",marginLeft: "30px"}}>
                                <strong>Gender : </strong> {this.state.gender} <br/><br/>
                                <strong>Organ : </strong> {this.state.organ} <br/><br/>
                                <strong>Blood Group : </strong> {this.state.bloodgroup} <br/><br/>
                                <strong>City : </strong> {this.state.city} <br/><br/>
                                <strong>Email : </strong> {this.state.email} <br/><br/>
                                <strong>Contact : </strong> {this.state.contact} <br/>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra style={{textAlign:"center"}}>
                            <Header as="h3" color="grey" >
                                Donor
                            </Header>
                        </Card.Content>
                    </Card>
                }
                <Card style={{width:"370px"}}>
                    <Card.Content>
                        <Card.Header style={{textAlign:"center"}}>{this.props.recipient.fname} {this.props.recipient.lname}</Card.Header>
                        <Card.Meta >{this.props.recipient.recipientId}</Card.Meta>
                        <Divider/>
                        <Card.Description style={{fontSize:"16px",marginLeft: "30px"}}>
                            <strong>Gender : </strong> {this.props.recipient.gender} <br/><br/>
                            <strong>Organ : </strong> {this.props.recipient.organ} <br/><br/>
                            <strong>Blood Group : </strong> {this.props.recipient.bloodgroup} <br/><br/>
                            <strong>City : </strong> {this.props.recipient.city} <br/><br/>
                            <strong>Email : </strong> {this.props.recipient.email} <br/><br/>
                            <strong>Contact : </strong> {this.props.recipient.contact} <br/><br/>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra style={{textAlign:"center"}}>
                        { this.state.donorFound ? 
                            <Header as="h3" color="grey" >
                                Recipient
                            </Header>
                            :<Button content="Match" positive onClick={this.onMatch}/>
                        }   
                    </Card.Content> 
                </Card>
            </Card.Group>
        )
    }
}

export default RenderList;