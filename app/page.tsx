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
const WORKER_PORTAL_URL = "https://nueva-pag-sigma.vercel.app";
const LOGO_SRC = "/biofex-logo.jpeg";
const res = await fetch(`${window.location.origin}/api/telegram/webhook`);

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
  {
    area: "Administración",
    pin: "ADM2026",
    roles: ["Administrador"],
  },
  {
    area: "Operación de campo",
    pin: "CAM2026",
    roles: ["Agrónomo", "Monitoreo", "Riego y fertirriego", "Sanidad vegetal"],
  },
  {
    area: "Insumos y almacén",
    pin: "INS2026",
    roles: ["Bodega"],
  },
];

const users = [
  {
    name: "Admin General",
    license: "ADM-0001",
    specialty: "Administración agrícola",
    hospital: "AgroTech Control",
    pin: "0000",
    role: "Administrador",
  },
  {
    name: "Ing. Valeria Vargas",
    license: "AGR-8291736",
    specialty: "Producción agrícola",
    hospital: "AgroTech Control",
    pin: "1234",
    role: "Agrónomo",
  },
  {
    name: "Ing. Alejandro Ramírez",
    license: "AGR-5529182",
    specialty: "Monitoreo",
    hospital: "AgroTech Control",
    pin: "2222",
    role: "Monitoreo",
  },
  {
    name: "Ing. Fernanda López",
    license: "AGR-7712450",
    specialty: "Riego y fertirriego",
    hospital: "AgroTech Control",
    pin: "3333",
    role: "Riego y fertirriego",
  },
  {
    name: "Ing. Ricardo Torres",
    license: "AGR-6621980",
    specialty: "Sanidad vegetal",
    hospital: "AgroTech Control",
    pin: "4444",
    role: "Sanidad vegetal",
  },
  {
    name: "Ing. Mariana Castillo",
    license: "AGR-9044112",
    specialty: "Gestión de insumos",
    hospital: "AgroTech Control",
    pin: "5555",
    role: "Bodega",
  },
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-emerald-800">{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border bg-white px-4 py-3 outline-none transition focus:ring-2 focus:ring-emerald-700"
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full rounded-2xl border bg-white px-4 py-3 outline-none transition focus:ring-2 focus:ring-emerald-700"
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
      ? "bg-yellow-100 text-yellow-700"
      : "bg-emerald-100 text-emerald-800";

  return <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${style}`}>{status}</span>;
}

function getAvailableUnits(item: any) {
  return item ? item.stock - item.reserved : 0;
}

function findTherapeuticAlternatives(inventory: any[], input: any, requiredQuantity = 1) {
  if (!input) return [];

  return inventory.filter((item: any) => {
    const sameActiveIngredient =
      item.component &&
      input.component &&
      item.component.toLowerCase() === input.component.toLowerCase();

    const isDifferentProduct = item.id !== input.id;
    const hasAvailability = getAvailableUnits(item) >= requiredQuantity;

    return sameActiveIngredient && isDifferentProduct && hasAvailability;
  });
}

function AlternativeAgentCard({
  input,
  alternatives,
  onSelectAlternative,
}: any) {
  if (!input || alternatives.length === 0) return null;

  return (
    <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50 p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-white p-3 text-amber-700">
          <Bot size={22} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-emerald-950">
            Agente Biofex: alternativa disponible
          </h4>
          <p className="mt-1 text-sm text-emerald-700">
            El insumo seleccionado tiene baja disponibilidad o no cubre la cantidad solicitada.
            Biofex encontró opciones equivalentes por componente u objetivo. La decisión final debe ser validada por el responsable técnico o bodega.
          </p>

          <div className="mt-4 space-y-3">
            {alternatives.map((alt: any) => (
              <div key={alt.id} className="rounded-2xl bg-white p-4 border">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-emerald-950">{alt.input}</p>
                    <p className="text-sm text-emerald-700/70">
                      Componente / objetivo: {alt.component} · Disponible: {getAvailableUnits(alt)} · Lote {alt.lot}
                    </p>
                  </div>
                  <Button
                    onClick={() => onSelectAlternative(alt.id)}
                    className="rounded-2xl bg-emerald-950 text-white hover:bg-emerald-900"
                  >
                    Usar alternativa
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-amber-700">
            Nota: esta es una recomendación operativa basada en inventario y componente; no sustituye criterio agronómico.
          </p>
        </div>
      </div>
    </div>
  );
}


function Login({ onLogin }: any) {
  const [step, setStep] = useState("institution");
  const [institutionPin, setInstitutionPin] = useState("");
  const [selectedAreaName, setSelectedAreaName] = useState(areaAccess[0].area);
  const [areaPin, setAreaPin] = useState("");
  const [selectedLicense, setSelectedLicense] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const selectedArea =
    areaAccess.find((area) => area.area === selectedAreaName) || areaAccess[0];

  const allowedUsers = users.filter((user) =>
    selectedArea.roles.includes(user.role)
  );

  const selectedUser =
    allowedUsers.find((user) => user.license === selectedLicense) ||
    allowedUsers[0];

  const goToPersonalLogin = () => {
    setSelectedLicense(allowedUsers[0]?.license || "");
    setPin("");
    setError("");
    setStep("personal");
  };

  return (
    <div className="min-h-screen bg-[#051008] p-6 text-white flex items-center justify-center">
      <Card className="w-full max-w-5xl overflow-hidden rounded-[2rem] border-0 shadow-2xl">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 p-0">
          <div className="bg-emerald-950 text-white p-8 md:p-12 text-white">
            <div className="mb-10 flex items-center gap-3">
              <LogoImage className="h-14 w-14" />

              <div>
                <h1 className="text-3xl font-black text-white">
                  Biofex
                </h1>

                <p className="text-sm text-emerald-100/80">
                  Infraestructura agrointeligente de trazabilidad
                </p>
              </div>
            </div>

            <h2 className="text-5xl font-black tracking-tight text-white">
              COMPAGRO
            </h2>

            <p className="mt-5 text-emerald-100/80 leading-relaxed">
              Acceso, validación por área, PIN personal,
              orden de campo, bodega, almacén, inventario y trazabilidad.
            </p>

            <div className="mt-8 grid gap-3 text-sm">
              <div className="rounded-2xl bg-white/10 p-4 text-white">
                1. NIP institucional general
              </div>

              <div className="rounded-2xl bg-white/10 p-4 text-white">
                2. NIP por área agrícola
              </div>

              <div className="rounded-2xl bg-white/10 p-4 text-white">
                3. Login personal por cédula y PIN
              </div>
            </div>

            <a
              href={WORKER_PORTAL_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 block rounded-[2rem] bg-lime-300 px-8 py-6 text-center text-xl font-black text-emerald-950 shadow-2xl ring-4 ring-white/20 transition hover:scale-[1.02] hover:bg-lime-200"
            >
              👷 Acceso directo para trabajadores →
            </a>
          </div>

          <div className="bg-white p-8 md:p-12 text-emerald-950">
            {step === "institution" && (
              <>
                <div className="mb-7 flex items-center gap-3">
                  <ShieldCheck className="text-emerald-700/70" />

                  <div>
                    <h3 className="text-2xl font-bold">
                      Acceso
                    </h3>

                    <p className="text-sm text-emerald-700/70">
                      Primer nivel de seguridad 
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Field label="NIP institucional">
                    <Input
                      type="password"
                      placeholder="Ingresa NIP institucional"
                      value={institutionPin}
                      onChange={(e) => setInstitutionPin(e.target.value)}
                    />
                  </Field>

                  {error && (
                    <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm font-medium text-red-700">
                      {error}
                    </div>
                  )}

                  <Button
                    onClick={() => {
                      if (institutionPin !== INSTITUTIONAL_PIN) {
                        setError("NIP institucional incorrecto");
                        return;
                      }

                      setError("");
                      setStep("area");
                    }}
                    className="w-full rounded-2xl bg-emerald-950 text-white py-6 text-base hover:bg-emerald-900"
                  >
                    Validar acceso institucional
                  </Button>

                  <div className="rounded-2xl bg-emerald-100 p-4 text-sm text-emerald-700">
                    Demo: <b>{INSTITUTIONAL_PIN}</b>
                  </div>
                </div>
              </>
            )}

            {step === "area" && (
              <>
                <div className="mb-7 flex items-center gap-3">
                  <Sprout className="text-emerald-700/70" />

                  <div>
                    <h3 className="text-2xl font-bold">
                      Acceso por área
                    </h3>

                    <p className="text-sm text-emerald-700/70">
                      Segundo nivel de validación interna
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Field label="Seleccionar área">
                    <Select
                      value={selectedAreaName}
                      onChange={(e) => {
                        setSelectedAreaName(e.target.value);
                        setAreaPin("");
                        setError("");
                      }}
                    >
                      {areaAccess.map((area) => (
                        <option key={area.area} value={area.area}>
                          {area.area}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field label="NIP del área">
                    <Input
                      type="password"
                      placeholder="Ingresa NIP del área"
                      value={areaPin}
                      onChange={(e) => setAreaPin(e.target.value)}
                    />
                  </Field>

                  {error && (
                    <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm font-medium text-red-700">
                      {error}
                    </div>
                  )}

                  <Button
                    onClick={() => {
                      if (areaPin !== selectedArea.pin) {
                        setError("NIP de área incorrecto");
                        return;
                      }

                      goToPersonalLogin();
                    }}
                    className="w-full rounded-2xl bg-emerald-950 text-white py-6 text-base hover:bg-emerald-900"
                  >
                    Continuar a login personal
                  </Button>

                  <Button
                    onClick={() => {
                      setStep("institution");
                      setAreaPin("");
                      setError("");
                    }}
                    className="w-full rounded-2xl bg-white py-6 text-base text-emerald-950 hover:bg-emerald-100 border"
                  >
                    ← Regresar al NIP institucional
                  </Button>

                  <div className="rounded-2xl bg-emerald-100 p-4 text-sm text-emerald-700">
                    Demo {selectedArea.area}: <b>{selectedArea.pin}</b>
                  </div>
                </div>
              </>
            )}

            {step === "personal" && (
              <>
                <div className="mb-7 flex items-center gap-3">
                  <LockKeyhole className="text-emerald-700/70" />

                  <div>
                    <h3 className="text-2xl font-bold">
                      Inicio de sesión personal
                    </h3>

                    <p className="text-sm text-emerald-700/70">
                      Área autorizada: {selectedArea.area}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Field label="Seleccionar usuario">
                    <Select
                      value={selectedLicense}
                      onChange={(e) => {
                        setSelectedLicense(e.target.value);
                        setPin("");
                        setError("");
                      }}
                    >
                      {allowedUsers.map((user) => (
                        <option
                          key={user.license}
                          value={user.license}
                        >
                          {user.name} · {user.specialty}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field label="ID técnico / matrícula">
                    <Input
                      value={selectedUser?.license || ""}
                      readOnly
                    />
                  </Field>

                  <Field label="Perfil técnico">
                    <Input
                      value={selectedUser?.specialty || ""}
                      readOnly
                    />
                  </Field>

                  <Field label="Unidad productiva">
                    <Input
                      value={selectedUser?.hospital || ""}
                      readOnly
                    />
                  </Field>

                  <Field label="PIN personal">
                    <Input
                      type="password"
                      placeholder="Ingresa PIN personal"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                    />
                  </Field>

                  {error && (
                    <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm font-medium text-red-700">
                      {error}
                    </div>
                  )}

                  <Button
                    onClick={() => {
                      if (!selectedUser || pin !== selectedUser.pin) {
                        setError("PIN personal incorrecto");
                        return;
                      }

                      setError("");
                      onLogin(selectedUser);
                    }}
                    className="w-full rounded-2xl bg-emerald-950 text-white py-6 text-base hover:bg-emerald-900"
                  >
                    Entrar al sistema
                  </Button>

                  <Button
                    onClick={() => {
                      setStep("area");
                      setPin("");
                      setError("");
                    }}
                    className="w-full rounded-2xl bg-white py-6 text-base text-emerald-950 hover:bg-emerald-100 border"
                  >
                    ← Regresar a selección de área
                  </Button>

                  <div className="rounded-2xl bg-emerald-100 p-4 text-sm text-emerald-700">
                    PIN demo: <b>{selectedUser?.pin}</b>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
        <div><h1 className="text-xl font-black tracking-tight">Biofex</h1><p className="text-sm text-emerald-700/70">COMPAGRO · IA agrícola</p></div>
      </div>
      <nav className="space-y-2">
        {items.map(([key, Icon, label]: any) => (
          <button key={key} onClick={() => setActive(key)} className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${active === key ? "bg-emerald-950 text-white text-white shadow-md" : "text-emerald-700 hover:bg-emerald-100"}`}>
            <Icon size={20} /><span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>

      <a
        href={WORKER_PORTAL_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-5 rounded-[2rem] bg-lime-300 p-5 text-center text-lg font-black text-emerald-950 shadow-xl ring-2 ring-lime-500/30 transition hover:scale-[1.02] hover:bg-lime-200"
      >
        👷 Acceso trabajadores →
      </a>

      <div className="mt-auto rounded-3xl bg-emerald-100 p-4">
        <div className="flex items-center gap-2 font-semibold text-emerald-900"><ShieldCheck size={18} /> Usuario verificado</div>
        <p className="mt-2 text-sm text-emerald-700/70">{user.name}<br />{user.license}<br />{user.specialty}</p>
      </div>
    </aside>
  );
}

