"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/auth/mockAuth";

const DEMO_ACCOUNT = {
  employeeId: "asesor.k3@sucofindo.co.id",
  password: "demo-token-2024",
};

export default function LoginPage() {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!employeeId.trim() || !password.trim()) return;
    signIn(employeeId.trim());
    router.push("/dashboard");
  }

  function fillDemoAccount() {
    setEmployeeId(DEMO_ACCOUNT.employeeId);
    setPassword(DEMO_ACCOUNT.password);
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between border-b border-[#e6e8ea] bg-white/80 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <img src="/login/logo-mark.svg" alt="" className="h-[17px] w-[13px]" />
            <span className="text-lg font-semibold capitalize text-[#191c1e]">RiskSentry</span>
          </div>
          <div className="h-4 w-px bg-[#c6c6cd]" />
          <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">
            IDSurvey • Sucofindo Safety System
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-sm border border-[#c6c6cd] bg-[#f2f4f6] px-[9px] py-[5px]">
          <span className="size-[6px] rounded-full bg-[#065f46]" />
          <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">
            K3 ESDM Certified Gateway
          </span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="relative w-full max-w-xl">
          <div className="absolute -left-10 -top-10 size-48 rounded-xl bg-[#131b2e]/5 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 size-48 rounded-xl bg-[#d5e0f8]/30 blur-3xl" />

          <form
            onSubmit={handleSubmit}
            className="relative w-full space-y-5 rounded-lg bg-white p-8 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]"
          >
            <div className="flex items-center justify-between rounded-sm bg-[#f2f4f6] px-3 pb-3 pt-2">
              <div className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-[#065f46]" />
                <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">
                  Protokol Enkripsi Minerba TLS 1.3
                </span>
              </div>
              <span className="text-[11px] font-semibold tracking-wide text-[#45464d]">AUDIT LEVEL-4</span>
            </div>

            <div className="flex flex-col items-center pb-2">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-[#ba1a1a] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
                <img src="/login/shield-check.svg" alt="" className="size-10" />
              </div>
              <div className="flex flex-col items-center pt-2">
                <div className="flex items-center gap-1">
                  <h1 className="text-xl font-semibold capitalize text-[#191c1e]">RiskSentry</h1>
                  <span className="rounded-sm bg-[#131b2e] px-1 py-0.5 text-[11px] font-bold tracking-wide text-white">
                    ENTERPRISE
                  </span>
                </div>
                <p className="pt-0.5 text-center text-lg font-medium tracking-tight text-[#45464d]">
                  Sistem Informasi Gawat &amp; Antisipasi Pengemudi
                </p>
                <p className="pt-1 text-center text-xs font-semibold uppercase tracking-wide text-[#545f73]">
                  K3 Command Center • IDSurvey Sucofindo
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-sm bg-[#eceef0] p-2">
              <div className="flex items-center gap-1">
                <img src="/login/role-badge.svg" alt="" className="size-[15px]" />
                <span className="pr-2 text-[11px] font-bold uppercase leading-tight tracking-wide text-[#45464d]">
                  Peran
                  <br />
                  Akses:
                </span>
                <span className="rounded-sm bg-white px-3 py-1 text-xs font-semibold text-[#191c1e] shadow-sm">
                  Asesor K3 Utama (Sucofindo)
                </span>
              </div>
              <button
                type="button"
                onClick={fillDemoAccount}
                className="flex items-center gap-2 rounded-sm bg-[#dae2fd] px-3 py-1 text-[11px] font-bold uppercase leading-tight tracking-wide text-[#131b2e]"
              >
                <img src="/login/demo-fill.svg" alt="" className="h-[7.5px] w-[12.5px]" />
                Isi Akun
                <br />
                Demo
              </button>
            </div>

            <div className="space-y-3">
              <label className="block">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#191c1e]">
                    ID Karyawan / Email Asesor K3
                  </span>
                  <span className="font-mono text-[11px] text-[#45464d]">IDSS-SS-2024</span>
                </div>
                <div className="relative mt-1">
                  <img
                    src="/login/id-card.svg"
                    alt=""
                    className="pointer-events-none absolute left-3 top-1/2 h-[15px] w-[18px] -translate-y-1/2"
                  />
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="asesor.k3@sucofindo.co.id"
                    className="w-full rounded-sm bg-[#f2f4f6] py-3 pl-11 pr-3 text-sm text-[#191c1e] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] placeholder:text-[#45464d]/60 focus:outline-none focus:ring-2 focus:ring-[#131b2e]/20"
                  />
                </div>
              </label>

              <label className="block">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#191c1e]">
                    Kata Sandi Otorisasi (Token)
                  </span>
                  <span className="text-[11px] font-bold tracking-wide text-[#545f73]">
                    Kendala Otorisasi / Reset Token
                  </span>
                </div>
                <div className="relative mt-1">
                  <img
                    src="/login/key.svg"
                    alt=""
                    className="pointer-events-none absolute left-3 top-1/2 h-[10px] w-[19px] -translate-y-1/2"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-sm bg-[#f2f4f6] py-3 pl-11 pr-11 text-sm text-[#191c1e] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] placeholder:text-[#45464d]/60 focus:outline-none focus:ring-2 focus:ring-[#131b2e]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <img src="/login/eye.svg" alt="" className="h-[16px] w-[18px]" />
                  </button>
                </div>
              </label>

              <label className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  checked={rememberSession}
                  onChange={(e) => setRememberSession(e.target.checked)}
                  className="size-4 rounded-[2.5px] accent-black"
                />
                <span className="text-xs text-[#191c1e]">Ingat sesi workstation command center (8 jam)</span>
              </label>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-black px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]"
              >
                <img src="/login/arrow-right.svg" alt="" className="size-[15px]" />
                Masuk ke Command Center
              </button>
            </div>

            <div className="flex items-center justify-between rounded-sm bg-[#f2f4f6] p-3">
              <div className="flex items-center gap-2">
                <img src="/login/smart-card.svg" alt="" className="size-[18px]" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#191c1e]">
                    Kartu Pintar Asesor / FIDO2
                  </p>
                  <p className="text-xs text-[#45464d]">Gunakan reader USB K3 Smart Card</p>
                </div>
              </div>
              <button
                type="button"
                disabled
                title="Belum tersedia di mode demo"
                className="cursor-not-allowed rounded-sm bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#191c1e] opacity-60 shadow-sm"
              >
                Tautkan Reader
              </button>
            </div>

            <div className="flex flex-col items-center pt-3">
              <div className="flex items-center gap-1">
                <img src="/login/shield-check-sm.svg" alt="" className="h-[14px] w-[15px]" />
                <p className="text-center text-[11px] font-bold tracking-wide text-[#065f46]">
                  Dilindungi Standar Keselamatan Angkutan Tambang &amp; Mineral SK Dirjen Minerba 2024
                </p>
              </div>
              <p className="pt-1 text-center font-mono text-[11px] text-[#45464d]">
                SIGAP Enterprise v4.2-RELEASE • Build 2024.11-SUCOFINDO-AUDIT
              </p>
            </div>
          </form>
        </div>
      </main>

      <footer className="flex items-center justify-between border-t border-[#e6e8ea] bg-[#f2f4f6] px-6 py-4 text-xs text-[#45464d]">
        <div className="flex items-center gap-3">
          <span>© 2024 PT Sucofindo (Persero) - IDSurvey Holding. All rights reserved.</span>
          <span className="text-[#c6c6cd]">•</span>
          <span>Sistem Informasi Manajemen Keselamatan Operasional &amp; K3 ESDM</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <img src="/login/lock.svg" alt="" className="h-[13px] w-[10px]" />
            <span className="text-[11px] font-bold tracking-wide text-[#545f73]">256-Bit SSL Encrypted Session</span>
          </div>
          <span className="text-[#c6c6cd]">|</span>
          <span className="text-[11px] font-bold tracking-wide text-[#45464d]">Secured Audit Level-4</span>
        </div>
      </footer>
    </div>
  );
}
