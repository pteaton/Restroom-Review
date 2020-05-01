  
import React, { Component } from 'react'
import { Form, Button, Label } from 'semantic-ui-react'
import '../index.css'

export default class LoginRegisterForm extends Component {

  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
      username: '',
      action: 'Login' // this will track whether we are logging in or registering
    }
  }

  switchForm = () => {
    if(this.state.action === "Login") {
      this.setState({ action: "Register" })
    } else {
      this.setState({ action: "Login" })
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(`You are trying to ${this.state.action.toLowerCase()} with the following credentials`)
    console.log(this.state);
    // Extra challenge: Validate the form!
    // Such as...
    // Highlight blank fields fields with errors in red
    // show the errors under or next to the field
    // make sure password is certain length, strength, 
    // make sure PW includes certain characters (use RegExp)


    if(this.state.action === "Register") {
      this.props.register(this.state)
    } else {
      this.props.login(this.state)
    }
  }

  render() {
    return (
      <React.Fragment>
        <h2>{this.state.action} here</h2>
        <Form onSubmit={this.handleSubmit}>
          {
            // only show username field if they are registering
            // because our login process just uses email
            this.state.action === "Register"
            &&
            <React.Fragment>
              <Label>Username:</Label>
              <Form.Input 
                type="text"
                name="username"
                placeholder="Enter your new username"
                value={this.state.username}
                onChange={this.handleChange}
              />            
            </React.Fragment>
          }
          <Label>Email Address:</Label>
          <Form.Input 
            type="email"
            name="email"
            placeholder="Enter an email address"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Label>Password:</Label>
          <Form.Input 
            type="password"
            name="password"
            placeholder="Enter a password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button type="Submit">
            { this.state.action === "Login" ? "Log in" : "Sign up"}
          </Button>
        </Form>
        {
          this.state.action === "Login"
          ?
          <p>
            Need an account? Sign up here! <span className="fake-link" onClick={this.switchForm}>here</span>.
          </p>
          :
          <p>
            Do you have an account already? Log in <span className="fake-link" onClick={this.switchForm}>here</span>.
          </p>

        }

      </React.Fragment>      
    )
  }
}