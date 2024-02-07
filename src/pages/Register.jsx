import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth';
import { toast } from "react-toastify";

const Register = () => {

  const [user, setuser] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });


  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();
  // const storeTokenInLS = useAuth();


  //handle input value
  const handleInput = (e) => {
    // console.log(e);
    // console.log(e.target.value);
    let name = e.target.name;
    let value = e.target.value;

    setuser({
      ...user,
      [name]: value,
      // hmne {name=value} diya hai to jo v hm likhte jayenge wah iss name me aayega and become update, jaise phone me kuch likhe to name, email, password ko as it is rakhega and phone ko update kr dega, for eg. if i fill phone=123, then here is like [name] :value = phone: 123, so this [name] is dynamic, it will be name, phone, email, password when we fill value
    });
  };


  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    // alert(user);

    // connect frontend with backend 
    try {
      // const response = await fetch('http://localhost:3000/api/register', {
      const response = await fetch(`https://mernsauravproject.onrender.com/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)  // ye user wahi hai jo uper hmne usestate me define kiya hai
      });

      const resdata = await response.json();
      console.log("res from server", resdata);
      console.log("res message from server", resdata.message);
      console.log("res extradetails from server", resdata.extraDetails);


      if (response.ok) {

        // const resdata = await response.json();
        // console.log("res from server", resdata);

        toast.success("Registration Succesful")
        // stored the token in localstorage
        storeTokenInLS(resdata.token)
        // localStorage.setItem('token', resdata.token)

        setuser({
          name: "", email: "", phone: "", password: ""
        });

        // navigate("/login");
        navigate("/");
      }
      //console.log(response);
      else {
        // alert('not a valid registration');
        // alert(resdata.extraDetails ? resdata.extraDetails : resdata.message);

        toast.error(resdata.extraDetails ? resdata.extraDetails : resdata.message);
      }

    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <h1>Register Page</h1> */}
      <section>
        <main>
          <div className='section-registration'>
            <div className='container grid grid-two-cols'>
              <div className='registration-image'>
                <img src='/images/register.png' alt='a girl trying to do registration' width="400" height="500" />
              </div>

              {/* let tackle register form */}
              <div className="registration-form">
                <h1 className='main-heading- mb-3'>registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>

                  <div>
                    <label htmlFor='name'>username</label>
                    <br />
                    <input
                      type='text'
                      name='name'
                      id='name'
                      // placeholder='Enter your name'
                      value={user.name}
                      onChange={handleInput}
                      required
                      autoComplete='off' />
                  </div>

                  <div>
                    <label htmlFor='email'>email</label>
                    <br />
                    <input
                      type='email'
                      name='email'
                      id='email'
                      // placeholder='Enter your email'
                      value={user.email}
                      onChange={handleInput}
                      required
                      autoComplete='off' />
                  </div>

                  <div>
                    <label htmlFor='phone'>phone</label>
                    <br />
                    <input
                      type='number'
                      name='phone'
                      id='phone'
                      // placeholder='Enter phone'
                      value={user.phone}
                      onChange={handleInput}
                      required
                      autoComplete='off' />
                  </div>

                  <div>
                    <label htmlFor='password'>password</label>
                    <br />
                    <input
                      type='password'
                      name='password'
                      id='password'
                      // placeholder='Enter password'
                      value={user.password}
                      onChange={handleInput}
                      required
                      autoComplete='off' />
                  </div>

                  <br />
                  <button type='submit' className='btn btn-submit'>Register now</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Register