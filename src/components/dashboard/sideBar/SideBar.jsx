
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  FiHome,
  FiInstagram,
  FiZap,
  FiMessageCircle,
  FiSend,
  FiBarChart2,
  FiFileText,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

import "./Sidebar.css";
import { useState,useEffect } from 'react';

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const mainMenu = [
    {
      name: "Overview",
      path: "/overview",
      icon: <FiHome />,
    },
    {
      name: "Accounts",
      path: "/accounts",
      icon: <FiInstagram />,
    },
    {
      name: "Campaigns",
      path: "/campaigns",
      icon: <FiZap />,
    },
    {
      name: "Comments",
      path: "/comments",
      icon: <FiMessageCircle />,
    },
  
   
  ];

  const toolMenu = [
    {
      name: "Templates",
      path: "/coming-soon",
      icon: <FiFileText />,
    },
  ];

  const accountMenu = [
    {
      name: "Billing",
      path: "/coming-soon",
      icon: <FiCreditCard />,
    },
    {
      name: "Settings",
      path: "/coming-soon",
      icon: <FiSettings />,
    },
  ];

  const handleNavigation = () => {
    if (onClose) {
      onClose();
    }
  };

    const fetchInstagramAccounts = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      try {
        const response = await fetch(
          "https://autodm-latest.onrender.com/api/instagram/accounts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Instagram accounts");
        }

        const data = await response.json();

        console.log("Instagram accounts:", data);

        setAccounts(data);
      } catch (error) {
        console.error("Error fetching Instagram accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchInstagramAccounts();
    }, []);

  const handleLogout = () => {
    localStorage.removeItem("token")
    setTimeout(() => {
      navigate("/")
    }, 1000);
  }

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      {/* =========================
          LOGO
      ========================= */}

      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo" onClick={handleNavigation}>
          <div className="sidebar-logo-icon">➤</div>

          <span>
            Auto<span>DM</span>
          </span>
        </Link>

        {/* Mobile Close Button */}
        <button
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <FiX />
        </button>
      </div>

      {/* =========================
          NAVIGATION
      ========================= */}

      <div className="sidebar-content">
        {/* Main */}

        <div className="sidebar-section">
          <p className="sidebar-section-title">Main</p>

          <nav className="sidebar-nav">
            {mainMenu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-link-icon">{item.icon}</span>

                <span className="sidebar-link-name">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Tools */}

        <div className="sidebar-section">
          <p className="sidebar-section-title">Tools</p>

          <nav className="sidebar-nav">
            {toolMenu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-link-icon">{item.icon}</span>

                <span className="sidebar-link-name">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Account */}

        <div className="sidebar-section">
          <p className="sidebar-section-title">Account</p>

          <nav className="sidebar-nav">
            {accountMenu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-link-icon">{item.icon}</span>

                <span className="sidebar-link-name">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* =========================
          BOTTOM
      ========================= */}

      <div className="sidebar-bottom">
        {/* Instagram Status */}

        {/* Instagram Status */}

        <div className="instagram-status">
          {loading ? (
            <div className="instagram-status-top">
              <div className="instagram-icon">
                <FiInstagram />
              </div>

              <div className="instagram-status-info">
                <span className="instagram-label">Instagram</span>

                <span className="instagram-account">Loading...</span>
              </div>
            </div>
          ) : accounts.length > 0 ? (
            <>
              <div className="instagram-status-top">
                <div className="instagram-icon">
                  <FiInstagram />
                </div>

                <div className="instagram-status-info">
                  <span className="instagram-label">Instagram</span>

                  <span className="instagram-account">
                    @{accounts[0].username}
                  </span>
                </div>

                <span className="connected-dot"></span>
              </div>

              <div className="instagram-connected">
                <span></span>
                Connected
              </div>
            </>
          ) : (
            <div className="instagram-status-top">
              <div className="instagram-icon">
                <FiInstagram />
              </div>

              <div className="instagram-status-info">
                <span className="instagram-label">Instagram</span>

                <span className="instagram-account">Not connected</span>
              </div>
            </div>
          )}
        </div>

        {/* Logout */}

        <button className="logout-button" onClick={handleLogout}>
          <span className="sidebar-link-icon">
            <FiLogOut />
          </span>

          <span>Log out</span>

          <FiChevronRight className="logout-arrow" />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
