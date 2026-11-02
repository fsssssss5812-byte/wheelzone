import { Link } from "react-router-dom";
import { cars } from "../data/cars.js";
import CarImage from "../components/CarImage.jsx";

export default function NotFound() {
  return (
    <div className="empty">
      <div className="empty-art">
        <CarImage car={cars[6]} />
      </div>
      <h2>404 — This road doesn't exist</h2>
      <Link to="/" className="btn">Go Home</Link>
    </div>
  );
}
