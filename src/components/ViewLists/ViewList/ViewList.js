/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ViewList extends Component {
  render() {
    console.log('this.props', this.props);
    return (
      <li className="collection-item avatar">
        <i className="material-icons circle">format_list_bulleted</i>
        <span className="title">List Name: {this.props.list.name}</span>
        <p>Owner: {this.props.list.owner} </p>

        <p><Link to={`/view-lists/${this.props.list.key}/${this.props.list.uid}`}>View List</Link></p>
      </li>
    )
  }
}

export default ViewList
