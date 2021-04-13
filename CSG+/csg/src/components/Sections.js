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
            favorite: this.props.fav,
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

    /* -------------------------------------------------------------------------- */
    /*                            PRINT COURSE SECTIONS                           */
    /* -------------------------------------------------------------------------- */
    /**
     * Takes all sections supplied from an axios call for a course. Prints each section
     * in a table row to be returned to parent component. Was initially done in parent 
     * component - "ClassDetail". Can't pass methods through parent to child that way
     * so here we are.
     * @param {sections object from csgdb, parent method} sections 
     * @returns ES6 markup
     */
    printSections(sections, favorite) {

        console.log(favorite);
        
        return sections.map(function (i, j) {
            //Set syllabi path
            const filePath = settings.scriptServer + "/csg_scripts/syllabi/" + i.course_syl;
            const logged = localStorage.getItem("userLoggedIn");

            return (
                    <>
                    {
                        console.log(i.class_id)
                    }
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