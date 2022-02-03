import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configStore from './store/configStore'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import * as mdb from 'mdb-ui-kit'
import "mdb-ui-kit/css/mdb.min.css"
import './style.css'
import { MDBIcon } from 'mdbreact';


const store= configStore()

store.subscribe(()=>{
  console.log(store.getState())
})
console.log(store.getState())

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)