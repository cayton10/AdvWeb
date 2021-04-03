import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AnimateOnChange} from 'react-animation';

export default class LogAccess extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        const props = this.props

        if(props.logStatus == true) {
            return(
                <li className='nav-item'>
                    <Link onClick={props.handleLogOut} className='nav-link' to={"/"}>
                        Logout
                    </Link>
                </li>
            )
        } else {
            return (
                <>
                    <AnimateOnChange
                    animationIn="popIn"
                    animationOut="popOut"
                    durationOut={500}
                    >
                    <li className='nav-item'>
                        <Link to={"/login"} className='nav-link'>
                        Login
                        </Link>
                    </li>
                    </AnimateOnChange>
                
                    <AnimateOnChange
                    animationIn="popIn"
                    animationOut="popOut"
                    durationOut={500}
                    >
                    <li className='nav-item'>
                        <Link to={"/register"} className='nav-link'>
                        Register
                        </Link>
                    </li>
                    </AnimateOnChange>
                </>
            )
        }
    }
}