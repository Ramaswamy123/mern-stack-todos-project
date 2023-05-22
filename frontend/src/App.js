import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
// import ProtectedRoute from './components/ProtectedRoute'
import Todos from './components/Todos'
import Home from './components/Home'
import {BrowserRouter,Switch, Route} from 'react-router-dom'
function App() {
  return (
    <>
    <BrowserRouter>
       <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component = {Signup}/>
        <Route exact path='/todos' component = {Todos}/> 
       </Switch>
    </BrowserRouter>
    </>
  )
}
export default App