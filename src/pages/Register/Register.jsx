import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar"
import "./Register.css";
import PopupMessage from "../../components/popUp/PopUp";
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [popup, setPopup] = useState({
    isVisible: false,
    type: "success",
    message: "",
  });

  const showPopup = (type, message) => {
    setPopup({
      isVisible: true,
      type: type,
      message: message,
    });
  };

  const closePopup = () => {
    setPopup((prev) => ({
      ...prev,
      isVisible: false,
    }));
  };
 const handleSubmit = async (e) => {
   e.preventDefault();

   if (user.password == "" || user.email == "" || user.name == " " || user.confirmPassword == " ") {
     showPopup("error", "please enter all fields");
     return;
   }

   if (user.password !== user.confirmPassword) {
     showPopup("error", "Passwords do not match");
     return;
   }

   try {
     const response = await fetch(
       "https://autodm-latest.onrender.com/api/auth/register/v1",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           name: user.name,
           email: user.email,
           password: user.password,
         }),
       },
     );

     const data = await response.json();

     if (response.ok) {
       showPopup("success", "Your account has been created successfully!");
     } else {
       showPopup("error", data.message || "Unable to register user");
     }
   } catch (error) {
     showPopup("error", "Unable to connect to the server");
   }
 };


  return (
    <>
      <Navbar></Navbar>
      <PopupMessage
        type={popup.type}
        message={popup.message}
        isVisible={popup.isVisible}
        onClose={closePopup}
      />
      <div className="register-page">
        {" "}
        {/* Background decoration */}{" "}
        <div className="register-gradient register-gradient-one"></div>{" "}
        <div className="register-gradient register-gradient-two"></div>{" "}
        {/* ========================================= LEFT BRAND SECTION ========================================= */}{" "}
        <section className="register-brand">
          {" "}
          <Link to="/" className="register-logo">
            {" "}
            <div className="register-logo-icon">➤</div>{" "}
            <span>
              {" "}
              Auto<span>DM</span>{" "}
            </span>{" "}
          </Link>{" "}
          <div className="register-brand-content">
            {" "}
            <div className="register-badge"> 🚀 Start growing today </div>{" "}
            <h1>
              {" "}
              Turn your <span> audience into opportunities.</span>{" "}
            </h1>{" "}
            <p>
              {" "}
              Create your AutoDM account and start automatically converting
              Instagram comments into meaningful conversations.{" "}
            </p>{" "}
            {/* Benefits */}{" "}
            <div className="register-benefits">
              {" "}
              <div className="register-benefit">
                {" "}
                <div className="register-benefit-icon"> ⚡ </div>{" "}
                <div>
                  {" "}
                  <strong>Automate your DMs</strong>{" "}
                  <p> Save hours by automating repetitive replies. </p>{" "}
                </div>{" "}
              </div>{" "}
              <div className="register-benefit">
                {" "}
                <div className="register-benefit-icon"> 🎯 </div>{" "}
                <div>
                  {" "}
                  <strong>Engage the right audience</strong>{" "}
                  <p> Trigger conversations using keywords. </p>{" "}
                </div>{" "}
              </div>{" "}
              <div className="register-benefit">
                {" "}
                <div className="register-benefit-icon"> 📈 </div>{" "}
                <div>
                  {" "}
                  <strong>Grow your business</strong>{" "}
                  <p> Turn engagement into leads and customers. </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="register-brand-footer">
            {" "}
            © 2026 AutoDM. All rights reserved.{" "}
          </div>{" "}
        </section>{" "}
        {/* ========================================= RIGHT REGISTER SECTION ========================================= */}{" "}
        <section className="register-section">
          {" "}
          <div className="register-card">
            {" "}
            {/* Header */}{" "}
            <div className="register-header">
              {" "}
              <h2> Create your account 🚀 </h2>{" "}
              <p> Start automating your Instagram today. </p>{" "}
            </div>{" "}
            {/* Google */}{" "}
            <button className="register-google-button">
              {" "}
              <span className="register-google-icon"> G </span> Continue with
              Google{" "}
            </button>{" "}
            {/* Divider */}{" "}
            <div className="register-divider">
              {" "}
              <span>or sign up with email</span>{" "}
            </div>{" "}
            {/* Form */}{" "}
            <form onSubmit={handleSubmit}>
              {" "}
              {/* Name */}{" "}
              <div className="register-form-group">
                {" "}
                <label htmlFor="name"> Full name </label>{" "}
                <input
                  id="name"
                  type="text"
                  placeholder="Ayush Kumar"
                  autoComplete="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              {/* Email */}{" "}
              <div className="register-form-group">
                {" "}
                <label htmlFor="email"> Email address </label>{" "}
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              {/* Password */}{" "}
              <div className="register-form-group">
                {" "}
                <label htmlFor="password"> Password </label>{" "}
                <div className="register-password-input">
                  {" "}
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />{" "}
                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {" "}
                    {showPassword ? "🙈" : "👁️"}{" "}
                  </button>{" "}
                </div>{" "}
                <p className="password-hint">
                  {" "}
                  Use at least 8 characters.{" "}
                </p>{" "}
              </div>{" "}
              {/* Confirm Password */}{" "}
              <div className="register-form-group">
                {" "}
                <label htmlFor="confirm-password">
                  {" "}
                  Confirm password{" "}
                </label>{" "}
                <div className="register-password-input">
                  {" "}
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                  />{" "}
                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {" "}
                    {showConfirmPassword ? "🙈" : "👁️"}{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
              {/* Terms */}{" "}
              <label className="register-terms-checkbox">
                {" "}
                <input type="checkbox" />{" "}
                <span>
                  {" "}
                  I agree to the <Link to="/terms">
                    {" "}
                    Terms of Service{" "}
                  </Link> and <Link to="/privacy"> Privacy Policy </Link> .{" "}
                </span>{" "}
              </label>{" "}
              {/* Submit */}{" "}
              <button type="submit" className="register-button">
                {" "}
                Create Account <span>→</span>{" "}
              </button>{" "}
            </form>{" "}
            {/* Login */}{" "}
            <div className="register-login-text">
              {" "}
              Already have an account? <Link to="/login"> Log in </Link>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
      </div>
    </>
  );
}
export default Register;
