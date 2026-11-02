export const brands = ["Honda", "Toyota", "Suzuki", "BMW"];

export const brandInfo = {
  Honda: { color: "#dc2626", tagline: "Reliable, efficient and refined.", emoji: "🚗" },
  Toyota: { color: "#b91c1c", tagline: "Built to last, trusted for generations.", emoji: "🚙" },
  Suzuki: { color: "#1d4ed8", tagline: "Affordable, economical everyday cars.", emoji: "🚘" },
  BMW: { color: "#0f172a", tagline: "The ultimate driving machine.", emoji: "🏎️" },
};

// Prices are sample values in PKR for demo purposes.
const baseCars = [
  { id: 1, brand: "Honda", name: "Civic", variant: "1.5 RS Turbo", year: 2024, price: 8500000, type: "Sedan", engine: "1500 cc Turbo", transmission: "Automatic", fuel: "Petrol", mileage: "12,000 km", color: "#fecaca", description: "Sporty turbocharged sedan with a premium interior, sunroof and advanced safety features." },
  { id: 2, brand: "Honda", name: "City", variant: "1.5L Aspire", year: 2023, price: 5200000, type: "Sedan", engine: "1500 cc", transmission: "Automatic", fuel: "Petrol", mileage: "21,000 km", color: "#fee2e2", description: "Comfortable family sedan known for fuel efficiency and low running costs." },
  { id: 3, brand: "Honda", name: "BR-V", year: 2023, price: 5900000, type: "SUV", engine: "1500 cc", transmission: "Automatic", fuel: "Petrol", mileage: "18,500 km", color: "#fecdd3", description: "Spacious 7-seater crossover, ideal for big families and long trips." },

  { id: 4, brand: "Toyota", name: "Corolla", variant: "Altis X 1.6", year: 2024, price: 7100000, type: "Sedan", engine: "1600 cc", transmission: "Automatic", fuel: "Petrol", mileage: "9,000 km", color: "#fed7aa", description: "The nation's favourite sedan with excellent resale value and comfort." },
  { id: 5, brand: "Toyota", name: "Yaris", variant: "ATIV X 1.5", year: 2023, price: 4800000, type: "Sedan", engine: "1500 cc", transmission: "Automatic", fuel: "Petrol", mileage: "25,000 km", color: "#ffedd5", description: "Compact and practical with a smooth CVT and generous boot space." },
  { id: 6, brand: "Toyota", name: "Fortuner", variant: "2.8 Sigma 4", year: 2022, price: 17500000, type: "SUV", engine: "2800 cc Diesel", transmission: "Automatic", fuel: "Diesel", mileage: "35,000 km", color: "#fde68a", description: "Powerful full-size SUV with 4x4 capability and a commanding road presence." },

  { id: 7, brand: "Suzuki", name: "Alto", variant: "VXL AGS", year: 2024, price: 2900000, type: "Hatchback", engine: "660 cc", transmission: "Automatic", fuel: "Petrol", mileage: "6,000 km", color: "#bfdbfe", description: "Pakistan's best-selling city car, light on fuel and easy to park." },
  { id: 8, brand: "Suzuki", name: "Cultus", variant: "VXL", year: 2023, price: 3600000, type: "Hatchback", engine: "1000 cc", transmission: "Manual", fuel: "Petrol", mileage: "20,000 km", color: "#dbeafe", description: "Practical hatchback with a roomy cabin and low maintenance costs." },
  { id: 9, brand: "Suzuki", name: "Swift", variant: "GLX CVT", year: 2023, price: 4200000, type: "Hatchback", engine: "1200 cc", transmission: "Automatic", fuel: "Petrol", mileage: "15,000 km", color: "#c7d2fe", description: "Stylish and fun to drive, with modern features and great fuel economy." },

  { id: 10, brand: "BMW", name: "3 Series", variant: "330i M Sport", year: 2022, price: 22500000, type: "Sedan", engine: "2000 cc Turbo", transmission: "Automatic", fuel: "Petrol", mileage: "28,000 km", color: "#cbd5e1", description: "Sharp handling and a luxurious cabin make this the benchmark sport sedan." },
  { id: 11, brand: "BMW", name: "X5", variant: "xDrive40i", year: 2021, price: 42000000, type: "SUV", engine: "3000 cc Turbo", transmission: "Automatic", fuel: "Petrol", mileage: "40,000 km", color: "#e2e8f0", description: "Flagship luxury SUV with a powerful inline-six and cutting-edge technology." },
  { id: 12, brand: "BMW", name: "5 Series", variant: "530i Luxury", year: 2022, price: 31000000, type: "Sedan", engine: "2000 cc Turbo", transmission: "Automatic", fuel: "Petrol", mileage: "22,000 km", color: "#d1d5db", description: "Executive sedan blending comfort, performance and advanced driver assistance." },
];

// How each car is drawn (used by the CarImage component).
const looks = {
  1: { type: "sedan", color: "#dc2626" },
  2: { type: "sedan", color: "#d1d5db" },
  3: { type: "suv", color: "#374151" },
  4: { type: "sedan", color: "#f8fafc" },
  5: { type: "sedan", color: "#6b7280" },
  6: { type: "suv", color: "#111827" },
  7: { type: "hatch", color: "#38bdf8" },
  8: { type: "hatch", color: "#9ca3af" },
  9: { type: "hatch", color: "#f97316" },
  10: { type: "sedan", color: "#1e3a8a" },
  11: { type: "suv", color: "#334155" },
  12: { type: "sedan", color: "#e5e7eb" },
};

export const cars = baseCars.map((c) => ({ ...c, look: looks[c.id] }));

export function formatPrice(n) {
  if (n >= 10000000) return `PKR ${(n / 10000000).toFixed(2)} Crore`;
  return `PKR ${(n / 100000).toFixed(2)} Lakh`;
}
