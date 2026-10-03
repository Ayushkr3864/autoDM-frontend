import { useState } from "react";
import "./Login.css";
import { useNavigate} from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar";
import PopupMessage from "../../components/popUp/PopUp";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    remember: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
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

    try {
      const response = await fetch(
        "https://autodm-latest.onrender.com/api/auth/login/v1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
        },
      );

      const data = await response.json();
      console.log(data);
      

      if (response.ok) {
       if (remember) {
         localStorage.setItem("token", data.token);
         sessionStorage.removeItem("token");
       } else {
         sessionStorage.setItem("token", data.token);
         localStorage.removeItem("token");
       }
        showPopup("success", data.message);
        setTimeout(() => {
          navigate("/overview")
        }, 3500);
      } else {
        showPopup("error", data.message);
      }
    } catch (error) {
      console.error(error);

      showPopup("error", "Unable to connect to server");
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
      <div className="login-page">
        <div className="login-brand">
          <a href="/" className="login-logo">
            <div className="logo-icon">A</div>

            <span>
              Auto<span>DM</span>
            </span>
          </a>

          <div className="brand-content">
            <div className="brand-badge">✨ Instagram Automation</div>

            <h1>
              Turn comments into
              <span> conversations.</span>
            </h1>

            <p>
              Automate your Instagram DMs and turn every comment into an
              opportunity to connect, engage and grow.
            </p>

            <div className="brand-features">
              <div className="brand-feature">
                <div className="feature-icon">⚡</div>

                <div>
                  <strong>Instant automation</strong>
                  <p>Respond to comments automatically.</p>
                </div>
              </div>

              <div className="brand-feature">
                <div className="feature-icon">🎯</div>

                <div>
                  <strong>Smart targeting</strong>
                  <p>Trigger DMs using custom keywords.</p>
                </div>
              </div>

              <div className="brand-feature">
                <div className="feature-icon">📈</div>

                <div>
                  <strong>Grow your business</strong>
                  <p>Convert engagement into real leads.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="brand-footer">
            © 2026 AutoDM. All rights reserved.
          </div>
        </div>

        <div className="login-section">
          <div className="login-card">
            <div className="login-header">
              <h2>Welcome back 👋</h2>

              <p>Sign in to continue to your AutoDM dashboard.</p>
            </div>

            <button className="google-button">
              <span className="google-icon">G</span>
              Continue with Google
            </button>

            <div className="divider">
              <span>or continue with email</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <div className="password-label">
                  <label htmlFor="password">Password</label>

                  <a href="/forgot-password">Forgot password?</a>
                </div>

                <div className="password-input">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <button type="submit" className="login-button">
                Sign in
                <span>→</span>
              </button>
            </form>

            <div className="register-text">
              Don't have an account?
              <a href="/register"> Create a free account</a>
            </div>

            <p className="terms">
              By continuing, you agree to AutoDM's
              <a href="/terms"> Terms of Service</a> and
              <a href="/privacy"> Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
