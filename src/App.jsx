import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register";
import Overview from "./pages/Overview/Overview.jsx";
// import Campaing from "./pages/Campaing/Campaing.jsx";
import Comments from "./pages/comments/comments.jsx";

import InstagramAccounts from "./pages/Instagram/InstagramAccounts.jsx";
import Campaigns from './pages/campaingPage/campaing';
import CreateCampaign from './pages/create Campaing/CreateCampaign';

import ComingSoon from './components/commingSoon/ComingSoon.jsx'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/overview"
        element={
          <IsAuthenticated>
            <Overview />
          </IsAuthenticated>
        }
      ></Route>
      <Route
        path="/campaigns"
        element={
          <IsAuthenticated>
            <Campaigns />
          </IsAuthenticated>
        }
      ></Route>
      <Route
        path="/comments"
        element={
          <IsAuthenticated>
            <Comments />
          </IsAuthenticated>
        }
      ></Route>
      <Route
        path="/accounts"
        element={
          <IsAuthenticated>
            <InstagramAccounts />
          </IsAuthenticated>
        }
      />
      <Route
        path="/campaigns/create"
        element={
          <IsAuthenticated>
            <CreateCampaign />
          </IsAuthenticated>
        }
      />
      <Route path="/coming-soon" element={<ComingSoon />} />
    </Routes>
  );
}

export default App;
