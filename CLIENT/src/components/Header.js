import React,{Component} from 'react';
import {Menu} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

const Nav = props => (
	<NavLink
		exact
		{...props}
		activeClassName="active"
	/>
);

export default class Header extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  logout = (event)=>{
    window.localStorage.removeItem("isAuthenticated");
    window.localStorage.removeItem("token");
    this.setState({activeItem : "home"});
  }

  render() {
      return (
        <div>
          <Menu pointing secondary  >
            <Menu.Item
              name='OrganChain'
              style={{marginLeft:"50px", fontWeight:"bold"}}
            />
              { !window.localStorage.getItem("isAuthenticated") ?
                <Menu.Menu position="right" style={{marginRight:"40px"}}>
                  <Menu.Item as={Nav} to="/" name="home" />
                  <Menu.Item as={Nav} to="/donor-login" name="Donor Login" />
                  <Menu.Item as={Nav} to="/donor-signup" name="Donor Sign Up" />
                  <Menu.Item as={Nav} to="/hospital-login" name="Hospital Login" />
                </Menu.Menu> 
                : 
                <Menu.Menu position="right" style={{marginRight:"40px"}}>
                  <Menu.Item as={Nav} to="/" name="home" />
                  <Menu.Item as={Nav} to="/hospital/approve-donor" name="Approve Donor" />
                  <Menu.Item as={Nav} to="/hospital/register-recipient" name="Register Recipient" />
                  <Menu.Item as={Nav} to="/hospital/transplant-match" name="Transplant Match" />
                  <Menu.Item as={Nav} to="/hospital/patient-record" name="Patient Record" />
                  <Menu.Item as={Nav} to="/" name="Logout" onClick={this.logout}/>
                </Menu.Menu> 
              }   
          </Menu>
        </div>
      )
    }
  }
  