function Header({
  user,
  logout,
  setActive,
  active,
}: any) {
  return (
    <header className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-emerald-700/70 flex items-center gap-2">
            <Sprout size={16} />
            Sesión activa · {user.specialty}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-emerald-950">
            COMPAGRO
          </h2>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {active !== "dashboard" && (
            <Button
              onClick={() => setActive("dashboard")}
              className="rounded-2xl bg-emerald-950 text-white text-white hover:bg-emerald-900 px-5 py-6"
            >
              ← Inicio
            </Button>
          )}

          <div className="rounded-2xl bg-white px-5 py-3 shadow-sm border text-sm">
            <b>{user.name}</b>
            <br />
            <span className="text-emerald-700/70">
              {user.license}
            </span>
          </div>

          <Button
            onClick={logout}
            className="rounded-2xl bg-white text-emerald-950 hover:bg-emerald-100 border px-5 py-6"
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  );
}

function StatCard({ icon: Icon, label, value, sub }: any) {
  return (
    <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-5">
      <div className="flex items-center justify-between"><div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center"><Icon size={23} /></div><Activity className="text-emerald-100/80" size={18} /></div>
      <p className="mt-5 text-sm text-emerald-700/70">{label}</p><h3 className="text-3xl font-bold text-emerald-950">{value}</h3><p className="text-sm text-emerald-700/70 mt-1">{sub}</p>
    </CardContent></Card>
  );
}

