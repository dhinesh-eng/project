import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../../../../services/authService";

import "./loginPage.css";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/login",
        formData
      );

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.data.token
      );

      navigate("/home");

    } catch (error: any) {

      console.log(error.response?.data);

      navigate("/unauthorized");

    }

  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow p-4 login-card">

            <h2 className="text-center mb-4">
              Login
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label className="form-label">
                  Email or Phone Number
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email or Phone"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

              <button
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

            <p className="text-center mt-3">

              Don't have an account?

              <Link to="/register">
                {" "}Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;