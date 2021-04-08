import axios from "axios";
import React, {Component} from "react";
import {AnimateOnChange} from 'react-animation';
import settings from "../constants/settings.js";

export default class ClassDetail extends Component {


    constructor(props) {
        super(props)

        this.state = {
            allSections: [],
        }
    }

    componentDidMount() {
        //Once mounted load the properties passed from the link
        //into our course object
        const course = this.props.location.courseProps;
        console.log(course);

        //Fire our axios call to return all of the associated sections
        //with this course
        axios.post(settings.scriptServer + '/csg_scripts/getSections.php', course.id)
            .then(result => {
                console.log(result);
            })
            .catch(function (error){
                console.log(error);
            });
    }

    render() {

        return(
            <>
                <table className="table mt-4" id='scheduleTable'>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col-2">Course Title</th>
                            <th scope="col">Course Designation</th>
                            <th scope="col">View Sections</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='classTuple'>
                        <th scope="row">Advanced Web Programming</th>
                            <td>CIT416</td>
                            <td></td>
                        </tr>
                        <tr className='classTuple'>
                        <th scope="row">Advanced Web Programming</th>
                            <td>CIT416</td>
                        </tr>
                        <tr className='classTuple'>
                        <th scope="row">Advanced Web Programming</th>
                            <td>CIT416</td>
                        </tr>
                        <tr className='classTuple'>
                        <th scope="row">Advanced Web Programming</th>
                            <td>CIT416</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }
}