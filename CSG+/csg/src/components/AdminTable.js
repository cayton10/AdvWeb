import React, {Component} from 'react';
import AdminTableRow from "./AdminTableRow";

export default class AdminTable extends Component {

    constructor(props) {
        super(props)
    }


    /**
     * printSchedule() iterates through schedule property sent 
     * from parent and returns each course section as an independent
     * component row
     * @returns Component
     */
    printSechedule() {
        const method = this.props.method;

        return this.props.schedule.map(function(object, i) {
            return <AdminTableRow key={i} section={object} method={method}/>
        })
    }


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
                            this.printSechedule():
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