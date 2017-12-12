import React, { Component } from 'react';
import './Viewer.css'

class Viewer extends Component {
  render() {
    return (
      <li className="collection-item viewer_box">
        <p>{this.props.name} < br/>
        {this.props.email}</p>
      </li>
    )
  }
}

export default Viewer
