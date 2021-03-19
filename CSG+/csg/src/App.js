import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ScheduleReview, ListOfCourses, AddClassInfo, Admin} from './components';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
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
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
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
        </nav>
        <Switch>
          <Route exact path="/schedule" component={ScheduleReview}></Route>
          <Route exact path="/courses" component={ListOfCourses}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
