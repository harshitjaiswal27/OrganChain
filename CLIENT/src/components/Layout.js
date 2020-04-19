import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
// import Footer from './Footer';

export default props =>{
    return(
        <Container>
        <div style={{marginTop:'10px'}}>
            <Header />
            {props.children}
            {/* <Footer /> */}
        </div>
        </Container>
    );
};