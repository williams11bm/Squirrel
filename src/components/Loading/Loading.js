import React, { Component } from 'react';
import acorn from '../../images/acorn.png';
import './Loading.css'




class Loading extends Component {

  render() {
    return (
      <div className="Loading-Container">
				<img src = { acorn } />
			</div>

    )
  }
}

export default Loading
