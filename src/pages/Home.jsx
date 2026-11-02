import { Link } from "react-router-dom";
import CarCard from "../components/CarCard.jsx";
import CarImage from "../components/CarImage.jsx";
import HeroArt from "../components/HeroArt.jsx";
import { brands, brandInfo, cars } from "../data/cars.js";

export default function Home() {
  const featured = cars.filter((c) => [1, 4, 7, 10].includes(c.id));
  return (
    <>
      <section className="hero">
        <div>
          <span className="pill">Your trusted car showroom</span>
          <h1>Find your next car with confidence.</h1>
          <p>
            Browse certified Honda, Toyota, Suzuki and BMW vehicles. Save your
            favourites and book a test drive in minutes.
          </p>
          <div className="hero-actions">
            <Link to="/cars" className="btn">Browse Cars</Link>
            <Link to="/register" className="btn ghost">Create Account</Link>
          </div>
        </div>
        <HeroArt />
      </section>

      <section>
        <h2 className="section-title">Shop by Brand</h2>
        <div className="brand-grid">
          {brands.map((b) => (
            <Link
              key={b}
              to={`/cars?brand=${b}`}
              className="brand-card"
              style={{ borderTopColor: brandInfo[b].color }}
            >
              <div className="brand-img" style={{ background: cars.find((c) => c.brand === b).color }}>
                <CarImage car={cars.find((c) => c.brand === b)} />
              </div>
              <h3>{b}</h3>
              <p>{brandInfo[b].tagline}</p>
              <small>{cars.filter((c) => c.brand === b).length} models available</small>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">Featured Cars</h2>
        <div className="grid">
          {featured.map((c) => (
            <CarCard key={c.id} car={c} />
          ))}
        </div>
      </section>

      <section className="features">
        <div><span>✅</span><h4>Inspected Cars</h4><p>Every car passes a multi-point check</p></div>
        <div><span>💳</span><h4>Easy Financing</h4><p>Flexible installment options</p></div>
        <div><span>🛠️</span><h4>After-Sales Support</h4><p>Service and warranty assistance</p></div>
      </section>
    </>
  );
}
