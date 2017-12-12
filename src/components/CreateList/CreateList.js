import React, { Component } from 'react';
import './CreateList.css'
import ProfileColumn from '../ProfileColumn/ProfileColumn'
import firebase, {auth} from '../../firebase'



class CreateList extends Component {

  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  handleSubmit = (e) => {
    this.setState({
      loading: true
    })
    e.preventDefault();
    let listRef = firebase.database().ref("users/" + auth.currentUser.uid + '/lists');
    let newList = listRef.push({
      "name": this.name.value,
      "description": this.description.value
    })

    this.props.history.push('/current-list/' + newList.key)

  };

  render() {
    return (
      <div >
				<div className="row all-contain">
					<div className="col s9 ">
          <div>
            <h4>Create List </h4>

            <form onSubmit={this.handleSubmit}>

              <div className="row create-list-container">

                <div className="input-field col s12">
                  <input placeholder="List Name" id="list_sname" type="text" ref={(name) => this.name = name} className="validate" />
                </div>

              </div>

              <div className="row create-list-container">

                <div className="input-field col s12">
                  <input placeholder="List Description" id="description" type="text" ref={(description) => this.description = description} className="validate" />
                </div>

              </div>
              <div className="create-list-button-container">
                <input className="btn create-list-btn" type="submit" disabled={this.state.loading} value="Submit" />
              </div>
            </form>

          </div>
					</div>
				</div>
			</div>
    )
  }
}

export default CreateList
