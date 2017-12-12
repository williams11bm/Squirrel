import React, { Component } from 'react';
import firebase, {auth} from '../../firebase'



class AddViewer extends Component {

  constructor(props) {
    super(props)
    this.handleAddViewer = this.handleAddViewer.bind(this)
    this.listId = this.props.match.params.id
    console.log('listId', this.listId)
  }

  componentDidMount() {
    console.log(auth.currentUser.uid)
    this.firebaseRef = firebase.database().ref(`users/${auth.currentUser.uid}/lists/${this.listId}/viewers`)
  }

  handleAddViewer(e) {
    //first check to see if entered email actually exists in the database
    e.preventDefault();
    var usersRef = firebase.database().ref("users").orderByKey();
    usersRef.once('value')
      .then(snapshot => {
        let exists = false;
        let user = null;
        snapshot.forEach(u => {
          if(u.val().email === this.email.value) {
            //TODO: this is inefficient as fuck and needs help
            exists = true
            user = u.val()
          }
        });
        if (exists) {
          this.firebaseRef.child(user.uid).transaction(viewerInfo => {
            if (viewerInfo === null) {
              this.props.history.goBack()
              return user
            }
          })
          firebase.database().ref(`users/${user.uid}/othersLists`).child(this.listId).transaction(listInfo => {
            if (listInfo === null) {
              this.props.history.goBack()
              return {uid: auth.currentUser.uid}
            }
          })
        }
      })
  }

  render() {

    return (
      <div >
				<div className="row all-contain">
					<div className="col s9 ">
          <div>
            <h3>Add Viewer</h3>
            <form className="col s12" onSubmit={this.handleAddViewer} >
              <div className="row">
                <div className="input-field col s6">
                  <input id="email" ref={(email) => this.email = email} type="text" className="validate" />
                  <label htmlFor="email">User Email</label>
                </div>
              </div>
              <input className="btn" type="submit" value="Add" />
            </form>
          </div>
					</div>
				</div>
			</div>
    )
  }
}

export default AddViewer
