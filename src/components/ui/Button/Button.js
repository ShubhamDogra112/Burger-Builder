import React from 'react';
import { MDBBtn } from "mdbreact";
import  './Button.css';

const button = (props) => (
    <MDBBtn
        // className={['Button', [props.btnType]].join(' ')}
        outline color = {props.btnType}
        onClick={props.clicked}>{props.children}</MDBBtn>
);

export default button;