import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import settings from "../constants/settings.js";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

export default class Schedule extends Component {

    //Simple render to bring back all of our schedule info per user
    render() {
        
        //Wow, let and const are two totally different beasts :0
        let course = this.props.obj;

        const filePath = settings.scriptServer + "/csg_scripts/syllabi/" + course.course_syl;

        return (

            <tr id='classTuple'>
            <th scope="row">{course.course_title}</th>
                <td>{course.course_alpha}{course.course_num}</td>
                <td>{course.section_num}</td>
                <td>{course.instructor_first_name} {course.instructor_last_name}</td>
                <td>{course.class_start}-{course.class_end}</td>
                <td>{course.class_days}</td>
                {
                    //If syllabus is empty, else
                    course.course_syl === "" ?
        
                    <td>N/A</td>
                    :
                    <td><a href={filePath} target="_blank" rel="noopener">{course.course_syl}</a></td>
                }
            </tr>
        )
    }
}