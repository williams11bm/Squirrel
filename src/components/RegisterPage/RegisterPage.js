import React, { Component } from 'react';
import firebase, { auth } from '../../firebase'
import './RegisterPage.css'
import { Link } from 'react-router-dom'

class RegisterPage extends Component {

  constructor() {
    super();
    this.state = {
      loading: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(this.email.value, this.pw.value)
      .then((user) => {
        console.log(user.uid)
        let _tags = this.tags.value.split(',');
        _tags = _tags.map(tag => tag.trim())
        this.logUser(user, _tags, this.first.value, this.last.value, this.email.value)
      })
      .catch((error) => {
        this.setState({
          loading: false
        })
        //this.setState(setErrorMsg('Invalid username/password.'))
      })
  };

  logUser(user, tags, first, last, email) {
    var ref = firebase.database().ref("users/" + user.uid);
    var obj = {
      "uid": user.uid,
      "tags": tags,
      "first_name": first,
      "last_name": last,
      "email": email
    };
    ref.set(obj); // or however you wish to update the node
  }

  render() {
    return (

      <div>
      <div className="loading_container_two">
      <div className="register_container">

      <div className="register_form">
      <div className="row">
        <h4 className="signup_text"> Signup </h4>
        <form className="col s12" autocomplete="off" onSubmit={this.handleSubmit}>
          <div className="input-field col s6">
            <input id="first" type="text" ref={(first) => this.first = first} className="validate"/>
            <label htmlFor="first">First Name</label>
          </div>
          <div className="input-field col s6">
            <input id="last" type="text" ref={(last) => this.last = last} className="validate"/>
            <label htmlFor="last">Last Name</label>
          </div>
          <div className="input-field col s12">
            <input id="email" type="text" ref={(email) => this.email = email} className="validate"/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input id="password" type="password" ref={(pw) => this.pw = pw} className="validate"/>
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field col s12">
            <input id="tags" type="text" ref={(tags) => this.tags = tags} className="validate"/>
            <label htmlFor="tags">Tags</label>
          </div>
          <div className="button_login_container col s12 ">
            <button className="register_login_button login waves-effect waves-light btn">
            <Link to="/login"> Login </Link> </button>
            <button type="submit" disabled={this.state.loading} className="register_register_button waves-effect waves-light btn">Sign Up</button>

          </div>
        </form>
      </div>
      </div>

      <div className="register_image">
      </div>


      </div>
      </div>
      </div>
    )
  }
}

export default RegisterPage
