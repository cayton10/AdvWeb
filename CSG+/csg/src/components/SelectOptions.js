import React, {Component} from 'react';

export default class SelectOptions extends Component {

    

    render () {

        let options = this.props.obj;

        return (
            <option value={options.user_id}>{options.last_name}, {options.first_name}</option>
        )
    }
}