function Dashboard({ setActive, inventory, movements }: any) {
  const alerts = inventory.filter((i: any) => i.stock - i.reserved <= 12 || i.alert !== "Normal");
  const totalReserved = inventory.reduce((sum: number, item: any) => sum + item.reserved, 0);
  const totalStock = inventory.reduce((sum: number, item: any) => sum + item.stock, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="mb-6 rounded-3xl border-0 bg-emerald-950 text-white text-white shadow-sm"><CardContent className="p-8">
        <p className="text-sm font-semibold text-emerald-100/80">MVP para operación agrícola</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-white">COMPAGRO</h1>
        <p className="mt-4 max-w-3xl text-emerald-100/80">Controla cada insumo desde orden agronómica hasta bodega, almacén, lote, lote, cultivo/incidencia, responsable y existencia restante.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button onClick={() => setActive("prescription")} className="rounded-2xl bg-white text-emerald-950 hover:bg-slate-200 px-6 py-6">Generar orden de campo</Button>
          <Button onClick={() => setActive("warehouse")} className="rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/20 px-6 py-6">Registrar entrada</Button>
          <Button onClick={() => setActive("pharmacy")} className="rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/20 px-6 py-6">Ver bodega</Button>
          <Button onClick={() => setActive("trace")} className="rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/20 px-6 py-6">Ver trazabilidad</Button>
          <Button onClick={() => setActive("ai")} className="rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/20 px-6 py-6">Consultar copiloto IA</Button>
          <a
            href={WORKER_PORTAL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-[2rem] bg-lime-300 px-8 py-6 text-lg font-black text-emerald-950 shadow-xl ring-2 ring-white/20 transition hover:scale-[1.02] hover:bg-lime-200"
          >
            👷 Acceso trabajadores →
          </a>
        </div>
      </CardContent></Card>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Leaf} label="Insumos agrícolas" value={inventory.length} sub={`Stock total: ${totalStock}`} />
        <StatCard icon={FileText} label="Órdenes de campo" value={movements.length} sub="con trazabilidad" />
        <StatCard icon={PackageCheck} label="Reservas de insumo" value={totalReserved} sub="congeladas 24h" />
        <StatCard icon={AlertTriangle} label="Alertas agrícolas" value={alerts.length} sub="stock/caducidad" />
      </div>
      <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-6"><h3 className="text-xl font-bold mb-4">Alertas operativas</h3>
        <div className="space-y-3">{alerts.map((item: any) => <div key={item.lot} className="flex items-center justify-between rounded-2xl bg-emerald-50 p-4"><div><p className="font-semibold">{item.input}</p><p className="text-sm text-emerald-700/70">Lote {item.lot} · {item.location}</p></div><span className="rounded-full bg-white px-3 py-1 text-sm font-medium border">Disponible: {item.stock - item.reserved}</span></div>)}</div>
      </CardContent></Card>
    </motion.div>
  );
}

