export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

// Pakistani mobile: 03XXXXXXXXX or +923XXXXXXXXX (dashes/spaces allowed)
export const isPkPhone = (v) => {
  const d = v.replace(/[\s-]/g, "");
  return /^(\+92|0)3\d{9}$/.test(d);
};

export const passwordProblems = (v) => {
  const p = [];
  if (v.length < 8) p.push("at least 8 characters");
  if (!/[A-Za-z]/.test(v)) p.push("a letter");
  if (!/[0-9]/.test(v)) p.push("a number");
  return p;
};

export function passwordStrength(v) {
  let score = 0;
  if (v.length >= 8) score++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  return ["Too weak", "Weak", "Fair", "Good", "Strong"][score];
}
