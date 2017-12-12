import React, { Component } from 'react';
import "./Nav.css"
import Squirrel from "../../images/white_squirrel.png"
import { Link } from "react-router-dom";
import firebase, {auth} from "../../firebase.js";


class Nav extends Component {

  constructor(props) {
		super(props)

    this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e) {
		auth.signOut()

	}

  render() {
    if (this.props.authed === true) {
      return (
        <div id="profile-nav">

            <Link to="/" exact activeClassName="active"><img src={ Squirrel } alt="logo" /></Link>

          <div classNameName="links">

            <Link to="/create-list" className="link-buttons" activeClassName="active">Create List</Link>

            <Link to="/my-lists" className="link-buttons" activeClassName="active">My Lists</Link>

            <Link to="/view-lists" className="link-buttons" activeClassName="active"> Friends<span>&#39;</span> Lists</Link>

            <button className="link-buttons logout" onClick={this.handleClick}>Log Out</button>

          </div>

        </div>
      )
    }

    else {
      return null
    }

  }

}

export default Nav
