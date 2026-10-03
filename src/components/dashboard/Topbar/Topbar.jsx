import React, { useEffect, useRef, useState } from "react";
import {
  FiBell,
  FiHelpCircle,
  FiSearch,
  FiSun,
  FiMoon,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { useAuth } from "../../../store/auth";
import "./Topbar.css";

function Topbar({ title = "Dashboard" }) {
  const { user, logout } = useAuth();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("autodm-theme") === "dark";
  });

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );

    localStorage.setItem("autodm-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>{title}</h1>
      </div>

      <div className="topbar-right">
        {/* Search */}
        <button className="topbar-icon-btn" aria-label="Search">
          <FiSearch />
        </button>

        {/* Help */}
        <button className="topbar-icon-btn" aria-label="Help">
          <FiHelpCircle />
        </button>

        {/* Notifications */}
        <button
          className="topbar-icon-btn notification-btn"
          aria-label="Notifications"
        >
          <FiBell />
          <span className="notification-dot"></span>
        </button>

        {/* Theme Toggle */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        {/* Divider */}
        <div className="topbar-divider"></div>

        {/* Profile */}
        <div className="profile-wrapper" ref={profileRef}>
          <button
            className="user-profile"
            onClick={() => setProfileOpen((prev) => !prev)}
          >
            <div className="user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="user-info">
              <span className="user-name">{user?.name || "User"}</span>

              <span className="user-plan">Free Plan</span>
            </div>

            <span className="profile-arrow">{profileOpen ? "⌃" : "⌄"}</span>
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-user-info">
                <div className="dropdown-avatar">
                  {user?.name?.charAt(0)?.toUpperCase() || "A"}
                </div>

                <div>
                  <h3>{user?.name || "User"}</h3>
                  <p>{user?.email || "No email"}</p>
                </div>
              </div>

              <div className="dropdown-divider"></div>

              <button
                className="dropdown-item"
                onClick={() => setProfileOpen(false)}
              >
                <FiUser />
                <span>Profile</span>
              </button>

              <button
                className="dropdown-item"
                onClick={() => setProfileOpen(false)}
              >
                <FiSettings />
                <span>Settings</span>
              </button>

              <div className="dropdown-divider"></div>

              <button
                className="dropdown-item logout-item"
                onClick={handleLogout}
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
