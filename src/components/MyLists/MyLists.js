import React, { Component } from 'react';
import './MyLists.css'
import { Link } from 'react-router-dom'
import ProfileColumn from '../ProfileColumn/ProfileColumn'
import firebase, {auth} from '../../firebase'
import List from "./List/List";

class MyLists extends Component {

  lists = [];

  constructor() {
    super()
    this.state = {
      lists: []
    }
  }

  componentDidMount() {
    console.log(auth.currentUser.uid)
    this.firebaseRef = firebase.database().ref("users/" + auth.currentUser.uid + '/lists')
    this.firebaseRef.on("child_added", function(dataSnapshot) {
      this.lists.push(dataSnapshot)
      this.setState({
        lists: this.lists
      });
    }.bind(this))
    this.firebaseRef.on("child_removed", function(dataSnapshot) {
      this.lists = this.lists.filter(list => list.key !== dataSnapshot.key);
      console.log('child removed');
      this.setState({
        lists: this.lists
      });
    }.bind(this))
  }

  render() {
    return (
      <div >
				<div className="row">
					<div className="col s9 main-content">
          <div>
            <h4>My Lists</h4>
            <div className="my-lists-container">
            {console.log(this.state.lists[0])}
            {this.state.lists.length > 0
              ? <ul className="collection">
                {this.state.lists.map((list, index) => <List list={list.val()} key={index} id={list.key}/>)}
              </ul>
              : null }
            </div>
          </div>
					</div>
				</div>
			</div>
    )
  }
}

export default MyLists
