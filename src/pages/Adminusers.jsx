import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import { Link } from 'react-router-dom'
// basically useauth is useContext hooks yh hmne banaya hi

const Adminusers = () => {

  const [user, setuser] = useState([])

  const { authtoken } = useAuth();  // ye authtoken wahi hai jo hmne auth.jsx me provider me veja hai

  const getalluserdata = async () => {
    try {
      // const response = await fetch("http://localhost:3000/api/users", {
      const response = await fetch(`https://mernsauravproject.onrender.com/api/users`, {
        method: "GET",
        headers: {
          Authorization: authtoken
        }
      });

      const data = await response.json();
      console.log("users : ", data);
      setuser(data);

    } catch (error) {
      console.log(error);
    }
  }

  // delete user on delete button
  const deleteUser = async (id) => {

    try {
      // const response = await fetch(`http://localhost:3000/api/user/delete/${id}`, {
      const response = await fetch(`https://mernsauravproject.onrender.com/api/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authtoken
        }
      });

      const data = await response.json();
      console.log("users after delete : ", data);

      if (response.ok) {
        getalluserdata();
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getalluserdata();
  }, [])


  return (
    <>

      <section className='admin-users-section'>
        <div className="container">
          <h1>Admin user data</h1>
        </div>

        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {user.map((curuser, index) => {
                return (
                  <tr key={index}>

                    <td>{curuser.name}</td>
                    <td>{curuser.email}</td>
                    <td>{curuser.phone}</td>
                    <td>
                      <Link to={`/admin/user/${curuser._id}/edit`} >Edit</Link>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(curuser._id)}> Delete </button>
                    </td>

                  </tr>
                )

              })}
            </tbody>
          </table>

        </div>
      </section>






    </>
  )
}

export default Adminusers