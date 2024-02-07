import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../store/auth'


const Navbar = () => {

  const { Isloggedin } = useAuth();
  console.log(Isloggedin);

  ///////////////////////

  // const { user, isloading } = useAuth();

  // const k = user.userData;
  // const kk = k.isAdmin;

  // console.log("admin layout here", kk);

  ////////////////////

  return (
    <>
      <header>
        <div className='container'>
          <div className='logo-brand'>
            <NavLink to='/'>Saurabh Pushpam</NavLink>
          </div>
          <nav>
            <ul>

              {/* <li><a href='/'>Home</a></li> */}

              {/* {

                // - check if admin 
                // Isloggedin
                kk ? (
                  <li><NavLink to='/admin'>Admin</NavLink></li>
                )
                  : (<></>)
              } */}

              <li><NavLink to='/'>Home</NavLink></li>
              <li><NavLink to='/about'>About</NavLink></li>
              <li><NavLink to='/contact'>Contact</NavLink></li>
              <li><NavLink to='/service'>Service</NavLink></li>

              {

                Isloggedin ? (
                  <li><NavLink to='/logout'>Logout</NavLink></li>
                )
                  : (
                    <>
                      <li><NavLink to='/register'>Register</NavLink></li>
                      <li><NavLink to='/login'>Login</NavLink></li>
                    </>
                  )
              }

              {/* <li><NavLink to='/register'>Register</NavLink></li>
              <li><NavLink to='/login'>Login</NavLink></li>
              <li><NavLink to='/logout'>Logout</NavLink></li> */}

            </ul>
          </nav>
        </div>
      </header >
    </>
  )
}

export default Navbar