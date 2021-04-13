import React, { Component } from 'react';
import {BrowserRouter as Route, Switch, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


export default class CourseCard extends Component {
    
    constructor(props) {
        super(props)

        this.setCourse = this.setCourse.bind(this);
    }

    //Set the course ID in local storage. Since the child component can't see 
    //state on page refresh, we need to store a value to see on section view.
    setCourse() {
        localStorage.setItem("courseID", this.props.course.course_id);
        localStorage.setItem("courseTitle", this.props.course.course_title);
    }

    render() {

        const course = this.props.course;
        return(
            <div className="col-sm-12 col-md-6 col-lg-4">

            <div className="card mt-3">
                <div className="card-header bg-dark">
                    <h4 className="card-title">{course.course_alpha}{course.course_num}</h4>
                </div>
                <div className="card-body">
                    <p className="card-text mb-5">{course.course_title}</p>
                    <Link className='btn btn-primary' onClick={this.setCourse}
                        to={{ //Pass the course selected as an object through the link
                            pathname: '/course_sections',
                            courseProps: {
                                id: course.course_id,
                                alpha: course.course_alpha,
                                num: course.course_num,
                            },
                        }}>View Sections
                    </Link>
                </div>
            </div>
            </div>
        );
    }
}