import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import settings from "../constants/settings.js";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';

export default class Sections extends Component {

    constructor(props) {
        super(props)

        this.state = {
            courseSections: null,
            logged: null,
        }
    }

    componentWillMount() {

        this.setState({
            courseSections: this.props.sections,
            logged: localStorage.getItem("userLoggedIn"),
        })

    }

    /*addFavorite(e) {

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
    }*/

    printSections(sections) {
        
        return sections.map(function (i) {
            //Set syllabi path
            const filePath = settings.scriptServer + "/csg_scripts/syllabi/" + i.course_syl;
            const logged = localStorage.getItem("userLoggedIn");

            return (
                    <>
                        <tr className='classTuple' key={i.class_id}>
                        <th scope="row">{i.section_num}</th>
                            <td>{i.class_days}</td>
                            <td>{i.class_start}</td>
                            <td>{i.class_end}</td>
                            <td>{i.instructor_first_name} {i.instructor_last_name}</td>
                            {
                                i.course_syl === "" ?
        
                                    <td>N/A</td>
                                    :
                                    <td><a href={filePath} target="_blank" rel="noopener">{i.course_syl}</a></td>
                            }
                            {
                                //If local storage for user log in isn't there, don't show radio
                                logged === "true" ?
                                <td><input className="sectionRadio" type="radio" name="favSection" value={i.class_id} /></td>
                                :
                                <td><Link to="/login">Log in</Link></td>
                            }
                            
                        </tr>
                    </>
            )
        })
    }


    render() {
        //Catch all the sections for the course
        const {courseSections} = this.state;
        //Catch methods to update state in parent
        

        console.log(courseSections);

        return(
            this.printSections(courseSections)
        )
    }


}