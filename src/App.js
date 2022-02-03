import React, { useState, useEffect } from 'react'
import Navbar from './component/navbar'
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as mdb from 'mdb-ui-kit'
import "mdb-ui-kit/css/mdb.min.css"
import './style.css'
import BillDetails from './component/purchase/billDetails';
import {Route} from 'react-router-dom'



const App = (props)=>
{
  const [userLogedin, setUserLogedin] = useState(false)
  const history = useHistory()
  const handleAuth=()=>{
    setUserLogedin(!userLogedin)
  }

  useEffect(()=>{
    if(localStorage.getItem('token'))
    {
    handleAuth()
    }
    else
    {
      history.push('/')
    }
   
  },[])

  return (<div>
    
    <Navbar userLogedin={userLogedin} handleAuth={handleAuth}/> 
    <Route path="/billDetails/:id" component={BillDetails} exact={true}/>
    </div>)
}

export default App