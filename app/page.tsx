"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Bot,
  Boxes,
  CalendarClock,
  ClipboardList,
  FileSearch,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  PackageCheck,
  Leaf,
  Search,
  ShieldCheck,
  Sprout,
  Wheat,
  UserRound,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const INSTITUTIONAL_PIN = "AGRO2026";
const WORKER_PORTAL_URL = "https://definitiva.vercel.app";
const LOGO_SRC = "/biofex-logo.jpeg";


function LogoImage({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Biofex"
      className={`${className} rounded-2xl object-cover bg-white p-1 border-2 border-lime-300 shadow-lg`}
    />
  );
}

const areaAccess = [
  { area: "Administración", pin: "ADM2026", roles: ["Administrador"] },
  { area: "Operación de campo", pin: "CAM2026", roles: ["Agrónomo", "Monitoreo", "Riego y fertirriego", "Sanidad vegetal"] },
  { area: "Insumos y almacén", pin: "INS2026", roles: ["Bodega"] },
];

const users = [
  { name: "Admin General", license: "ADM-0001", specialty: "Administración agrícola", hospital: "AgroTech Control", pin: "0000", role: "Administrador" },
  { name: "Ing. Valeria Vargas", license: "AGR-8291736", specialty: "Producción agrícola", hospital: "AgroTech Control", pin: "1234", role: "Agrónomo" },
  { name: "Ing. Alejandro Ramírez", license: "AGR-5529182", specialty: "Monitoreo", hospital: "AgroTech Control", pin: "2222", role: "Monitoreo" },
  { name: "Ing. Fernanda López", license: "AGR-7712450", specialty: "Riego y fertirriego", hospital: "AgroTech Control", pin: "3333", role: "Riego y fertirriego" },
  { name: "Ing. Ricardo Torres", license: "AGR-6621980", specialty: "Sanidad vegetal", hospital: "AgroTech Control", pin: "4444", role: "Sanidad vegetal" },
  { name: "Ing. Mariana Castillo", license: "AGR-9044112", specialty: "Gestión de insumos", hospital: "AgroTech Control", pin: "5555", role: "Bodega" },
];

const plots = [
  { id: 1, name: "Lote 1 - Maíz", crop: "Maíz · Mosca blanca", status: "Activo" },
  { id: 2, name: "Lote 2 - Sorgo", crop: "Sorgo · Estrés hídrico", status: "Monitoreo" },
  { id: 3, name: "Lote 3 - Trigo", crop: "Trigo · Roya", status: "Alerta" },
  { id: 4, name: "Lote 4 - Avena", crop: "Avena · Fertilización", status: "Programado" },
  { id: 5, name: "Invernadero Norte", crop: "Tomate · Trips", status: "Urgente" },
  { id: 6, name: "Parcela Experimental", crop: "Chile · Mildiu", status: "Controlado" },
  { id: 7, name: "Lote 5 - Hortalizas", crop: "Lechuga · Pulgones", status: "Activo" },
];

const initialInventory = [
  { id: 1, input: "Confidor 350 SC", component: "Imidacloprid", category: "Insecticida", lot: "AGI-2026-22", stock: 12, reserved: 0, location: "Bodega central", expiry: "2026-08-18", alert: "Stock bajo" },
  { id: 2, input: "Urea granulada 46-0-0", component: "Nitrógeno", category: "Fertilizante", lot: "FER-9021", stock: 86, reserved: 0, location: "Almacén A", expiry: "2027-01-10", alert: "Normal" },
  { id: 3, input: "Mancozeb 80 WP", component: "Mancozeb", category: "Fungicida", lot: "FUN-7780", stock: 7, reserved: 0, location: "Sanidad vegetal", expiry: "2026-06-03", alert: "Caducidad próxima" },
  { id: 4, input: "MAP 12-61-0", component: "Fósforo", category: "Fertilizante", lot: "MAP-4451", stock: 0, reserved: 0, location: "Bodega central", expiry: "2027-03-12", alert: "Sin abasto" },
  { id: 5, input: "Trampas amarillas", component: "Monitoreo cromático", category: "Control físico", lot: "TRA-2290", stock: 33, reserved: 0, location: "Bodega norte", expiry: "2027-06-11", alert: "Normal" },
  { id: 6, input: "Bacillus subtilis", component: "B. subtilis", category: "Biológico", lot: "BIO-8811", stock: 19, reserved: 0, location: "Almacén B", expiry: "2026-11-05", alert: "Normal" },
  { id: 7, input: "Sulfato de potasio", component: "Potasio", category: "Fertilizante", lot: "KSO-7411", stock: 51, reserved: 0, location: "Bodega central", expiry: "2027-09-18", alert: "Normal" },
  { id: 8, input: "Quelato de zinc", component: "Zinc", category: "Micronutriente", lot: "ZNQ-6630", stock: 28, reserved: 0, location: "Nutrición vegetal", expiry: "2027-02-20", alert: "Normal" },
  { id: 9, input: "Cinta de riego 16mm", component: "Riego por goteo", category: "Sistema de riego", lot: "RGO-1102", stock: 14, reserved: 0, location: "Riego", expiry: "2026-10-14", alert: "Stock bajo" },
  { id: 10, input: "Azufre agrícola", component: "Azufre", category: "Fungicida / corrector", lot: "AZF-5540", stock: 9, reserved: 0, location: "Bodega ventilada", expiry: "2026-07-28", alert: "Stock crítico" },
  { id: 11, input: "Imidacloprid genérico", component: "Imidacloprid", category: "Insecticida", lot: "IMI-GEN-02", stock: 35, reserved: 0, location: "Bodega central", expiry: "2027-05-22", alert: "Alternativa disponible" },
  { id: 12, input: "Fosfato monoamónico genérico", component: "Fósforo", category: "Fertilizante", lot: "MAP-GEN-09", stock: 28, reserved: 0, location: "Almacén B", expiry: "2027-01-30", alert: "Alternativa disponible" },
  { id: 13, input: "Mancozeb genérico", component: "Mancozeb", category: "Fungicida", lot: "FUN-GEN-15", stock: 21, reserved: 0, location: "Bodega central", expiry: "2027-02-18", alert: "Alternativa disponible" },
];

