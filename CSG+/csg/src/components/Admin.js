import React, {Component} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import settings from "../constants/settings.js";
import SelectOptions from "./SelectOptions";
import AdminTable from "./AdminTable";

export default class Admin extends Component {

    constructor(props) {
        super(props)

        //Store the student list as a state variable
        this.state = {
            userList: [],
            userName: '',
            userSchedule: [],
            section: null,
        }

        this.handleUserSelect = this.handleUserSelect.bind(this);
        this.handleSectionRemove = this.handleSectionRemove.bind(this);
    }

    componentDidMount() {
        
        //Fire axios call to get all users
        axios.get(settings.scriptServer + "/csg_scripts/getUsers.php")
            .then(result => {
                
                //Result branching
                result.status === 200 ? this.setState({
                    userList: result.data,
                })
                :
                console.log(result.status)

            })
            .catch(error => {
                console.log(error);
            })
    }

    /**
     * userList() takes no parameters.
     * Maps state array to return a list of components which is comprised
     * of all user names within the database.
     * @returns COMPONENT
     */
    userList() {
        return this.state.userList.map(function(object, i) {
            return <SelectOptions obj={object} key={i} />;
        })
    }

    /**
     * handleUserSelect(event) - Handles on change event and updates state of
     * userID. Fires axios call to return an array of sections / courses for a 
     * user's schedule
     * @param {onChange event} e 
     */
    handleUserSelect(e) {

        this.setState({
            userID: e.target.value,
            userName: e.target[e.target.selectedIndex].text,
        }, () => {


            axios.post(settings.scriptServer + "/csg_scripts/getUserSchedule.php", this.state.userID)
                .then(result => {

                    if(result.status === 200) {
                        this.setState({
                            userSchedule: result.data,
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }

    handleSectionRemove(e) {
        return(
            this.setState({
                section: e.target.value,
            },
                console.log(e.target.value)
            )
        )
    }


    render() {
        const {userList, userSchedule} = this.state;
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
            {
                userSchedule.length > 0 ?
                <AdminTable schedule={userSchedule} method={this.handleSectionRemove} />
                :
                ''
            }
            {
                console.log(userSchedule)
            }
            <div><p>If time allows, will add functionality to administer user accounts here</p></div>
            </>
        )
    }
}