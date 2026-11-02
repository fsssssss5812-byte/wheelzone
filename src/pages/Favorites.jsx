import { Link } from "react-router-dom";
import { cars } from "../data/cars.js";
import { useFavorites } from "../context/FavoritesContext.jsx";
import CarCard from "../components/CarCard.jsx";
import CarImage from "../components/CarImage.jsx";

export default function Favorites() {
  const { favs } = useFavorites();
  const saved = cars.filter((c) => favs.includes(c.id));

  if (saved.length === 0) {
    return (
      <div className="empty">
        <div className="empty-art">
          <CarImage car={cars[0]} />
        </div>
        <h2>No saved cars yet ♡</h2>
        <p>Tap the heart on any car to save it here.</p>
        <Link to="/cars" className="btn">Browse Cars</Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="section-title">Saved Cars ({saved.length})</h2>
      <div className="grid">
        {saved.map((c) => (
          <CarCard key={c.id} car={c} />
        ))}
      </div>
    </>
  );
}
