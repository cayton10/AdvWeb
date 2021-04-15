import axios from "axios";
import React, {Component} from "react";
import Sections from './Sections';
import settings from "../constants/settings.js";

export default class ClassDetail extends Component {


    constructor(props) {
        super(props)

        this.state = {
            course_id: null,
            courseTitle: null,
            allSections: [],
            errorMessage: null,
            favoriteClass: null,
            userID: null,
        }

        this.handleClear = this.handleClear.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
    }

    componentWillMount() {

        //Grab local storage for CLOWNS that want to reload page.
        //This actually works better, and I had no idea until I broke everything
        //reloading pages to test.
        const courseID = localStorage.getItem("courseID");
        const title = localStorage.getItem("courseTitle");


        //Fire our axios call to return all of the associated sections
        //with this course
        axios.post(settings.scriptServer + '/csg_scripts/getSections.php', courseID)
            .then(result => {
                if(result.status === 200)
                {
                    this.setState({
                        course_id: courseID,
                        allSections: result.data,
                        courseTitle: title
                    })
                }
                    
                if(result.data.success === false)
                {
                    this.setState({
                        errorMessage: result.data.message,
                    })
                }
                
            })
            .catch(function (error){
                console.log(error);
            });
    }

    /**
     * Handle the user clearing the section they had favorited for this course
     * resets radio "favorite" button, and also removes appropriate course section
     * from database table "course schedule"
     * @returns boolean
     */
    handleClear(e) {

        //Since we don't know which is checked, just reset them all
        let radios = document.getElementsByClassName('sectionRadio');

        //Iterate through radios
        for(let i = 0; i < radios.length; i++)
        {
            //If a radio is checked, uncheck it
            if(radios[i].checked === true) {

                //Create an object to send to script
                const sectionObj = {
                    user: this.state.userID,
                    section: radios[i].value,
                }
                //Fire an axios call to remove this section from the user's schedule
                axios.post(settings.scriptServer + "/csg_scripts/removeSection.php", sectionObj)
                    .then(result => {
                        console.log(result.data.success);
                        console.log(result.data.message);
                    })
                    .catch(error => {
                        console.log(error)
                    })
                //Uncheck the radio button
                radios[i].checked = false;
            }
        }
        //Reset state back to null for favorite class
        this.setState({
            favoriteClass: null,
        });
    }

    /**
     * Simply handles the radio onChange event in child component
     * updates state of favorite class and stores user id. After setting
     * state variables, calls updateSchedule method
     * @param {event} e 
     */
    handleFavorite(e) {

        //Update state so we can fire our axios call
        return this.setState({
            favoriteClass: e.target.value,
            userID: localStorage.getItem("user_id"),
        }, () =>
            //callback handler 
            this.updateSchedule());
    }

    /**
     * updateSchedule - called from handleFavorite. Loads state variables
     * into a JS object and sends to php script via axios to update user's
     * class schedule
     */
    updateSchedule() {

        //Create the object to send to script
        let schedObj = {
            course: this.state.course_id,
            user: this.state.userID,
            favorite: this.state.favoriteClass,
        }

        //Fire an axios call to update the user's schedule with new favorite
        axios.post(settings.scriptServer + '/csg_scripts/addToSchedule.php', schedObj)
            .then(result => {
                console.log(result.data.success)
                console.log(result.data.message)
            })
            .catch(error => {
                console.log(error);
            }) 
    }

    render() {

        const {allSections, courseTitle} = this.state;
        const logged = localStorage.getItem("userLoggedIn");

        return(
            <>
            <div className="courseNameSections mt-5">
                <h4 id="courseTitleSections">{courseTitle} Sections:</h4>
            </div>
                <table className="table mt-3" id='scheduleTable'>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Section</th>
                            <th scope="col">Days</th>
                            <th scope="col">Start</th>
                            <th scope="col">End</th>
                            <th scope="col">Instructor</th>
                            <th scope="col">Syllabus</th>
                            <th scope="col">Favorite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSections.length > 0
                            ?
                            <Sections sections={allSections} fav={this.handleFavorite} />
                            :
                            "Sections for this course have yet to be added. :("
                        }
                    </tbody>
                </table>
                {
                    logged === "true" ?
                    <div className="clearSectionsButtonHouse">
                        <button className='btn btn-danger' onClick={this.handleClear}>Clear Section</button>
                    </div>
                    :
                    ''
                }
            </>
        )
    }
}