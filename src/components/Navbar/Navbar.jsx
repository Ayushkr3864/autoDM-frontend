import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("autodm-theme") === "dark";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
    localStorage.setItem("autodm-theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <nav className="navbar">
      {" "}
      <div className="container nav-container">
        {" "}
        {/* ================= LOGO ================= */}{" "}
        <Link to="/" className="logo" onClick={closeMenu}>
          {" "}
          <div className="logo-icon">➤</div>{" "}
          <span>
            {" "}
            Auto<span>DM</span>{" "}
          </span>{" "}
        </Link>{" "}
        {/* ================= DESKTOP LINKS ================= */}{" "}
        <div className="nav-links">
          {" "}
          <Link to="/"> Home </Link> <a href="#features"> Features </a>{" "}
          <a href="#how-it-works"> How It Works </a>{" "}
          <a href="#pricing"> Pricing </a> <a href="#faqs"> FAQs </a>{" "}
        </div>{" "}
        {/* ================= DESKTOP ACTIONS ================= */}{" "}
        <div className="nav-actions">
          {" "}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {" "}
            {darkMode ? "☀️" : "🌙"}{" "}
          </button>{" "}
          <Link to="/login" className="login-btn">
            {" "}
            Log in{" "}
          </Link>{" "}
          <Link to="/register" className="btn btn-primary nav-cta">
            {" "}
            Start Free{" "}
          </Link>{" "}
        </div>{" "}
        {/* ================= MOBILE ACTIONS ================= */}{" "}
        <div className="mobile-actions">
          {" "}
          {/* Theme */}{" "}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {" "}
            {darkMode ? "☀️" : "🌙"}{" "}
          </button>{" "}
          {/* Hamburger */}{" "}
          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {" "}
            <span></span> <span></span> <span></span>{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      {/* ================= MOBILE MENU ================= */}{" "}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
        {" "}
        <div className="mobile-nav-links">
          {" "}
          <Link to="/" onClick={closeMenu}>
            {" "}
            Home{" "}
          </Link>{" "}
          <a href="#features" onClick={closeMenu}>
            {" "}
            Features{" "}
          </a>{" "}
          <a href="#how-it-works" onClick={closeMenu}>
            {" "}
            How It Works{" "}
          </a>{" "}
          <a href="#pricing" onClick={closeMenu}>
            {" "}
            Pricing{" "}
          </a>{" "}
          <a href="#faqs" onClick={closeMenu}>
            {" "}
            FAQs{" "}
          </a>{" "}
        </div>{" "}
        <div className="mobile-menu-actions">
          {" "}
          <Link to="/login" className="mobile-login-btn" onClick={closeMenu}>
            {" "}
            Log in{" "}
          </Link>{" "}
          <Link to="/register" className="mobile-start-btn" onClick={closeMenu}>
            {" "}
            Start Free{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </nav>
  );
}
export default Navbar;
