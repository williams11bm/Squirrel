import React, { Component } from 'react';
import "./ViewLists.css"
import { Link } from 'react-router-dom'
import ProfileColumn from '../ProfileColumn/ProfileColumn'
import ViewList from "./ViewList/ViewList";
import firebase, {auth} from '../../firebase'

class ViewLists extends Component {


  lists = [];

  constructor() {
    super()
    this.state = {
      lists: []
    }
  }

  componentDidMount() {
    console.log(auth.currentUser.uid)
    this.firebaseRef = firebase.database().ref("users/" + auth.currentUser.uid + '/othersLists')
    this.firebaseRef.on("child_added", function(dataSnapshot) {
      let userList = dataSnapshot.val()
      firebase.database().ref(`users/${userList.uid}/lists/${dataSnapshot.key}`).once('value')
        .then(function(dataSnapshot) {
          console.log(dataSnapshot.val())
          if (dataSnapshot.val() !== null) {
            let list = dataSnapshot.val()
            firebase.database().ref(`users/${userList.uid}`).once('value')
              .then(function (snapshot) {
                list["owner"] = snapshot.val().first_name + ' ' + snapshot.val().last_name
                list["key"] = dataSnapshot.key
                list["uid"] = userList.uid
                this.lists.push(list);
                this.setState({
                  lists: this.lists
                });
              }.bind(this))
          }
      }.bind(this))
    }.bind(this))
    this.firebaseRef.on("child_removed", function(dataSnapshot) {
      //TODO: handle what happens when a list is removed
      this.lists = this.lists.filter(list => list.key !== dataSnapshot.key);
      console.log('child removed');
      this.setState({
        lists: this.lists
      });
    }.bind(this))
  }

  getNameById(id) {
    firebase.database().ref(`users/${id}`).once('value')
      .then(snapshot => {
        console.log('getNameById', snapshot.val().first_name + ' ' + snapshot.val().last_name)
        return snapshot.val().first_name + ' ' + snapshot.val().last_name
      })
  }


  render() {
    return (
      <div >
				<div className="row">
					<div className="col s9">
					<h4>View Lists</h4>
          <div className="view-lists-container">
					<ul className="collection ">
            {this.state.lists.map((list, key) => <ViewList list={list} key={key}/>)}
					</ul>
          </div>
					</div>
				</div>
			</div>
    )
  }
}

export default ViewLists
