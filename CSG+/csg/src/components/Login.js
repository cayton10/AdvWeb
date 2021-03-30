import React, {Component} from 'react';
import {AnimateOnChange} from 'react-animation';
import axios from 'axios';
import settings from "../constants/settings.js";
import { Redirect } from 'react-router';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.enterEmail = this.enterEmail.bind(this);
        this.enterPassword = this.enterPassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            email: null,
            password: null,
            firstName: null,
            errorMessage: null,
            isAdmin: null,
            loggedIn: null,
        }
    }

    enterEmail(e) {
        this.setState({email: e.target.value});
    }

    enterPassword(e) {
        this.setState({password: e.target.value});
    }

    handleLogin(e) {

        //Destructure state variables
        const {email, password, firstName, errorMessage} = this.state;

        e.preventDefault();

        const loginObj = {
            email: email,
            password: password,
        }

        //console.log(loginObj);


        //Send data via axios
        //Check settings in constants dir for explanation
        axios.post(settings.scriptServer + '/csg_scripts/loginUser.php', loginObj)
            .then(result => {
                //If 200 "OK" set loggedIn state variable to redirect user and set storage
                if(result.data != 200) {

                    console.log(result);
                    //Set local storage for the session
                    localStorage.setItem('userName', result.data.first_name);
                    localStorage.setItem('user_id', result.data.user_id);
                    localStorage.setItem('userLoggedIn', "true");
                    localStorage.setItem('role', result.data.is_admin);

                    //Call parent App() method to update state
                    this.props.handleUser(result.data.first_name);

                    this.setState({
                        loggedIn: true,
                    });
                }
            })
            .catch(error => {
                alert(error);
            });
    }


    render() {
        //Conditionally render based on registration status
        if(this.state.loggedIn) {
            return <Redirect to={'/courses'} />
        }

        return(
            <>
            <main id='mainContent'>
            <div className='pageFunctionTitle'>
                    <h2>User Login</h2>
                </div>
                <form id="loginForm" className='my-5' onSubmit={this.handleLogin}>
                    <div className='row'>
                        <div className="form-group col-md-12 col-lg-6" >
                            <label htmlFor="loginEmail">User Email</label>
                            <input type="email" className="form-control" onChange={this.enterEmail} id="loginEmail" placeholder="Ex: student@marshall.live.edu" required/>
                        </div>
                        <div className="form-group col-md-12 col-lg-6" >
                            <label htmlFor="loginPassword">Password</label>
                            <input type="password" className="form-control" onChange={this.enterPassword} id="loginPassword" placeholder="Ex: password" required/>
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

                    <div id='registrationSubmit' className='d-flex justify-content-around py-5'>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    
                </form>
            </main>
            </>
        )
    }
}