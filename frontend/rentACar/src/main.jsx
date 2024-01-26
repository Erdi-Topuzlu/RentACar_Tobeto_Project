import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
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
import Profile from "./pages/profile/Profile.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Campaign from "./pages/Campaign.jsx";
import CampaignDetails from "./pages/CampaignDetails.jsx";
import NotFound from "./pages/NotFound.jsx"
import Dashboard from "./pages/admin/components/Dashboard.jsx";
import BrandTable from "./pages/admin/components/Brand/BrandTable.jsx";

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
      
      <Route path="/admin" element={<Admin />}>
        <Route index pat element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="brands" element={<BrandTable />} />
        <Route path="brands" element={<BrandTable />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
