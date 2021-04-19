import React, {Component} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import settings from "../constants/settings.js";
import SelectOptions from "./SelectOptions";

export default class Admin extends Component {

    constructor(props) {
        super(props)

        //Store the student list as a state variable
        this.state = {
            userList: [],
            userSchedule: [],
        }

        this.handleUserSelect = this.handleUserSelect.bind(this);
    }

    componentDidMount() {
        
        //Fire axios call to get all users
        axios.get(settings.scriptServer + "/csg_scripts/getUsers.php")
            .then(result => {
                
                //Result branching
                result.status == 200 ? this.setState({
                    userList: result.data,
                })
                :
                console.log(result.status)

            })
            .catch(error => {
                console.log(error);
            })
        
    }

    //TODO: Put method documentation comments into this component
    userList() {
        return this.state.userList.map(function(object, i) {
            return <SelectOptions obj={object} key={i} />;
        })
    }

    handleUserSelect(e) {

    }

    render() {
        const {userList} = this.state;
        return (
            <>
            <form className="form-group boogerSelectDiv" >
                <label htmlFor="studentSelect">
                    <h4 className="mt-3">Select a disappointment:</h4> 
                </label>
                <select onChange={this.handleUserSelect} className="form-control" id="studentSelect">
                    <option value='-1'>Select User</option>
                    {
                        userList.length > 0 ?
                        this.userList():
                        ''
                    }
                </select>
            </form>
            
            <div><p>If time allows, will add functionality to administer user accounts here</p></div>
            </>
        )
    }
}