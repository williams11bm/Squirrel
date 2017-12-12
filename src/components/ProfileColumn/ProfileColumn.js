import React, { Component } from 'react';
import './ProfileColumn.css'
import firebase, {auth} from '../../firebase'
import tempPicture from '../../images/temp-profile.png'

class ProfileColumn extends Component {

  constructor(props) {
    super(props)

    this.state = {
      first: '',
      last: '',
      email: '',
      tags: []
    }
  }

  componentDidMount() {
    this.firebaseRef = firebase.database().ref(`users/${auth.currentUser.uid}`)
    this.firebaseRef.on('value', function (dataSnapshot) {
      const values = dataSnapshot.val()
      console.log('values', values)
      this.setState({
        first: values.first_name,
        last: values.last_name,
        email: values.email,
        tags: values.tags
      });
    }.bind(this))
  }

  render() {
    if (this.props.authed === true) {
      return (
  			<div className="col s3 profile-col">
  				<div className="picture-box-container">
            <img src = {tempPicture} className="picture-box"/>
  				</div>
  				<div className="info-box">
            <h4 className="about"> About Me</h4>
  					<p>Name: {this.state.first + ' ' + this.state.last}</p>
  					<p>Email: {this.state.email}</p>
            <p> Interests: </p>
  				</div>
  			</div>
      )
    }
    else {
      return null
    }
  }
}

export default ProfileColumn
