import React, {Component} from "react";

export default class AdminTableRow extends Component {


    /* -------------------------------------------------------------------------- */
    /*                            PRINT COURSE SECTIONS                           */
    /* -------------------------------------------------------------------------- */
    /**
    /**Parent method used to update state in parent
     * Takes @param(object of all sections related to course, parent method)
     */
     printSections(schedule, method) {
        
        return schedule.map(function (i, j) {

            return (
                    <>
                        <tr key={i.schedule_id} className='classTuple'>
                        <th scope="row">{i.course_title}</th>
                            <td>{i.course_alpha}{i.course_num}</td>
                            <td>{i.section_num}</td>
                            <td>{i.instructor_first_name} {i.instructor_last_name}</td>
                            <td>{i.class_start}-{i.class_end}</td>
                            <td>{i.class_days}</td>
                            <td><button value={i.schedule_id} className='btn btn-danger' onClick={method}>Delete</button></td>
                        </tr>
                    </>
            )
        })
    }


    render() {

        return(
            <>
            {
                this.printSections(this.props.schedule, this.props.method)
            }
            </>
           
        )
    }
}