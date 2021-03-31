import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class AdminAccess extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        const props = this.props

        if(props.adminStatus == true) {
            return(
                <>
                    <li className='nav-item'>
                        <Link to={"/add"} className='nav-link'>
                            Add Info
                        </Link>
                    </li>
                    <li className='nav-item pull-right'>
                        <Link to={"/admin"} className='nav-link'>
                            Admin
                        </Link>
                    </li>
                </>
            )
        }
        else {
            return('');
        }
    }
}