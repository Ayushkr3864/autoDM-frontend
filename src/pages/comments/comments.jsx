import React from "react";

import Topbar from "../../components/dashboard/Topbar/Topbar";
import Sidebar from "../../components/dashboard/sideBar/SideBar";
import CommentStat from '../../components/comments/Comments'

import "./comments.css";

function Comments() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Topbar */}
        <Topbar />

        <main className="dashboard-content">
          {/* Heading */}
          <div className="dashboard-heading">
            <h1>Welcome back! 👋</h1>
            <p>Here's what's happening with your Instagram automation.</p>
          </div>
         <CommentStat></CommentStat>
        </main>
      </div>
    </div>
  );
}

export default Comments;
