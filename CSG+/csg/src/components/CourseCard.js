import React, { Component } from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


export default class CourseCard extends Component {
    
    constructor(props) {
        super(props)
    }

    

    render() {

        const course = this.props.course;
        return(
            <div className="col-sm-12 col-md-6 col-lg-4">

            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">{course.course_alpha}{course.course_num}</h4>
                </div>
                <div className="card-body">
                    <h5 className="card-text">{course.course_title}</h5>
                    <hr></hr>
                    <a href="#" className="btn btn-primary">View Sections</a>
                </div>
            </div>
            </div>
        );
    }
}