import axios from "axios";
import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import ClassDetail from './ClassDetail';
import CourseCard from './CourseCard';
import {AnimateOnChange} from 'react-animation';
import settings from "../constants/settings.js";