import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { cars } from "../data/cars.js";
import { useAuth } from "../context/AuthContext.jsx";
import { isPkPhone } from "../utils/validators.js";
import CarImage from "../components/CarImage.jsx";

const today = () => new Date().toISOString().split("T")[0];

export default function Book() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const preselected = params.get("car") || "";

  const [form, setForm] = useState({
    car: preselected,
    date: "",
    time: "11:00",
    phone: user?.phone || "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [booking, setBooking] = useState(null);
  const selectedCar = cars.find((c) => c.id === Number(form.car));

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!form.car) e.car = "Please select a car";
    if (!form.date) e.date = "Please choose a date";
    else if (form.date < today()) e.date = "Date cannot be in the past";
    if (!isPkPhone(form.phone)) e.phone = "Enter a valid number, e.g. 0300-1234567";
    setErrors(e);
    if (Object.keys(e).length) return;
    const car = cars.find((c) => c.id === Number(form.car));
    setBooking({ car, ...form, ref: "WH" + Math.floor(10000 + Math.random() * 90000) });
  };

  if (booking) {
    return (
      <div className="auth-card success">
        <div className="book-preview" style={{ background: booking.car.color }}>
          <CarImage car={booking.car} />
        </div>
        <h2>🎉 Test drive booked!</h2>
        <p>
          <strong>{booking.car.brand} {booking.car.name}</strong> on{" "}
          <strong>{booking.date}</strong> at <strong>{booking.time}</strong>.
        </p>
        <p>Booking reference: <strong>{booking.ref}</strong></p>
        <p className="muted">We will call you on {booking.phone} to confirm.</p>
        <Link to="/cars" className="btn">Browse more cars</Link>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <h2>Book a Test Drive</h2>
      <p className="muted">Booking as {user.name} ({user.email})</p>

      {selectedCar && (
        <div className="book-preview" style={{ background: selectedCar.color }}>
          <CarImage car={selectedCar} />
        </div>
      )}

      <form onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="car">Car</label>
          <select id="car" name="car" value={form.car} onChange={change}>
            <option value="">Select a car</option>
            {cars.map((c) => (
              <option key={c.id} value={c.id}>
                {c.brand} {c.name} {c.variant}
              </option>
            ))}
          </select>
          {errors.car && <small className="error">{errors.car}</small>}
        </div>

        <div className="field">
          <label htmlFor="date">Preferred Date</label>
          <input id="date" name="date" type="date" min={today()} value={form.date} onChange={change} />
          {errors.date && <small className="error">{errors.date}</small>}
        </div>

        <div className="field">
          <label htmlFor="time">Preferred Time</label>
          <select id="time" name="time" value={form.time} onChange={change}>
            {["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="phone">Contact Number</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={change} placeholder="0300-1234567" />
          {errors.phone && <small className="error">{errors.phone}</small>}
        </div>

        <div className="field">
          <label htmlFor="notes">Notes (optional)</label>
          <textarea id="notes" name="notes" rows="3" value={form.notes} onChange={change} />
        </div>

        <button className="btn block" type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}
