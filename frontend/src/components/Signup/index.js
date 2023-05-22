import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import './index.css'
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
function Signup() {
    const [message,setMessage] = useState('')
    const [alert,setAlert] = useState(false)
    const [data,setData] = useState({
        // id:uuidv4(),
        name:"",
        email:"", 
        password:"",
    })
    
    const handleInput = (event) =>{
        setData(prevState => ({...prevState,[event.target.name]:event.target.value}))
    }
    const onHandleSubmit = (event) =>{
        event.preventDefault()
        console.log(data.name)
        if(data.name === "" || data.email === "" || data.password === "" ){
          setAlert(true)
        }
        else{
          axios.post("http://localhost:8081/signup",data).then((res) => {
          setMessage(res.data.message)
          // console.log(res.status)
           }) 
        }
        
    }
    return (
      <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
          <div className="bg-white p-3 rounded">
            <h2>Sign-Up</h2>
        <form onSubmit={onHandleSubmit}>
        <div className="mb-3">
              <label htmlFor="email">Name</label>
              <input type="text" placeholder="Enter Name" onChange={handleInput} name="name" className="form-control rounded-0"/>
              {alert && <p className="required">Required*</p>}
          </div>
          <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Enter Email" onChange={handleInput} name="email" className="form-control rounded-0"/>
              {alert && <p className="required">Required*</p>}
          </div>
          <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Enter Password" onChange={handleInput} name="password" className="form-control rounded-0"/>
              {alert && <p className="required">Required*</p>}
          </div>
          <button type="submit" className="btn btn-success">Sign up</button>
          <p>You are agree to  our terms and policies</p>
          <p className="response-message">{message}</p>
          <Link to="/login" className="btn btn-default border bg-light">Login</Link>
        </form>
      </div>
      </div>
    )
  }
  
  export default Signup

