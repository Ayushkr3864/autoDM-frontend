import React, { useEffect, useState } from "react";
import {
  FiInstagram,
  FiPlus,
  FiMoreVertical,
  FiCheckCircle,
  FiLink,
  FiTrash2,
  FiRefreshCw,
} from "react-icons/fi";

import Topbar from "../../components/dashboard/Topbar/Topbar";
import Sidebar from "../../components/dashboard/sideBar/SideBar";

import "./InstagramAccounts.css";

function InstagramAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [showMenu, setShowMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleConnect = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      const response = await fetch(
        "https://autodm-latest.onrender.com/api/instagram/connect",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to start Instagram connection");
      }

      const data = await response.json();

      window.location.href = data.authUrl;
    } catch (error) {
      console.error("Instagram connection error:", error);
    }
  };

  // Fetch connected Instagram accounts
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

  const handleDisconnect = (id) => {
    // Temporary frontend-only disconnect
    setAccounts((prev) => prev.filter((account) => account.id !== id));

    setShowMenu(null);
  };

  return (
    <div className="instagram-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="instagram-main">
        {/* Topbar */}
        <Topbar title="Instagram Accounts" />

        {/* Content */}
        <main className="instagram-content">
          {/* Heading */}
          <div className="instagram-heading">
            <div>
              <h1>Instagram Accounts</h1>

              <p>
                Connect and manage the Instagram accounts you want to automate
                with AutoDM.
              </p>
            </div>

            <button className="connect-instagram-btn" onClick={handleConnect}>
              <FiPlus />
              Connect Instagram
            </button>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="instagram-empty-state">
              <div className="instagram-empty-icon">
                <FiRefreshCw />
              </div>

              <h2>Loading accounts...</h2>

              <p>Checking your connected Instagram accounts.</p>
            </div>
          ) : accounts.length === 0 ? (
            /* Empty State */

            <div className="instagram-empty-state">
              <div className="instagram-empty-icon">
                <FiInstagram />
              </div>

              <h2>No Instagram accounts connected</h2>

              <p>
                Connect your Instagram account to start creating comment-to-DM
                campaigns.
              </p>

              <button className="empty-connect-btn" onClick={handleConnect}>
                <FiInstagram />
                Connect Instagram
              </button>
            </div>
          ) : (
            /* Connected Accounts */

            <div className="instagram-account-section">
              <div className="section-heading">
                <h2>Connected Accounts</h2>

                <span>
                  {accounts.length} account
                  {accounts.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="instagram-account-grid">
                {accounts.map((account) => (
                  <div className="instagram-account-card" key={account.id}>
                    <div className="account-card-top">
                      <div className="account-profile">
                        <div className="account-avatar">
                          <FiInstagram />
                        </div>

                        <div>
                          <h3>@{account.username}</h3>

                          <p>Instagram Business</p>
                        </div>
                      </div>

                      <div className="account-menu-wrapper">
                        <button
                          className="account-menu-btn"
                          onClick={() =>
                            setShowMenu(
                              showMenu === account.id ? null : account.id,
                            )
                          }
                        >
                          <FiMoreVertical />
                        </button>

                        {showMenu === account.id && (
                          <div className="account-menu">
                            <button>
                              <FiRefreshCw />
                              Refresh
                            </button>

                            <button>
                              <FiLink />
                              Manage
                            </button>

                            <button
                              className="disconnect-option"
                              onClick={() => handleDisconnect(account.id)}
                            >
                              <FiTrash2 />
                              Disconnect
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="account-divider"></div>

                    <div className="account-card-bottom">
                      <div className="account-status">
                        <FiCheckCircle />

                        <span>Connected</span>
                      </div>

                      <span className="account-connected-date">
                        Connected recently
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default InstagramAccounts;
