import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CarCard from "../components/CarCard.jsx";
import { cars, brands } from "../data/cars.js";

const types = ["All", "Sedan", "SUV", "Hatchback"];

export default function Cars() {
  const [params, setParams] = useSearchParams();
  const brand = params.get("brand") || "All";
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState(50000000);

  const setBrand = (b) => {
    if (b === "All") setParams({});
    else setParams({ brand: b });
  };

  const list = useMemo(() => {
    let l = cars.filter(
      (c) =>
        (brand === "All" || c.brand === brand) &&
        (type === "All" || c.type === type) &&
        c.price <= maxPrice &&
        `${c.brand} ${c.name} ${c.variant}`.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "new") l = [...l].sort((a, b) => b.year - a.year);
    return l;
  }, [brand, type, search, sort, maxPrice]);

  return (
    <>
      <h2 className="section-title">Our Cars</h2>

      <div className="chips">
        {["All", ...brands].map((b) => (
          <button key={b} className={`chip ${brand === b ? "active" : ""}`} onClick={() => setBrand(b)}>
            {b}
          </button>
        ))}
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or variant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {types.map((t) => (
            <option key={t} value={t}>{t === "All" ? "All body types" : t}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="new">Newest first</option>
        </select>
      </div>

      <div className="range">
        <label htmlFor="price">
          Max price: <strong>PKR {(maxPrice / 100000).toFixed(0)} Lakh</strong>
        </label>
        <input
          id="price"
          type="range"
          min="2000000"
          max="50000000"
          step="500000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>

      {list.length === 0 ? (
        <p className="empty">No cars match your filters.</p>
      ) : (
        <div className="grid">
          {list.map((c) => (
            <CarCard key={c.id} car={c} />
          ))}
        </div>
      )}
    </>
  );
}
