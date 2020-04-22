import React,{Component} from 'react';
import {Button, Icon, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Home extends Component {
    render(){
        return(
            <div >
                <img className="home" src={'../images/home.png'} width="1400"  alt="Not Found"/>
                <div id="landing-header">
                    <Segment basic textAlign={"center"}>
                        <Button positive as={Link} style={{marginTop:"50px"}} to="/donor-signup">
                            <p style={{fontSize:"20px"}}><Icon name="heartbeat"/>BE A DONOR</p><p>Click Here !</p>
                        </Button>
                    </Segment>
                </div>
            </div>
        );
    }
}

export default Home;