function Prescription({ user, inventory, setInventory, setMovements, setActive }: any) {
  const [plotId, setPatientId] = useState(plots[0].id);
  const [inputId, setMedicineId] = useState(inventory[0].id);
  const [quantity, setQuantity] = useState(1);
  const [crop, setDiagnosis] = useState(plots[0].crop);
  const [indications, setIndications] = useState("Aplicar según etiqueta y recomendación técnica del lote.");
  const [message, setMessage] = useState("");

  const plot = plots.find((p) => p.id === Number(plotId));
  const input = inventory.find((m: any) => m.id === Number(inputId));
  const availableStock = input ? getAvailableUnits(input) : 0;
  const canCreate = input && quantity > 0 && availableStock >= quantity;
  const alternatives = findTherapeuticAlternatives(inventory, input, quantity);

  const createPrescription = () => {
    if (!canCreate) {
      if (alternatives.length > 0) {
        setMessage("No hay existencia suficiente del insumo seleccionado. Biofex encontró alternativas con el mismo componente para validación agronómica.");
      } else {
        setMessage("No hay existencia suficiente disponible para reservar esta orden y no se encontraron alternativas con el mismo componente.");
      }
      return;
    }
    setInventory((prev: any[]) => prev.map((m) => m.id === input.id ? { ...m, reserved: m.reserved + quantity } : m));
    setMovements((prev: any[]) => [{
      id: Date.now(), folio: `AG-${Date.now().toString().slice(-6)}`, date: "Ahora", expiresAt: "24 horas desde emisión", status: "Reservado", inputId: input.id,
      input: input.input, plot: plot?.name, crop, user: user.name,
      responsible: "Pendiente de aplicación en bodega", lot: input.lot, quantity,
      remaining: input.stock, indications,
    }, ...prev]);
    setMessage(`Orden generada y reservada por 24 horas. Se apartaron ${quantity} unidad(es) de ${input.input}. El inventario físico aún NO se descuenta hasta que bodega confirme recolección.`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 rounded-3xl border-0 shadow-sm"><CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-1">Generar orden de aplicación</h3><p className="text-emerald-700/70 mb-6">La orden reserva inventario por 24 horas. Solo bodega descuenta stock al confirmar aplicación en campo.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Lote"><Select value={plotId} onChange={(e) => { const id = Number(e.target.value); setPatientId(id); const selected = plots.find((p) => p.id === id); setDiagnosis(selected?.crop || ""); }}>{plots.map((p) => <option key={p.id} value={p.id}>{p.name} · {p.crop}</option>)}</Select></Field>
            <Field label="Insumo"><Select value={inputId} onChange={(e) => setMedicineId(Number(e.target.value))}>{inventory.map((m: any) => <option key={m.id} value={m.id}>{m.input} · {m.component} · Disponible {getAvailableUnits(m)}</option>)}</Select></Field>
            <Field label="Cantidad"><Input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} /></Field>
            <Field label="Responsable que orden"><Input value={`${user.name} · ${user.license}`} readOnly /></Field>
            <Field label="Cultivo / incidencia / motivo de orden"><Input value={crop} onChange={(e) => setDiagnosis(e.target.value)} /></Field>
            <Field label="Disponibilidad real"><Input value={`Stock: ${input?.stock || 0} · Reservado: ${input?.reserved || 0} · Disponible: ${availableStock}`} readOnly /></Field>
            <Field label="Componente / objetivo"><Input value={input?.component || ""} readOnly /></Field>
          </div>
          <div className="mt-4"><Field label="Dosis / observaciones"><Input value={indications} onChange={(e) => setIndications(e.target.value)} /></Field></div>
          <AlternativeAgentCard
            input={input}
            alternatives={alternatives}
            onSelectAlternative={(alternativeId: number) => {
              setMedicineId(alternativeId);
              setMessage("Alternativa seleccionada. Verifica indicaciones y confirma la orden si corresponde.");
            }}
          />
          <div className="mt-6 flex flex-wrap gap-3"><Button onClick={createPrescription} className="rounded-2xl bg-emerald-950 text-white px-6 py-6 hover:bg-emerald-900">Generar orden y reservar 24h</Button><Button onClick={() => setActive("pharmacy")} className="rounded-2xl bg-white text-emerald-950 border px-6 py-6 hover:bg-emerald-100">Ver bodega</Button></div>
          {message && <div className="mt-5 rounded-2xl bg-emerald-100 p-4 font-medium text-emerald-800">{message}</div>}
        </CardContent></Card>
        <Card className="rounded-3xl border-0 bg-emerald-950 text-white text-white shadow-sm"><CardContent className="p-6"><FileText size={34}/><h3 className="mt-4 text-xl font-bold text-white">Vista previa</h3><div className="mt-5 space-y-3 text-sm text-emerald-100/80"><p><b className="text-white">Lote:</b> {plot?.name}</p><p><b className="text-white">Insumo:</b> {input?.input}</p><p><b className="text-white">Componente / objetivo:</b> {input?.component}</p><p><b className="text-white">Lote:</b> {input?.lot}</p><p><b className="text-white">Stock físico:</b> {input?.stock}</p><p><b className="text-white">Reservado:</b> {input?.reserved}</p><p><b className="text-white">Disponible:</b> {availableStock}</p><p><b className="text-white">Cultivo / incidencia:</b> {crop}</p><p><b className="text-white">Resultado:</b> {canCreate ? "Disponible para reservar" : "Sin existencia suficiente"}</p></div></CardContent></Card>
      </div>
    </motion.div>
  );
}

