import React, {Component} from "react";
import axios from 'axios';
import settings from "../constants/settings.js";
import {AnimateOnChange} from 'react-animation';

export default class AddClassInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            courseTitle: null,
            courseAlpha: null,
            courseNumber: null,
            courseSection: null,
            courseStart: null,
            courseEnd: null,
            courseDays: null,
            instructor: null,
            syllabusFile: null,
            errorMessage: null,
        }

        //Bind functions
        this.enterCourseTitle = this.enterCourseTitle.bind(this);
        this.enterCourseAlpha = this.enterCourseAlpha.bind(this);
        this.enterCourseNumber = this.enterCourseNumber.bind(this);
        this.enterCourseSection = this.enterCourseSection.bind(this);
        this.enterCourseStart = this.enterCourseStart.bind(this);
        this.enterCourseEnd = this.enterCourseEnd.bind(this);
        this.enterCourseDays = this.enterCourseDays.bind(this);
        this.enterInstructor = this.enterInstructor.bind(this);
        this.attachSyllabus = this.attachSyllabus.bind(this);
        this.handleAddClass = this.handleAddClass.bind(this);
        this.removeErrorMessage = this.removeErrorMessage.bind(this);
    }


/* --------------- FUNCTIONS TO PULL FORM INFORMATION ON EVENT -------------- */
    enterCourseTitle(e) {
        this.removeErrorMessage();
        this.setState({courseTitle: e.target.value,});
    }

    enterCourseAlpha(e) {
        this.removeErrorMessage();
        this.setState({courseAlpha: e.target.value,});
    }

    enterCourseNumber(e) {
        this.removeErrorMessage();
        this.setState({courseNumber: e.target.value,});
    }

    enterCourseSection(e) {
        this.removeErrorMessage();
        this.setState({courseSection: e.target.value});
    }

    enterCourseStart(e) {
        this.removeErrorMessage();
        this.setState({courseStart: e.target.value,});
    }

    enterCourseEnd(e) {
        this.removeErrorMessage();
        this.setState({courseEnd: e.target.value});
    }

    enterCourseDays(e) {
        this.removeErrorMessage();
        this.setState({courseDays: e.target.value});
    }

    enterInstructor(e) {
        this.removeErrorMessage();
        this.setState({instructor: e.target.value});
    }

    attachSyllabus(e) {
        //Set state variable
        this.setState({syllabusFile: e.target.files[0]});
        var field = document.getElementById("fileLabel");
        //Now change info on form
        var files = e.target.files;

        if(files) {
            var fileName = files[0].name;
            field.innerHTML = fileName;
        } else {
            field.innerHTML = "Upload Syllabus";
        }   
    }

    //Remove any error handling if people try to input data after message was shown
    removeErrorMessage() {
        if(this.state.errorMessage !== null) {
            this.setState({
                errorMessage: '',
            });
        }
    }

    handleAddClass(e) {
        //Destructure state variables for easy access
        const {courseAlpha, 
                courseNumber, 
                courseTitle, 
                courseStart, 
                courseEnd,
                courseDays,
                courseSection,
                instructor,
                syllabusFile,} = this.state;

        const courseObj = {
            alpha: courseAlpha,
            number: courseNumber,
            title: courseTitle,
        }

        const classObj = {
            section: courseSection,
            instructor: instructor,
            start: courseStart,
            end: courseEnd,
            days: courseDays, 
        }

        e.preventDefault();

        if(courseEnd <= courseStart) {
            this.setState({
                errorMessage: "Class end time cannot be before class start time. Check time entry."
            })
            return false;
        }

        //Create formdata object so we can append the img to it
        let formData = new FormData();

        //Iterate through course and class objects to load form data
        for(var key in courseObj) {
            formData.append(key, courseObj[key]);
        }

        for(var item in classObj) {
            formData.append(item, classObj[item]);
        }

        //Handle entries for no syllabus
        if(syllabusFile !== null) {
            //Add the syllabus file
            formData.append('file', syllabusFile, syllabusFile.name);
        }
        
        //Fire an axios POST with all of our information, take care of logic on php side
        axios.post(settings.scriptServer + '/csg_scripts/addClass.php', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(result => {

                //If we failed to upload any of our form data, update the error state variable
                if(result.data.success === false) {
                    this.setState({
                        errorMessage: result.data.message,
                    });
                }
                else
                {
                    //Clear the form
                    document.getElementById("addClassInfo").reset();
                    var field = document.getElementById("fileLabel");
                    field.innerHTML = "Upload Syllabus";
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <>
            <main id='mainContent'>
                <div className='pageFunctionTitle'>
                    <h2>Add Class Info</h2>
                </div>
                <form id="addClassInfo" className='my-5' onSubmit={this.handleAddClass}>
                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="courseTitle">Course Title</label>
                            <input type="text" className="form-control" id="courseTitleField" placeholder="Ex: Advanced Web" onChange={this.enterCourseTitle} required/>
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="Course Alpha">Course Alpha</label>
                            <input type="text" className="form-control" id="courseAlphaField" placeholder="Ex: CIT" onChange={this.enterCourseAlpha} required/>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="Course Alpha">Course Number</label>
                            <input type="number" className="form-control" id="courseNumberField" min="100" max="999" placeholder="Ex: 416" onChange={this.enterCourseNumber} required/>
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="courseSectionField">Course Section</label>
                            <input type="number" className="form-control" id="courseSectionField" min="100" max="199" placeholder="Ex: 100" onChange={this.enterCourseSection} required/>
                        </div>
                    </div>

                    <div className='row'>
                        
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="startTimeField">Start Time</label>
                            <input type="number" className="form-control" id="startTimeField" placeholder="Ex: 800" min="0800" max="2400" onChange={this.enterCourseStart}required/>
                            <small id="timeHelp" className="form-text text-muted">Schedules use 24 hr time, Ex: 1400 = 2pm</small>
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="endTimeField">End Time</label>
                            <input type="number" className="form-control" id="endTimeField" placeholder="Ex: 915" min="0850" max="2400" onChange={this.enterCourseEnd}required/>
                            <small id="timeHelp" className="form-text text-muted">Schedules use 24 hr time, Ex: 1400 = 2pm</small>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="classDaysField">Days</label>
                            <input type="text" className="form-control" id="classDaysField" maxLength="8" minLength="2" placeholder="Ex: MWF - TR" onChange={this.enterCourseDays} required/>
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="courseInstructorField">Instructor</label>
                            <input type="text" className="form-control" id="courseInstructorField" placeholder="Ex: Brian Morgan" onChange={this.enterInstructor} required/>
                            <small id="nameHelp" className="form-text text-muted">Please enter instructor FirstName LastName</small>
                        </div>
                    </div>
                    <div className="form-group col-md-12 mt-3">
                        <input type="file" accept="image/jpeg, image/gif, image/png, application/pdf, .doc,.docx" className="custom-file-input" id="customFile" onChange={this.attachSyllabus}/>
                        <label id="fileLabel" className="custom-file-label" htmlFor="customFile">Upload Syllabus</label>
                    </div>
                    <div className='addCourseError'>
                        <AnimateOnChange
                        animationIn="bounceIn"
                        animationOut="bounceOut"
                        durationOut={500}
                        >
                            <h4 className='errorMssg'>{this.state.errorMessage}</h4>
                        </AnimateOnChange>
                    </div>
                    

                    <div id='courseInfoSubmitDiv' className='d-flex justify-content-around py-5'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    
                </form>
            </main>
            </>
        )
    }
}