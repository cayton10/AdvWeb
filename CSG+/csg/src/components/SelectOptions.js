import React, {Component} from 'react';
import axios from 'axios';

export default class SelectOptions extends Component {

    

    render () {

        let options = this.props.obj;

        return (
            <option value={options.user_id}>{options.last_name}, {options.first_name}</option>
        )
    }
}