"use client";

// Mock auth — cukup untuk hackathon (dokumen bagian 7 & 8.3), bukan untuk produksi.
// Ganti isinya dengan Supabase Auth kalau ada waktu ekstra; komponen pemanggil
// (login form, guard di layout) tidak perlu berubah karena kontraknya sama.

const STORAGE_KEY = "sigap.mockSession";

export interface MockSession {
  name: string;
  role: "asesor";
}

export function signIn(name: string): MockSession {
  const session: MockSession = { name, role: "asesor" };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

export function signOut() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getSession(): MockSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as MockSession) : null;
}
