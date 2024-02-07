import React from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa"
import { FaMessage } from "react-icons/fa6"
import { useAuth } from "../store/auth"

const Admin_layout = () => {

  const { user, isloading } = useAuth();

  console.log("admin layout", user);

  if (isloading) {
    return <h1>Loading ...</h1>
  }


  // console.log("user.isadmin", user.userData.isAdmin);

  if (!user.userData.isAdmin) {
    return <Navigate to="/" />
  }

  return (
    <>
      <h1>Admin Page</h1>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users"><FaUser />users</NavLink></li>
              <li><NavLink to="/admin/contact"><FaMessage />contacts</NavLink></li>
              <li><NavLink to="/service"><FaRegListAlt />services</NavLink></li>
              <li><NavLink to="/"><FaHome />Home</NavLink></li>
            </ul>
          </nav>
        </div>
      </header >
      <Outlet></Outlet>
      {/* outlet ka use nested routes ko dikhane me hota hai */}
    </>
  )
}

export default Admin_layout