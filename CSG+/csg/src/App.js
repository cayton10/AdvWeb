import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import {ScheduleReview, ListOfCourses, AddClassInfo, Admin, Login, Register, Footer, Home} from './components';
import {AnimateOnChange} from 'react-animation';
import './App.css';
import settings from "./constants/settings.js";


class App extends Component {

  constructor(props) {
    super(props);

    this.handleUserChange = this.handleUserChange.bind(this);

    this.state = {
      userId: null,
      userName: null,
      loggedIn: false,
      isAdmin: false,
    };
  }

  componentDidMount() {
    //Changes to component so we can change the document title
    document.title = "CSG+";
    const loggedIn = localStorage.getItem('userLoggedIn');
    const isAdmin = localStorage.getItem('isAdmin');

    console.log(loggedIn);
    console.log(isAdmin);

    if(loggedIn && isAdmin) {
      const userName = localStorage.getItem('userName');
      const userId = localStorage.getItem('user_id');

      this.setState({
        userId: userId,
        userName: userName,
        isAdmin: true,
        loggedIn: true,
      });
      
    } else if(loggedIn) {

      const userName = localStorage.getItem('userName');
      const userId = localStorage.getItem('user_id');
      this.setState({
        userId: userId,
        userName: userName,
        loggedIn: true,
      })
    }
  }

  //Update state method and pass through registration / sign in components
  handleUserChange(fname) {
    
    return this.setState({
      userName: fname,
      loggedIn: true,
    })
  }

  render() {
    return (
      <Router basename={"Projects/CSG"}>
        <div className='flexWrapper'>
          <div className='container contentContainer'>
            <div id='titleBar' className='align-items-center justify-content-around mb-3'>
              <div>
                <h1 id='appTitle'>Course Schedule Generator +</h1>
              </div>
              <div>
                <img id='csgNavLogo' src={settings.path + 'csgLogo.svg'}  alt='CSG logo'/> 
              </div>
            </div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark' id='headerNav'>
              <div className='navbar-collapse' id='navbarSupportContent'>
                <ul className='navbar-nav'>
                  <li className='nav-item'>
                    <Link to={"/"} className='nav-link'>
                      Home
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to={"/schedule"} className='nav-link'>
                      Schedule
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to={"/courses"} className='nav-link'>
                      Courses
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to={"/login"} className='nav-link'>
                      Login
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to={"/register"} className='nav-link'>
                      Register
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to={"/add"} className='nav-link'>
                      Add Info
                    </Link>
                  </li>
                  <li className='nav-item pull-right'>
                    <Link to={"/admin"} className='nav-link'>
                      Admin
                    </Link>
                  </li>
                </ul>
              </div>
              {
                this.state.loggedIn ?
                <div className='nameTag'>
                  <ul className='navbar-nav'>
                  <AnimateOnChange
                    animationIn="bounceIn"
                    animationOut="bounceOut"
                    durationOut={500}
                    >
                    <li className='nav-item welcomeMssg'>Welcome, <strong>{this.state.userName}</strong></li>
                    </AnimateOnChange>
                  </ul>
                </div>
                :
                <div className='nameTag'>
                  <ul className='navbar-nav'>
                  <AnimateOnChange
                    animationIn="bounceIn"
                    animationOut="bounceOut"
                    durationOut={500}
                    >
                    <li className='nav-item welcomeMssg'>Welcome</li>
                    </AnimateOnChange>
                  </ul>
                </div>
              }
              <div className='nameTag'></div>
            </nav>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/schedule" component={ScheduleReview}></Route>
              <Route exact path="/courses" component={ListOfCourses}></Route>
              <Route exact path="/add" component={AddClassInfo}></Route>
              <Route exact path="/admin" component={Admin}></Route>
              <Route render={(props) => (<Login {...props} handleUser={this.handleUserChange} />)}/>
              <Route render={(props) => (<Register {...props} handleUser={this.handleUserChange} />)}/>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}



export default App;
