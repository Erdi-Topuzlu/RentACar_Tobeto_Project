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
import BrandTable from "./pages/admin/components/brand/BrandTable.jsx";
import ColorTable from "./pages/admin/components/color/ColorTable.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import FindCarResult from "./components/ui/FindCarResult.jsx";
import { ToastContainer } from "react-toastify";
import CarTable from "./pages/admin/components/car/CarTable.jsx";
import RentalTable from "./pages/admin/components/rental/RentalTable.jsx";
import ModelTable from "./pages/admin/components/model/ModelTable.jsx";
import SliderTable from "./pages/admin/components/slider/SliderTable.jsx";
import CarImagesTable from "./pages/admin/components/car-images/CarImagesTable.jsx";
import CampaignsTable from "./pages/admin/components/Campaigns/CampaignsTable.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index pat element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/findCarResult" element={<FindCarResult />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
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
          <Route path="slider" element={<SliderTable />} />
          <Route path="brands" element={<BrandTable />} />
          <Route path="colors" element={<ColorTable/>} />
          <Route path="cars" element={<CarTable/>} />
          <Route path="carImages" element={<CarImagesTable/>} />
          <Route path="rentals" element={<RentalTable/>} />
          <Route path="models" element={<ModelTable/>} />
          <Route path="campaigns" element={<CampaignsTable/>} />
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
);
