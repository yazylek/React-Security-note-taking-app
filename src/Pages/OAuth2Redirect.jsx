import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../../store/ContextApi";
import { jwtDecode } from "jwt-decode";

const OAuth2Redirect = () => {
  const navigate = useNavigate();
  const { setToken } = useMyContext();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    console.log(params);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

        localStorage.setItem("JWT_TOKEN", token);

        const user = {
          username: decodedToken.sub,
          roles: decodedToken.roles.split(","),
        };

        localStorage.setItem("USER", JSON.stringify(user));

        setToken(token);

        setTimeout(() => {
          navigate("/notes");
        }, 100);
      } catch (error) {
        console.log("token decoding failed:", error);
        navigate("/notes");
      }
    } else {
      console.log("Token decoding failed, redirecting to login");
      navigate("/login");
    }
  }, [location, navigate, setToken]);

  return <div>Redirecting...</div>;
};

export default OAuth2Redirect;