const initialMovements = [
  { id: 1001, folio: "AG-2026-1001", date: "Hoy 11:42", expiresAt: "Mañana 11:42", status: "Reservado", inputId: 1, input: "Confidor 350 SC", plot: "Lote 1 - Maíz", crop: "Maíz · Mosca blanca", user: "Ing. Alejandro Ramírez", responsible: "Pendiente de aplicación", lot: "AGI-2026-22", quantity: 1, remaining: 12 },
  { id: 1002, folio: "AG-2026-1002", date: "Hoy 09:15", expiresAt: "Mañana 09:15", status: "Aplicado", inputId: 3, input: "Mancozeb 80 WP", plot: "Lote 3 - Trigo", crop: "Trigo · Roya", user: "Ing. Fernanda López", responsible: "Cuadrilla confirmó aplicación", lot: "FUN-7780", quantity: 1, remaining: 6 },
  { id: 1003, folio: "AG-2026-1003", date: "Ayer 18:30", expiresAt: "Hoy 18:30", status: "Liberado", inputId: 9, input: "Cinta de riego 16mm", plot: "Lote 2 - Sorgo", crop: "Sorgo · Riego", user: "Ing. Ricardo Torres", responsible: "Reserva liberada por no ejecutar", lot: "RGO-1102", quantity: 1, remaining: 14 },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function getAvailableUnits(item: any) {
  return item ? item.stock - item.reserved : 0;
}

function findTherapeuticAlternatives(inventory: any[], input: any, requiredQuantity = 1) {
  if (!input) return [];
  return inventory.filter((item: any) => {
    const sameActiveIngredient = item.component && input.component && item.component.toLowerCase() === input.component.toLowerCase();
    return sameActiveIngredient && item.id !== input.id && getAvailableUnits(item) >= requiredQuantity;
  });
}

// ─── Shared primitives ──────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#1F3326]">{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#1F5C3B]"
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#1F5C3B]"
    >
      {props.children}
    </select>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "Entregado" || status === "Aplicado"
      ? "bg-green-100 text-green-700"
      : status === "Vencido" || status.includes("Liberado")
      ? "bg-red-100 text-red-700"
      : status === "Reservado"
      ? "bg-amber-100 text-amber-700"
      : "bg-emerald-100 text-emerald-800";
  return <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${style}`}>{status}</span>;
}

function AlternativeAgentCard({ input, alternatives, onSelectAlternative }: any) {
  if (!input || alternatives.length === 0) return null;
  return (
    <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50 p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-white p-3 text-amber-700"><Bot size={22} /></div>
        <div className="flex-1">
          <h4 className="font-bold text-[#1F3326]">Agente Biofex: alternativa disponible</h4>
          <p className="mt-1 text-sm text-[#1F5C3B]">
            El insumo seleccionado tiene baja disponibilidad. Biofex encontró opciones equivalentes por componente. La decisión final debe ser validada por el responsable técnico.
          </p>
          <div className="mt-4 space-y-3">
            {alternatives.map((alt: any) => (
              <div key={alt.id} className="rounded-2xl bg-white p-4 border">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-[#1F3326]">{alt.input}</p>
                    <p className="text-sm text-gray-500">Componente: {alt.component} · Disponible: {getAvailableUnits(alt)} · Lote {alt.lot}</p>
                  </div>
                  <button onClick={() => onSelectAlternative(alt.id)} className="rounded-2xl bg-[#1F5C3B] text-white px-4 py-2 text-sm font-semibold hover:bg-[#1F3326] transition">
                    Usar alternativa
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-amber-700">Nota: recomendación operativa basada en inventario y componente; no sustituye criterio agronómico.</p>
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN ───────────────────────────────────────────────────────────────────

function Login({ onLogin }: any) {
  const [step, setStep] = useState("institution");
  const [institutionPin, setInstitutionPin] = useState("");
  const [selectedAreaName, setSelectedAreaName] = useState(areaAccess[0].area);
  const [areaPin, setAreaPin] = useState("");
  const [selectedLicense, setSelectedLicense] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const selectedArea = areaAccess.find((a) => a.area === selectedAreaName) || areaAccess[0];
  const allowedUsers = users.filter((u) => selectedArea.roles.includes(u.role));
  const selectedUser = allowedUsers.find((u) => u.license === selectedLicense) || allowedUsers[0];

  const goToPersonalLogin = () => {
    setSelectedLicense(allowedUsers[0]?.license || "");
    setPin("");
    setError("");
    setStep("personal");
  };

  return (
    <div className="min-h-screen bg-[#F6F1E7] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* Left panel */}
        <div className="bg-[#1F5C3B] text-white p-8 md:p-12 flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <LogoImage className="h-14 w-14" />
            <div>
              <h1 className="text-2xl font-black">Biofex</h1>
              <p className="text-sm opacity-75">Infraestructura agrointeligente</p>
            </div>
          </div>
          <h2 className="text-5xl font-black tracking-tight">COMPAGRO</h2>
          <p className="mt-4 opacity-80 leading-relaxed">Tu compa operativo con IA 🌱</p>
          <p className="mt-2 opacity-70 text-sm">Acceso, validación por área, orden de campo, bodega, almacén, inventario y trazabilidad.</p>

          <div className="mt-8 space-y-3 text-sm">
            {["1. NIP institucional general", "2. NIP por área agrícola", "3. Login personal por cédula y PIN"].map((s) => (
              <div key={s} className="rounded-2xl bg-white/10 p-4">{s}</div>
            ))}
          </div>

          <a href={WORKER_PORTAL_URL} target="_blank" rel="noreferrer"
            className="mt-8 block rounded-[2rem] bg-lime-300 px-6 py-5 text-center text-lg font-black text-[#1F3326] shadow-xl transition hover:scale-[1.02] hover:bg-lime-200">
            👷 Acceso directo para trabajadores →
          </a>
        </div>

        {/* Right panel */}
        <div className="bg-white p-8 md:p-12">
          {step === "institution" && (
            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-7">
                <div className="h-10 w-10 rounded-2xl bg-emerald-100 flex items-center justify-center"><ShieldCheck className="text-[#1F5C3B]" size={20} /></div>
                <div><h3 className="text-2xl font-bold text-[#1F3326]">Acceso institucional</h3><p className="text-sm text-gray-500">Primer nivel de seguridad</p></div>
              </div>
              <div className="space-y-4">
                <Field label="NIP institucional"><Input type="password" placeholder="Ingresa NIP institucional" value={institutionPin} onChange={(e) => setInstitutionPin(e.target.value)} /></Field>
                {error && <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}
                <button onClick={() => { if (institutionPin !== INSTITUTIONAL_PIN) { setError("NIP institucional incorrecto"); return; } setError(""); setStep("area"); }}
                  className="w-full rounded-2xl bg-[#1F5C3B] text-white py-4 text-base font-semibold hover:bg-[#1F3326] transition">
                  Validar acceso institucional
                </button>
                <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-[#1F5C3B]">Demo: <b>{INSTITUTIONAL_PIN}</b></div>
              </div>
            </motion.div>
          )}

          {step === "area" && (
            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-7">
                <div className="h-10 w-10 rounded-2xl bg-emerald-100 flex items-center justify-center"><Sprout className="text-[#1F5C3B]" size={20} /></div>
                <div><h3 className="text-2xl font-bold text-[#1F3326]">Acceso por área</h3><p className="text-sm text-gray-500">Segundo nivel de validación</p></div>
              </div>
              <div className="space-y-4">
                <Field label="Seleccionar área">
                  <Select value={selectedAreaName} onChange={(e) => { setSelectedAreaName(e.target.value); setAreaPin(""); setError(""); }}>
                    {areaAccess.map((a) => <option key={a.area} value={a.area}>{a.area}</option>)}
                  </Select>
                </Field>
                <Field label="NIP del área"><Input type="password" placeholder="Ingresa NIP del área" value={areaPin} onChange={(e) => setAreaPin(e.target.value)} /></Field>
                {error && <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}
                <button onClick={() => { if (areaPin !== selectedArea.pin) { setError("NIP de área incorrecto"); return; } goToPersonalLogin(); }}
                  className="w-full rounded-2xl bg-[#1F5C3B] text-white py-4 text-base font-semibold hover:bg-[#1F3326] transition">
                  Continuar a login personal
                </button>
                <button onClick={() => { setStep("institution"); setAreaPin(""); setError(""); }}
                  className="w-full rounded-2xl border border-gray-200 py-4 text-base font-semibold text-[#1F3326] hover:bg-gray-50 transition">
                  ← Regresar
                </button>
                <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-[#1F5C3B]">Demo {selectedArea.area}: <b>{selectedArea.pin}</b></div>
              </div>
            </motion.div>
          )}

          {step === "personal" && (
            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-7">
                <div className="h-10 w-10 rounded-2xl bg-emerald-100 flex items-center justify-center"><LockKeyhole className="text-[#1F5C3B]" size={20} /></div>
                <div><h3 className="text-2xl font-bold text-[#1F3326]">Inicio de sesión</h3><p className="text-sm text-gray-500">Área: {selectedArea.area}</p></div>
              </div>
              <div className="space-y-4">
                <Field label="Seleccionar usuario">
                  <Select value={selectedLicense} onChange={(e) => { setSelectedLicense(e.target.value); setPin(""); setError(""); }}>
                    {allowedUsers.map((u) => <option key={u.license} value={u.license}>{u.name} · {u.specialty}</option>)}
                  </Select>
                </Field>
                <Field label="ID técnico / matrícula"><Input value={selectedUser?.license || ""} readOnly /></Field>
                <Field label="Perfil técnico"><Input value={selectedUser?.specialty || ""} readOnly /></Field>
                <Field label="Unidad productiva"><Input value={selectedUser?.hospital || ""} readOnly /></Field>
                <Field label="PIN personal"><Input type="password" placeholder="Ingresa PIN personal" value={pin} onChange={(e) => setPin(e.target.value)} /></Field>
                {error && <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}
                <button onClick={() => { if (!selectedUser || pin !== selectedUser.pin) { setError("PIN personal incorrecto"); return; } setError(""); onLogin(selectedUser); }}
                  className="w-full rounded-2xl bg-[#1F5C3B] text-white py-4 text-base font-semibold hover:bg-[#1F3326] transition">
                  Entrar al sistema
                </button>
                <button onClick={() => { setStep("area"); setPin(""); setError(""); }}
                  className="w-full rounded-2xl border border-gray-200 py-4 text-base font-semibold text-[#1F3326] hover:bg-gray-50 transition">
                  ← Regresar
                </button>
                <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-[#1F5C3B]">PIN demo: <b>{selectedUser?.pin}</b></div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────

function Sidebar({ active, setActive, user }: any) {
  const items = [
    ["dashboard", LayoutDashboard, "Dashboard"],
    ["prescription", FileText, "Nueva orden de campo"],
    ["plots", UserRound, "Lotes / parcelas"],
    ["inventory", Boxes, "Inventario"],
    ["warehouse", PackageCheck, "Almacén"],
    ["pharmacy", ClipboardList, "Bodega"],
    ["trace", FileSearch, "Trazabilidad"],
    ["ai", Bot, "Copiloto IA"],
    ["telegram", Bot, "Reportes de campo"],
  ];

  return (
    <aside className="hidden md:flex w-72 min-h-screen flex-col border-r bg-white p-5">
      <div className="flex items-center gap-3 mb-8">
        <LogoImage className="h-12 w-12" />
        <div><h1 className="text-xl font-black text-[#1F3326]">Biofex</h1><p className="text-sm text-gray-500">COMPAGRO · IA agrícola</p></div>
      </div>
      <nav className="space-y-1">
        {items.map(([key, Icon, label]: any) => (
          <button key={key} onClick={() => setActive(key)}
            className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition text-sm font-medium ${active === key ? "bg-[#1F5C3B] text-white shadow-sm" : "text-gray-600 hover:bg-[#F6F1E7]"}`}>
            <Icon size={18} />{label}
          </button>
        ))}
      </nav>

      <a href={WORKER_PORTAL_URL} target="_blank" rel="noreferrer"
        className="mt-5 rounded-[2rem] bg-lime-300 p-4 text-center text-base font-black text-[#1F3326] shadow-lg transition hover:scale-[1.02] hover:bg-lime-200">
        👷 Acceso trabajadores →
      </a>

      <div className="mt-auto rounded-3xl bg-[#F6F1E7] p-4">
        <div className="flex items-center gap-2 font-semibold text-[#1F3326] text-sm"><ShieldCheck size={16} /> Usuario verificado</div>
        <p className="mt-2 text-xs text-gray-500">{user.name}<br />{user.license}<br />{user.specialty}</p>
      </div>
    </aside>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────

