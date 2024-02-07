import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import { toast } from "react-toastify";

const Admincontact = () => {

  const [contactdata, setcontactdata] = useState([])

  const { authtoken } = useAuth();

  const getContactdata = async () => {
    try {
      // const response = await fetch("http://localhost:3000/api/contact",
      const response = await fetch("https://mernsauravproject.onrender.com/api/contact",
        {
          method: "GET",
          headers: {
            Authorization: authtoken
          }
        });

      const data = await response.json();
      console.log("contact data: ", data);

      if (response.ok) {

        setcontactdata(data);
      }
      else {
        console.log("error in contact data");
      }

    } catch (error) {
      console.log(error);
    }
  }


  // define function deletecontactbyid 
  const deletecontactbyid = async (id) => {
    try {
      // const response = await fetch(`http://localhost:3000/api/contact/delete/${id}`, {
      const response = await fetch(`https://mernsauravproject.onrender.com/api/contact/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authtoken
        }
      }
      );

      if (response.ok) {
        getContactdata();

        toast.success("Contact Deleted Successfully");

      }
      else {
        toast.error("Contact Deletion Failed");
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getContactdata();
  }, [])

  return (
    <>

      <section className='admin-contacts-section'>
        <h1>Admin contact data</h1>

        <div className="container admin-users">
          {
            contactdata.map((currcontactdata, index) => {
              const { name, email, message, _id } = currcontactdata;

              return (
                <div key={index}>
                  <p>{name}</p>
                  <p>{email}</p>
                  <p>{message}</p>
                  <button className='btn' onClick={() => deletecontactbyid(_id)}>Delete</button>
                </div>
              )
            })
          }
        </div>
      </section>

    </>
  )
}

export default Admincontact