import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import settings from "../constants/settings.js";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';

export default class Sections extends Component {

    constructor(props) {
        super(props)

        this.addFavorite = this.addFavorite.bind(this);
    }

    addFavorite(e) {

        //Create an object package to send to script
        const payload = {
            userID: localStorage.getItem("user_id"),
            section: e.target.value,
        }

        //Place axios call here and update as appropriate:
        axios.post(settings.scriptServer + "/csg_scripts/addToSchedule.php", payload)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {

        //Destructure object
        const section = this.props.section;

        //Get filepath for displaying / downloading syllabus
        const filePath = settings.scriptServer + "/csg_scripts/syllabi/" + section.course_syl;
        const logged = localStorage.getItem("userLoggedIn");
        //Pull down localStorage var for logged in status


        return(
            <>
                <tr className='classTuple'>
                <th scope="row">{section.section_num}</th>
                    <td>{section.class_days}</td>
                    <td>{section.class_start}</td>
                    <td>{section.class_end}</td>
                    <td>{section.instructor_first_name} {section.instructor_last_name}</td>
                    {
                        section.course_syl === "" ?

                            <td>N/A</td>
                            :
                            <td><a href={filePath} target="_blank" rel="noopener">{section.course_syl}</a></td>
                    }
                    {
                        //If local storage for user log in isn't there, don't show radio
                        logged === "true" ?
                        <td><input className="sectionRadio" type="radio" name="favSection" value={section.class_id} onChange={this.addFavorite}/></td>
                        :
                        <td><Link to="/login">Log in</Link></td>
                    }
                    
                </tr>
            </>
        )
    }


}