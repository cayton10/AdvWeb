import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {ScheduleReview, 
        ListOfCourses, 
        AddClassInfo, 
        Admin, 
        Login, 
        Register, 
        Footer, 
        Home,
        LogAccess,
        AdminAccess} from './components';
import {AnimateOnChange} from 'react-animation';
import './App.css';
import settings from "./constants/settings.js";


class App extends Component {

  constructor(props) {
    super(props);

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleLogOutState = this.handleLogOutState.bind(this);

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

    console.log(loggedIn);

    if(loggedIn === 'true') {

      const userName = localStorage.getItem('userName');
      const userId = localStorage.getItem('user_id');

      this.setState({
        userId: userId,
        userName: userName,
        loggedIn: true,
      })
      
      if(userName === 'Admin') {
        this.setState({
          isAdmin: true,
        })
      }
    }

    console.log(loggedIn); 

  }

  //Update state method and pass through registration / sign in components
  handleUserChange(fname, admin) {
      
    return this.setState({
      userName: fname,
      loggedIn: true,
      isAdmin: admin,
    })

  }

  handleLogOutState() {
    //Use callback after setState to clear local storage
    return this.setState({
      userName: '',
      loggedIn: false,
      isAdmin: false,
    }, () =>
      localStorage.clear());
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
                 
                    <LogAccess logStatus={this.state.loggedIn} handleLogOut={this.handleLogOutState}/>

                    <AdminAccess adminStatus={this.state.isAdmin} />
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
                    <li className='nav-item welcomeMssg'>Welcome to CSG+</li>
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
              <Route
                path="/login" 
                render={(props) => (<Login {...props} handleUser={this.handleUserChange} />)}/>
              <Route
                path="/register"
                render={(props) => (<Register {...props} handleUser={this.handleUserChange} />)}/>
            </Switch>
          </div>
          <Footer logStatus={this.state.loggedIn} 
                  adminStatus={this.state.isAdmin} 
                  handleLogOut={this.handleLogOutState}/>
        </div>
      </Router>
    );
  }
}



export default App;
