import React from 'react';
import { Redirect } from 'react-router-dom';
import ForgetPassword from '../../components/forgetPassword';

export default function PasswordForget(){
    if (localStorage.getItem('isAuthenticated')) {
        // const { from } = this.props.location.state || { from: { pathname: '/' } };
        return <Redirect to='/dashboard' />
    }
    else{
        return (
            <ForgetPassword />
        )
    }
}