import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import transition from "../transition.jsx";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import { useMyContext } from "../../store/ContextApi";

function Nav() {
  const { token, setToken, isAdmin, setIsAdmin, setCurrentUser } =
    useMyContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("IS_ADMIN");
    localStorage.removeItem("USER");
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(false);
    navigate("/login");
  };

  const { theme } = useTheme();
  return (
    <header>
      <nav className="flex justify-between  mx-auto w-[70%] items-center mt-3">
        <div className="ml-6 w-28 ">
          <Link to="/">
            <img
              className={`${
                theme === "dark" || theme === "system" ? "filter-white" : ""
              }`}
              src="./logo.svg"
              alt=""
            />
          </Link>
        </div>

        {!token ? (
          <div className="flex gap-10 items-center mr-6">
            <Link to="/">Features</Link>
            <a href="/">Pricing</a>
            <a href="/">About</a>
            <Link to="/login">
              <Button
                variant="outline"
                className={`hover:bg-primary  transition-colors ${
                  theme === "light" ? "hover:text-primary-foreground" : ""
                }`}
              >
                Log in
              </Button>
            </Link>
            <ModeToggle />
          </div>
        ) : (
          <div className="flex justify-center items-center gap-10">
            <Link to="/notes">My Notes</Link>
            <Link to="/create-note">Create Note</Link>
            <Link to="/profile">Profile</Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              className={`hover:bg-primary  transition-colors ${
                theme === "light" ? "hover:text-primary-foreground" : ""
              }`}
            >
              Log out
            </Button>
            <ModeToggle />
          </div>
        )}
      </nav>
      <div className="m-auto w-full mx-auto container h-[1px] bg-black/20 mt-3"></div>
    </header>
  );
}

export default transition(Nav);
