import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';

import { toast } from "react-toastify";

const Adminupdate = () => {

  const [data, setdata] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const params = useParams();
  // console.log("params : ",params); // isme params ka value ie. id aayega

  const { authtoken } = useAuth();

  // get single user data
  const getsingleuserdata = async (id) => {
    try {

      // const response = await fetch(`http://localhost:3000/api/user/${id}`, {
      // const response = await fetch(`http://localhost:3000/api/user/${params.id}`, {
      const response = await fetch(`https://mernsauravproject.onrender.com/api/user/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authtoken
        }
      })
      const data = await response.json();
      console.log("single user data", data);
      setdata(data);

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getsingleuserdata();
  }, [])


  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setdata({
      ...data,
      [name]: value
    })
  };


  // to update the data 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch(`http://localhost:3000/api/user/update/${params.id}`,
      const response = await fetch(`https://mernsauravproject.onrender.com/api/user/update/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authtoken
          },
          body: JSON.stringify(data)  // hm JSON.stringify()krte hai so that we get data in object to json form
        },
      );

      // console.log(response);
      // console.log(response.ok);

      if (response.ok) {
        toast.success("Updated Successfully");
      }
      else {
        toast.error("Updation failed")
      }

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>


      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Update user data</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">


          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={data.name}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone">phone</label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={data.phone}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <button type="submit">update</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  )
}

export default Adminupdate