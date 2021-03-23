import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link, BrowserRouter} from "react-router-dom";
import {ScheduleReview, ListOfCourses, AddClassInfo, Admin, Login, Register, Footer, Home} from './components';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    //Changes to component so we can change the document title
    document.title = "CSG+";
  }

  render() {
    return (
      <BrowserRouter
        basename="/Projects/CSG">
      <Router>
        <div className='container'>
          <div id='titleBar' className='align-items-center justify-content-around mb-3'>
            <div>
              <h1 id='appTitle'>Course Schedule Generator +</h1>
            </div>
            <div>
              <img id='csgNavLogo' src='csgLogo.svg' alt='CSG logo'/> 
            </div>
          </div>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark' id='headerNav'>
            <div className='navbar-collapse' id='navbarSupportContent'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <Link to={"/Projects/CSG/"} className='nav-link'>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to={"/Projects/CSG/schedule"} className='nav-link'>
                    Schedule
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to={"/Projects/CSG/courses"} className='nav-link'>
                    Courses
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to={"/Projects/CSG/add"} className='nav-link'>
                    Add Info
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to={"/Projects/CSG/login"} className='nav-link'>
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to={"/Projects/CSG/register"} className='nav-link'>
                    Register
                  </Link>
                </li>
                <li className='nav-item pull-right'>
                  <Link to={"/Projects/CSG/admin"} className='nav-link'>
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path='/Projects/CSG' component={Home}></Route>
            <Route exact path="/Projects/CSG/schedule" component={ScheduleReview}></Route>
            <Route exact path="/Projects/CSG/courses" component={ListOfCourses}></Route>
            <Route exact path="/Projects/CSG/add" component={AddClassInfo}></Route>
            <Route exact path="/Projects/CSG/admin" component={Admin}></Route>
            <Route exact path="/Projects/CSG/login" component={Login}></Route>
            <Route exact path="/Projects/CSG/register" component={Register}></Route>
          </Switch>
        </div>
        <Footer />
      </Router>
      </BrowserRouter>

    );
  }
}



export default App;
