import React, { Component } from 'react';
import './CurrentList.css';
import defaultItem from "../../images/default.jpg"
import ProfileColumn from '../ProfileColumn/ProfileColumn'
import Item from './../Item/Item'
import amazonSearch from './../../AmazonSearch'
import firebase, {auth} from '../../firebase'
import { Link } from 'react-router-dom'
import AddItem from './../AddItem/AddItem'
import ViewColumn from "../ViewColumn/ViewColumn"

class CurrentList extends Component {
  items = []

  constructor(props) {
    super(props)
    this.listId = this.props.match.params.id
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
    this.state = {
      items: [],
      searchResults: [],
      name: ''
    }
  }

  componentDidMount() {
    console.log(auth.currentUser.uid)
    this.firebaseRef = firebase.database().ref(`users/${auth.currentUser.uid}/lists/${this.listId}`)
    this.firebaseRef.on('value', function (dataSnapshot) {
      const values = dataSnapshot.val().items
      console.log('snapshot', values);
      const newState = []
      for (let value in values) {
        newState.push({
          uid: value,
          item: values[value]
        })
      }
      this.setState({
        items: newState,
        name: dataSnapshot.val().name
      });
    }.bind(this))
  }

  componentWillUnmount() {
    this.firebaseRef.off()
  }

  handleRemoveClick(uid) {
    console.log('removing', uid)
    this.firebaseRef.child('items/' + uid).remove()
  }

  render() {
    console.log('this.state.items', this.state.items);

    const listItems = this.state.items.map(item => (
      <div key={item.ASIN} className="col s4 m4">
        <Item item={item.item} uid={item.uid} isInCart={true} handleRemoveClick={this.handleRemoveClick}></Item>
      </div>
    ))

    return (
      <div >
				<div>
          <div className="col s6 current-list">
            <h4 className="current-list-h4"> {this.state.name} </h4>
            <div className="add-list-button-container">
              <Link to={`${this.props.location.pathname}/add-item`} back={this.props.location.pathname} className="btn add-list-btn">Add Item</Link>
            </div>
            <div className="item-container ">
              {listItems}
            </div>
          </div>
          <ViewColumn listId={this.listId}/>
				</div>
			</div>

    )
  }
}

export default CurrentList
