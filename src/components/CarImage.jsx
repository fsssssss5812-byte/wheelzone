import { useId, useState } from "react";

// Lighten (amt > 0) or darken (amt < 0) a #rrggbb colour.
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const target = amt < 0 ? 0 : 255;
  const p = Math.abs(amt);
  const mix = (c) => Math.round(c + (target - c) * p);
  return (
    "#" +
    [mix(n >> 16), mix((n >> 8) & 255), mix(n & 255)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
  );
}

// Side-view outlines (car faces right). Wheels sit at y = 98.
const SHAPES = {
  sedan: {
    body: "M18 98 L18 84 Q20 74 38 71 L92 63 Q112 40 150 38 L186 38 Q214 40 232 62 L266 68 Q284 72 285 86 L285 98 Z",
    glass: "M104 62 Q120 46 150 45 L184 45 Q205 47 220 62 Z",
    pillars: [[152, 45, 152, 62]],
    head: [272, 76],
    tail: [16, 80],
  },
  suv: {
    body: "M16 98 L16 80 Q18 68 36 64 L84 58 L100 34 L238 34 Q252 36 258 58 L276 64 Q288 68 288 84 L288 98 Z",
    glass: "M106 56 L116 40 L236 40 Q246 42 250 56 Z",
    pillars: [
      [160, 40, 160, 56],
      [205, 40, 205, 56],
    ],
    head: [276, 70],
    tail: [14, 72],
  },
  hatch: {
    body: "M20 98 L20 84 Q22 72 40 68 L96 60 Q116 38 150 36 L206 36 Q240 38 252 70 L274 74 Q286 78 286 90 L286 98 Z",
    glass: "M108 58 Q122 44 150 43 L204 43 Q228 45 240 60 Z",
    pillars: [[160, 43, 160, 59]],
    head: [272, 78],
    tail: [18, 78],
  },
};

function Wheel({ cx }) {
  const cy = 98;
  return (
    <g>
      <circle cx={cx} cy={cy} r="21" fill="#111827" />
      <circle cx={cx} cy={cy} r="13.5" fill="#d1d5db" />
      <circle cx={cx} cy={cy} r="13.5" fill="none" stroke="#9ca3af" />
      {[0, 72, 144, 216, 288].map((a) => (
        <line
          key={a}
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - 12}
          stroke="#6b7280"
          strokeWidth="2.6"
          strokeLinecap="round"
          transform={`rotate(${a} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r="3.6" fill="#4b5563" />
    </g>
  );
}

/**
 * Shows a drawn car for every model. If you add a real photo named
 * public/images/car-<id>.jpg it automatically replaces the drawing.
 */
export default function CarImage({ car, className = "" }) {
  const uid = "c" + useId().replace(/:/g, "");
  const [photo, setPhoto] = useState(false);
  const look = car.look;
  const shape = SHAPES[look.type];
  const c = look.color;

  return (
    <div className={`car-img ${className}`}>
      <svg viewBox="0 0 300 130" role="img" aria-label={`${car.brand} ${car.name}`}>
        <defs>
          <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={shade(c, 0.35)} />
            <stop offset="0.45" stopColor={c} />
            <stop offset="1" stopColor={shade(c, -0.3)} />
          </linearGradient>
          <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e0f2fe" />
            <stop offset="1" stopColor="#7dd3fc" />
          </linearGradient>
          <clipPath id={`${uid}-clip`}>
            <path d={shape.body} />
          </clipPath>
        </defs>

        <ellipse cx="150" cy="120" rx="128" ry="5" fill="#000" opacity="0.16" />

        <path d={shape.body} fill={`url(#${uid}-body)`} stroke={shade(c, -0.45)} strokeWidth="1.5" strokeLinejoin="round" />
        <path d={shape.glass} fill={`url(#${uid}-glass)`} stroke={shade(c, -0.45)} strokeWidth="1.2" strokeLinejoin="round" />
        {shape.pillars.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={shade(c, -0.4)} strokeWidth="2.5" />
        ))}

        {/* doors and handles */}
        <path d="M108 62 V96 M176 62 V96" stroke={shade(c, -0.4)} strokeWidth="1.2" fill="none" />
        <rect x="120" y="73" width="14" height="3" rx="1.5" fill={shade(c, -0.5)} />
        <rect x="186" y="73" width="14" height="3" rx="1.5" fill={shade(c, -0.5)} />

        {/* wheel arches */}
        <circle cx="78" cy="98" r="25" fill="#0f172a" clipPath={`url(#${uid}-clip)`} />
        <circle cx="228" cy="98" r="25" fill="#0f172a" clipPath={`url(#${uid}-clip)`} />

        {/* lights and bumper */}
        <rect x={shape.head[0]} y={shape.head[1]} width="13" height="6" rx="3" fill="#fef3c7" stroke="#f59e0b" strokeWidth="0.8" />
        <rect x={shape.tail[0]} y={shape.tail[1]} width="6" height="11" rx="2" fill="#ef4444" />
        <rect x="40" y="94" width="210" height="4" fill={shade(c, -0.5)} opacity="0.6" />

        <Wheel cx={78} />
        <Wheel cx={228} />

        {/* glass shine */}
        <path d="M118 58 L132 47 L146 47 L132 58 Z" fill="#fff" opacity="0.35" />
      </svg>

      <img
        className={`photo ${photo ? "show" : ""}`}
        src={`/images/car-${car.id}.jpg`}
        alt={`${car.brand} ${car.name}`}
        onLoad={() => setPhoto(true)}
        onError={() => setPhoto(false)}
      />
    </div>
  );
}
