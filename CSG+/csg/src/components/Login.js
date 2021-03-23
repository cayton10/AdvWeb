import React, {Component} from 'react';

export default class Login extends Component {
    render() {
        return(
            <>
            <main id='mainContent'>
            <div className='pageFunctionTitle'>
                    <h2>User Login</h2>
                </div>
                <form id="loginForm" className='my-5'>
                    <div className='row'>
                        <div className="form-group col-md-12 col-lg-6" >
                            <label htmlFor="loginEmail">User Email</label>
                            <input type="email" className="form-control" id="loginEmail" placeholder="Ex: student@marshall.live.edu" />
                        </div>
                        <div className="form-group col-md-12 col-lg-6" >
                            <label htmlFor="loginPassword">Password</label>
                            <input type="password" className="form-control" id="loginPassword" placeholder="Ex: password" />
                        </div>
                    </div>            

                    <div id='registrationSubmit' className='d-flex justify-content-around py-5'>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    
                </form>
            </main>
            </>
        )
    }
}