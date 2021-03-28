import React, {Component} from 'react';

export default class Register extends Component {

    constructor(props) {
        super(props);

        //Bind our component functions to component constructor
        this.enterFirstName = this.enterFirstName.bind(this);
        this.enterLastName = this.enterLastName.bind(this);
        this.enterEmail = this.enterEmail.bind(this);
        this.enterPassword = this.enterPassword.bind(this);
        this.enterConfirmPassword = this.enterConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        //Store state variables here
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: '',
            passwordsMatch: true,
        }
    }

    //Define form field functions
    enterFirstName(e) {
        this.setState({first_name: e.target.value});
    }

    enterLastName(e) {
        this.setState({last_name: e.target.value});
    }

    enterEmail(e) {
        this.setState({email: e.target.value});
    }

    enterPassword(e) {
        this.setState({password: e.target.value});
    }

    enterConfirmPassword(e) {
        this.setState({confirmPassword: e.target.value});
    }

    passwordCheck(pw1, pw2) {
        if(pw1 !== pw2) {
            this.setState({passwordsMath: false});
        } else if(pw1 === pw2) {
            this.setState({passwordsMatch: true});
        }
    }


    //Submit form function
    handleSubmit(e) {

        const {first_name, last_name, email, password, confirmPassword, passwordsMatch} = this.state;

        this.passwordCheck(password, confirmPassword);

        if(passwordsMatch != true) {
            return;
        }

        //Prevent default form submission
        e.preventDefault();


        const userObj = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        }

        console.log(userObj);
    }

    render() {
        return (
        <>
            <main id='mainContent'>
                <div className='pageFunctionTitle'>
                    <h2>User Registration</h2>
                </div>
                <form id="registrationForm" className='my-5' onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <div className="form-group col-md-12" >
                            <label htmlFor="registerEmail">User Email</label>
                            <input type="email" className="form-control" onChange={this.enterEmail} value={this.state.email} id="registerEmail" placeholder="Ex: student@marshall.live.edu" required/>

                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="registerFirst">First Name</label>
                            <input type="text" className="form-control" onChange={this.enterFirstName} value={this.state.first_name} id="registerFirst" placeholder="Ex: Peter" required/>
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="registerLast">Last Name</label>
                            <input type="text" className="form-control" onChange={this.enterLastName} value={this.state.last_name} id="registerLast" placeholder="Ex: Parker" required/>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="registerPW">Password</label>
                            <input type="password" className="form-control" onChange={this.enterPassword} value={this.state.password} id="registerPW" placeholder="Password" required />
                        </div>
                        <div className="form-group col-md-6 col-lg-6" >
                            <label htmlFor="registerConfirmPW">Confirm Password</label>
                            <input type="password" className="form-control" onChange={this.enterConfirmPassword} value={this.state.confirmPassword} id="registerConfirmPW" placeholder="Password" required/>
                        </div>
                    </div>
                    

                    <div id='registrationSubmit' className='d-flex justify-content-around py-5 form-group'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    
                </form>
            </main>
        </>
        )
    }
}