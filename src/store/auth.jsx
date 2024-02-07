import { createContext, useContext, useEffect, useState } from "react";


// create context
export const AuthContext = createContext();

//provider
const AuthProvider = ({ children }) => {

  const [token, settoken] = useState(localStorage.getItem("token"));
  const [user, setuser] = useState("");

  const [isloading, setisloading] = useState(true); // jb hm login karenge to tabhi pura data nahi aayega thode time baad aata hai so that hm check krenge ki jbtak data load nahi hua hoga tb tk isloading true rahega, jaise hi data load hua to isloading false ho jayega, after isloading false we can check that user is admin or not, if user is admin then that user can navigate to admin routes

  const [services, setservices] = useState([]);

  const authtoken = token;
  // const authtoken = `Bearer ${token}`;


  const storeTokenInLS = (serverToken) => {

    settoken(serverToken);

    return localStorage.setItem("token", serverToken)
  };


  let Isloggedin = !!token;  // if token hai then Isloggendin will be true and vice-versa
  console.log("islogin", Isloggedin);

  // tackle logout functionality
  const LogoutUser = () => {
    settoken("");
    return localStorage.removeItem('token');
  }


  // jwt Authentication - to get currently loggedin user data

  const userAuthentication = async () => {
    try {

      setisloading(true);

      // const response = await fetch("http://localhost:3000/api/user", {
      // const response = await fetch("http://localhost:3000/api/log", {
      const response = await fetch(`https://mernsauravproject.onrender.com/api/user`, {
        method: "GET",
        headers: {
          // Authorization: { token }
          Authorization: token
        }
      });
      console.log("object1 token : ", token);
      console.log("res.ok", response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log("object2");
        console.log("data :", data.userData);
        setuser(data);
        setisloading(false);
      }
      else {
        console.error("Error fetching in user data");
        setisloading(false);
      }

      console.log("res data :", response);//
    } catch (error) {
      console.log("Error fetching user data");
    }
  }


  // to fetch services data from database
  const getServices = async () => {
    try {
      // const response = await fetch("http://localhost:3000/api/service", {
      const response = await fetch(`https://mernsauravproject.onrender.com/api/service`, {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();
        console.log("service data :", data);
        setservices(data.msg);
      }
    } catch (error) {
      console.log(`services frontend error : ${error}`);
    }
  }



  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);

  return (
    // provider ke under hmne jo v pass kiya hm ouse kahi v use kr skte hain
    <AuthContext.Provider value={{ Isloggedin, storeTokenInLS, LogoutUser, user, services, authtoken, isloading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

// consumer
export const useAuth = () => {
  const AuthContextvalue = useContext(AuthContext)

  if (!AuthContextvalue) {
    throw new Error("useAuth used outside of provider");
  }

  return AuthContextvalue;
}
