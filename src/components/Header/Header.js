import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { auth } from "../../firebase/auth";
import { signOut } from "firebase/auth";
import "./Header.css";

import { useUserAuth } from "../../AuthContext/UserAuthContext";

const Header = () => {
  const { user, logOut } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
     
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          ThanhAn
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {click ? (
            <FaTimes style={{ color: "white" }} />
          ) : (
            <FaBars style={{ color: "white" }} />
          )}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/movies" className="nav-links" onClick={closeMobileMenu}>
              Movies
            </Link>
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link to="/series" className="nav-links" onClick={closeMobileMenu}>
              TV Shows
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-links" onClick={closeMobileMenu}>
              Search
            </Link>
          </li>

          <li className="nav-item">
            {user ? (
              <div className="header-user">
                <p className="header-user-email">{user.email}</p>

                <ul className="header-user-list">
                  <li className="header-user-item">{user.displayName}</li>
                  <li className="header-user-item">
                    <Link to="/favourite-movie">Favourite Movie</Link>
                  </li>
                  <li className="header-user-item" onClick={handleLogout}>
                    Log Out
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <div className={`bnt-login ${loading ? "disabled-link" : ""}`}>
                  {loading ? "Loading..." : "Login"}
                </div>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
