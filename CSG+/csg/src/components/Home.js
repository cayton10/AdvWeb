import React, {Component} from 'react';
import settings from "../constants/settings.js";

export default class Home extends Component {
    
    render() {
        return(
            <div className='container'>
      <main id='mainContent'>
        <div className='row'>
          <div className='col-12'>
            <div className='row'>

              <div className='col-sm-6 col-md-4'>
                <div className='imgPlace img-fluid'>
                  <img src={settings.path + 'logo512.png'} className='placeHolder'/>
                </div>
                <div className='textPlace'>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget dolor morbi non arcu risus quis varius quam quisque. Lorem ipsum dolor sit amet consectetur adipiscing. Tortor condimentum lacinia quis vel eros. Morbi tristique senectus et netus et malesuada fames ac. Nec ullamcorper sit amet risus. Viverra tellus in hac habitasse platea. Egestas purus viverra accumsan in nisl. Ut tellus elementum sagittis vitae. Proin libero nunc consequat interdum varius sit. Ultricies integer quis auctor elit sed vulputate. Fermentum posuere urna nec tincidunt. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Quisque sagittis purus sit amet volutpat. Ultrices tincidunt arcu non sodales neque sodales. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Convallis posuere morbi leo urna molestie.</p>
                </div>

              </div>
              <div className='col-sm-6 col-md-4'>
                <div className='imgPlace img-fluid'>
                  <img src={settings.path + 'logo512.png'} className='placeHolder'/>
                </div>
                <div className='textPlace'>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget dolor morbi non arcu risus quis varius quam quisque. Lorem ipsum dolor sit amet consectetur adipiscing. Tortor condimentum lacinia quis vel eros. Morbi tristique senectus et netus et malesuada fames ac. Nec ullamcorper sit amet risus. Viverra tellus in hac habitasse platea. Egestas purus viverra accumsan in nisl. Ut tellus elementum sagittis vitae. Proin libero nunc consequat interdum varius sit. Ultricies integer quis auctor elit sed vulputate. Fermentum posuere urna nec tincidunt. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Quisque sagittis purus sit amet volutpat. Ultrices tincidunt arcu non sodales neque sodales. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Convallis posuere morbi leo urna molestie.</p>
                </div>

              </div>
              <div className='col-sm-6 col-md-4'>
                <div className='imgPlace img-fluid'>
                  <img src={settings.path + 'logo512.png'} className='placeHolder'/>
                </div>
                <div className='textPlace'>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget dolor morbi non arcu risus quis varius quam quisque. Lorem ipsum dolor sit amet consectetur adipiscing. Tortor condimentum lacinia quis vel eros. Morbi tristique senectus et netus et malesuada fames ac. Nec ullamcorper sit amet risus. Viverra tellus in hac habitasse platea. Egestas purus viverra accumsan in nisl. Ut tellus elementum sagittis vitae. Proin libero nunc consequat interdum varius sit. Ultricies integer quis auctor elit sed vulputate. Fermentum posuere urna nec tincidunt. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Quisque sagittis purus sit amet volutpat. Ultrices tincidunt arcu non sodales neque sodales. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Convallis posuere morbi leo urna molestie.</p>
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