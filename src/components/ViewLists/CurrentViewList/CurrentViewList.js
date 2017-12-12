import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Item from "../../Item/Item";
import firebase from '../../../firebase'

class CurrentViewList extends Component {

  items = []

  constructor(props) {
    super(props)
    this.listId = this.props.match.params.id
    this.uid = this.props.match.params.uid
    this.state = {
      items: [],
      name: ''
    }
  }

  componentDidMount() {
    this.firebaseRef = firebase.database().ref(`users/${this.uid}/lists/${this.listId}`)
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

  render() {
    console.log('this.state.items', this.state.items);

    const listItems = this.state.items.map(item => (
      <div key={item.ASIN} className="col s4 m4">
        <Item item={item.item} isFriends={true} uid={item.uid} isInCart={true} handleRemoveClick={this.handleRemoveClick}></Item>
      </div>
    ))

    return (
      <div >
        <div>
          <div className="col s6 main-content">
            <h3>{this.state.name}</h3>
            <div className="item-container">
              {listItems}
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default CurrentViewList
