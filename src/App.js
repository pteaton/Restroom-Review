import React, { Component } from 'react';
import 'semantic-ui-css';
import './App.css';
import ReviewContainer from './ReviewContainer'
import LoginRegisterForm from './LoginRegisterForm'
import Header from './Header'

export default class App extends Component {

  constructor() {
    super()

    this.state = {
      loggedIn: false,
      loggedInUserEmail: ''
    }
  }

  register = async (registerInfo) => {
    const url = process.env.REACT_APP_API_URL + "/users/register"

    try {
      const registerResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(registerInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const registerJson = await registerResponse.json()

      if(registerResponse.status === 201) {
        this.setState({
          loggedIn: true,
          loggedInUserEmail: registerJson.data.email
        })
      }
    
    } catch(err) {
      console.log(err)
    }
  
  }

  login = async (loginInfo) => {
    const url = process.env.REACT_APP_API_URL + '/users/login'

    try {
      const loginResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log("loginResponse", loginResponse);
      const loginJson = await loginResponse.json()

      if(loginResponse.status === 200) {
        this.setState({
          loggedIn: true,
          loggedInUserEmail: loginJson.data.email
        })
      }

    } catch(error) {
      console.log(error)
    }
  }

  logout = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/users/logout'

      const logoutResponse = await fetch(url, {
        credentials: 'include'
      })
      const logoutJson = await logoutResponse.json()
      console.log("logoutJson", logoutJson)

      if(logoutResponse.status === 200) {
        this.setState({
          loggedIn: false,
          loggedInUserEmail: ''
        })
      }
    
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    return(
      <div className="App">
      {
        this.state.loggedIn
        ?
        <React.Fragment>
          <Header email={this.state.loggedInUserEmail} logout={this.logout} />
          <ReviewContainer />
        </React.Fragment>
        :
        <LoginRegisterForm
          login={this.login} 
          register={this.register}
        />
      }
      </div>
    );
  }

}











