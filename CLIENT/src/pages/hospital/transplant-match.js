import React, {Component} from 'react';
import jwtDecode from 'jwt-decode';
import { Grid, Divider} from 'semantic-ui-react';
import OrganChain from '../../ethereum/organchain';
import web3 from '../../ethereum/web3';
import ipfs from '../../ipfs';
import RenderList from './render-list';

class TransplantMatch extends Component{

    state = {
        recipient_arr : []
    }

    componentDidMount = async ()=>{
        const hospital = jwtDecode(window.localStorage.getItem("token"));
        const hospitalId = hospital.hospital.hospitalpublickey;
        try{
            const recipientCount = await OrganChain.methods.getRecipientCount(hospitalId).call();
            console.log(recipientCount);

            var recipient_arr = [];
            for( let i=0 ; i<recipientCount ; i++ ){
                console.log(i);
                const recipient = await OrganChain.methods.getRecipientDetail(hospitalId, i).call();
                await ipfs.cat(recipient[1], (err, res) => {
                    if (err) {
                      console.error(err)
                      return;
                    }
                    const temp = JSON.parse(res.toString());                    
                    const data = JSON.stringify({
                        fname: temp["fname"],
                        lname: temp["lname"],
                        gender: temp["gender"],
                        city: temp["city"],
                        contact: temp["phone"],
                        email: temp["email"],
                        recipientId: recipient[0],
                        organ: web3.utils.hexToAscii(recipient[2]),
                        bloodgroup: web3.utils.hexToAscii(recipient[3])
                    });
                    const element = JSON.parse(data);
                    recipient_arr.push(element);
                  });
            }
            this.setState({recipient_arr});
        }
        catch(err){
            console.log(err);
        }
    }

    renderList = ()=>{
        const List = this.state.recipient_arr.map((recipient)=>{
            return (
                <div>
                    <RenderList recipient={recipient}/>
                    <Divider/>
                </div>
            );
        });
        return <div>{List}</div>;
    }

    render(){
        return( 
            <Grid centered columns={2} style={{marginTop:"10px"}}>
                <Grid.Column width={12}>
                    {this.renderList()}
                </Grid.Column>
            </Grid>
        )
    }
}

export default TransplantMatch;