import React from 'react';
import { Redirect } from 'react-router-dom';
import Profile from '../../views/profile';

export default function SignOut(props) {
    if (window.confirm("want to log out ?")) {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('pos');
        props.status(false);
        return (<Redirect to='/' />);
    }
    else {
        return (
            <Profile
                status={props.status}
            />
        )
    }
}