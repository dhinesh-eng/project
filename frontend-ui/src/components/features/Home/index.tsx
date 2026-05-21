import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../../../services/authService";

const Home = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const response = await API.get(
        "/profile"
      );

      setUser(response.data.data);

    } catch (error) {

      console.log(error);

      navigate("/");

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (
    <div className="container mt-5">

      <div className="card shadow p-5 text-center">

        <h1 className="text-success">
          Login Successful
        </h1>

        <h3 className="mt-3">
          Welcome {user?.username}
        </h3>

        <p>
          {user?.email}
        </p>

        <button
          className="btn btn-danger mt-3"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Home;