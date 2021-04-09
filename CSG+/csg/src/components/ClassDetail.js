import axios from "axios";
import React, {Component} from "react";
import Sections from './Sections';
import settings from "../constants/settings.js";

export default class ClassDetail extends Component {


    constructor(props) {
        super(props)

        this.state = {
            allSections: [],
            errorMessage: null,
        }
    }

    componentDidMount() {
        //Once mounted load the properties passed from the link
        //into our course object
        const course = this.props.location.courseProps;

        //Fire our axios call to return all of the associated sections
        //with this course
        axios.post(settings.scriptServer + '/csg_scripts/getSections.php', course.id)
            .then(result => {
                console.log(result);

                if(result.status === 200)
                {
                    this.setState({
                        allSections: result.data
                    })
                    console.log(this.state.allSections);
                }
                    
                if(result.data.success === false)
                {
                    this.setState({
                        errorMessage: result.data.message,
                    })
                }
                
            })
            .catch(function (error){
                console.log(error);
            });
    }

    sectionList() {
        return this.state.allSections.map(function (object, i) {
            return <Sections key={object.class_id} section={object} />
        })
    }

    render() {

        return(
            <>
                <table className="table mt-4" id='scheduleTable'>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Section</th>
                            <th scope="col">Days</th>
                            <th scope="col">Start</th>
                            <th scope="col">End</th>
                            <th scope="col">Instructor</th>
                            <th scope="col">Syllabus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.allSections.length > 0
                            ?
                            this.sectionList()
                            :
                            "No sections for this course... yet."
                        }
                    </tbody>
                </table>
            </>
        )
    }
}