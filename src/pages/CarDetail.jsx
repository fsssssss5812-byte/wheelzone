import { Link, useNavigate, useParams } from "react-router-dom";
import { cars, formatPrice } from "../data/cars.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";
import CarCard from "../components/CarCard.jsx";
import CarImage from "../components/CarImage.jsx";

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { favs, toggle } = useFavorites();

  const car = cars.find((c) => c.id === Number(id));

  if (!car) {
    return (
      <div className="empty">
        <p>Car not found.</p>
        <Link to="/cars" className="btn">Back to cars</Link>
      </div>
    );
  }

  const saved = favs.includes(car.id);
  const similar = cars.filter((c) => c.brand === car.brand && c.id !== car.id);

  const onSave = () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/cars/${car.id}` } } });
      return;
    }
    toggle(car.id);
  };

  const specs = [
    ["Year", car.year],
    ["Body type", car.type],
    ["Engine", car.engine],
    ["Transmission", car.transmission],
    ["Fuel", car.fuel],
    ["Mileage", car.mileage],
  ];

  return (
    <>
      <div className="detail">
        <div className="detail-img" style={{ background: car.color }}>
          <CarImage car={car} />
        </div>
        <div className="detail-info">
          <span className="tag">{car.brand} · {car.type}</span>
          <h1>{car.brand} {car.name}</h1>
          <small className="muted">{car.variant}</small>
          <p className="price">{formatPrice(car.price)}</p>
          <p>{car.description}</p>

          <table className="spec-table">
            <tbody>
              {specs.map(([k, v]) => (
                <tr key={k}>
                  <th>{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="actions">
            <Link to={`/book?car=${car.id}`} className="btn">Book Test Drive</Link>
            <button className="btn outline" onClick={onSave}>
              {saved ? "♥ Saved" : "♡ Save Car"}
            </button>
          </div>
          <Link to="/cars" className="back">← Back to all cars</Link>
        </div>
      </div>

      {similar.length > 0 && (
        <section style={{ marginTop: 40 }}>
          <h2 className="section-title">More from {car.brand}</h2>
          <div className="grid">
            {similar.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
