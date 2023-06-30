import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-main.png";
import whatsapp from "../assets/whatsapp.png";
import Swal from "sweetalert2";

async function loginUser(credentials) {
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}Common/authorize_AD_userlogin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  ).then((data) => data.json());
}

const Login = () => {
  let navigate = useNavigate();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [application, setApplication] = useState("TASKMASTER");

  const handleSubmit = async (e) => {
    if (username !== undefined && password !== undefined) {
      // console.log(username, password);
      e.preventDefault();
      const response = await loginUser({ username, password, application });
      // console.log(response);
      if (response.Status === "VALID") {
        localStorage.setItem("name", JSON.stringify(response.UserName));
        localStorage.setItem(
          "display_name",
          JSON.stringify(response.Displayname)
        );
        navigate("/tasksummary");
      } else {
        new swal({
          title: "Error",
          text: "Login Failed",
          icon: "error",
          button: "OK",
        });
      }
    } else {
      Swal.fire("Please provide all the required information");
      // alert("Please provide all the required information");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div>
      <div class="header">
        <div class="container">
          <div class="logo_s">
            <img img src={logo} />
          </div>
          <div class="rig">
            Need Assistance ? Call Us: <span>1860 210 2222</span>
          </div>
        </div>
      </div>

      <div class="bg_backgroung">
        <div class="container">
          <div class="row flot_r">
            <div class="col-lg-6 float-right">
              <div class="login_form">
                <div class="lock">
                  <span>Use your Windows credentials to login</span>
                </div>
                <label className="required">Username</label>
                <input
                  class="input_form "
                  placeholder="Username"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label className="required">Password</label>
                <input
                  class="input_form pass"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div class="submit_cl">
                  <button
                    class="submit_btn"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                  <div class="forgot_pass">
                    <label>
                      <a href="#"> Forgot password?</a>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <img class="img_w" src={whatsapp} />
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="left_foot">
            <p class="foot_sm" align="left">
              © All Rights Reserved.
              <a
                class="text-green"
                href="https://www.plindia.com/"
                target="_blank"
              >
                {" "}
                Prabhudas Lilladher Private Limited
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    // <div className="bg-white">
    //   <div className="h-screen flex flex-col justify-center items-center">
    //     <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-300 p-8 px-8">
    //       <h2 className="text-4xl font-bold text-center">SIGN IN</h2>
    //       <div className="flex flex-col py-2">
    //         <label>Username</label>
    //         <input
    //           className="rounded-lg bg-gray-400 mt-2 p-2 focus:border-blue-500 focus:bg-gray-100 focus:outline-none"
    //           type="text"
    //           onChange={(e) => setUserName(e.target.value)}
    //         />
    //       </div>
    //       <div className="flex flex-col py-2">
    //         <label>Password</label>
    //         <input
    //           className="rounded-lg bg-gray-400 mt-2 p-2 focus:border-blue-500 focus:bg-gray-100 focus:outline-none"
    //           type="password"
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>
    //       <button
    //         className="w-full my-5 py-2 bg-teal-500 shadow-sm shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
    //         type="button"
    //         onClick={handleSubmit}
    //       >
    //         SIGN IN
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default Login;
