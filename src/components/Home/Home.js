import React, { Component } from 'react';
import './Home.css'
import LoginPage from "../LoginPage/LoginPage";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="landing_second_container">
          <div className="landing_container">

          <div className="landing_image"></div>

          <div className="home_button">
            <a href="/login"> ENTER </a>
          </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Home
