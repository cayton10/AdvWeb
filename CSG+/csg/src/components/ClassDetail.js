import axios from "axios";
import React, {Component} from "react";
import Sections from './Sections';
import settings from "../constants/settings.js";

export default class ClassDetail extends Component {


    constructor(props) {
        super(props)

        this.state = {
            courseID: null,
            courseTitle: null,
            allSections: [],
            errorMessage: null,
            favoriteClass: null,
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
                console.log(result);

                if(result.status === 200)
                {
                    //Apparently need to add keys here. Don't know why dev tools
                    //is yelling at me.
                    this.setState({
                        allSections: result.data,
                        courseTitle: title
                    })
                    console.log(this.state.allSections);
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
        alert("PUSHED");
        var radList = document.getElementsByName('favSection');

    }

    handleFavorite(e) {
        alert("YUP");
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
                            <Sections sections={allSections} fav={this.handleFavorite}/>
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