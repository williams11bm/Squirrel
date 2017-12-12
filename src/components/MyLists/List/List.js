import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import firebase, {auth} from '../../../firebase';
import acorn from '../../../images/acorn.png';


class List extends Component {
  render() {
    console.log('this.props', this.props);
    return (
      <li className="collection-item avatar">
        <img src = { acorn } alt="" className="circle" />
        <span className="title list_title"> Title:  {this.props.list.name} </span>
        <p>
        <span className="description list_description">Description: {this.props.list.description} </span>
        <br/>
        <Link to={`/current-list/${this.props.id}`} className="view_list">View List</Link>
        </p>

        <button className="secondary-content delete-list" onClick={() => firebase.database().ref("users/" + auth.currentUser.uid + '/lists/' + this.props.id).remove()}><i className="material-icons">delete</i></button>

        <button className="secondary-content edit-list"><i className="material-icons">mode_edit</i></button>


      </li>
    )
  }
}

export default List
