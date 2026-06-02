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
const SuspenseFallback = () => (
  <div className="w-screen h-screen flex justify-center items-center bg-[#121212] fixed top-0 left-0 z-[9999]">
    <Loader2 className="w-28 h-28 text-red-600 animate-spin" />
  </div>
);

function App() {
  const [load, setLoad] = useState(true);

  const { user, isAdmin } = useContext(AuthContext);

  return (
    <Router>
      {load && <Loader />}

      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavComponent />
                <HeroSection loading={() => setLoad(false)}/>
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
            element={<LoginForm onLoad={() => setLoad(false)} />}
          />
          <Route
            path="/signup"
            element={<SignUpForm onLoad={() => setLoad(false)} />}
          />
          <Route
            path="/registration"
            element={<RegistrationForm onLoad={() => setLoad(false)} />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard onLoad={() => setLoad(false)} /> : <></>}
          />

          <Route
            path="/admin-dashboard"
            element={isAdmin ? <Admin onLoad={() => setLoad(false)} /> : <Navigate to="/" />}
          />

          <Route
            path="/icl-dashboard"
            element={<IclDashboard onLoad={() => setLoad(false)} />}
          />

      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

