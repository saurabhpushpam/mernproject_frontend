import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultcontactform = {
  name: "",
  email: "",
  message: ""
};

const Contact = () => {
  // const [contact, setContact] = useState({
  //   name: "",
  //   email: "",
  //   message: "",
  // });

  const [contact, setContact] = useState(
    defaultcontactform
  );


  const [userdata, setuserdata] = useState(true);
  // console.log("userdata: ", userdata);

  const { user } = useAuth();
  // console.log("user : ", user);  - it prints all userdata like name, email, phone, isAdmin- comes from token


  if (userdata && user) {
    setContact({
      // name: user.msg.name,
      // name: user.msg.name,
      // email: user.msg.email,
      name: user.userData.name,
      email: user.userData.email,
      message: ""
    });


    setuserdata(false)
  }

  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });


    /*
    setContact((prev) => {
      ...prev,
      [name]: value
    })
    */

  };

  // handle form getFormSubmissionInfo
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("contact :", contact);

    try {
      // const response = await fetch("http://localhost:3000/api/contact", {

      const response = await fetch(`https://mernsauravproject.onrender.com/api/contact`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(contact)
      });

      if (response.ok) {
        setContact(defaultcontactform);
        const data = await response.json();
        console.log(data);
        alert('Message sent successfully');
      }
    }
    catch (error) {
      alert('Message not sent')
      console.log(error);
    }
  };



  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>

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
                  value={contact.name}
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
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  // value={"hello"}  - iss se message column me hello print ho jayega
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57485.50375020358!2d87.43791537076291!3d25.775716299553668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eff97656feec5f%3A0xc57dda35d9a83807!2sPurnia%2C%20Bihar!5e0!3m2!1sen!2sin!4v1706897603902!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};

export default Contact