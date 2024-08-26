import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Login from './pages/Login'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element= {<Home/>}></Route>
        <Route path='/login' element= {<Login/>}></Route>

        <Route path='/product' element= {<Products/>}></Route>
        <Route path='/cart' element= {<Cart/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
