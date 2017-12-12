import React, { Component } from 'react';
import './Footer.css';


class Footer extends Component {
  render() {
    return (
			<footer className="page-footer">

      <div className="footer-copyright">
        <div className="footer-container">

          <span className="squirrel_name"> Squirrel.com </span>

          <span className="copyright"> © 2017 Copyright </span>

          <div className="social_media">
            <a href="#" className="fa fa-facebook"></a>
            <a href="#" className="fa fa-twitter"></a>
            <a href="#" className="fa fa-google"></a>
            <a href="#" className="fa fa-linkedin"></a>
          </div>


        </div>
      </div>

			</footer>
    )
  }
}

export default Footer
