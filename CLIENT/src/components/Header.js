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

  render() {
      return (
        <div>
          <Menu pointing secondary >
            <Menu.Item
              name='OrganChain'
            />
            <Menu.Menu position="right" >
                <Menu.Item as={Nav} to="/" name="home" />
                <Menu.Item as={Nav} to="/donor-login" name="Donor Login" />
                <Menu.Item as={Nav} to="/donor-signup" name="Donor Sign Up" />
                <Menu.Item as={Nav} to="/hospital-login" name="Hospital Login" />
            </Menu.Menu> 
          </Menu>
        </div>
      )
    }
  }
  