function Header({ user, logout, setActive, active }: any) {
  return (
    <header className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500 flex items-center gap-2"><Sprout size={14} /> Sesión activa · {user.specialty}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1F3326]">COMPAGRO</h2>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {active !== "dashboard" && (
            <button onClick={() => setActive("dashboard")} className="rounded-2xl bg-[#1F5C3B] text-white px-5 py-3 text-sm font-semibold hover:bg-[#1F3326] transition">← Inicio</button>
          )}
          <div className="rounded-2xl bg-white px-5 py-3 shadow-sm border border-gray-100 text-sm">
            <b className="text-[#1F3326]">{user.name}</b><br /><span className="text-gray-500">{user.license}</span>
          </div>
          <button onClick={logout} className="rounded-2xl border border-gray-200 bg-white text-[#1F3326] px-5 py-3 text-sm font-semibold hover:bg-gray-50 transition">Cerrar sesión</button>
        </div>
      </div>
    </header>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, emoji }: any) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="text-3xl mb-4">{emoji}</div>
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="text-3xl font-bold text-[#1F3326]">{value}</h3>
      <p className="text-sm text-gray-400 mt-1">{sub}</p>
    </div>
  );
}

function Dashboard({ setActive, inventory, movements }: any) {
  const alerts = inventory.filter((i: any) => i.stock - i.reserved <= 12 || i.alert !== "Normal");
  const totalReserved = inventory.reduce((s: number, i: any) => s + i.reserved, 0);
  const totalStock = inventory.reduce((s: number, i: any) => s + i.stock, 0);

  const recentActivity = movements.slice(0, 4).map((m: any) => `${m.user} · ${m.input} · ${m.plot || "Almacén"} · ${m.status}`);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Hero */}
      <div className="bg-[#1F5C3B] text-white rounded-3xl p-6 md:p-8 shadow-lg">
        <p className="text-sm opacity-75">MVP para operación agrícola</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-black tracking-tight">COMPAGRO</h1>
        <p className="mt-3 text-lg opacity-90 max-w-2xl">Tu compa operativo con IA 🌱 — controla cada insumo desde orden agronómica hasta bodega con trazabilidad completa.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => setActive("prescription")} className="rounded-2xl bg-white text-[#1F3326] px-6 py-3 font-bold text-sm hover:bg-lime-50 transition">Generar orden de campo</button>
          <button onClick={() => setActive("warehouse")} className="rounded-2xl bg-white/10 text-white border border-white/20 px-6 py-3 font-semibold text-sm hover:bg-white/20 transition">Registrar entrada</button>
          <button onClick={() => setActive("pharmacy")} className="rounded-2xl bg-white/10 text-white border border-white/20 px-6 py-3 font-semibold text-sm hover:bg-white/20 transition">Ver bodega</button>
          <button onClick={() => setActive("trace")} className="rounded-2xl bg-white/10 text-white border border-white/20 px-6 py-3 font-semibold text-sm hover:bg-white/20 transition">Trazabilidad</button>
          <button onClick={() => setActive("ai")} className="rounded-2xl bg-white/10 text-white border border-white/20 px-6 py-3 font-semibold text-sm hover:bg-white/20 transition">Copiloto IA</button>
          <a href={WORKER_PORTAL_URL} target="_blank" rel="noreferrer"
            className="inline-flex items-center rounded-[2rem] bg-lime-300 px-6 py-3 text-sm font-black text-[#1F3326] shadow-lg transition hover:scale-[1.02] hover:bg-lime-200">
            👷 Acceso trabajadores →
          </a>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { emoji: "💬", title: "Registrar actividad", desc: "Ordena insumos, registra aplicaciones.", action: "prescription" },
          { emoji: "🚨", title: "Ver alertas", desc: "Insumos con stock crítico o caducidad próxima.", action: "inventory" },
          { emoji: "📦", title: "Inventario", desc: "Consulta existencias y movimientos.", action: "inventory" },
        ].map((card) => (
          <button key={card.title} onClick={() => setActive(card.action)}
            className="bg-white rounded-3xl p-6 text-left shadow-sm border border-gray-100 hover:scale-[1.01] hover:shadow-md transition">
            <div className="text-4xl mb-4">{card.emoji}</div>
            <h2 className="text-xl font-bold text-[#1F3326]">{card.title}</h2>
            <p className="text-gray-500 mt-2 text-sm">{card.desc}</p>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard emoji="🌱" label="Insumos agrícolas" value={inventory.length} sub={`Stock total: ${totalStock}`} />
        <StatCard emoji="📋" label="Órdenes de campo" value={movements.length} sub="con trazabilidad" />
        <StatCard emoji="📦" label="Reservas activas" value={totalReserved} sub="congeladas 24h" />
        <StatCard emoji="🚨" label="Alertas operativas" value={alerts.length} sub="stock/caducidad" />
      </div>

      {/* Alerts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#1F3326] mb-4">Alertas del campo</h2>
          <div className="space-y-3">
            {alerts.slice(0, 5).map((item: any) => (
              <div key={item.lot} className="flex items-center justify-between bg-[#FFF7E6] rounded-2xl p-4">
                <div>
                  <p className="font-semibold text-[#1F3326] text-sm">{item.input}</p>
                  <p className="text-xs text-gray-500">Lote {item.lot} · {item.location}</p>
                </div>
                <span className="bg-[#E9A23B] text-white px-4 py-1 rounded-full text-xs font-semibold">Disponible: {item.stock - item.reserved}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#1F3326] mb-4">Actividad reciente</h2>
          <div className="space-y-4">
            {recentActivity.map((item: string, i: number) => (
              <div key={i} className="border-l-4 border-[#1F5C3B] pl-4">
                <p className="text-gray-600 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Telegram CTA */}
      <div className="bg-[#26382D] text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Reporta desde Telegram 💬</h2>
          <p className="opacity-75 mt-1 text-sm">Escribe algo como: "Se aplicaron 20 litros al lote 3" y Compagro registra por ti.</p>
        </div>
        <button onClick={() => setActive("telegram")} className="bg-white text-[#1F5C3B] px-6 py-4 rounded-2xl font-bold text-sm hover:bg-lime-50 transition">Ver reportes</button>
      </div>
    </motion.div>
  );
}

