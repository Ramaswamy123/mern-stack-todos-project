import React from 'react'
import './index.css'
import {Link} from 'react-router-dom'
function Home() {
  return (
    <div className="home-container">
        <h1 className="company-name">Welcome to Digital Brain Media</h1>
    <div>
      <Link to="/signup" className="btn btn-success m-3">Register</Link>
      <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    </div>
  )
}

export default Home
