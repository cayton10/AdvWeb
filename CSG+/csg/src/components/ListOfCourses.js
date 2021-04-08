import axios from "axios";
import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import CourseCard from './CourseCard';
import settings from "../constants/settings.js";


export default class ListOfCourses extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allCourses: [],
        }

        this.courseList = this.courseList.bind(this);
    }

    componentDidMount() {
        //Fire axios call on page load to bring back list of all courses
        axios.post(settings.scriptServer + '/csg_scripts/getCourses.php')
            .then(result => {
                console.log(result.data);
                this.setState({
                    allCourses: result.data
                });

                /*
                this.state.allCourses.map(function(object, i) {
                    console.log("Object", object, "id ", object.course_id);
                })
                */
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    courseList() {
        return this.state.allCourses.map(function (object, i) {
            return <CourseCard key={object.course_id} course={object} />
        })
    }
    

    

    render() {

        return (
            <>
            <main id='mainContent'>
                        <div className='pageFunctionTitle'>
                            <h2>Course Listing</h2>
                        </div>
                        <div className='courseListing'>
                            <div className='row'>                            
                            {
                                this.state.allCourses.length > 0
                                ?
                                this.courseList()
                                :
                                ''
                            }
                            </div>
                        </div>
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
                                    <td><Link to="/course_sections">View</Link></td>
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
                    </main>
            </>
            
        )
    }
}