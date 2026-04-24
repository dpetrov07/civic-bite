import { Link, NavLink, Route, Routes } from "react-router-dom";
import { BarChart3, Bot, Home, Scale, ShieldCheck, Sparkles, UserRound, UsersRound } from "lucide-react";
import AdminPage from "./pages/AdminPage";
import ComparePage from "./pages/ComparePage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import MissionPage from "./pages/MissionPage";
import ProfilePage from "./pages/ProfilePage";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/mission", label: "Mission", icon: Scale },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/compare", label: "Compare", icon: UsersRound },
  { to: "/admin", label: "AI Finder", icon: Bot },
];

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          <span className="brand-mark">
            <ShieldCheck size={20} />
          </span>
          <span>CivicBite</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "active" : "")}>
                <Icon size={17} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <Link className="start-pill" to="/mission">
          <Sparkles size={16} />
          Start
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}
