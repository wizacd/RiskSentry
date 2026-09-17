"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/auth/mockAuth";

// TODO(Person 3, Figma): ganti markup di bawah dengan desain login dari Figma.
export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    signIn(name.trim());
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">SIGAP — Login Asesor</h1>
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Nama asesor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="w-full rounded bg-gray-900 py-2 text-white">
          Masuk
        </button>
      </form>
    </main>
  );
}
