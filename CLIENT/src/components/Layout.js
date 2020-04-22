import React from 'react';
import Header from './Header';

export default props =>{
    return(
        <div style={{marginTop:'10px'}}>
            <Header />
            {props.children}
        </div>
    );
};