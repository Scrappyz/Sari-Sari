import axios from "axios";

import ServerRoute from "../../../ServerRoute";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  useEffect(function() {
    if (localStorage.getItem("posjwt") != null) {
      navigate("/", { replace: true })
    } else {
      document.getElementById("Login").style.display = "";
    }
  }, []);

  function tryLogin(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Field must not be empty"
      });
      return;
    }

    axios.post(ServerRoute + "/login", {
      username,
      password
    }).then(function(r){
      // console.log(r);
      if (r.data.status === "success") {
        const jwtToken = r.data.other;
        // console.log(jwtToken);
        localStorage.setItem("posjwt", jwtToken);
        // alert();
        navigate("/", { replace: true });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid credentials"
        });
      }
    });
  }

  return (
    <div id="Login" style={
      {  
        display: "none"
      }
    }>
      <form onSubmit={tryLogin}>
        <input type="text" name="username" id="username" />
        <input type="password" name="password" id="password" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Login;