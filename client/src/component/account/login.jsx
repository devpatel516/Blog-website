import React, { useState, useContext, useEffect } from "react";
import { API } from "../../service/api";
import "./login.css";
import { DataContext } from "../../contex/DataProvider.jsx";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png"
const signupInitial = {
  name: "",
  username: "",
  password: "",
};

const loginInitial = {
  username: "",
  password: "",
};

const Login = (isUserAuthenticated) => {
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitial);
  const [login, setLogin] = useState(loginInitial);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);
  // useEffect(() => {
  //         showError(false);
  //     }, [login])
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  // const loginuser = async ()=>{
  //   let response = await API.userLogin(login);
  //   if(response.isSuccess){
  //     setError('');
  //   }else{
  //     setError('Invalid Credentials');
  //   }
  // }
  const loginUser = async () => {
    try {
      console.log("Attempting login with:", login);
      let response = await API.userLogin(login);
      console.log("Login response:", response);

      if (response.isSucess) {
        setError(""); // Fixed: using setError instead of showError

        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
        setAccount({ username: response.data.username, name: response.data.name });

        isUserAuthenticated.isUserAuthenticated(true); // Accessing the function correctly
        navigate('/home'); // Make sure this matches your route definition
      } else {
        setError('Something went wrong! please try again later'); // Fixed: using setError
        console.log("Login failed:", response);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError('An error occurred during login. Please try again.');
    }
  }
  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSucess) {
      setError('');
      setSignup(signupInitial);
      toggleAccount('login')
    } else {
      setError('Something went wrong!Please try again');
    }
  };
  return (
    <>
      {account === "login" ? (
        <div className="login-container">
          <div className="login-box text-black">
            <div className="flex justify-center">
              <img src={logo} width={150} height={150} className="rounded-full mb-6" />
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  required
                  value={login.username}
                  onChange={(e) => onValueChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={login.password}
                  onChange={(e) => onValueChange(e)}
                />
              </div>
              <button type="submit" onClick={() => loginUser()} className="submit-button">
                Sign In
              </button>
              <p className="signup-link">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => toggleAccount("signup")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#164287",
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div className="login-container text-black">
          <div className="login-box">
            <div className="flex justify-center">
              <img src={logo} width={150} height={150} className="rounded-full mb-6" />
            </div>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  required
                  value={signup.name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  required
                  value={signup.username}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={signup.password}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <button type="submit" className="submit-button" onClick={(e) => signupUser(e)}>
                Sign Up
              </button>
              <p className="signup-link">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => toggleAccount("login")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#164287",
                    cursor: "pointer",
                  }}
                >
                  Sign In
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
