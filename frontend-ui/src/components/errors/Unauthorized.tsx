import { Link } from "react-router-dom";

import "./errorpage.css";

const Unauthorized = () => {

  return (

    <div className="errormain">

      <div className="errorCard">

        <div className="leftContent">

          <h1 className="errorPageheading">
            401 Unauthorized
          </h1>

          <p className="errorText">

            Looks like you are not registered
            or your login credentials are invalid.

            Please create an account first
            or login with valid credentials.

          </p>

          <Link to="/">

            <button className="backBtn">

              ← Back To Login

            </button>

          </Link>

        </div>

        <div className="rightdiv">

          {/* <img
            src="https://cdn-icons-png.flaticon.com/512/755/755014.png"
            alt="401"
            className="errorimg"
          /> */}

        </div>

      </div>

    </div>

  );
};

export default Unauthorized;