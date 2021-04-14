import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import settings from "../constants/settings.js";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

export default class Sections extends Component {

    constructor(props) {
        super(props)

        this.state = {
            courseSections: null,
            logged: null,
            methods: null,
        }
    }

    componentWillMount() {

        this.setState({
            courseSections: this.props.sections,
            //Our handler for setting state of section in parent
            favorite: this.props.fav,
            logged: localStorage.getItem("userLoggedIn"),
        })
    }

    /* -------------------------------------------------------------------------- */
    /*                            PRINT COURSE SECTIONS                           */
    /* -------------------------------------------------------------------------- */
    /**
    /**Parent method used to update state in parent
     * Takes @param(object of all sections related to course, parent method)
     */
    printSections(sections, favorite) {
        
        return sections.map(function (i, j) {
            //Set syllabi path
            const filePath = settings.scriptServer + "/csg_scripts/syllabi/" + i.course_syl;
            const logged = localStorage.getItem("userLoggedIn");

            return (
                    <>
                        <tr key={i.class_id} className='classTuple'>
                        <th scope="row">{i.section_num}</th>
                            <td>{i.class_days}</td>
                            <td>{i.class_start}</td>
                            <td>{i.class_end}</td>
                            <td>{i.instructor_first_name} {i.instructor_last_name}</td>
                            {
                                //If syllabus is empty, else
                                i.course_syl === "" ?
        
                                    <td>N/A</td>
                                    :
                                    <td><a href={filePath} target="_blank" rel="noopener">{i.course_syl}</a></td>
                            }
                            {
                                //If local storage for user log in isn't there, don't show radio
                                logged === "true" ?
                                <td><input className="sectionRadio" type="radio" name="favSection" value={i.class_id} onChange={favorite}/></td>
                                :
                                <td><Link to="/login">Log in</Link></td>
                            }
                            
                        </tr>
                    </>
            )
        })
    }


    render() {
        //Destructure to pass...
        const {courseSections, favorite} = this.state;
        //Catch methods to update state in parent

        return(
            this.printSections(courseSections, favorite)
        )
    }


}