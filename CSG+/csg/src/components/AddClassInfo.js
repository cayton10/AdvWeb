import React, {Component} from "react";

export default class AddClassInfo extends Component {

    render() {
        return (
            <>
            <main id='mainContent'>
                <div className='pageFunctionTitle'>
                    <h2>Add Class Info</h2>
                </div>
                <form id="addClassInfo" className='my-5'>
                    <div className='row'>
                        <div className="form-group col-md-12" >
                            <label htmlFor="courseTitle">Course Title</label>
                            <input type="text" className="form-control" id="courseTitleField" placeholder="Ex: Advanced Web" />

                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="Course Alpha">Course Alpha</label>
                            <input type="text" className="form-control" id="courseAlphaField" placeholder="Ex: CIT" />
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="Course Alpha">Course Number</label>
                            <input type="number" className="form-control" id="courseNumberField" placeholder="Ex: 416" />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="Days">Days</label>
                            <input type="text" className="form-control" id="classDaysField" placeholder="Ex: MWF - TR" />
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="Course Alpha">Time</label>
                            <input type="number" className="form-control" id="classTimeField" placeholder="Ex: 800-915" />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="instructor">Instructor</label>
                            <input type="text" className="form-control" id="courseInstructorField" placeholder="Ex: Brian Morgan" />
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