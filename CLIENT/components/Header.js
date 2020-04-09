import React,{Component} from 'react';
import {Menu} from 'semantic-ui-react';

export default class Header extends Component {
    state = { activeItem: 'OrganChain' }
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
        <div>
          <Menu pointing secondary>
            <Menu.Item
                name='OrganChain'
                active={activeItem === 'OrganChain'}
                onClick={this.handleItemClick}
            />
            <Menu.Menu position="right">
                <Menu.Item
                    name='Donor Login'
                    active={activeItem === 'Donor Login'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Donor SignUp'
                    active={activeItem === 'Donor SignUp'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Hospital Login'
                    active={activeItem === 'Hospital Login'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='About Us'
                    active={activeItem === 'About Us'}
                    onClick={this.handleItemClick}
                />
            </Menu.Menu>
          </Menu>
        </div>
      )
    }
  }
  