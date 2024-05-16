import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    

    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);

      props.showAlert("Logged in Successfully", "success");
      navigate("/")
      
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => { 
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-2">
      <h2> Login to continue to iNotebook</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credentials.password}
            onChange={onChange}
            name="password"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            boxShadow:
              " 3px 3px 5px rgba(41, 35, 35, 0.495),inset -3px -3px 5px rgb(94, 25, 25)",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
