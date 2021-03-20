import React, {Component} from "react";

export default class AddClassInfo extends Component {

    render() {
        return (
            <>
                <form id="addClassInfo" className='my-5'>
                    <div className='row'>
                        <div className="form-group col-md-12 col-lg-6" >
                            <label for="courseTitle">Course Title</label>
                            <input type="text" className="form-control" id="courseTitleField" placeholder="Ex: Advanced Web" />

                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label for="Course Alpha">Course Alpha</label>
                            <input type="text" className="form-control" id="courseAlphaField" placeholder="Ex: CIT" />
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label for="Course Alpha">Course Number</label>
                            <input type="number" className="form-control" id="courseNumberField" placeholder="Ex: 416" />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label for="Course Alpha">Course Alpha</label>
                            <input type="text" className="form-control" id="courseAlphaField" placeholder="Ex: CIT" />
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label for="Course Alpha">Course Number</label>
                            <input type="number" className="form-control" id="courseNumberField" placeholder="Ex: 416" />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label for="Course Alpha">Course Alpha</label>
                            <input type="text" className="form-control" id="courseAlphaField" placeholder="Ex: CIT" />
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label for="Course Alpha">Course Number</label>
                            <input type="number" className="form-control" id="courseNumberField" placeholder="Ex: 416" />
                        </div>
                    </div>
                    

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </>
        )
    }
}