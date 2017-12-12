import React, { Component } from 'react';
import defaultItem from "../../images/default.jpg"
import ProfileColumn from '../ProfileColumn/ProfileColumn'
import Item from './../Item/Item'
import amazonSearch from './../../AmazonSearch'
import firebase, {auth} from '../../firebase'

class ViewItems extends Component {

  render() {

    return (
			<div >
				<div>
					<div className="col s9 main-content">
						<h3>Items</h3>
						<div className="item-container">

						</div>
					</div>
				</div>
			</div>

    )
  }
}

export default ViewItems
