import React, { useContext, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Loader from "./Pages/loader/page";
import NavComponent from "./Pages/navbar/navbar";
import HeroSection from "./Pages/hero/HeroSection.jsx";
import { AuthContext } from "./contexts/AuthContext.jsx";
import { Loader2 } from "lucide-react";

const LoginForm = lazy(() => import("./Pages/login/Login.jsx"));
const SignUpForm = lazy(() => import("./Pages/signup/SignUp.jsx"));
const RegistrationForm = lazy(() => import("./Pages/Execom/execom.jsx"));
const ContactSection = lazy(() => import("./Pages/contact-us/ContactSection.jsx"));
const TeamSection = lazy(() => import("./Pages/Teams/TeamSection.jsx"));
const AboutComponent = lazy(() => import("./Pages/about/About.jsx"));
const Footer = lazy(() => import("./Pages/Footer/Footer.jsx"));
const EventsSection = lazy(() => import("./Pages/events/events.jsx"));
// const PastEventsSection = lazy(() => import("./Pages/past-events/PastEvents.jsx"));
const Dashboard = lazy(() => import("./Pages/dashboard/Dashboard.jsx"));
const Admin = lazy(() => import("./Pages/admin/Admin.jsx"));
const IclDashboard = lazy(() => import("./Pages/icl-dashboard/IclDashboard.jsx"));

const SuspenseFallback = () => <Loader />;

function App() {
  const { user, isAdmin } = useContext(AuthContext);

  const handleLoad = () => {
    const loader = document.getElementById("initial-loader");
    if (loader) {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      setTimeout(() => {
        if (loader) loader.style.display = 'none';
      }, 500);
    }
  };

  return (
    <Router>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavComponent />
                <HeroSection loading={handleLoad}/>
                <AboutComponent />
                <EventsSection />
                {/* <PastEventsSection /> */}
                <TeamSection />
                <ContactSection />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={<LoginForm onLoad={handleLoad} />}
          />
          <Route
            path="/signup"
            element={<SignUpForm onLoad={handleLoad} />}
          />
          <Route
            path="/registration"
            element={<RegistrationForm onLoad={handleLoad} />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard onLoad={handleLoad} /> : <></>}
          />

          <Route
            path="/admin-dashboard"
            element={isAdmin ? <Admin onLoad={handleLoad} /> : <Navigate to="/" />}
          />

          <Route
            path="/icl-dashboard"
            element={<IclDashboard onLoad={handleLoad} />}
          />

      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

