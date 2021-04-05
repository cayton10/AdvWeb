import React, {Component} from "react";

export default class AddClassInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            courseTitle: '',
            courseAlpha: '',
            courseNumber: '',
            courseSection: '',
            courseStart: '',
            courseEnd: '',
            courseDays: '',
        }

        //Bind functions
        this.enterCourseTitle = this.enterCourseTitle.bind(this);
        this.enterCourseAlpha = this.enterCourseAlpha.bind(this);
        this.enterCourseNumber = this.enterCourseNumber.bind(this);
        this.enterCourseSection = this.enterCourseSection.bind(this);
        this.enterCourseStart = this.enterCourseStart.bind(this);
        this.enterCourseEnd = this.enterCourseEnd.bind(this);
        this.enterCourseDays = this.enterCourseDays.bind(this);
        this.handleAddClass = this.handleAddClass.bind(this);
    }


/* --------------- FUNCTIONS TO PULL FORM INFORMATION ON EVENT -------------- */
    enterCourseTitle(e) {
        this.setState({courseTitle: e.target.value,});
    }

    enterCourseAlpha(e) {
        this.setState({courseAlpha: e.target.value,});
    }

    enterCourseNumber(e) {
        this.setState({courseNumber: e.target.value,});
    }

    enterCourseSection(e) {
        this.setState({courseSection: e.target.value});
    }

    enterCourseStart(e) {
        this.setState({courseStart: e.target.value,});
    }

    enterCourseEnd(e) {
        this.setState({courseEnd: e.target.value});
    }

    enterCourseDays(e) {
        this.setState({courseDays: e.target.value});
    }

    handleAddClass(e) {

        e.preventDefault();

        console.log("HERE");
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
                            <input type="text" className="form-control" id="courseTitleField" placeholder="Ex: Advanced Web" required/>
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="Course Alpha">Course Alpha</label>
                            <input type="text" className="form-control" id="courseAlphaField" placeholder="Ex: CIT" required/>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="Course Alpha">Course Number</label>
                            <input type="number" className="form-control" id="courseNumberField" min="100" max="999" placeholder="Ex: 416" required/>
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="courseSectionField">Course Section</label>
                            <input type="number" className="form-control" id="courseSectionField" min="100" max="199" placeholder="Ex: 100" required/>
                        </div>
                    </div>

                    <div className='row'>
                        
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="startTimeField">Start Time</label>
                            <input type="number" className="form-control" id="startTimeField" placeholder="Ex: 800" min="0000" max="2400" required/>
                            <small id="timeHelp" className="form-text text-muted">Schedules use 24 hr time, Ex: 1400 = 2pm</small>
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="endTimeField">End Time</label>
                            <input type="number" className="form-control" id="endTimeField" placeholder="Ex: 915" min="0000" max="2400" required/>
                            <small id="timeHelp" className="form-text text-muted">Schedules use 24 hr time, Ex: 1400 = 2pm</small>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="classDaysField">Days</label>
                            <input type="text" className="form-control" id="classDaysField" maxLength="8" minLength="2" placeholder="Ex: MWF - TR" required/>
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="courseInstructorField">Instructor</label>
                            <input type="text" className="form-control" id="courseInstructorField" placeholder="Ex: Brian Morgan" required/>
                        </div>
                    </div>
                    <div className="form-group col-md-12 mt-3">
                        <input type="file" className="custom-file-input" id="customFile" />
                        <label className="custom-file-label" htmlFor="customFile">Upload Syllabus</label>
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