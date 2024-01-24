import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import CarListing from "./pages/CarListing.jsx";
import CarDetails from "./pages/CarDetails.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import FoprgotPassword from "./pages/ForgotPassword.jsx";
import Profile from "./pages/Profile.jsx";
import Admin from "./pages/admin/admin.jsx";
import Campaign from "./pages/Campaign.jsx";
import CampaignDetails from "./pages/CampaignDetails.jsx";
import NotFound from "./pages/NotFound.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index pat element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="cars">
          <Route index element={<CarListing />} />
          <Route path=":id" element={<CarDetails />} />
        </Route>
        <Route path="campaigns">
          <Route index element={<Campaign />} />
          <Route path=":id" element={<CampaignDetails />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<FoprgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
