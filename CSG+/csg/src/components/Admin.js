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

    /**
     * handleSectionRemove(event) - This method is sent down two children components
     * in order to 1.) Update state array variable of user schedule and 2.) Add appropriate
     * data to the database to persist changes.
     * @param {onClick event} e 
     * @returns updated state array and fires axios call
     * 
     * Lots of comments here because it took me a minute to figure out the architecture.
     * If anyone looks at this in a repo or otherwise, let me know I'm a dummy and to remove
     * all the comments in the function block
     */
    handleSectionRemove(e) {
        //Bring in current schedule state
        let schedule = this.state.userSchedule;
        //Section to delete
        let delSection = e.target.value;
        //Use the copy from above to filter the course we deleted
        //Store updated course schedule after deletion
        let updated = schedule.filter(course => course.schedule_id != delSection);

        //Return the updated state to re render and fire axios call to make permanent
        return( 
                this.setState({
                    userSchedule: updated,
                    section: delSection,
                }, () => {

                    //Create object to send to script
                    let userObj = {
                        userID: this.state.userID,
                        section: delSection,
                    }

                    console.log(userObj);
                    //Fire axios call and handle appropriately
                    axios.post(settings.scriptServer + "/csg_scripts/updateSchedule.php", userObj)
                        .then(result => {
                            console.log(result)
                        })
                        .catch(error => {
                            alert(error)
                        }) 
                })
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