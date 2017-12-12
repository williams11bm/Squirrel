import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase, {auth} from './firebase.js';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import LoginPage from "./components/LoginPage/LoginPage";
import Home from "./components/Home/Home";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import CurrentList from "./components/CurrentList/CurrentList"
import MyLists from "./components/MyLists/MyLists"
import ViewLists from "./components/ViewLists/ViewLists"
import Nav from "./components/Nav/Nav"
import CreateList from "./components/CreateList/CreateList"
import Footer from "./components/Footer/Footer"
import AddItem from "./components/AddItem/AddItem"
import ProfileColumn from './components/ProfileColumn/ProfileColumn'
import ViewItems from "./components/ViewItems/ViewItems"
import AddViewer from "./components/AddViewer/AddViewer"
import CurrentViewList from "./components/ViewLists/CurrentViewList/CurrentViewList";
import Loading from "./components/Loading/Loading"
import sample from './video/snow.mp4';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/my-lists' />}
    />
  )
}

class App extends Component {

  constructor() {
    super()
    this.items = []
    this.state = {
      authed: false,
      loading: true,
    }
  }

  componentDidMount () {
    this.removeListener = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref("items");
    this.firebaseRef.on("child_added", function(dataSnapshot) {
      this.items.push(dataSnapshot.val());
      this.setState({
        items: this.items
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.removeListener()
    this.firebaseRef.off();
  }

  render() {
    return this.state.loading === true ? <Loading /> : (
      <BrowserRouter>
        <div>
          {/*<nav className="navbar navbar-default navbar-static-top">*/}
            {/*<div className="container">*/}
              {/*<div className="navbar-header">*/}
                {/*<Link to="/" className="navbar-brand">React Router + Firebase Auth</Link>*/}
              {/*</div>*/}
              {/*<ul className="nav navbar-nav pull-right">*/}
                {/*<li>*/}
                  {/*<Link to="/" className="navbar-brand">Home</Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                  {/*<Link to="/dashboard" className="navbar-brand">Dashboard</Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                  {/*{this.state.authed*/}
                    {/*? <button*/}
                      {/*style={{border: 'none', background: 'transparent'}}*/}
                      {/*onClick={() => {*/}
                        {/*logout()*/}
                      {/*}}*/}
                      {/*className="navbar-brand">Logout</button>*/}
                    {/*: <span>*/}
                        {/*<Link to="/login" className="navbar-brand">Login</Link>*/}
                        {/*<Link to="/register" className="navbar-brand">Register</Link>*/}
                      {/*</span>}*/}
                {/*</li>*/}
              {/*</ul>*/}
            {/*</div>*/}
          {/*</nav>*/}
          <div className="">
          <video className="videoTag" autoPlay loop muted>
              <source src={sample} type='video/mp4' />
          </video>
            <div className="container">
            <Nav authed={this.state.authed}/>
            <div className="row all-contain">
            {this.state.authed ? <ProfileColumn authed={this.state.authed}/> : null}
              <Switch>
                <Route path='/' exact component={Home} />
                <PublicRoute authed={this.state.authed} path='/login' component={LoginPage} />
                <PublicRoute authed={this.state.authed} path='/register' component={RegisterPage} />
                <PrivateRoute authed={this.state.authed} path='/my-lists' component={MyLists} />
                <PrivateRoute authed={this.state.authed} path='/current-list/:id/add-item' component={AddItem} />
                <PrivateRoute authed={this.state.authed} path='/current-list/:id' component={CurrentList} />
                <PrivateRoute authed={this.state.authed} path='/create-list' component={CreateList} />
                <PrivateRoute authed={this.state.authed} path='/view-lists/:id/:uid' component={CurrentViewList} />
                <PrivateRoute authed={this.state.authed} path='/view-lists' component={ViewLists} />
                <PrivateRoute authed={this.state.authed} path='/view-items' component={ViewItems} />
                <PrivateRoute authed={this.state.authed} path='/add-viewer/:id' component={AddViewer} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
              {this.state.authed ? <Footer authed={this.state.authed}/> : null}
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
