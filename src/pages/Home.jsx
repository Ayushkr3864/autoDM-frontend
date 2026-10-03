import { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar/Navbar";

function Home() {
//   const [darkMode, setDarkMode] = useState(() => {
//     return localStorage.getItem("autodm-theme") === "dark";
//   });

//   useEffect(() => {
//     document.documentElement.setAttribute(
//       "data-theme",
//       darkMode ? "dark" : "light",
//     );

//     localStorage.setItem("autodm-theme", darkMode ? "dark" : "light");
//   }, [darkMode]);

//   const toggleTheme = () => {
//     setDarkMode((prev) => !prev);
//   };

  return (
    <div className="app">
      {/* Navbar */}
      <Navbar></Navbar>

      {/* Hero */}
      <main>
        <section className="hero" id="home">
          <div className="container hero-container">
            <div className="hero-content">
              <div className="eyebrow">
                <span>🚀</span>
                Grow Faster on Instagram
              </div>

              <h1>
                Turn Instagram
                <br />
                Comments Into
                <br />
                Conversations{" "}
                <span className="gradient-text">Automatically</span>
              </h1>

              <p className="hero-description">
                AutoDM helps creators, coaches, and businesses automatically
                send personalized DMs to users who comment on your Instagram
                reels. More engagement. More leads. More growth.
              </p>

              <div className="hero-buttons">
                <a href="#signup" className="btn btn-primary hero-btn">
                  Start Free Today
                  <span>→</span>
                </a>

                <a href="#how-it-works" className="btn btn-secondary hero-btn">
                  <span className="play-icon">▶</span>
                  See How It Works
                </a>
              </div>

              <div className="trust-points">
                <div>
                  <span>✓</span>
                  No credit card required
                </div>

                <div>
                  <span>✓</span>
                  Easy setup
                </div>

                <div>
                  <span>✓</span>
                  Built for creators & businesses
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="hero-visual">
              <div className="instagram-badge">
                <span>◎</span>
              </div>

              {/* Reel */}
              <div className="reel-card">
                <div className="reel-header">
                  <span>Reels</span>
                  <span>⌕</span>
                </div>

                <div className="reel-image">
                  <div className="reel-person">👩🏻</div>

                  <div className="reel-text">
                    Comment <strong>"GUIDE"</strong>
                    <br />
                    and I'll send you
                    <br />
                    my Free PDF! 📄
                  </div>

                  <div className="reel-stats">
                    <span>♡ 12.4K</span>
                    <span>💬 842</span>
                    <span>➤ 321</span>
                  </div>
                </div>
              </div>

              {/* Comment bubble */}
              <div className="comment-bubble">
                <div className="avatar">P</div>
                <div>
                  <strong>priya.sharma</strong>
                  <div>GUIDE</div>
                  <small>2m · Reply</small>
                </div>
                <span className="heart">♡</span>
              </div>

              {/* Arrow */}
              <div className="connection-arrow">
                <span>↗</span>
              </div>

              {/* DM card */}
              <div className="dm-card">
                <div className="dm-header">
                  <span className="back">‹</span>

                  <div className="dm-user">
                    <div className="avatar small">P</div>
                    <div>
                      <strong>priya.sharma</strong>
                      <small>Active now</small>
                    </div>
                  </div>

                  <span>⋮</span>
                </div>

                <div className="message-area">
                  <div className="message">
                    Hey Priya 👋
                    <br />
                    <br />
                    Thanks for commenting!
                    <br />
                    Here's the free guide you requested:
                    <br />
                    <br />
                    <strong>👉 Download Now</strong>
                    <br />
                    <br />
                    Let me know if you have any questions!
                  </div>
                </div>

                <div className="message-input">
                  <span>＋</span>
                  <span>Message...</span>
                  <span>◉</span>
                  <span>➤</span>
                </div>
              </div>

              <div className="sent-note">
                Automatic DM
                <br />
                Sent! 🎉
              </div>
            </div>
          </div>
        </section>

        {/* Trust logos */}
        <section className="trust-section">
          <div className="container">
            <p>TRUSTED BY CREATORS AND BUSINESSES</p>

            <div className="logos-wrapper">
              <div className="logos">
                <span>MakeMyTrip</span>
                <span>◇ CRED</span>
                <span>zomato</span>
                <span>NYKAA</span>
                <span>unacademy</span>
                <span>Flipkart</span>

                {/* Duplicate logos for infinite animation */}
                <span>MakeMyTrip</span>
                <span>◇ CRED</span>
                <span>zomato</span>
                <span>NYKAA</span>
                <span>unacademy</span>
                <span>Flipkart</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features-section" id="features">
          <div className="container">
            <div className="section-heading">
              <h2>Everything You Need to Grow on Instagram</h2>
              <p>
                Powerful features to automate your Instagram engagement and save
                hours of manual work.
              </p>
            </div>

            <div className="features-grid">
              <Feature
                icon="💬"
                title="Keyword Triggers"
                description="Send automatic DMs when someone comments specific keywords on your reels."
              />

              <Feature
                icon="⚡"
                title="Instant Delivery"
                description="Automatically respond to eligible comments with your configured message."
              />

              <Feature
                icon="👥"
                title="Multiple Accounts"
                description="Manage multiple Instagram accounts from one simple dashboard."
              />

              <Feature
                icon="▥"
                title="Analytics & Insights"
                description="Track comments, DMs, engagement, and campaign performance."
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="how-section" id="how-it-works">
          <div className="container">
            <div className="section-heading">
              <h2>How AutoDM Works</h2>
              <p>Set up your automation in just a few simple steps.</p>
            </div>

            <div className="steps">
              <Step
                number="01"
                title="Connect Instagram"
                description="Connect your Instagram professional account securely."
              />

              <Step
                number="02"
                title="Create a Campaign"
                description="Select a Reel, choose trigger keywords, and write your DM."
              />

              <Step
                number="03"
                title="Activate"
                description="Turn on your campaign and let AutoDM handle the responses."
              />

              <Step
                number="04"
                title="Grow"
                description="Turn comments into conversations, leads, and customers."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section" id="signup">
          <div className="container">
            <div className="cta-box">
              <div className="cta-decoration decoration-left">〰</div>
              <div className="cta-decoration decoration-right">〰</div>

              <h2>Ready to Automate Your Instagram?</h2>

              <p>Start turning comments into conversations today.</p>

              <a href="#" className="btn btn-primary cta-btn">
                Start Free Today
                <span>→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="container footer-container">
          <div className="footer-logo">
            <div className="logo-icon">➤</div>
            <strong>AutoDM</strong>
          </div>

          <p>© 2026 AutoDM. All rights reserved.</p>

          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="step">
      <div className="step-number">{number}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Home;
