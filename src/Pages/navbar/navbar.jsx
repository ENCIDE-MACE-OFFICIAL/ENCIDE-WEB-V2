import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { 
  ShieldUser,
  User,
  Menu,
  X
} from "lucide-react";
import "./navbar.css";

function NavComponent() {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollTop = useRef(0);
  const scrollTimeout = useRef(null);

  const { user, isAdmin, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const adminDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target))
      ) {
        setIsAdminDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const section = document.getElementById(location.hash.slice(1));
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/login") {
      setActiveSection("login");
    } else if (location.pathname === "/dashboard") {
      setActiveSection("dashboard");
    } else if (location.pathname === "/admin-dashboard") {
      setActiveSection("admin-dashboard");
    } else if (location.pathname.startsWith("/icl-dashboard")) {
      setActiveSection("icl-dashboard");
    } else if (location.pathname === "/") {
      const sections = document.querySelectorAll("section");
      const observerOptions = {
        root: null,
        threshold: 0.3,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }, observerOptions);

      sections.forEach((section) => {
        observer.observe(section);
      });

      return () => {
        sections.forEach((section) => {
          observer.unobserve(section);
        });
      };
    }
  }, [location]);

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    setIsScrolling(true);
    setIsAtTop(currentScroll < 20);

    if (currentScroll > lastScrollTop.current) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }
    lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const handleLogout = () => {
    logout().finally(() => navigate("/"));
  };

  return (
    <>
      <div
        className={`navbar-container top-nav-container ${
          scrollDirection === "up" || !isScrolling || isMobileMenuOpen
            ? "scrolled-up"
            : "scrolled-down"
        } ${isAtTop ? "at-top" : "scrolled"}`}
      >
        <nav className="p-4 px-4 navbar sm:px-16 bg-transparent flex justify-between items-center">
          <div className="flex items-center gap-3 md:gap-0">
            <button 
              className="mobile-menu-btn md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
            </button>
            <div className="hidden sm:block text-2xl font-bold logo">
              <Link to="/#home" className="transition-all duration-300 hover:opacity-90 font-light" onClick={() => setIsMobileMenuOpen(false)}>
                ENCIDE <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent font-normal tracking-wide">MACE</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <ul className={`nav_main ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
              <li className={activeSection === "home" ? "active" : ""}>
                <Link to="/#home" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
              </li>
              <li className={activeSection === "about" ? "active" : ""}>
                <Link to="/#about" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</Link>
              </li>
              <li className={activeSection === "team" ? "active" : ""}>
                <Link to="/#team" onClick={() => setIsMobileMenuOpen(false)}>TEAM</Link>
              </li>
              {!isAdmin && (
                <li className={activeSection === "contact" ? "active" : ""}>
                  <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)}>CONTACT</Link>
                </li>
              )}
              <li className="nav_btn_item">
                <Link
                  to="/#events"
                  className={`nav_events_btn ${
                    activeSection === "events" ? "active" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  EVENTS
                </Link>
              </li>
              <li className={`md:hidden ${activeSection === "dashboard" ? "active" : ""}`}>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>DASHBOARD</Link>
              </li>
            </ul>

            <div className="navbar-profile">
              {isAdmin ? (
                <div className="desktop-dropdown-container" ref={adminDropdownRef}>
                  <button
                    onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                    className={`navbar_profile_btn ${isAdminDropdownOpen ? "active-btn" : ""}`}
                    title="Admin Options"
                  >
                    <ShieldUser className="w-5 h-5" />
                  </button>
                  {isAdminDropdownOpen && (
                    <div className="desktop-admin-dropdown">
                      <Link to="/admin-dashboard" onClick={() => setIsAdminDropdownOpen(false)}>
                        Admin Panel
                      </Link>
                      <Link to="/dashboard" onClick={() => setIsAdminDropdownOpen(false)}>
                        Dashboard
                      </Link>
                    </div>
                  )}
                </div>
              ) : user ? (
                <Link to="/dashboard" className="navbar_profile_btn" title="Dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="w-5 h-5" />
                </Link>
              ) : (
                <Link to="/login" className="navbar_login_btn" onClick={() => setIsMobileMenuOpen(false)}>
                  <span>LOGIN</span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavComponent;

