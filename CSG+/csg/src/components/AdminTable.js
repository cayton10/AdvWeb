import React, {Component} from 'react';
import AdminTableRow from "./AdminTableRow";

export default class AdminTable extends Component {

    render() {

        return(
            <table className="table mt-4" id='adminTable'>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col-2">Title</th>
                        <th scope="col">Course</th>
                        <th scope="col">Section</th>
                        <th scope="col">Instructor</th>
                        <th scope="col">Time</th>
                        <th scope="col">Days</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            this.props.schedule.length > 0 ?
                            <AdminTableRow key={this.props.schedule.schedule_id} 
                            schedule={this.props.schedule} 
                            method={this.props.method} 
                            />:
                            ""
                        }
                        {
                            console.log(this.props.schedule)
                        }
                    </tbody>
                </table>
        )
    }
}