function Patients() {
  return <DataTable title="Lotes / parcelas con medicación activa" data={plots} columns={["name", "crop", "status"]} />;
}

function DataTable({ title, data, columns }: any) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><Card className="rounded-3xl border-0 shadow-sm overflow-hidden"><CardContent className="p-0"><div className="p-6 flex items-center justify-between"><h3 className="text-xl font-bold">{title}</h3><div className="hidden md:flex items-center gap-2 rounded-2xl bg-emerald-100 px-4 py-2 text-emerald-700/70"><Search size={17}/> Buscar</div></div><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-emerald-50 text-emerald-700/70"><tr>{columns.map((c: string) => <th key={c} className="px-6 py-4 text-left capitalize">{c}</th>)}</tr></thead><tbody>{data.map((row: any, i: number) => <tr key={i} className="border-t">{columns.map((c: string) => <td key={c} className="px-6 py-4 font-medium text-emerald-800">{String(row[c] ?? "")}</td>)}</tr>)}</tbody></table></div></CardContent></Card></motion.div>;
}

function Inventory({ inventory }: any) {
  const [search, setSearch] = useState("");

  const filteredInventory = inventory
    .map((m: any) => ({ ...m, available: m.stock - m.reserved }))
    .filter((item: any) => {
      const query = search.toLowerCase();
      return (
        item.input.toLowerCase().includes(query) ||
        item.component?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.lot.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.alert.toLowerCase().includes(query)
      );
    });

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-3xl border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-bold">Inventario agrícola</h3>
              <p className="text-sm text-emerald-700/70">
                Busca por insumo, componente, lote, ubicación o estado de alerta.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-emerald-100 px-4 py-2 text-emerald-700/70 w-full md:w-96">
              <Search size={17} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar insumo..."
                className="w-full bg-transparent outline-none text-sm text-emerald-800"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-emerald-50 text-emerald-700/70">
                <tr>
                  <th className="px-6 py-4 text-left">Insumo</th>
                  <th className="px-6 py-4 text-left">Componente / objetivo</th>
                  <th className="px-6 py-4 text-left">Grupo</th>
                  <th className="px-6 py-4 text-left">Lote</th>
                  <th className="px-6 py-4 text-left">Stock</th>
                  <th className="px-6 py-4 text-left">Reservado</th>
                  <th className="px-6 py-4 text-left">Disponible</th>
                  <th className="px-6 py-4 text-left">Ubicación</th>
                  <th className="px-6 py-4 text-left">Caducidad</th>
                  <th className="px-6 py-4 text-left">Alerta</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item: any) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-6 py-4 font-medium text-emerald-800">{item.input}</td>
                    <td className="px-6 py-4 text-emerald-800">{item.component}</td>
                    <td className="px-6 py-4 text-emerald-800">{item.category}</td>
                    <td className="px-6 py-4 text-emerald-800">{item.lot}</td>
                    <td className="px-6 py-4 text-emerald-800">{item.stock}</td>
                    <td className="px-6 py-4 text-emerald-800">{item.reserved}</td>
                    <td className="px-6 py-4 font-semibold text-emerald-950">{item.available}</td>
                    <td className="px-6 py-4 text-emerald-800">{item.location}</td>
                    <td className="px-6 py-4 text-emerald-800">{item.expiry}</td>
                    <td className="px-6 py-4 text-emerald-800">{item.alert}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredInventory.length === 0 && (
            <div className="p-6 text-center text-sm text-emerald-700/70">
              No se encontraron insumos con esa búsqueda.
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Warehouse({ inventory, setInventory, setMovements }: any) {
  const [mode, setMode] = useState("stock");
  const [inputId, setMedicineId] = useState(inventory[0]?.id || 1);
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
    if (!selected || quantity <= 0 || provider.trim() === "" || invoice.trim() === "") {
      setMessage("Completa insumo, cantidad, proveedor y folio/factura.");
      return;
    }
    setInventory((prev: any[]) => prev.map((item) => item.id === selected.id ? { ...item, stock: item.stock + quantity, alert: item.stock + quantity <= 10 ? item.alert : "Normal" } : item));
    setMovements((prev: any[]) => [{ id: Date.now(), folio: `ENT-${Date.now().toString().slice(-6)}`, date: "Ahora", expiresAt: "", status: `Entrada de proveedor: +${quantity}`, inputId: selected.id, input: selected.input, plot: "", crop: "Entrada de almacén", user: "Almacén", responsible: `Proveedor: ${provider} · Folio: ${invoice}`, lot: selected.lot, quantity, remaining: selected.stock + quantity }, ...prev]);
    setMessage(`Entrada registrada: +${quantity} unidades de ${selected.input}. Stock actualizado.`);
  };

  const registerNewMedicine = () => {
    if (newMedicine.trim() === "" || newActiveIngredient.trim() === "" || newTherapeuticGroup.trim() === "" || newLot.trim() === "" || newLocation.trim() === "" || provider.trim() === "" || invoice.trim() === "" || newStock <= 0) {
      setMessage("Completa todos los campos del insumo nuevo, incluyendo componente y categoría agronómica.");
      return;
    }
    const newId = Math.max(...inventory.map((item: any) => item.id), 0) + 1;
    const item = { id: newId, input: newMedicine, component: newActiveIngredient, category: newTherapeuticGroup, lot: newLot, stock: newStock, reserved: 0, location: newLocation, expiry: newExpiry, alert: newStock <= 10 ? "Stock bajo" : "Normal" };
    setInventory((prev: any[]) => [...prev, item]);
    setMovements((prev: any[]) => [{ id: Date.now(), folio: `NEW-${Date.now().toString().slice(-6)}`, date: "Ahora", expiresAt: "", status: `Insumo nuevo: +${newStock}`, inputId: newId, input: newMedicine, plot: "", crop: "Alta de insumo en almacén", user: "Almacén", responsible: `Proveedor: ${provider} · Folio: ${invoice}`, lot: newLot, quantity: newStock, remaining: newStock }, ...prev]);
    setMessage(`Insumo nuevo registrado: ${newMedicine}, lote ${newLot}, stock inicial ${newStock}.`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="mb-5 rounded-3xl border-0 bg-emerald-950 text-white text-white shadow-sm"><CardContent className="p-6"><h3 className="text-2xl font-bold text-white">Almacén</h3><p className="mt-2 text-emerald-100/80">Registra entradas de proveedor, aumenta stock existente o da de alta nuevos insumos.</p><div className="mt-5 flex flex-wrap gap-3"><Button onClick={() => setMode("stock")} className={`rounded-2xl px-5 py-6 ${mode === "stock" ? "bg-white text-emerald-950 hover:bg-emerald-100" : "bg-white/10 text-white hover:bg-white/20"}`}>Agregar stock existente</Button><Button onClick={() => setMode("new")} className={`rounded-2xl px-5 py-6 ${mode === "new" ? "bg-white text-emerald-950 hover:bg-emerald-100" : "bg-white/10 text-white hover:bg-white/20"}`}>Registrar insumo nuevo</Button></div></CardContent></Card>
      {mode === "stock" ? <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-6"><h3 className="text-xl font-bold mb-1">Entrada de proveedor</h3><p className="mb-6 text-sm text-emerald-700/70">Suma unidades a un insumo existente y deja trazabilidad del proveedor.</p><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><Field label="Insumo existente"><Select value={inputId} onChange={(e) => setMedicineId(Number(e.target.value))}>{inventory.map((item: any) => <option key={item.id} value={item.id}>{item.input} · {item.component} · Lote {item.lot} · Stock {item.stock}</option>)}</Select></Field><Field label="Cantidad recibida"><Input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} /></Field><Field label="Proveedor"><Input value={provider} onChange={(e) => setProvider(e.target.value)} /></Field><Field label="Folio / factura"><Input value={invoice} onChange={(e) => setInvoice(e.target.value)} /></Field></div><div className="mt-6"><Button onClick={registerProviderEntry} className="rounded-2xl bg-emerald-950 text-white px-6 py-6 hover:bg-emerald-900">Registrar entrada de proveedor</Button></div>{message && <div className="mt-5 rounded-2xl bg-emerald-100 p-4 font-medium text-emerald-800">{message}</div>}</CardContent></Card> : <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-6"><h3 className="text-xl font-bold mb-1">Registrar insumo nuevo</h3><p className="mb-6 text-sm text-emerald-700/70">Alta inicial de insumo, lote, ubicación, caducidad, proveedor y folio.</p><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><Field label="Nombre del insumo"><Input value={newMedicine} onChange={(e) => setNewMedicine(e.target.value)} /></Field><Field label="Componente / objetivo"><Input value={newActiveIngredient} onChange={(e) => setNewActiveIngredient(e.target.value)} /></Field><Field label="Categoría agronómica"><Input value={newTherapeuticGroup} onChange={(e) => setNewTherapeuticGroup(e.target.value)} /></Field><Field label="Stock inicial"><Input type="number" min="1" value={newStock} onChange={(e) => setNewStock(Number(e.target.value))} /></Field><Field label="Lote"><Input value={newLot} onChange={(e) => setNewLot(e.target.value)} /></Field><Field label="Ubicación"><Input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} /></Field><Field label="Caducidad"><Input type="date" value={newExpiry} onChange={(e) => setNewExpiry(e.target.value)} /></Field><Field label="Proveedor"><Input value={provider} onChange={(e) => setProvider(e.target.value)} /></Field><Field label="Folio / factura"><Input value={invoice} onChange={(e) => setInvoice(e.target.value)} /></Field></div><div className="mt-6"><Button onClick={registerNewMedicine} className="rounded-2xl bg-emerald-950 text-white px-6 py-6 hover:bg-emerald-900">Guardar insumo nuevo</Button></div>{message && <div className="mt-5 rounded-2xl bg-emerald-100 p-4 font-medium text-emerald-800">{message}</div>}</CardContent></Card>}
    </motion.div>
  );
}

