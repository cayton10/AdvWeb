import React, {Component} from "react";

export default class ScheduleReview extends Component {

    render() {
        return (
            <>
            <main id='mainContent'>
                <div className='pageFunctionTitle'>
                    <h2>Schedule Review</h2>
                </div>
            <table className="table mt-4" id='scheduleTable'>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col-2">Title</th>
                        <th scope="col">Course</th>
                        <th scope="col">Section</th>
                        <th scope="col">Instructor</th>
                        <th scope="col">Time</th>
                        <th scope="col">Days</th>
                        <th scope="col">Syllabus</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr id='classTuple'>
                        <th scope="row">Advanced Web Programming</th>
                            <td>CIT416</td>
                            <td>101</td>
                            <td>Brian Morgan</td>
                            <td>800-915</td>
                            <td>TR</td>
                            <td>Link Here</td>
                        </tr>
                        <tr id='classTuple'>
                        <th scope="row">Advanced Web Programming</th>
                            <td>CIT416</td>
                            <td>101</td>
                            <td>Brian Morgan</td>
                            <td>800-915</td>
                            <td>TR</td>
                            <td>Link Here</td>
                        </tr>
                        <tr id='classTuple'>
                        <th scope="row">Advanced Web Programming</th>
                            <td>CIT416</td>
                            <td>101</td>
                            <td>Brian Morgan</td>
                            <td>800-915</td>
                            <td>TR</td>
                            <td>Link Here</td>
                        </tr>
                        <tr id='classTuple'>
                        <th scope="row">Advanced Web Programming</th>
                            <td>CIT416</td>
                            <td>101</td>
                            <td>Brian Morgan</td>
                            <td>800-915</td>
                            <td>TR</td>
                            <td>Link Here</td>
                        </tr>
                    </tbody>
                </table>
                </main>
                </>
        )
    }
}