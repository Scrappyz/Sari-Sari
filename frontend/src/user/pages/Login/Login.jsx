import axios from "axios";

import ServerRoute from "../../../ServerRoute";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  useEffect(function() {
    if (localStorage.getItem("posjwt") != null) {
      navigate("/", { replace: true })
    }
  }, []);

  function tryLogin(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    axios.post(ServerRoute + "/login", {
      username,
      password
    }).then(function(r){
      const jwtToken = r.data.other;
      // console.log(jwtToken);
      localStorage.setItem("posjwt", jwtToken);
      // alert();
      navigate("/", { replace: true });
    });
  }
  return (
    <div>
      <form onSubmit={tryLogin}>
        <input type="text" name="username" id="username" />
        <input type="password" name="password" id="password" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Login;