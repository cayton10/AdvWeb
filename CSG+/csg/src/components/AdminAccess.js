import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AnimateOnChange} from 'react-animation';

export default class AdminAccess extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        const props = this.props

        if(props.adminStatus === true) {
            return(
                <>
                <AnimateOnChange
                    animationIn="popIn"
                    animationOut="popOut"
                    durationOut={500}
                    >
                    <li className='nav-item'>
                        <Link to={"/add"} className='nav-link'>
                            Add Courses
                        </Link>
                    </li>
                    </AnimateOnChange>
                    <AnimateOnChange
                    animationIn="popIn"
                    animationOut="popOut"
                    durationOut={500}
                    >
                    <li className='nav-item pull-right'>
                        <Link to={"/admin"} className='nav-link'>
                            Admin
                        </Link>
                    </li>
                    </AnimateOnChange>
                </>
            )
        }
        else {
            return('');
        }
    }
}