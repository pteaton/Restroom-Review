import React from 'react'
import '../index.css'

export default function Header(props) {
  const headerStyle = {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "lavender"
  }
  return(
    <nav style={headerStyle}>
      <p>Logged in as {props.email}.&nbsp;
        <span className="fake-link" onClick={props.logout}>Log out</span>
      </p>
    </nav>
  )
}