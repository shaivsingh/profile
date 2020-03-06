import React from 'react';


export default class CheckOTP extends React.Component {
    constructor(props) {
        super(props);
        this.state = { back: false, verified: false, prevId: '' }
        this.arr = new Array(this.props.digits);
        this.arr.fill('');
    }
    handleChange = (e) => {
        if (this.state.prevId !== e.target.id && e.target.value !== '') {
            //console.log('1');
            // this.state.back = false;
            // this.state.prevId = e.target.id;
        }
        if (e.key === 'Backspace' && this.state.back === false && e.target.value !== '') {
            //console.log('2');
            this.arr[e.target.id] = '';
            this.setState({ back: true, prevId: e.target.id });
        }
        else if (parseInt(e.target.value) && e.key !== 'Backspace') {
            //console.log('3');
            this.arr[e.target.id] = e.target.value;
            this.setState({ back: false, prevId: e.target.id });
            e.target.nextElementSibling.focus();
        }
        else if (e.key === 'Backspace') {
            //console.log('4');
            e.target.previousElementSibling.focus();
            this.arr[e.target.previousElementSibling.id] = '';
            this.setState({ back: false, prevId: e.target.id });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        (this.arr.join('') === this.props.otp.toString()) ? this.setState({ verified: true }) :
            alert('worng otp');
    };

    render() {
        if (this.state.verified) {
            return (
                <p>Success</p>
            )
        }
        return (
            <div style={{ margin: 200 }}>
                <form onSubmit={this.onSubmit}>
                    <p>Enter OTP</p>
                    <div style={{ flexWrap: 'wrap', display: 'flex' }}>
                        {this.arr.map((ele, ind) => {
                            return (<div style={{ display: 'flex' }}><input
                                type={'tel'}
                                maxLength={1}
                                size={1}
                                style={{ textAlign: 'center', margin: 5 }}
                                key={ind}
                                onChange={this.handleChange}
                                pattern='^[0-9]$'
                                name={'my' + ind.toString()}
                                id={ind}
                                value={this.arr[ind]}
                                required
                                onKeyDown={this.handleChange}
                                autoFocus={ind === 0}
                            /><div>-</div></div>)
                        })}
                    </div>
                    <button type='submit' style={{ borderRadius: 50, outline: 'none' }} >Submit</button>
                </form>
            </div>
        )
    }
}