import React, { Component } from 'react';
import './Item.css'
import defaultItem from "./../../images/default.jpg"

class Item extends Component {
  constructor(props) {
    super(props)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
    this.handleDismissItemClick = this.handleDismissItemClick.bind(this)
    this.state = {
      isDisabled: false
    }
  }

  handleAddClick(e) {
    e.preventDefault()
    this.props.handleAddClick(this.props.item, this.props.itemType)
  }

  handleRemoveClick(e) {
    e.preventDefault()
    this.props.handleRemoveClick(this.props.uid)
  }

  handleDismissItemClick(e) {
    e.preventDefault()
    this.props.handleDismissItemClick()
  }

  render() {
    let actions
    if (this.props.isInCart && !this.props.isFriends) {
      actions = (<button className="btn" onClick={this.handleRemoveClick}>Remove</button>)
    }
    else if (this.props.itemType === 'search') {
      actions = (<button className="btn" onClick={this.handleAddClick}>Add</button>)
    }
    else if (this.props.itemType === 'random') {
      actions = (
        <div>
          <button className="btn" onClick={this.handleAddClick}>Add</button>
          <button className="btn" onClick={this.handleDismissItemClick}>Dismiss</button>
        </div>
      )
    }

    let itemImage;
    if (this.props.item.image_link) {
      itemImage = (<img src={this.props.item.image_link} />)
    }
    else {
      itemImage = (<img src={defaultItem} />)
    }

    return (
      <div className="card small">
        <div className="card-image">
          {itemImage}
        </div>
        <div className="card-content">
          <a href={this.props.item.link} target="_"><h6>{this.props.item.name} - {this.props.item.price}</h6></a>
        </div>
        <div className="card-action">
          {actions}
        </div>
      </div>
    )
  }
}

export default Item
