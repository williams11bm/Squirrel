import React, { Component } from 'react';
import defaultItem from "../../images/default.jpg"
import ProfileColumn from '../ProfileColumn/ProfileColumn'
import Item from './../Item/Item'
import amazonSearch from './../../AmazonSearch'
import firebase, {auth} from '../../firebase'
import { Link } from "react-router-dom";

import './AddItem.css'

class AddItem extends Component {
  constructor(props) {
    super(props)
    this.listId = this.props.match.params.id
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleDismissItemClick = this.handleDismissItemClick.bind(this)
    this.handleCustomSubmit = this.handleCustomSubmit.bind(this)
    this.state = {
      searchResults: [],
      tags: [],
      randomItem: {}
    }
  }

  componentDidMount() {
    console.log(auth.currentUser)
    this.firebaseRef = firebase.database().ref(`users/${auth.currentUser.uid}`)
    this.firebaseItemsRef = this.firebaseRef.child(`/lists/${this.listId}/items`)

    this.firebaseRef.once('value', function (dataSnapshot) {
      const values = dataSnapshot.val()
      console.log('values', values)
      this.setState({
        tags: values.tags
      })
      console.log('users tags', values.tags);
      this.findRandomProduct()
    }.bind(this))
  }

  componentWillUnmount() {
    this.firebaseRef.off()
  }

  findRandomProduct() {
    if (this.state.tags.length !== 0) {
      const randomTagIndex = Math.floor(Math.random() * this.state.tags.length)
      console.log('finding random product for tag', this.state.tags[randomTagIndex])
      amazonSearch.searchByKeyword(this.state.tags[randomTagIndex])
      .then(results => {
        console.log('results successful', results)
        const randomItemIndex = Math.floor(Math.random() * results.length)
        this.setState({randomItem: results[randomItemIndex]})
        console.log('random item chosen', results[randomItemIndex]);
      })
      .catch(error => {
        console.log('error with api call to amazon', error);
      })
    }
  }

  handleAddClick(item, itemType) {
    console.log('add to list', item, itemType)
    this.firebaseItemsRef.push(item)
    if (itemType === 'search') {
      this.setState({searchResults: this.state.searchResults.filter(result => result.id !== item.id)})
      this.props.history.goBack()
    }
    else if (itemType === 'random') {
      this.findRandomProduct()
    }
  }

  handleDismissItemClick() {
    console.log('finding another random product')
    this.findRandomProduct()
  }

  handleSearchSubmit(e) {
    e.preventDefault()
    console.log('form submitted', e)
    amazonSearch.searchByKeyword(this.search.value)
    .then(results => {
      console.log('results successful', results)
      this.setState({searchResults: results})
    })
    .catch(error => {
      console.log('error with api call to amazon', error);
    })
  }

  handleCustomSubmit(e) {
    e.preventDefault()
    const item = {
      id: null,
      link: this.itemLink.value || null,
      image_link: this.itemImageLink.value || null,
      name: this.itemName.value,
      price: this.itemPrice.value || null
    }
    console.log('adding new custom item', item);
    this.firebaseItemsRef.push(item)
  }

  render() {
    const itemSearchResults = this.state.searchResults.map(result => (
      <div key={result.ASIN} className="col s4 m4">
        <Item item={result} itemType={'search'} isInCart={false} handleAddClick={this.handleAddClick}></Item>
      </div>
    ))

    const randomItem = (
      <div className="col s6 m6">
        <Item item={this.state.randomItem} itemType={'random'} isInCart={false} handleDismissItemClick={this.handleDismissItemClick} handleAddClick={this.handleAddClick}></Item>
      </div>
    )

    return (
      <div>
				<div>
					<div className="col s9 main-content">
            <div>
              <h3>Add Items</h3>

              <button onClick={() => this.props.history.goBack() }><i class="material-icons">arrow_back</i></button>
              <hr />
              <div>
                <h6>Suggested Item to Add Based On Your Interests</h6>
                {randomItem}
              </div>
              <form className="col s12" onSubmit={this.handleSearchSubmit}>
                <div className="input-field col s12">
                  <input placeholder="Search on Amazon" id="search" type="text" ref={(search) => this.search = search} className="validate" />
                </div>
              </form>
            </div>
            <div>
              <div className="result-row">
                {itemSearchResults}
              </div>
            </div>
            <div>
              <form className="col s12" onSubmit={this.handleCustomSubmit}>
                <h6>Add a Custom Item</h6>
                <div className="input-field">
                  <input required placeholder="Item Name" id="itemName" type="text" ref={(itemName) => this.itemName = itemName} className="validate" />
                </div>
                <div className="input-field">
                  <input placeholder="Item Link" id="itemLink" type="text" ref={(itemLink) => this.itemLink = itemLink} className="validate" />
                </div>
                <div className="input-field">
                  <input placeholder="Item Image Link" id="itemImageLink" type="text" ref={(itemImageLink) => this.itemImageLink = itemImageLink} className="validate" />
                </div>
                <div className="input-field">
                  <input placeholder="Item Price" id="itemPrice" type="text" ref={(itemPrice) => this.itemPrice = itemPrice} className="validate" />
                </div>
                <button className="btn create-list-btn" type="submit" value="Submit">Submit</button>
              </form>
            </div>
					</div>
				</div>
			</div>

    )
  }
}

export default AddItem
