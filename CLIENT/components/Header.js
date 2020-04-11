import React,{Component} from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes'

export default class Header extends Component {
  render() {
      return (
        <div>
          <Menu pointing secondary >
            <Link route="/">
              <a className="item" >OrganChain</a>
            </Link>
            <Menu.Menu position="right">
                <Link route="/home">
                  <a className="item">Home</a>
                </Link>
                <Link route="/donor-login">
                  <a className="item">Donor Login</a>  
                </Link>
                <Link route="/donor-signup">
                  <a className="item" >Donor SignUp</a>
                </Link>
                <Link route="/hospital-login">
                  <a className="item">Hospital Login</a>
                </Link>
                <Link route="/about-us">
                  <a className="item">About Us</a>
                </Link>
                <Link route="/contact-us">
                  <a className="item">Contact Us</a>
                </Link>
            </Menu.Menu>
          </Menu>
        </div>
      )
    }
  }
  