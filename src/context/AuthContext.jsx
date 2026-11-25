import React, { createContext, useContext, useState, useEffect } from "react";
import { getItem, setItem, removeItem, STORAGE_KEYS } from "../services/storage";

const AuthContext = createContext(null);

export const DEMO_USERS = {
  admin: {
    id: "USR-ADM-01",
    name: "Dr. Eleanor Vance",
    email: "admin@medicare.com",
    role: "Admin",
    title: "Chief Administrator",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
  },
  doctor: {
    id: "DOC-2001",
    name: "Dr. Alexander Wright",
    email: "doctor@medicare.com",
    role: "Doctor",
    specialty: "Cardiology",
    department: "Cardiology",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200"
  },
  staff: {
    id: "STF-9001",
    name: "Nurse Sarah Connor",
    email: "staff@medicare.com",
    role: "Staff",
    title: "Head Registered Nurse",
    avatar: "https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&q=80&w=200"
  },
  patient: {
    id: "PAT-1001",
    name: "Marcus Vance",
    email: "patient@medicare.com",
    role: "Patient",
    gender: "Male",
    age: 38,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getItem(STORAGE_KEYS.AUTH, DEMO_USERS.admin));

  const login = (email, password, roleChoice) => {
    const existingUsers = getItem("medicare_registered_users", []);
    const matched = existingUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (matched) {
      setUser(matched);
      setItem(STORAGE_KEYS.AUTH, matched);
      return { success: true, user: matched };
    }

    const key = (roleChoice || "admin").toLowerCase();
    const demoUser = DEMO_USERS[key] || DEMO_USERS.admin;
    const userData = {
      ...demoUser,
      email: email || demoUser.email
    };

    setUser(userData);
    setItem(STORAGE_KEYS.AUTH, userData);
    return { success: true, user: userData };
  };

  const signup = (name, email, password, role, extraData = {}) => {
    const newUser = {
      id: `USR-${Math.floor(10000 + Math.random() * 90000)}`,
      name,
      email,
      role: role || "Patient",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0284c7&color=fff`,
      ...extraData
    };

    const existingUsers = getItem("medicare_registered_users", []);
    const updated = [newUser, ...existingUsers];
    setItem("medicare_registered_users", updated);

    setUser(newUser);
    setItem(STORAGE_KEYS.AUTH, newUser);
    return { success: true, user: newUser };
  };

  const switchRole = (roleKey) => {
    const targetUser = DEMO_USERS[roleKey.toLowerCase()] || DEMO_USERS.admin;
    setUser(targetUser);
    setItem(STORAGE_KEYS.AUTH, targetUser);
  };

  const logout = () => {
    setUser(null);
    removeItem(STORAGE_KEYS.AUTH);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        switchRole,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
