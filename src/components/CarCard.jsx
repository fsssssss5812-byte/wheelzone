import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { formatPrice } from "../data/cars.js";
import CarImage from "./CarImage.jsx";

export default function CarCard({ car }) {
  const { user } = useAuth();
  const { favs, toggle } = useFavorites();
  const navigate = useNavigate();
  const saved = favs.includes(car.id);

  const onSave = () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: "/cars" } } });
      return;
    }
    toggle(car.id);
  };

  return (
    <div className="card">
      <div className="card-img" style={{ background: car.color }}>
        <CarImage car={car} />
        <button
          className={`heart ${saved ? "on" : ""}`}
          onClick={onSave}
          aria-label={saved ? "Remove from saved" : "Save car"}
        >
          {saved ? "♥" : "♡"}
        </button>
        <span className="year">{car.year}</span>
      </div>
      <div className="card-body">
        <span className="tag">{car.brand} · {car.type}</span>
        <Link to={`/cars/${car.id}`} className="card-title">
          {car.brand} {car.name}
        </Link>
        <small className="muted">{car.variant}</small>
        <div className="specs">
          <span>⚙️ {car.transmission}</span>
          <span>⛽ {car.fuel}</span>
          <span>🛣️ {car.mileage}</span>
        </div>
        <div className="card-footer">
          <strong>{formatPrice(car.price)}</strong>
          <Link to={`/cars/${car.id}`} className="btn small">Details</Link>
        </div>
      </div>
    </div>
  );
}
