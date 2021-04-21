import axios from "axios";
import React, {Component} from "react";
import Schedule from "./Schedule";
import settings from "../constants/settings.js";

export default class ScheduleReview extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userSchedule: [],
            userID: null,
        }

    }

    componentDidMount() {

        //Make sure we have a user logged in
        if(localStorage.getItem("user_id") != null) {
            //Update state
            this.setState({
                userID: localStorage.getItem("user_id"),
            }, () =>
                //Fire the axios call
                axios.post(settings.scriptServer + "/csg_scripts/getUserSchedule.php", this.state.userID)
                
                    .then(result => {
                        console.log(result);

                        if(result.status == 200) {
                            this.setState({
                                userSchedule: result.data,
                            })
                            console.log(this.userSchedule);
                        }
                        
                    })
                    .catch(error => {
                        console.log(error);
                    }))
        }
        else {
            this.setState({
                userSchedule: [],
            })
        }
    }

    //Line out a function that will print all my section rows for me. Thanks, Scarlett
    userSchedule() {
        return this.state.userSchedule.map(function(object, i) {
            return <Schedule obj={object} key={i} />;
        })
    }


    render() {

        const {userSchedule} = this.state;

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
                        {
                            userSchedule.length > 0
                            ?
                            this.userSchedule()
                            :
                            "No schedule, mate ;) better build one soon!"
                        }
                    </tbody>
                </table>
                </main>
                </>
        )
    }
}