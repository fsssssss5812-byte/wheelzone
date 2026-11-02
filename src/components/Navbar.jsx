import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { favs } = useFavorites();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={close}>
          🏁 Wheel<span>Hub</span>
        </Link>

        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`} onClick={close}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/cars">Cars</NavLink>
          <NavLink to="/book">Test Drive</NavLink>
          <NavLink to="/favorites">
            ♥ Saved{favs.length > 0 && <span className="badge">{favs.length}</span>}
          </NavLink>
          {user ? (
            <>
              <span className="hello">Hi, {user.name.split(" ")[0]}</span>
              <button
                className="btn small outline"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn small outline">Login</Link>
              <Link to="/register" className="btn small">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
