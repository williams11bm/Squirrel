import React, { Component } from 'react';
import { auth } from '../../firebase'
import './LoginPage.css'
import { Link } from 'react-router-dom'

class LoginPage extends Component {


  constructor() {
    super();
    this.state = {
      loading: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    auth.signInWithEmailAndPassword(this.email.value, this.pw.value)
      .then(() => {
        this.setState({
          loading: false
        })
      })
      .catch((error) => {
        this.setState({
          loading: false
        })
        //this.setState(setErrorMsg('Invalid username/password.'))
      })
  };

  render() {
    return (
      <div>
      <div className="loading_second_container">
      <div className="loading_container">
      <div className="login_container">

        <div className="login_image">
        </div>

        <div className="login_form">
          <div className="row">
            <h4> Login </h4>
            <form className="col s12" autocomplete="off" onSubmit={this.handleSubmit}>

              <div className="input-field col s12">
                <input id="email" type="text" ref={(email) => this.email = email} className="validate" />
                  <label htmlFor="email">Email</label>
              </div>

              <div className="input-field col s12">
                <input id="password" type="password" ref={(pw) => this.pw = pw} className="validate" />
                  <label htmlFor="password">Password</label>
              </div>

              <div className="col s12 button_login_container">
                <button className="login_register_button register waves-effect waves-light btn">
                <Link to="/register"> Sign Up </Link> </button>
                <button className="login_login_button login waves-effect waves-light btn" disabled={this.state.loading}>Login</button>
              </div>

            </form>
          </div>
        </div>

      </div>
      </div>
      </div>
      </div>

    )
  }
}

export default LoginPage