// ─── PRESCRIPTION (Orden de campo) ───────────────────────────────────────────

function Prescription({ user, inventory, setInventory, setMovements, setActive }: any) {
  const [plotId, setPlotId] = useState(plots[0].id);
  const [inputId, setInputId] = useState(inventory[0].id);
  const [quantity, setQuantity] = useState(1);
  const [crop, setCrop] = useState(plots[0].crop);
  const [indications, setIndications] = useState("Aplicar según etiqueta y recomendación técnica del lote.");
  const [message, setMessage] = useState("");

  const plot = plots.find((p) => p.id === Number(plotId));
  const input = inventory.find((m: any) => m.id === Number(inputId));
  const availableStock = input ? getAvailableUnits(input) : 0;
  const canCreate = input && quantity > 0 && availableStock >= quantity;
  const alternatives = findTherapeuticAlternatives(inventory, input, quantity);

  const createPrescription = () => {
    if (!canCreate) {
      setMessage(alternatives.length > 0
        ? "No hay existencia suficiente. Biofex encontró alternativas con el mismo componente."
        : "No hay existencia suficiente y no se encontraron alternativas.");
      return;
    }
    setInventory((prev: any[]) => prev.map((m) => m.id === input.id ? { ...m, reserved: m.reserved + quantity } : m));
    setMovements((prev: any[]) => [{
      id: Date.now(), folio: `AG-${Date.now().toString().slice(-6)}`, date: "Ahora", expiresAt: "24 horas desde emisión", status: "Reservado",
      inputId: input.id, input: input.input, plot: plot?.name, crop, user: user.name,
      responsible: "Pendiente de aplicación en bodega", lot: input.lot, quantity, remaining: input.stock, indications,
    }, ...prev]);
    setMessage(`Orden generada y reservada por 24 horas. Se apartaron ${quantity} unidad(es) de ${input.input}.`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-[#1F3326] mb-1">Nueva orden de aplicación</h3>
          <p className="text-gray-500 text-sm mb-6">La orden reserva inventario por 24 h. Solo bodega descuenta stock al confirmar aplicación.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Lote">
              <Select value={plotId} onChange={(e) => { const id = Number(e.target.value); setPlotId(id); const s = plots.find((p) => p.id === id); setCrop(s?.crop || ""); }}>
                {plots.map((p) => <option key={p.id} value={p.id}>{p.name} · {p.crop}</option>)}
              </Select>
            </Field>
            <Field label="Insumo">
              <Select value={inputId} onChange={(e) => setInputId(Number(e.target.value))}>
                {inventory.map((m: any) => <option key={m.id} value={m.id}>{m.input} · {m.component} · Disponible {getAvailableUnits(m)}</option>)}
              </Select>
            </Field>
            <Field label="Cantidad"><Input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} /></Field>
            <Field label="Responsable"><Input value={`${user.name} · ${user.license}`} readOnly /></Field>
            <Field label="Cultivo / incidencia"><Input value={crop} onChange={(e) => setCrop(e.target.value)} /></Field>
            <Field label="Disponibilidad real"><Input value={`Stock: ${input?.stock || 0} · Reservado: ${input?.reserved || 0} · Disponible: ${availableStock}`} readOnly /></Field>
            <Field label="Componente / objetivo"><Input value={input?.component || ""} readOnly /></Field>
          </div>
          <div className="mt-4"><Field label="Dosis / observaciones"><Input value={indications} onChange={(e) => setIndications(e.target.value)} /></Field></div>
          <AlternativeAgentCard input={input} alternatives={alternatives} onSelectAlternative={(id: number) => { setInputId(id); setMessage("Alternativa seleccionada. Verifica indicaciones antes de confirmar."); }} />
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={createPrescription} className="rounded-2xl bg-[#1F5C3B] text-white px-6 py-3 font-semibold text-sm hover:bg-[#1F3326] transition">Generar orden y reservar 24h</button>
            <button onClick={() => setActive("pharmacy")} className="rounded-2xl border border-gray-200 text-[#1F3326] px-6 py-3 font-semibold text-sm hover:bg-gray-50 transition">Ver bodega</button>
          </div>
          {message && <div className="mt-5 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-medium text-[#1F5C3B]">{message}</div>}
        </div>

        <div className="bg-[#1F5C3B] text-white rounded-3xl p-6 shadow-sm">
          <FileText size={28} className="opacity-60" />
          <h3 className="mt-4 text-xl font-bold">Vista previa</h3>
          <div className="mt-5 space-y-3 text-sm opacity-80">
            <p><b className="opacity-100">Lote:</b> {plot?.name}</p>
            <p><b className="opacity-100">Insumo:</b> {input?.input}</p>
            <p><b className="opacity-100">Componente:</b> {input?.component}</p>
            <p><b className="opacity-100">Lote insumo:</b> {input?.lot}</p>
            <p><b className="opacity-100">Stock físico:</b> {input?.stock}</p>
            <p><b className="opacity-100">Reservado:</b> {input?.reserved}</p>
            <p><b className="opacity-100">Disponible:</b> {availableStock}</p>
            <p><b className="opacity-100">Cultivo / incidencia:</b> {crop}</p>
            <p className={canCreate ? "text-lime-300 font-semibold" : "text-red-300 font-semibold"}>{canCreate ? "✓ Disponible para reservar" : "✗ Sin existencia suficiente"}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── PLOTS ───────────────────────────────────────────────────────────────────

function Patients() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6"><h3 className="text-xl font-bold text-[#1F3326]">Lotes / parcelas con medicación activa</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F6F1E7] text-gray-500">
              <tr><th className="px-6 py-4 text-left">Nombre</th><th className="px-6 py-4 text-left">Cultivo / incidencia</th><th className="px-6 py-4 text-left">Estado</th></tr>
            </thead>
            <tbody>
              {plots.map((row, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-6 py-4 font-medium text-[#1F3326]">{row.name}</td>
                  <td className="px-6 py-4 text-gray-600">{row.crop}</td>
                  <td className="px-6 py-4"><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// ─── INVENTORY ───────────────────────────────────────────────────────────────

function Inventory({ inventory }: any) {
  const [search, setSearch] = useState("");
  const filtered = inventory
    .map((m: any) => ({ ...m, available: m.stock - m.reserved }))
    .filter((item: any) => {
      const q = search.toLowerCase();
      return item.input.toLowerCase().includes(q) || item.component?.toLowerCase().includes(q) || item.category?.toLowerCase().includes(q) || item.lot.toLowerCase().includes(q) || item.location.toLowerCase().includes(q) || item.alert.toLowerCase().includes(q);
    });

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#1F3326]">Inventario agrícola</h3>
            <p className="text-sm text-gray-500">Busca por insumo, componente, lote, ubicación o alerta.</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-[#F6F1E7] px-4 py-2 w-full md:w-80">
            <Search size={15} className="text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar insumo..." className="w-full bg-transparent outline-none text-sm text-[#1F3326]" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F6F1E7] text-gray-500">
              <tr>
                {["Insumo", "Componente", "Grupo", "Lote", "Stock", "Reservado", "Disponible", "Ubicación", "Caducidad", "Alerta"].map((h) => (
                  <th key={h} className="px-6 py-4 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item: any) => (
                <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-[#1F3326]">{item.input}</td>
                  <td className="px-6 py-4 text-gray-600">{item.component}</td>
                  <td className="px-6 py-4 text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-gray-500">{item.lot}</td>
                  <td className="px-6 py-4 text-gray-600">{item.stock}</td>
                  <td className="px-6 py-4 text-gray-600">{item.reserved}</td>
                  <td className="px-6 py-4 font-semibold text-[#1F5C3B]">{item.available}</td>
                  <td className="px-6 py-4 text-gray-500">{item.location}</td>
                  <td className="px-6 py-4 text-gray-500">{item.expiry}</td>
                  <td className="px-6 py-4 text-gray-600">{item.alert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="p-6 text-center text-sm text-gray-400">No se encontraron insumos con esa búsqueda.</div>}
      </div>
    </motion.div>
  );
}

// ─── WAREHOUSE ───────────────────────────────────────────────────────────────

function Warehouse({ inventory, setInventory, setMovements }: any) {
  const [mode, setMode] = useState("stock");
  const [inputId, setInputId] = useState(inventory[0]?.id || 1);
  const [quantity, setQuantity] = useState(1);
  const [provider, setProvider] = useState("Distribuidora Médica del Norte");
  const [invoice, setInvoice] = useState("FAC-2026-001");
  const [newMedicine, setNewMedicine] = useState("Azitromicina 500mg");
  const [newActiveIngredient, setNewActiveIngredient] = useState("Azitromicina");
  const [newTherapeuticGroup, setNewTherapeuticGroup] = useState("Antibiótico");
  const [newStock, setNewStock] = useState(25);
  const [newLot, setNewLot] = useState("AZT-2026-01");
  const [newLocation, setNewLocation] = useState("Almacén C");
  const [newExpiry, setNewExpiry] = useState("2027-04-15");
  const [message, setMessage] = useState("");

  const selected = inventory.find((item: any) => item.id === Number(inputId));

  const registerProviderEntry = () => {
    if (!selected || quantity <= 0 || !provider.trim() || !invoice.trim()) { setMessage("Completa insumo, cantidad, proveedor y folio."); return; }
    setInventory((prev: any[]) => prev.map((item) => item.id === selected.id ? { ...item, stock: item.stock + quantity, alert: item.stock + quantity <= 10 ? item.alert : "Normal" } : item));
    setMovements((prev: any[]) => [{ id: Date.now(), folio: `ENT-${Date.now().toString().slice(-6)}`, date: "Ahora", expiresAt: "", status: `Entrada de proveedor: +${quantity}`, inputId: selected.id, input: selected.input, plot: "", crop: "Entrada de almacén", user: "Almacén", responsible: `Proveedor: ${provider} · Folio: ${invoice}`, lot: selected.lot, quantity, remaining: selected.stock + quantity }, ...prev]);
    setMessage(`Entrada registrada: +${quantity} unidades de ${selected.input}.`);
  };

  const registerNewMedicine = () => {
    if (!newMedicine.trim() || !newActiveIngredient.trim() || !newTherapeuticGroup.trim() || !newLot.trim() || !newLocation.trim() || !provider.trim() || !invoice.trim() || newStock <= 0) { setMessage("Completa todos los campos."); return; }
    const newId = Math.max(...inventory.map((i: any) => i.id), 0) + 1;
    const item = { id: newId, input: newMedicine, component: newActiveIngredient, category: newTherapeuticGroup, lot: newLot, stock: newStock, reserved: 0, location: newLocation, expiry: newExpiry, alert: newStock <= 10 ? "Stock bajo" : "Normal" };
    setInventory((prev: any[]) => [...prev, item]);
    setMovements((prev: any[]) => [{ id: Date.now(), folio: `NEW-${Date.now().toString().slice(-6)}`, date: "Ahora", expiresAt: "", status: `Insumo nuevo: +${newStock}`, inputId: newId, input: newMedicine, plot: "", crop: "Alta de insumo en almacén", user: "Almacén", responsible: `Proveedor: ${provider} · Folio: ${invoice}`, lot: newLot, quantity: newStock, remaining: newStock }, ...prev]);
    setMessage(`Insumo nuevo registrado: ${newMedicine}, lote ${newLot}, stock inicial ${newStock}.`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="bg-[#1F5C3B] text-white rounded-3xl p-6 shadow-sm">
        <h3 className="text-2xl font-bold">Almacén</h3>
        <p className="mt-2 opacity-75 text-sm">Registra entradas de proveedor o da de alta nuevos insumos.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={() => setMode("stock")} className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${mode === "stock" ? "bg-white text-[#1F3326]" : "bg-white/10 text-white hover:bg-white/20"}`}>Agregar stock existente</button>
          <button onClick={() => setMode("new")} className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${mode === "new" ? "bg-white text-[#1F3326]" : "bg-white/10 text-white hover:bg-white/20"}`}>Registrar insumo nuevo</button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        {mode === "stock" ? (
          <>
            <h3 className="text-xl font-bold text-[#1F3326] mb-1">Entrada de proveedor</h3>
            <p className="text-sm text-gray-500 mb-6">Suma unidades a un insumo existente y deja trazabilidad del proveedor.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Insumo existente"><Select value={inputId} onChange={(e) => setInputId(Number(e.target.value))}>{inventory.map((item: any) => <option key={item.id} value={item.id}>{item.input} · {item.component} · Lote {item.lot} · Stock {item.stock}</option>)}</Select></Field>
              <Field label="Cantidad recibida"><Input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} /></Field>
              <Field label="Proveedor"><Input value={provider} onChange={(e) => setProvider(e.target.value)} /></Field>
              <Field label="Folio / factura"><Input value={invoice} onChange={(e) => setInvoice(e.target.value)} /></Field>
            </div>
            <button onClick={registerProviderEntry} className="mt-6 rounded-2xl bg-[#1F5C3B] text-white px-6 py-3 font-semibold text-sm hover:bg-[#1F3326] transition">Registrar entrada</button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-[#1F3326] mb-1">Registrar insumo nuevo</h3>
            <p className="text-sm text-gray-500 mb-6">Alta inicial: lote, ubicación, caducidad, proveedor y folio.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Nombre del insumo"><Input value={newMedicine} onChange={(e) => setNewMedicine(e.target.value)} /></Field>
              <Field label="Componente / objetivo"><Input value={newActiveIngredient} onChange={(e) => setNewActiveIngredient(e.target.value)} /></Field>
              <Field label="Categoría agronómica"><Input value={newTherapeuticGroup} onChange={(e) => setNewTherapeuticGroup(e.target.value)} /></Field>
              <Field label="Stock inicial"><Input type="number" min="1" value={newStock} onChange={(e) => setNewStock(Number(e.target.value))} /></Field>
              <Field label="Lote"><Input value={newLot} onChange={(e) => setNewLot(e.target.value)} /></Field>
              <Field label="Ubicación"><Input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} /></Field>
              <Field label="Caducidad"><Input type="date" value={newExpiry} onChange={(e) => setNewExpiry(e.target.value)} /></Field>
              <Field label="Proveedor"><Input value={provider} onChange={(e) => setProvider(e.target.value)} /></Field>
              <Field label="Folio / factura"><Input value={invoice} onChange={(e) => setInvoice(e.target.value)} /></Field>
            </div>
            <button onClick={registerNewMedicine} className="mt-6 rounded-2xl bg-[#1F5C3B] text-white px-6 py-3 font-semibold text-sm hover:bg-[#1F3326] transition">Guardar insumo nuevo</button>
          </>
        )}
        {message && <div className="mt-5 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-medium text-[#1F5C3B]">{message}</div>}
      </div>
    </motion.div>
  );
}

// ─── PHARMACY (Bodega) ────────────────────────────────────────────────────────

function Pharmacy({ movements, setMovements, setInventory }: any) {
  const confirmPickup = (movement: any) => {
    if (movement.status !== "Reservado") return;
    setInventory((prev: any[]) => prev.map((m) => m.id === movement.inputId ? { ...m, stock: m.stock - movement.quantity, reserved: Math.max(m.reserved - movement.quantity, 0), alert: m.stock - movement.quantity <= 10 ? "Stock bajo" : m.alert } : m));
    setMovements((prev: any[]) => prev.map((m) => m.id === movement.id ? { ...m, status: "Entregado", responsible: "Bodega confirmó recolección", remaining: Math.max(m.remaining - m.quantity, 0) } : m));
  };

  const releaseReservation = (movement: any) => {
    if (movement.status !== "Reservado") return;
    setInventory((prev: any[]) => prev.map((m) => m.id === movement.inputId ? { ...m, reserved: Math.max(m.reserved - movement.quantity, 0) } : m));
    setMovements((prev: any[]) => prev.map((m) => m.id === movement.id ? { ...m, status: "Vencido", responsible: "Reserva liberada: no recolectó en 24 horas" } : m));
  };

  const simulate24Hours = () => {
    movements.filter((m: any) => m.status === "Reservado").forEach((m: any) => releaseReservation(m));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-[#1F3326]">Bodega · Confirmación de aplicación</h3>
            <p className="text-sm text-gray-500 mt-1">La orden reserva inventario 24 h. Solo se descuenta cuando bodega confirma.</p>
          </div>
          <button onClick={simulate24Hours} className="rounded-2xl bg-[#1F5C3B] text-white px-5 py-3 text-sm font-semibold hover:bg-[#1F3326] transition">Liberar reservas vencidas</button>
        </div>
        <div className="p-6 space-y-4">
          {movements.map((m: any) => (
            <div key={m.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
                <div className="lg:col-span-2">
                  <p className="font-bold text-[#1F3326]">{m.input}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Folio: {m.folio || "AG-DEMO-001"}</p>
                  <p className="text-sm text-gray-500">Lote: {m.plot || "Movimiento de almacén"} · Lote {m.lot}</p>
                  <p className="text-sm text-gray-500">Cultivo / incidencia: {m.crop || "No registrado"}</p>
                </div>
                <div><p className="text-xs text-gray-400">Cantidad</p><p className="font-semibold text-[#1F3326]">{m.quantity}</p></div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Estado</p>
                  <StatusBadge status={m.status} />
                  <p className="text-xs text-gray-400 mt-1">Vence: {m.expiresAt || "No aplica"}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => confirmPickup(m)} disabled={m.status !== "Reservado"} className="rounded-2xl bg-[#1F5C3B] text-white py-2 px-4 text-sm font-semibold hover:bg-[#1F3326] transition disabled:opacity-40 disabled:cursor-not-allowed">Confirmar aplicación</button>
                  <button onClick={() => releaseReservation(m)} disabled={m.status !== "Reservado"} className="rounded-2xl border border-gray-200 text-[#1F3326] py-2 px-4 text-sm font-semibold hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed">Liberar reserva</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── TRACEABILITY ─────────────────────────────────────────────────────────────

function Traceability({ movements }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-[#1F3326] mb-5">Timeline de trazabilidad</h3>
        <div className="space-y-4">
          {movements.map((m: any) => (
            <div key={m.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-400 flex items-center gap-2"><CalendarClock size={14} /> {m.date}</p>
                  <h4 className="text-lg font-bold text-[#1F3326] mt-1">{m.input}</h4>
                  <p className="text-xs text-gray-400">Folio: {m.folio || "AG-DEMO-001"}</p>
                  <p className="text-sm text-gray-500">Lote {m.lot} · Cantidad: {m.quantity}</p>
                  <p className="text-sm text-gray-500">Cultivo / incidencia: {m.crop || "No registrado"}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-2xl bg-white border border-gray-100 p-3"><b className="text-[#1F3326]">Lote</b><br /><span className="text-gray-500">{m.plot || "Almacén"}</span></div>
                  <div className="rounded-2xl bg-white border border-gray-100 p-3"><b className="text-[#1F3326]">Responsable</b><br /><span className="text-gray-500">{m.user}</span></div>
                  <div className="rounded-2xl bg-white border border-gray-100 p-3"><b className="text-[#1F3326]">Estado</b><br /><StatusBadge status={m.status} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── AI CHAT ─────────────────────────────────────────────────────────────────

function AIChat({ inventory, movements, user }: any) {
  const [question, setQuestion] = useState("¿Qué alternativa hay para Confidor?");
  const [answer, setAnswer] = useState("Haz una consulta para analizar inventario, alternativas agronómicas, bodega y trazabilidad.");

  const ask = () => {
    const q = question.toLowerCase();
    if (q.includes("alternativa") || q.includes("sustituto") || q.includes("genérico") || q.includes("generico")) {
      const requestedMedicine = inventory.find((item: any) => q.includes(item.input.toLowerCase().split(" ")[0]) || q.includes(item.component?.toLowerCase()));
      if (!requestedMedicine) { setAnswer("Biofex no encontró el insumo solicitado. Consulta por nombre comercial o componente, ej: Imidacloprid, Mancozeb o Fósforo."); return; }
      const alternatives = findTherapeuticAlternatives(inventory, requestedMedicine, 1);
      if (alternatives.length === 0) { setAnswer(`No encontré alternativas disponibles con el mismo componente para ${requestedMedicine.input}. Se recomienda escalar a bodega/compras.`); return; }
      setAnswer(`Insumo consultado: ${requestedMedicine.input}. Componente: ${requestedMedicine.component}. Alternativas: ${alternatives.map((alt: any) => `${alt.input} con ${getAvailableUnits(alt)} unidades disponibles, lote ${alt.lot}`).join("; ")}. Nota: decisión final debe validarla personal agrónomo o bodega.`);
    } else if (q.includes("agotarse") || q.includes("stock")) {
      setAnswer(inventory.filter((m: any) => getAvailableUnits(m) <= 12).map((m: any) => `${m.input}, componente ${m.component}, lote ${m.lot}, disponible ${getAvailableUnits(m)} unidades.`).join(" ") || "No hay insumos críticos.");
    } else if (q.includes("bodega")) {
      setAnswer(`Bodega tiene ${movements.filter((m: any) => m.status === "Reservado").length} órdenes pendientes de recolección.`);
    } else {
      setAnswer(`Copiloto IA: ${user.name}, puedo ayudarte con órdenes, lotes, bodega, almacén, inventario y alternativas por componente.`);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-[#1F5C3B] text-white rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center"><Bot /></div>
          <div><h3 className="text-2xl font-bold">Agente Biofex 🤖</h3><p className="text-sm opacity-75">Consulta trazabilidad, existencias y alternativas por componente.</p></div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <input value={question} onChange={(e) => setQuestion(e.target.value)} className="flex-1 rounded-2xl bg-white px-4 py-4 text-[#1F3326] outline-none text-sm" />
          <button onClick={ask} className="rounded-2xl bg-lime-300 text-[#1F3326] py-4 px-6 font-bold text-sm hover:bg-lime-200 transition">Consultar agente</button>
        </div>
        <div className="mt-6 rounded-3xl bg-white/10 p-6 leading-relaxed text-sm text-white">{answer}</div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
          {["¿Qué alternativa hay para Confidor?", "¿Qué insumos están por agotarse?", "Resumen de bodega", "¿Qué insumos tienen stock crítico?"].map((q) => (
            <button key={q} onClick={() => setQuestion(q)} className="rounded-2xl bg-white/10 p-3 text-left text-white hover:bg-white/20 transition text-xs">{q}</button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── TELEGRAM REPORTS ─────────────────────────────────────────────────────────

function TelegramReports() {
  const [reports, setReports] = useState<any[]>([]);

  const loadReports = async () => {
    try {
      const res = await fetch("/api/telegram/webhook", { cache: "no-store" });
      const data = await res.json();
      setReports(data.reports || []);
    } catch (error) {
      console.error("Error cargando reportes:", error);
    }
  };

  useEffect(() => {
    loadReports();
    const interval = setInterval(loadReports, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-5">
        <h3 className="text-xl font-bold text-[#1F3326]">Reportes de campo</h3>
        <p className="text-sm text-gray-500 mt-1">Mensajes recibidos desde Telegram, analizados por IA.</p>
      </div>
      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <p className="text-4xl mb-4">💬</p>
            <p className="text-gray-500 text-sm">No hay reportes todavía. Los mensajes de Telegram aparecerán aquí automáticamente.</p>
          </div>
        ) : (
          reports.map((report: any) => (
            <div key={report.id} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-[#1F3326]">Parcela: {report.parcela}</h3>
                <span className="rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs font-semibold">{report.prioridad}</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">{report.fecha}</p>
              <div className="grid gap-3 md:grid-cols-2 mb-4">
                <div><p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Cultivo</p><p className="text-gray-700 text-sm">{report.cultivo}</p></div>
                <div><p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Problema</p><p className="text-gray-700 text-sm">{report.problema}</p></div>
              </div>
              <div className="mb-4"><p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Recomendación IA</p><p className="text-gray-700 text-sm">{report.recomendacion}</p></div>
              <div className="rounded-2xl bg-[#F6F1E7] p-3 text-sm text-gray-600"><b>Mensaje original:</b> {report.mensajeOriginal}</div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [active, setActive] = useState("dashboard");
  const [inventory, setInventory] = useState(initialInventory);
  const [movements, setMovements] = useState(initialMovements);

  if (!user) return <Login onLogin={setUser} />;

  const logout = () => { setUser(null); setActive("dashboard"); };

  const views: any = {
    dashboard: <Dashboard setActive={setActive} inventory={inventory} movements={movements} />,
    prescription: <Prescription user={user} inventory={inventory} setInventory={setInventory} setMovements={setMovements} setActive={setActive} />,
    plots: <Patients />,
    inventory: <Inventory inventory={inventory} />,
    warehouse: <Warehouse inventory={inventory} setInventory={setInventory} setMovements={setMovements} />,
    pharmacy: <Pharmacy movements={movements} setMovements={setMovements} inventory={inventory} setInventory={setInventory} />,
    trace: <Traceability movements={movements} />,
    ai: <AIChat inventory={inventory} movements={movements} user={user} />,
    telegram: <TelegramReports />,
  };

  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#1F3326] flex">
      <Sidebar active={active} setActive={setActive} user={user} />
      <main className="flex-1 p-4 md:p-8 overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden mb-4 flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 font-black text-[#1F3326]"><LogoImage className="h-9 w-9" /> Biofex</div>
          <a href={WORKER_PORTAL_URL} target="_blank" rel="noreferrer" className="rounded-2xl bg-lime-300 px-4 py-2 text-sm font-black text-[#1F3326] shadow-sm">👷 Trabajadores</a>
        </div>
        <Header user={user} logout={logout} setActive={setActive} active={active} />
        {views[active]}
      </main>
    </div>
  );
}
