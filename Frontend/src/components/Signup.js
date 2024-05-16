import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"" ,email: "", password: "" ,cpassword:""});
  let navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
const {name,email,password}=credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password }),
    });
    const json = await response.json();
    console.log(json);
  
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Account Created Successfully","success");
      navigate("/iNotebook");
    } else {
      props.showAlert("Invalid Credentials","danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2" >
      <h2>Create an account to use iNotebook</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
            minLength={5}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            name="cpassword"
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{boxShadow:' 3px 3px 5px rgba(41, 35, 35, 0.495),inset -3px -3px 5px rgb(94, 25, 25)'}}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
