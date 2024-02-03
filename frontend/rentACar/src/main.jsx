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
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Campaign from "./pages/Campaign.jsx";
import CampaignDetails from "./pages/CampaignDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import Dashboard from "./pages/admin/components/Dashboard.jsx";
import BrandTable from "./pages/admin/components/Brand/BrandTable.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { store } from "./redux/store.js";
import { Provider } from 'react-redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars">
          <Route index element={<CarListing />} />
          <Route path=":id" element={<CarDetails />} />
        </Route>
        <Route path="/campaigns">
          <Route index element={<Campaign />} />
          <Route path=":id" element={<CampaignDetails />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route exact element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route exact element={<ProtectedRoute />}>
      <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="brands" element={<BrandTable />} />
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <RouterProvider router={router} />
</Provider>
);