function Pharmacy({ movements, setMovements, setInventory }: any) {
  const confirmPickup = (movement: any) => {
    if (movement.status !== "Reservado") return;
    setInventory((prev: any[]) => prev.map((m) => m.id === movement.inputId ? { ...m, stock: m.stock - movement.quantity, reserved: Math.max(m.reserved - movement.quantity, 0), alert: m.stock - movement.quantity <= 10 ? "Stock bajo" : m.alert } : m));
    setMovements((prev: any[]) => prev.map((m) => m.id === movement.id ? { ...m, status: "Entregado", responsible: "Bodega confirmó recolección", remaining: Math.max(m.remaining - m.quantity, 0) } : m));
  };

  const releaseReservation = (movement: any) => {
    if (movement.status !== "Reservado") return;
    setInventory((prev: any[]) => prev.map((m) => m.id === movement.inputId ? { ...m, reserved: Math.max(m.reserved - movement.quantity, 0) } : m));
    setMovements((prev: any[]) => prev.map((m) => m.id === movement.id ? { ...m, status: "Vencido", responsible: "Reserva liberada: lote no recolectó en 24 horas" } : m));
  };

  const simulate24Hours = () => {
    movements.filter((m: any) => m.status === "Reservado").forEach((m: any) => releaseReservation(m));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-3xl border-0 shadow-sm overflow-hidden"><CardContent className="p-6"><div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"><div><h3 className="text-xl font-bold">Bodega · Confirmación de aplicación</h3><p className="mt-1 text-sm text-emerald-700/70">La orden reserva inventario por 24 horas. Solo se descuenta cuando bodega confirma entrega.</p></div><Button onClick={simulate24Hours} className="rounded-2xl bg-emerald-950 text-white hover:bg-emerald-900 px-5 py-6">Liberar reservas vencidas</Button></div>
        <div className="mt-5 space-y-4">{movements.map((m: any) => <div key={m.id} className="rounded-3xl border bg-white p-5"><div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center"><div className="lg:col-span-2"><p className="font-bold">{m.input}</p><p className="text-xs font-semibold text-emerald-700/50">Folio: {m.folio || "AG-DEMO-001"}</p><p className="text-sm text-emerald-700/70">Lote: {m.plot || "Movimiento de almacén"} · Lote {m.lot}</p><p className="text-sm text-emerald-700/70">Cultivo / incidencia: {m.crop || "No registrado"}</p></div><div><p className="text-sm text-emerald-700/70">Cantidad</p><p className="font-semibold">{m.quantity}</p></div><div><p className="text-sm text-emerald-700/70">Estado</p><StatusBadge status={m.status} /><p className="text-xs text-emerald-700/70 mt-1">Vence: {m.expiresAt || "No aplica"}</p></div><div className="flex flex-col gap-2"><Button onClick={() => confirmPickup(m)} disabled={m.status !== "Reservado"} className="rounded-2xl bg-emerald-950 text-white hover:bg-emerald-900">Confirmar aplicación</Button><Button onClick={() => releaseReservation(m)} disabled={m.status !== "Reservado"} className="rounded-2xl bg-white text-emerald-950 border hover:bg-emerald-100">Liberar reserva</Button></div></div></div>)}</div>
      </CardContent></Card>
    </motion.div>
  );
}

function Traceability({ movements }: any) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-6"><h3 className="text-xl font-bold mb-5">Timeline de trazabilidad</h3><div className="space-y-4">{movements.map((m: any) => <div key={m.id} className="rounded-3xl border bg-white p-5"><div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"><div><p className="text-sm text-emerald-700/70 flex items-center gap-2"><CalendarClock size={15}/> {m.date}</p><h4 className="text-lg font-bold mt-1">{m.input}</h4><p className="text-xs font-semibold text-emerald-700/50">Folio: {m.folio || "AG-DEMO-001"}</p><p className="text-sm text-emerald-700/70">Lote {m.lot} · Cantidad: {m.quantity}</p><p className="text-sm text-emerald-700/70">Cultivo / incidencia: {m.crop || "No registrado"}</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm"><div className="rounded-2xl bg-emerald-50 p-3"><b>Lote</b><br/>{m.plot || "Almacén"}</div><div className="rounded-2xl bg-emerald-50 p-3"><b>Responsable</b><br/>{m.user}</div><div className="rounded-2xl bg-emerald-50 p-3"><b>Estado</b><br/><StatusBadge status={m.status} /></div></div></div></div>)}</div></CardContent></Card></motion.div>;
}

function AIChat({ inventory, movements, user }: any) {
  const [question, setQuestion] = useState("¿Qué alternativa hay para Confidor?");
  const [answer, setAnswer] = useState("Haz una consulta para analizar inventario, alternativas agronómicas, bodega y trazabilidad.");

  const ask = () => {
    const q = question.toLowerCase();

    if (q.includes("alternativa") || q.includes("sustituto") || q.includes("genérico") || q.includes("generico")) {
      const requestedMedicine = inventory.find((item: any) =>
        q.includes(item.input.toLowerCase().split(" ")[0]) ||
        q.includes(item.component?.toLowerCase())
      );

      if (!requestedMedicine) {
        setAnswer("Biofex no encontró el insumo solicitado. Puedes consultar por nombre comercial o componente, por ejemplo: Imidacloprid, Mancozeb o Fósforo.");
        return;
      }

      const alternatives = findTherapeuticAlternatives(inventory, requestedMedicine, 1);

      if (alternatives.length === 0) {
        setAnswer(`No encontré alternativas disponibles con el mismo componente para ${requestedMedicine.input}. Se recomienda escalar a bodega/compras.`);
        return;
      }

      setAnswer(
        `Insumo consultado: ${requestedMedicine.input}. Componente / objetivo: ${requestedMedicine.component}. ` +
        `Alternativas disponibles para validación agronómica: ` +
        alternatives.map((alt: any) => `${alt.input} con ${getAvailableUnits(alt)} unidades disponibles, lote ${alt.lot}`).join("; ") +
        ". Nota: Biofex sugiere opciones operativas, la decisión final debe validarla personal agrónomo o bodega."
      );
    }
    else if (q.includes("agotarse") || q.includes("stock")) {
      setAnswer(
        inventory
          .filter((m: any) => getAvailableUnits(m) <= 12)
          .map((m: any) => `${m.input}, componente ${m.component}, lote ${m.lot}, disponible ${getAvailableUnits(m)} unidades.`)
          .join(" ") || "No hay insumos críticos."
      );
    }
    else if (q.includes("lote") || q.includes("crx")) {
      setAnswer(
        movements
          .filter((m: any) => m.lot.toLowerCase().includes("crx"))
          .map((m: any) => `${m.lot}: ${m.status}, lote ${m.plot || "Almacén"}, cultivo/incidencia ${m.crop}, responsable ${m.user}.`)
          .join(" ") || "No encontré ese lote."
      );
    }
    else if (q.includes("bodega")) {
      setAnswer(`Bodega tiene ${movements.filter((m: any) => m.status === "Reservado").length} órdenes pendientes de recolección.`);
    }
    else {
      setAnswer(`Copiloto IA: ${user.name}, puedo ayudarte a consultar órdenes, lotes, bodega, almacén, inventario y alternativas por componente u objetivo agronómico.`);
    }
  };

  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><Card className="rounded-3xl border-0 shadow-sm bg-emerald-950 text-white text-white"><CardContent className="p-6 md:p-8"><div className="flex items-center gap-3 mb-5"><div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center"><Bot/></div><div><h3 className="text-2xl font-bold text-white">Agente Biofex</h3><p className="text-emerald-100/80 text-sm">Consulta trazabilidad, riesgos, existencias y alternativas por componente.</p></div></div><div className="flex flex-col md:flex-row gap-3"><input value={question} onChange={(e) => setQuestion(e.target.value)} className="flex-1 rounded-2xl bg-white px-4 py-4 text-emerald-950 outline-none"/><Button onClick={ask} className="rounded-2xl bg-white text-emerald-950 hover:bg-emerald-100 py-6 px-6">Consultar agente</Button></div><div className="mt-6 rounded-3xl bg-white/10 p-6 leading-relaxed text-slate-100">{answer}</div><div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">{["¿Qué alternativa hay para Confidor?", "¿Qué insumos están por agotarse?", "¿Dónde quedó el lote CAG-2026?", "Resumen de bodega"].map((q) => <button key={q} onClick={() => setQuestion(q)} className="rounded-2xl bg-white/10 p-3 text-left hover:bg-white/20 transition text-white">{q}</button>)}</div></CardContent></Card></motion.div>;
}
function TelegramReports() {
  const [reports, setReports] = useState<any[]>([]);

  const loadReports = async () => {
    try {
      const res = await ffetch(`${window.location.origin}/api/telegram/webhook`);
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
      {/* aquí deja igual todo tu diseño actual */}
    </motion.div>
  );
}
export default function App() {
  const [user, setUser] = useState<any>(null);
  const [active, setActive] = useState("dashboard");
  const [inventory, setInventory] = useState(initialInventory);
  const [movements, setMovements] = useState(initialMovements);

  if (!user) return <Login onLogin={setUser} />;

  const logout = () => {
    setUser(null);
    setActive("dashboard");
  };

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
    <div className="min-h-screen bg-emerald-50 text-emerald-950 flex">
      <Sidebar active={active} setActive={setActive} user={user} />
      <main className="flex-1 p-4 md:p-8 overflow-hidden">
        <div className="md:hidden mb-4 flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 font-black"><LogoImage className="h-9 w-9" /> Biofex</div>
          <a
            href={WORKER_PORTAL_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-lime-300 px-4 py-3 text-sm font-black text-emerald-950 shadow-md"
          >
            👷 Trabajadores
          </a>
        </div>

        <Header
          user={user}
          logout={logout}
          setActive={setActive}
          active={active}
        />

        {views[active]}
      </main>
    </div>
  );
}