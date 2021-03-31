import React from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogAccess from './LogAccess';
import AdminAccess from './AdminAccess';
import settings from "../constants/settings.js";

const Footer = ({logStatus, adminStatus, handleLogOut}) => {

    const log = logStatus;
    const admin = adminStatus;
    const logout = handleLogOut;

    const d = new Date();
    const year = d.getFullYear();
    return(
      <>
      <footer className='footer navbar-static-bottom'>
        <div className="container">
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark footerNav'>
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

                <LogAccess logStatus={log} handleLogOut={logout} />
                
                <AdminAccess adminStatus={admin} />

              </ul>
            </div>
          </nav>
          <div id='builtWith' className='d-flex justify-content-center' >
              <img id='reactPNG' src={settings.path + 'logo192.png'} />
              <p id='builtWithP'>Built with React</p>
              <img id='reactPNG' src={settings.path + 'logo192.png'} />
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