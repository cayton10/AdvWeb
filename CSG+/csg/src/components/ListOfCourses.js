import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import ClassDetail from './ClassDetail';

export default class ListOfCourses extends Component {

    render() {
        return (
            <>
            <main id='mainContent'>
                        <div className='pageFunctionTitle'>
                            <h2>Course Listing</h2>
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
                                    <td><Link to="courses/course_sections">View</Link></td>
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
            <Router>
                    
                <Switch>
                    <Route exact path='courses/course_sections' component={ClassDetail}></Route>
                </Switch>
                
            </Router>
            </>
            
        )
    }
}