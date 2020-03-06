import React from 'react';
import LabeledInput from '../labeledInput';
import CheckOTP from '../otp';

export default class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', userExist: false, msg: '' }
    }
    onChange = (e) => {
        this.setState({ username: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault();
        let pos = JSON.parse(localStorage.getItem('data')).findIndex((ele) => ele.username === this.state.username.toString());
        //console.log(pos);
        if (pos >= 0) {
            this.setState({ userExist: true });
        }
        else {
            this.setState({ msg: 'No such user exists' });
        }
    }
    render() {
        return (this.state.userExist) ?
            (<CheckOTP
                digits={15} otp={123456}
            />) :
            (<div>
                <p>Enter the username with which you registered!!</p>
                <form onSubmit={this.onSubmit}>
                    <LabeledInput
                        lvalue={'username : '}
                        type={'text'}
                        minLength={6}
                        maxLength={30}
                        id={'username'}
                        onChange={this.onChange}
                    />
                    <LabeledInput
                        type={'submit'}
                        id={'submitBtn'}
                        style={{ borderRadius: '50px', outline: 'none' }}
                        onSubmit={this.onSubmit}
                    />
                </form>
                <span style={{ color: 'red' }}>{this.state.msg}</span>
            </div>
            )
    }
}