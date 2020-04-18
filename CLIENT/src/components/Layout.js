import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';

export default props =>{
    return(
        <Container style={{marginTop:'10px'}}>
            <Header />
            {props.children}
        </Container>
    );
};