import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {

    const d = new Date();
    const year = d.getFullYear();
    return(
      <>
      <footer className='footer navbar-static-bottom'>
        <div className="container">
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
                <li className='nav-item pull-right'>
                  <Link to={"/admin"} className='nav-link'>
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div id='builtWith' className='d-flex justify-content-center' >
              <img id='reactPNG' src='logo192.png' />
              <p id='builtWithP'>Built with React</p>
              <img id='reactPNG' src='logo192.png' />
          </div>
          <div id='footTagLine' className='d-flex justify-content-center' >
            <p>&copy; <strong>{year}</strong> BPC All rights reserved.</p>
          </div>
        </div>
      </footer>
      </>
  
    )
  }

  export default Footer;