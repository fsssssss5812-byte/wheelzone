import { createContext, useContext, useState } from "react";

// NOTE: This is a front-end demo. Users are stored in the browser's
// localStorage only. A real site would use a backend and hashed passwords.
const AuthContext = createContext(null);

const USERS_KEY = "wheelhub-users";
const SESSION_KEY = "wheelhub-session";

function read(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => read(SESSION_KEY, null));

  const register = ({ name, email, phone, password }) => {
    const users = read(USERS_KEY, []);
    const emailKey = email.trim().toLowerCase();
    if (users.some((u) => u.email === emailKey)) {
      return { ok: false, error: "An account with this email already exists." };
    }
    users.push({ name: name.trim(), email: emailKey, phone, password });
    write(USERS_KEY, users);
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const users = read(USERS_KEY, []);
    const found = users.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: "Incorrect email or password." };
    const session = { name: found.name, email: found.email, phone: found.phone };
    write(SESSION_KEY, session);
    setUser(session);
    return { ok: true };
  };

  const logout = () => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
