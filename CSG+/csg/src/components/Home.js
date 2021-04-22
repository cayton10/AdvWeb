import React, {Component} from 'react';
import settings from "../constants/settings.js";

export default class Home extends Component {
    
    render() {
        return(
            <div className='container'>
      <main id='mainContent'>
        <div className='row'>
          <div className='col-12'>
            <div className='row mt-5'>

              <div className='col-sm-6 col-md-4'>
                <div className='textHeading'>
                  <h3>Course Library</h3>
                </div>
                <div className='textPlace'>
                  <ul>
                    <li>Access courses tab to view</li>
                    <li>Course list accessible to everyone</li>
                    <li>Organized by low to high difficulty</li>
                  </ul>
                </div>

              </div>
              <div className='col-sm-6 col-md-4'>
                <div className='textHeading'>
                  <h3>Course Sections</h3>
                </div>
                <div className='textPlace'>
                  <ul>
                    <li>Must be registered to view</li>
                    <li>Section contains optional link to syllabi</li>
                    <li>Favorite a section to add to your schedule</li>
                  </ul>
                </div>

              </div>
              <div className='col-sm-6 col-md-4'>
                <div className='textHeading'>
                  <h3>User Schedule</h3>
                </div>
                <div className='textPlace'>
                  <ul>
                    <li>View your schedule of "favorited" courses</li>
                    <li>Review course syllabus</li>
                    <li>Organized by class start time</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
        )
    }
}