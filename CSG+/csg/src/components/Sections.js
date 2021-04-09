import React, { Component } from 'react';
import {BrowserRouter as Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import FileViewer from 'react-file-viewer';
import settings from "../constants/settings.js";

export default class Sections extends Component {

    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {

        e.preventDefault();
        alert("Clicked");
    }

    render() {

        const section = this.props.section;
        var file = section.course_syl.split(".");
        const extension = file[1];
        const filePath = settings.scriptServer + "csg_scripts/syllabi/" + section.course_syl;

        return(
            <>
                <tr className='classTuple'>
                <th scope="row">{section.section_num}</th>
                    <td>{section.class_days}</td>
                    <td>{section.class_start}</td>
                    <td>{section.class_end}</td>
                    <td>{section.instructor_first_name} {section.instructor_last_name}</td>
                    <td>{section.course_syl}</td>
                </tr>
            </>
        )
    }


}