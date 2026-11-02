import { cars } from "../data/cars.js";
import CarImage from "./CarImage.jsx";

// Two overlapping cars used in the home page banner.
export default function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <CarImage car={cars[10]} className="hero-c back" />
      <CarImage car={cars[9]} className="hero-c front" />
    </div>
  );
}
