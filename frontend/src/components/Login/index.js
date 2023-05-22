import React from 'react'
import {useState} from 'react'
import {Link,useHistory,Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import axios from 'axios'

function Login() {
  const history = useHistory();
  const [error,setError] = useState('')
    const [data,setData] = useState({
        name:"",
        password:"",
    })
     
    const handleInput = (event) =>{
        setData(prevState => ({...prevState,[event.target.name]:event.target.value}))
    }
    const onHandleSubmit = (event) =>{
        event.preventDefault()  
        // console.log(data)  
        axios.post("http://localhost:8081/login",data).then((res) => {
          // console.log(res)
          let token = res.data.token
          Cookies.set('jwtToken',token)

          history.replace('/todos'); 
        }).catch(error =>{
          console.log(error.response.data)
          setError(error.response.data)
        })
        
    }
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Redirect to="/todos" />
    }
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="bg-white p-3 rounded">
            <h2>Sign-In</h2>
      <form onSubmit={onHandleSubmit}>
        <div className="mb-3">
            <label htmlFor="name">Email</label>
            <input type="text" id="name"placeholder="Enter name" required onChange={handleInput} name="name" className="form-control rounded-0"/>
        </div>
        <div className="mb-3"> 
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Password" required onChange={handleInput} name="password" className="form-control rounded-0"/>
        </div>
        <button type="submit" className="btn btn-success">Log In</button>
        <p>You are agree to a our terms and policies</p>
        <p className="response-message">{error}</p>
        <Link to="/signup" className="btn btn-default border bg-light">Create Account</Link>
        
      </form>
    </div> 
    </div>
  )
}

export default Login
