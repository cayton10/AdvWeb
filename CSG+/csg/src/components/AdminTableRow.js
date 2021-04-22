import React, {Component} from "react";


export default class AdminTableRow extends Component {


    render() {

        const section = this.props.section;
        const method = this.props.method;

        return(
            <tr className='classTuple'>
            <th scope="row">{section.course_title}</th>
                <td><div>{section.course_alpha}{section.course_num}</div></td>
                <td>{section.section_num}</td>
                <td>{section.instructor_first_name} {section.instructor_last_name}</td>
                <td>{section.class_start}-{section.class_end}</td>
                <td>{section.class_days}</td>
                <td><button value={section.schedule_id} className='btn btn-danger' onClick={method}>Delete</button></td>
            </tr>
        )
    }
}