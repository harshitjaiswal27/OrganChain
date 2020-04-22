import React, {Component} from 'react';
import jwtDecode from 'jwt-decode';
import { Grid, Divider, Dimmer, Loader} from 'semantic-ui-react';
import OrganChain from '../../ethereum/organchain';
import ipfs from '../../ipfs';
import RenderList from './render-list';

class TransplantMatch extends Component{

    state = {
        recipient_arr : [],
        loading : true
    }

    componentDidMount = async ()=>{
        const hospital = jwtDecode(window.localStorage.getItem("token"));
        const hospitalId = hospital.hospital.hospitalpublickey;
        try{
            const recipientCount = await OrganChain.methods.getRecipientCount(hospitalId).call();
            var recipient_arr = [];
            for( let i=0 ; i<recipientCount ; i++ ){
                var recipient = await OrganChain.methods.getRecipientDetail(hospitalId, i).call();
                if(recipient[1] === "")
                    continue;
                const res = await ipfs.cat(recipient[1]);
                const temp = JSON.parse(res.toString());                    
                const data = JSON.stringify({
                    fname: temp["fname"],
                    lname: temp["lname"],
                    gender: temp["gender"],
                    city: temp["city"],
                    contact: temp["phone"],
                    email: temp["email"],
                    recipientId: recipient[0],
                    organ: recipient[2],
                    bloodgroup: recipient[3]
                });
                const element = JSON.parse(data);
                recipient_arr.push(element);
            }
            this.setState({recipient_arr});
        }
        catch(err){
            console.log("Error Catched => "+err);
        }
        this.setState({loading : false})
    }

    renderList = ()=>{
        const List = this.state.recipient_arr.map((recipient)=>{
            return (
                <div key={recipient.recipientId}>
                    <RenderList recipient={recipient} />
                    <Divider/>
                </div>
            );
        });
        return <div>{List}</div>;
    }

    render(){
        return( 
            <div>
                {
                    this.state.loading ?
                    <Dimmer active={this.state.loading} inverted >
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>
                    :
                    <Grid centered columns={2} style={{marginTop:"10px"}}>
                        <Grid.Column width={11}>
                            {this.renderList()} 
                        </Grid.Column>
                    </Grid>
            }
            </div>
        )
    }
}

export default TransplantMatch;