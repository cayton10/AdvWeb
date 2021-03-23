import React, {Component} from 'react';

export default class Register extends Component {

    render() {
        return (
        <>
            <main id='mainContent'>
                <div className='pageFunctionTitle'>
                    <h2>User Registration</h2>
                </div>
                <form id="registrationForm" className='my-5'>
                    <div className='row'>
                        <div className="form-group col-md-12" >
                            <label htmlFor="registerEmail">User Email</label>
                            <input type="email" className="form-control" id="registerEmail" placeholder="Ex: student@marshall.live.edu" />

                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="registerFirst">First Name</label>
                            <input type="text" className="form-control" id="registerFirst" placeholder="Ex: Peter" />
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="registerLast">Course Number</label>
                            <input type="text" className="form-control" id="registerLast" placeholder="Ex: Parker" />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="registerPW">Password</label>
                            <input type="password" className="form-control" id="registerPW" placeholder="Password" />
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="registerConfirmPW">Confirm Password</label>
                            <input type="password" className="form-control" id="registerConfirmPW" placeholder="Password" />
                        </div>
                    </div>
                    

                    <div id='registrationSubmit' className='d-flex justify-content-around py-5'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    
                </form>
            </main>
        </>
        )
    }
}