import React from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import Login from './login'
import Register from './register'
import Home from './home'
import Account from './account'



const Navbar = (props)=>{

    const {userLogedin, handleAuth} = props

    return ( <div>
    <header>
        <div class="logo">E-Bill</div>
        <nav>
            <ul>
                <li class="active"><Link to="/"> Home </Link></li>
                <li><Link to="/"> Contact us </Link></li>
            {userLogedin? (
                <>
                <li><Link to="/account"> Dashboard </Link></li>
                
                <li><Link to="/" onClick={()=>{
                    localStorage.removeItem('token')
                    handleAuth()
                    props.history.push('/')
                }}> Logout  </Link></li>
                </>
                
            ):(
                <>
                <Link to="/register" class="navbtn1 btn btn-outline-secondary btn-rounded"> Register </Link>
                <Link to="/login" class="navbtn2 btn btn-secondary btn-rounded"> Sign In  </Link>
                </>
            )}
            </ul>
            </nav>
            <div class="clearfix"> </div>
            </header>
            
            <Route path="/" component={Home} exact={true}/>
            <Route path="/account" component={Account} exact={true}/>
            <Route path="/register" component={Register} exact={true}/>
            <Route path="/login" render={(props)=>{
            return <Login {...props} handleAuth={handleAuth}/>}} />

    </div>)
}

export default withRouter(Navbar)