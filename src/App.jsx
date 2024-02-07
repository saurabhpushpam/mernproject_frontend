import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Service from './pages/Service'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Error from './pages/Error'
import Footer from './Footer/Footer'
import Logout from './pages/Logout'
import Admin_layout from './layouts/admin-layout'
import Admincontact from './pages/Admincontact'
import Adminusers from './pages/Adminusers'
import Adminupdate from './pages/Adminupdate'




function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>

        {/* define routes */}
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route path="/service" element={<Service></Service>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/logout" element={<Logout></Logout>}></Route>
          <Route path="*" element={<Error></Error>}></Route>

          {/* admin routes - nested route*/}
          <Route path="/admin" element={<Admin_layout></Admin_layout>}>
            <Route path="users" element={<Adminusers></Adminusers>}></Route>
            <Route path="contact" element={<Admincontact></Admincontact>}></Route>

            <Route path="user/:id/edit" element={<Adminupdate></Adminupdate>}></Route>

          </Route>
        </Routes>

        <Footer></Footer>
      </BrowserRouter>
    </>
  )
}

export default App
