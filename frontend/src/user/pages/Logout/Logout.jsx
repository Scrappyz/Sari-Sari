import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  useEffect(function() {
    localStorage.removeItem("posjwt");
    navigate("/login", { replace: true });
  }, []);
  return (
    <div>

    </div>
  )
}

export default Logout;