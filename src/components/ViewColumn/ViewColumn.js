import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AddViewer from '../AddViewer/AddViewer'
import firebase, {auth} from '../../firebase'
import Viewer from './Viewer/Viewer';
import './ViewColumn.css'



class ViewColumn extends Component {

  constructor() {
    super();
    this.viewers = []
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref("users/" + auth.currentUser.uid + '/lists/' + this.props.listId + '/viewers');
    this.firebaseRef.on("child_added", function(dataSnapshot) {
      this.viewers.push(dataSnapshot.val());
      this.setState({
        viewers: this.viewers
      });
    }.bind(this))
  }

  render() {
    return (

      <div className="col s3 side-content add-viewer-list-btn-container">
        <h5 className="list-viewers-title">Viewers</h5>
        <div>
          <Link to={`/add-viewer/${this.props.listId}`} className="btn add-viewer-list-btn">Add a viewer</Link>
        </div>
        <ul className="collection viewer_collection">
          {this.viewers.map((viewer, key) => <Viewer key={key} name={viewer.first_name + ' ' + viewer.last_name} email={viewer.email}/>)}
        </ul>
      </div>


    )
  }
}

export default ViewColumn
