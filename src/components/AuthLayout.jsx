import { cars } from "../data/cars.js";
import CarImage from "./CarImage.jsx";

// Wraps the login / register forms with a picture panel on the side.
export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <aside className="auth-art" aria-hidden="true">
        <CarImage car={cars[0]} className="aw" />
        <CarImage car={cars[5]} className="aw" />
        <h3>Drive home your dream car.</h3>
        <p>Create an account to save cars and book test drives in minutes.</p>
      </aside>
      {children}
    </div>
  );
}
