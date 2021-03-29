import React, {Component} from 'react'; 
import {AnimateOnChange} from 'react-animation';
import axios from 'axios';
import settings from "../constants/settings.js";
import { Redirect } from 'react-router';

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
        this.passwordCheck = this.passwordCheck.bind(this);

        //Store state variables here
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: '',
            passwordsMatch: true,
            errorMessage: '',
            registered: false,
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
        //If user starts inputting info and error handling has already been done, get rid of it

        if(document.getElementById('registerPW').classList.contains('checkField')) {
            document.getElementById('registerPW').classList.remove('checkField');
            document.getElementById('registerConfirmPW').classList.remove('checkField');
            this.setState({errorMessage: ''});
        }
    }

    enterConfirmPassword(e) {
        this.setState({confirmPassword: e.target.value});
    }


    passwordCheck(pw1, pw2) {

        //Declare these input fields here so branch access is easy
        var pwField = document.getElementById('registerPW'); 
        var confPwField = document.getElementById('registerConfirmPW');

        //Show error styling
        if(pw1 !== pw2) {

            pwField.classList.add('checkField');
            confPwField.classList.add('checkField');

            this.setState({errorMessage: "Passwords do not match."});
            
            this.setState({passwordsMatch: false});

        } else if(pw1 === pw2) {
            //Remove error styling

            if(pwField.classList.contains('checkField')) {
                pwField.classList.remove('checkField');
                confPwField.classList.remove('checkField');
            }

            this.setState({passwordsMatch: true});
        }
    }


    //Submit form function
    handleSubmit(e) {

        const {first_name, last_name, email, password, confirmPassword, passwordsMatch} = this.state;

        this.passwordCheck(password, confirmPassword);

        if(passwordsMatch !== true) {
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

        //Debugging
        console.log(userObj);

        //Send data via axios
        //Check settings in constants dir for explanation
        axios.post(settings.scriptServer + '/csg_scripts/addUser.php', userObj)
            .then(result => {

                //If 201 "created" set loggedIn state variable to redirect user
                if(result.status == 201) {
                    //Set local storage for the session
                    localStorage.setItem('userName', first_name);
                    localStorage.setItem('user_id', result.data.user);
                    localStorage.setItem('userLoggedIn', "true");

                    //Call parent App() method to update state
                    this.props.handleUser(first_name);

                    this.setState({
                        registered: true,
                    });
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    render() {


        //Conditionally render based on registration status
        if(this.state.registered) {
            return <Redirect to={'/courses'} />
        }
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
                            <input type="password" className="form-control" onChange={this.enterConfirmPassword} value={this.state.confirmPassword}id="registerConfirmPW" placeholder="Password" required/>
                        </div>
                    </div>
                    <div className='passwordError'>
                        <AnimateOnChange
                        animationIn="bounceIn"
                        animationOut="bounceOut"
                        durationOut={500}
                        >
                        <h4>{this.state.errorMessage}</h4>
                        </AnimateOnChange>
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