"use client";

import React, { useState } from "react";
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
  Hospital,
  LayoutDashboard,
  LockKeyhole,
  PackageCheck,
  Pill,
  Search,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const INSTITUTIONAL_PIN = "HGP2026";

const areaAccess = [
  {
    area: "Administración",
    pin: "ADM2026",
    roles: ["Administrador"],
  },
  {
    area: "Área médica",
    pin: "MED2026",
    roles: ["Médico", "Urgencias", "Pediatría", "Cirujano"],
  },
  {
    area: "Farmacia y almacén",
    pin: "FAR2026",
    roles: ["Farmacia"],
  },
];

const doctors = [
  {
    name: "Admin General",
    license: "ADM-0001",
    specialty: "Administración hospitalaria",
    hospital: "Hospital General Público",
    pin: "0000",
    role: "Administrador",
  },
  {
    name: "Dra. Valeria Vargas",
    license: "CED-8291736",
    specialty: "Medicina interna",
    hospital: "Hospital General Público",
    pin: "1234",
    role: "Médico",
  },
  {
    name: "Dr. Alejandro Ramírez",
    license: "CED-5529182",
    specialty: "Urgencias",
    hospital: "Hospital General Público",
    pin: "2222",
    role: "Urgencias",
  },
  {
    name: "Dra. Fernanda López",
    license: "CED-7712450",
    specialty: "Pediatría",
    hospital: "Hospital General Público",
    pin: "3333",
    role: "Pediatría",
  },
  {
    name: "Dr. Ricardo Torres",
    license: "CED-6621980",
    specialty: "Cirugía general",
    hospital: "Hospital General Público",
    pin: "4444",
    role: "Cirujano",
  },
  {
    name: "Dra. Mariana Castillo",
    license: "CED-9044112",
    specialty: "Farmacología clínica",
    hospital: "Hospital General Público",
    pin: "5555",
    role: "Farmacia",
  },
];

const patients = [
  { id: 1, name: "Juan Pérez", diagnosis: "Infección respiratoria", status: "Activo" },
  { id: 2, name: "María López", diagnosis: "Diabetes tipo 2", status: "Controlado" },
  { id: 3, name: "Carlos Méndez", diagnosis: "Dolor postoperatorio", status: "Observación" },
  { id: 4, name: "Ana Rodríguez", diagnosis: "Hipertensión arterial", status: "Activo" },
  { id: 5, name: "Luis Herrera", diagnosis: "Crisis asmática", status: "Urgente" },
  { id: 6, name: "Sofía Martínez", diagnosis: "Gastritis", status: "Controlado" },
  { id: 7, name: "Pedro Castillo", diagnosis: "Faringitis bacteriana", status: "Activo" },
];

const initialInventory = [
  { id: 1, medicine: "Ceftriaxona 1g", activeIngredient: "Ceftriaxona", therapeuticGroup: "Antibiótico", lot: "CRX-2026-22", stock: 12, reserved: 0, location: "Farmacia central", expiry: "2026-08-18", alert: "Stock bajo" },
  { id: 2, medicine: "Metformina 850mg", activeIngredient: "Metformina", therapeuticGroup: "Antidiabético", lot: "MTF-9021", stock: 86, reserved: 0, location: "Almacén A", expiry: "2027-01-10", alert: "Normal" },
  { id: 3, medicine: "Ketorolaco 30mg", activeIngredient: "Ketorolaco", therapeuticGroup: "Analgésico", lot: "KTR-7780", stock: 7, reserved: 0, location: "Urgencias", expiry: "2026-06-03", alert: "Caducidad próxima" },
  { id: 4, medicine: "Paracetamol 500mg", activeIngredient: "Paracetamol", therapeuticGroup: "Analgésico / Antipirético", lot: "PCM-4451", stock: 0, reserved: 0, location: "Farmacia central", expiry: "2027-03-12", alert: "Sin abasto" },
  { id: 5, medicine: "Ibuprofeno 400mg", activeIngredient: "Ibuprofeno", therapeuticGroup: "Antiinflamatorio", lot: "IBF-2290", stock: 33, reserved: 0, location: "Farmacia norte", expiry: "2027-06-11", alert: "Normal" },
  { id: 6, medicine: "Amoxicilina 500mg", activeIngredient: "Amoxicilina", therapeuticGroup: "Antibiótico", lot: "AMX-8811", stock: 19, reserved: 0, location: "Almacén B", expiry: "2026-11-05", alert: "Normal" },
  { id: 7, medicine: "Omeprazol 20mg", activeIngredient: "Omeprazol", therapeuticGroup: "Gastroprotector", lot: "OMP-7411", stock: 51, reserved: 0, location: "Farmacia central", expiry: "2027-09-18", alert: "Normal" },
  { id: 8, medicine: "Losartán 50mg", activeIngredient: "Losartán", therapeuticGroup: "Antihipertensivo", lot: "LST-6630", stock: 28, reserved: 0, location: "Cardiología", expiry: "2027-02-20", alert: "Normal" },
  { id: 9, medicine: "Salbutamol inhalador", activeIngredient: "Salbutamol", therapeuticGroup: "Broncodilatador", lot: "SLB-1102", stock: 14, reserved: 0, location: "Urgencias", expiry: "2026-10-14", alert: "Stock bajo" },
  { id: 10, medicine: "Insulina NPH", activeIngredient: "Insulina NPH", therapeuticGroup: "Antidiabético", lot: "INS-5540", stock: 9, reserved: 0, location: "Refrigeración", expiry: "2026-07-28", alert: "Stock crítico" },
  { id: 11, medicine: "Acetaminofén 500mg", activeIngredient: "Paracetamol", therapeuticGroup: "Analgésico / Antipirético", lot: "ACM-2026-02", stock: 35, reserved: 0, location: "Farmacia central", expiry: "2027-05-22", alert: "Alternativa disponible" },
  { id: 12, medicine: "Ceftriaxona sódica 1g genérica", activeIngredient: "Ceftriaxona", therapeuticGroup: "Antibiótico", lot: "CRX-GEN-09", stock: 28, reserved: 0, location: "Almacén B", expiry: "2027-01-30", alert: "Alternativa disponible" },
  { id: 13, medicine: "Ketorolaco trometamina 30mg genérico", activeIngredient: "Ketorolaco", therapeuticGroup: "Analgésico", lot: "KTR-GEN-15", stock: 21, reserved: 0, location: "Farmacia central", expiry: "2027-02-18", alert: "Alternativa disponible" },
];

const initialMovements = [
  { id: 1001, folio: "RX-2026-1001", date: "Hoy 11:42", expiresAt: "Mañana 11:42", status: "Reservado", medicineId: 1, medicine: "Ceftriaxona 1g", patient: "Juan Pérez", diagnosis: "Infección respiratoria", doctor: "Dr. Alejandro Ramírez", responsible: "Pendiente de recolección", lot: "CRX-2026-22", quantity: 1, remaining: 12 },
  { id: 1002, folio: "RX-2026-1002", date: "Hoy 09:15", expiresAt: "Mañana 09:15", status: "Entregado", medicineId: 3, medicine: "Ketorolaco 30mg", patient: "Carlos Méndez", diagnosis: "Dolor postoperatorio", doctor: "Dra. Fernanda López", responsible: "Farmacia confirmó entrega", lot: "KTR-7780", quantity: 1, remaining: 6 },
  { id: 1003, folio: "RX-2026-1003", date: "Ayer 18:30", expiresAt: "Hoy 18:30", status: "Vencido", medicineId: 9, medicine: "Salbutamol inhalador", patient: "Luis Herrera", diagnosis: "Crisis asmática", doctor: "Dr. Ricardo Torres", responsible: "Reserva liberada por no recolectar", lot: "SLB-1102", quantity: 1, remaining: 14 },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border bg-white px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-900"
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full rounded-2xl border bg-white px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-900"
    >
      {props.children}
    </select>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "Entregado"
      ? "bg-green-100 text-green-700"
      : status === "Vencido" || status.includes("Liberado")
      ? "bg-red-100 text-red-700"
      : status === "Reservado"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-slate-100 text-slate-700";

  return <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${style}`}>{status}</span>;
}

function getAvailableUnits(item: any) {
  return item ? item.stock - item.reserved : 0;
}

function findTherapeuticAlternatives(inventory: any[], medicine: any, requiredQuantity = 1) {
  if (!medicine) return [];

  return inventory.filter((item: any) => {
    const sameActiveIngredient =
      item.activeIngredient &&
      medicine.activeIngredient &&
      item.activeIngredient.toLowerCase() === medicine.activeIngredient.toLowerCase();

    const isDifferentProduct = item.id !== medicine.id;
    const hasAvailability = getAvailableUnits(item) >= requiredQuantity;

    return sameActiveIngredient && isDifferentProduct && hasAvailability;
  });
}

function AlternativeAgentCard({
  medicine,
  alternatives,
  onSelectAlternative,
}: any) {
  if (!medicine || alternatives.length === 0) return null;

  return (
    <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50 p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-white p-3 text-amber-700">
          <Bot size={22} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-slate-900">
            Agente Biofex: alternativa disponible
          </h4>
          <p className="mt-1 text-sm text-slate-600">
            El medicamento seleccionado tiene baja disponibilidad o no cubre la cantidad solicitada.
            Biofex encontró opciones con el mismo principio activo. La decisión final debe ser validada por el médico o farmacia.
          </p>

          <div className="mt-4 space-y-3">
            {alternatives.map((alt: any) => (
              <div key={alt.id} className="rounded-2xl bg-white p-4 border">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{alt.medicine}</p>
                    <p className="text-sm text-slate-500">
                      Principio activo: {alt.activeIngredient} · Disponible: {getAvailableUnits(alt)} · Lote {alt.lot}
                    </p>
                  </div>
                  <Button
                    onClick={() => onSelectAlternative(alt.id)}
                    className="rounded-2xl bg-slate-900 text-white hover:bg-slate-800"
                  >
                    Usar alternativa
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-amber-700">
            Nota: esta es una recomendación operativa basada en inventario y principio activo; no sustituye criterio clínico.
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

  const allowedDoctors = doctors.filter((doctor) =>
    selectedArea.roles.includes(doctor.role)
  );

  const selectedDoctor =
    allowedDoctors.find((doctor) => doctor.license === selectedLicense) ||
    allowedDoctors[0];

  const goToPersonalLogin = () => {
    setSelectedLicense(allowedDoctors[0]?.license || "");
    setPin("");
    setError("");
    setStep("personal");
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white flex items-center justify-center">
      <Card className="w-full max-w-5xl overflow-hidden rounded-[2rem] border-0 shadow-2xl">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 p-0">
          <div className="bg-slate-900 text-white p-8 md:p-12 text-white">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-900">
                <Pill />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white">
                  Biofex
                </h1>

                <p className="text-sm text-slate-300">
                  Infraestructura de trazabilidad inteligente
                </p>
              </div>
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-white">
              Infraestructura de trazabilidad inteligente 
            </h2>

            <p className="mt-5 text-slate-300 leading-relaxed">
              Acceso, validación por área, PIN personal,
              receta digital, farmacia, almacén, inventario y trazabilidad.
            </p>

            <div className="mt-8 grid gap-3 text-sm">
              <div className="rounded-2xl bg-white/10 p-4 text-white">
                1. NIP institucional general
              </div>

              <div className="rounded-2xl bg-white/10 p-4 text-white">
                2. NIP por área hospitalaria
              </div>

              <div className="rounded-2xl bg-white/10 p-4 text-white">
                3. Login personal por cédula y PIN
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 text-slate-900">
            {step === "institution" && (
              <>
                <div className="mb-7 flex items-center gap-3">
                  <ShieldCheck className="text-slate-500" />

                  <div>
                    <h3 className="text-2xl font-bold">
                      Acceso
                    </h3>

                    <p className="text-sm text-slate-500">
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
                    className="w-full rounded-2xl bg-slate-900 text-white py-6 text-base hover:bg-slate-800"
                  >
                    Validar acceso institucional
                  </Button>

                  <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
                    Demo: <b>{INSTITUTIONAL_PIN}</b>
                  </div>
                </div>
              </>
            )}

            {step === "area" && (
              <>
                <div className="mb-7 flex items-center gap-3">
                  <Hospital className="text-slate-500" />

                  <div>
                    <h3 className="text-2xl font-bold">
                      Acceso por área
                    </h3>

                    <p className="text-sm text-slate-500">
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
                    className="w-full rounded-2xl bg-slate-900 text-white py-6 text-base hover:bg-slate-800"
                  >
                    Continuar a login personal
                  </Button>

                  <Button
                    onClick={() => {
                      setStep("institution");
                      setAreaPin("");
                      setError("");
                    }}
                    className="w-full rounded-2xl bg-white py-6 text-base text-slate-900 hover:bg-slate-100 border"
                  >
                    ← Regresar al NIP institucional
                  </Button>

                  <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
                    Demo {selectedArea.area}: <b>{selectedArea.pin}</b>
                  </div>
                </div>
              </>
            )}

            {step === "personal" && (
              <>
                <div className="mb-7 flex items-center gap-3">
                  <LockKeyhole className="text-slate-500" />

                  <div>
                    <h3 className="text-2xl font-bold">
                      Inicio de sesión personal
                    </h3>

                    <p className="text-sm text-slate-500">
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
                      {allowedDoctors.map((doctor) => (
                        <option
                          key={doctor.license}
                          value={doctor.license}
                        >
                          {doctor.name} · {doctor.specialty}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field label="Cédula profesional / ID">
                    <Input
                      value={selectedDoctor?.license || ""}
                      readOnly
                    />
                  </Field>

                  <Field label="Especialidad">
                    <Input
                      value={selectedDoctor?.specialty || ""}
                      readOnly
                    />
                  </Field>

                  <Field label="Institución">
                    <Input
                      value={selectedDoctor?.hospital || ""}
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
                      if (!selectedDoctor || pin !== selectedDoctor.pin) {
                        setError("PIN personal incorrecto");
                        return;
                      }

                      setError("");
                      onLogin(selectedDoctor);
                    }}
                    className="w-full rounded-2xl bg-slate-900 text-white py-6 text-base hover:bg-slate-800"
                  >
                    Entrar al sistema
                  </Button>

                  <Button
                    onClick={() => {
                      setStep("area");
                      setPin("");
                      setError("");
                    }}
                    className="w-full rounded-2xl bg-white py-6 text-base text-slate-900 hover:bg-slate-100 border"
                  >
                    ← Regresar a selección de área
                  </Button>

                  <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
                    PIN demo: <b>{selectedDoctor?.pin}</b>
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

function Sidebar({ active, setActive, doctor }: any) {
  const items = [
    ["dashboard", LayoutDashboard, "Dashboard"],
    ["prescription", FileText, "Nueva receta"],
    ["patients", UserRound, "Pacientes"],
    ["inventory", Boxes, "Inventario"],
    ["warehouse", PackageCheck, "Almacén"],
    ["pharmacy", ClipboardList, "Farmacia"],
    ["trace", FileSearch, "Trazabilidad"],
    ["ai", Bot, "Copiloto IA"],
  ];

  return (
    <aside className="hidden md:flex w-72 min-h-screen flex-col border-r bg-white p-5">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-white"><Pill size={24} /></div>
        <div><h1 className="text-xl font-bold tracking-tight">TrazaMed AI</h1><p className="text-sm text-slate-500">MVP HealthTech</p></div>
      </div>
      <nav className="space-y-2">
        {items.map(([key, Icon, label]: any) => (
          <button key={key} onClick={() => setActive(key)} className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${active === key ? "bg-slate-900 text-white text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}>
            <Icon size={20} /><span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto rounded-3xl bg-slate-100 p-4">
        <div className="flex items-center gap-2 font-semibold text-slate-800"><ShieldCheck size={18} /> Usuario verificado</div>
        <p className="mt-2 text-sm text-slate-500">{doctor.name}<br />{doctor.license}<br />{doctor.specialty}</p>
      </div>
    </aside>
  );
}

function Header({
  doctor,
  logout,
  setActive,
  active,
}: any) {
  return (
    <header className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
            <Hospital size={16} />
            Sesión activa · {doctor.specialty}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Control inteligente de medicamentos
          </h2>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {active !== "dashboard" && (
            <Button
              onClick={() => setActive("dashboard")}
              className="rounded-2xl bg-slate-900 text-white text-white hover:bg-slate-800 px-5 py-6"
            >
              ← Inicio
            </Button>
          )}

          <div className="rounded-2xl bg-white px-5 py-3 shadow-sm border text-sm">
            <b>{doctor.name}</b>
            <br />
            <span className="text-slate-500">
              {doctor.license}
            </span>
          </div>

          <Button
            onClick={logout}
            className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100 border px-5 py-6"
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
      <div className="flex items-center justify-between"><div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center"><Icon size={23} /></div><Activity className="text-slate-300" size={18} /></div>
      <p className="mt-5 text-sm text-slate-500">{label}</p><h3 className="text-3xl font-bold text-slate-900">{value}</h3><p className="text-sm text-slate-500 mt-1">{sub}</p>
    </CardContent></Card>
  );
}

function Dashboard({ setActive, inventory, movements }: any) {
  const alerts = inventory.filter((i: any) => i.stock - i.reserved <= 12 || i.alert !== "Normal");
  const totalReserved = inventory.reduce((sum: number, item: any) => sum + item.reserved, 0);
  const totalStock = inventory.reduce((sum: number, item: any) => sum + item.stock, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="mb-6 rounded-3xl border-0 bg-slate-900 text-white text-white shadow-sm"><CardContent className="p-8">
        <p className="text-sm font-semibold text-slate-300">MVP para instituciones de salud</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">Trazabilidad inteligente de medicamentos</h1>
        <p className="mt-4 max-w-3xl text-slate-300">Controla cada medicamento desde receta médica hasta farmacia, almacén, lote, paciente, diagnóstico, responsable y existencia restante.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button onClick={() => setActive("prescription")} className="rounded-2xl bg-white text-slate-900 hover:bg-slate-200 px-6 py-6">Generar receta demo</Button>
          <Button onClick={() => setActive("warehouse")} className="rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/20 px-6 py-6">Registrar almacén</Button>
          <Button onClick={() => setActive("pharmacy")} className="rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/20 px-6 py-6">Ver farmacia</Button>
          <Button onClick={() => setActive("trace")} className="rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/20 px-6 py-6">Ver trazabilidad</Button>
          <Button onClick={() => setActive("ai")} className="rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/20 px-6 py-6">Consultar copiloto IA</Button>
        </div>
      </CardContent></Card>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Pill} label="Medicamentos activos" value={inventory.length} sub={`Stock total: ${totalStock}`} />
        <StatCard icon={FileText} label="Recetas / movimientos" value={movements.length} sub="con trazabilidad" />
        <StatCard icon={PackageCheck} label="Reservas activas" value={totalReserved} sub="congeladas 24h" />
        <StatCard icon={AlertTriangle} label="Alertas críticas" value={alerts.length} sub="stock/caducidad" />
      </div>
      <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-6"><h3 className="text-xl font-bold mb-4">Alertas operativas</h3>
        <div className="space-y-3">{alerts.map((item: any) => <div key={item.lot} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"><div><p className="font-semibold">{item.medicine}</p><p className="text-sm text-slate-500">Lote {item.lot} · {item.location}</p></div><span className="rounded-full bg-white px-3 py-1 text-sm font-medium border">Disponible: {item.stock - item.reserved}</span></div>)}</div>
      </CardContent></Card>
    </motion.div>
  );
}

function Prescription({ doctor, inventory, setInventory, setMovements, setActive }: any) {
  const [patientId, setPatientId] = useState(patients[0].id);
  const [medicineId, setMedicineId] = useState(inventory[0].id);
  const [quantity, setQuantity] = useState(1);
  const [diagnosis, setDiagnosis] = useState(patients[0].diagnosis);
  const [indications, setIndications] = useState("Administrar cada 12 horas por 5 días.");
  const [message, setMessage] = useState("");

  const patient = patients.find((p) => p.id === Number(patientId));
  const medicine = inventory.find((m: any) => m.id === Number(medicineId));
  const availableStock = medicine ? getAvailableUnits(medicine) : 0;
  const canCreate = medicine && quantity > 0 && availableStock >= quantity;
  const alternatives = findTherapeuticAlternatives(inventory, medicine, quantity);

  const createPrescription = () => {
    if (!canCreate) {
      if (alternatives.length > 0) {
        setMessage("No hay existencia suficiente del medicamento seleccionado. Biofex encontró alternativas con el mismo principio activo para validación médica.");
      } else {
        setMessage("No hay existencia suficiente disponible para reservar esta receta y no se encontraron alternativas con el mismo principio activo.");
      }
      return;
    }
    setInventory((prev: any[]) => prev.map((m) => m.id === medicine.id ? { ...m, reserved: m.reserved + quantity } : m));
    setMovements((prev: any[]) => [{
      id: Date.now(), folio: `RX-${Date.now().toString().slice(-6)}`, date: "Ahora", expiresAt: "24 horas desde emisión", status: "Reservado", medicineId: medicine.id,
      medicine: medicine.medicine, patient: patient?.name, diagnosis, doctor: doctor.name,
      responsible: "Pendiente de recolección en farmacia", lot: medicine.lot, quantity,
      remaining: medicine.stock, indications,
    }, ...prev]);
    setMessage(`Receta generada y reservada por 24 horas. Se apartaron ${quantity} unidad(es) de ${medicine.medicine}. El inventario físico aún NO se descuenta hasta que farmacia confirme recolección.`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 rounded-3xl border-0 shadow-sm"><CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-1">Generar receta digital</h3><p className="text-slate-500 mb-6">La receta reserva inventario por 24 horas. Solo farmacia descuenta stock al confirmar recolección.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Paciente"><Select value={patientId} onChange={(e) => { const id = Number(e.target.value); setPatientId(id); const selected = patients.find((p) => p.id === id); setDiagnosis(selected?.diagnosis || ""); }}>{patients.map((p) => <option key={p.id} value={p.id}>{p.name} · {p.diagnosis}</option>)}</Select></Field>
            <Field label="Medicamento"><Select value={medicineId} onChange={(e) => setMedicineId(Number(e.target.value))}>{inventory.map((m: any) => <option key={m.id} value={m.id}>{m.medicine} · {m.activeIngredient} · Disponible {getAvailableUnits(m)}</option>)}</Select></Field>
            <Field label="Cantidad"><Input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} /></Field>
            <Field label="Doctor que receta"><Input value={`${doctor.name} · ${doctor.license}`} readOnly /></Field>
            <Field label="Diagnóstico / motivo de receta"><Input value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} /></Field>
            <Field label="Disponibilidad real"><Input value={`Stock: ${medicine?.stock || 0} · Reservado: ${medicine?.reserved || 0} · Disponible: ${availableStock}`} readOnly /></Field>
            <Field label="Principio activo"><Input value={medicine?.activeIngredient || ""} readOnly /></Field>
          </div>
          <div className="mt-4"><Field label="Indicaciones"><Input value={indications} onChange={(e) => setIndications(e.target.value)} /></Field></div>
          <AlternativeAgentCard
            medicine={medicine}
            alternatives={alternatives}
            onSelectAlternative={(alternativeId: number) => {
              setMedicineId(alternativeId);
              setMessage("Alternativa seleccionada. Verifica indicaciones y confirma la receta si corresponde.");
            }}
          />
          <div className="mt-6 flex flex-wrap gap-3"><Button onClick={createPrescription} className="rounded-2xl bg-slate-900 text-white px-6 py-6 hover:bg-slate-800">Generar receta y reservar 24h</Button><Button onClick={() => setActive("pharmacy")} className="rounded-2xl bg-white text-slate-900 border px-6 py-6 hover:bg-slate-100">Ver farmacia</Button></div>
          {message && <div className="mt-5 rounded-2xl bg-slate-100 p-4 font-medium text-slate-700">{message}</div>}
        </CardContent></Card>
        <Card className="rounded-3xl border-0 bg-slate-900 text-white text-white shadow-sm"><CardContent className="p-6"><FileText size={34}/><h3 className="mt-4 text-xl font-bold text-white">Vista previa</h3><div className="mt-5 space-y-3 text-sm text-slate-300"><p><b className="text-white">Paciente:</b> {patient?.name}</p><p><b className="text-white">Medicamento:</b> {medicine?.medicine}</p><p><b className="text-white">Principio activo:</b> {medicine?.activeIngredient}</p><p><b className="text-white">Lote:</b> {medicine?.lot}</p><p><b className="text-white">Stock físico:</b> {medicine?.stock}</p><p><b className="text-white">Reservado:</b> {medicine?.reserved}</p><p><b className="text-white">Disponible:</b> {availableStock}</p><p><b className="text-white">Diagnóstico:</b> {diagnosis}</p><p><b className="text-white">Resultado:</b> {canCreate ? "Disponible para reservar" : "Sin existencia suficiente"}</p></div></CardContent></Card>
      </div>
    </motion.div>
  );
}

function Patients() {
  return <DataTable title="Pacientes con medicación activa" data={patients} columns={["name", "diagnosis", "status"]} />;
}

function DataTable({ title, data, columns }: any) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><Card className="rounded-3xl border-0 shadow-sm overflow-hidden"><CardContent className="p-0"><div className="p-6 flex items-center justify-between"><h3 className="text-xl font-bold">{title}</h3><div className="hidden md:flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-slate-500"><Search size={17}/> Buscar</div></div><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 text-slate-500"><tr>{columns.map((c: string) => <th key={c} className="px-6 py-4 text-left capitalize">{c}</th>)}</tr></thead><tbody>{data.map((row: any, i: number) => <tr key={i} className="border-t">{columns.map((c: string) => <td key={c} className="px-6 py-4 font-medium text-slate-700">{String(row[c] ?? "")}</td>)}</tr>)}</tbody></table></div></CardContent></Card></motion.div>;
}

function Inventory({ inventory }: any) {
  const [search, setSearch] = useState("");

  const filteredInventory = inventory
    .map((m: any) => ({ ...m, available: m.stock - m.reserved }))
    .filter((item: any) => {
      const query = search.toLowerCase();
      return (
        item.medicine.toLowerCase().includes(query) ||
        item.activeIngredient?.toLowerCase().includes(query) ||
        item.therapeuticGroup?.toLowerCase().includes(query) ||
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
              <h3 className="text-xl font-bold">Inventario farmacéutico</h3>
              <p className="text-sm text-slate-500">
                Busca por medicamento, principio activo, lote, ubicación o estado de alerta.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-slate-500 w-full md:w-96">
              <Search size={17} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar medicamento..."
                className="w-full bg-transparent outline-none text-sm text-slate-700"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-4 text-left">Medicamento</th>
                  <th className="px-6 py-4 text-left">Principio activo</th>
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
                    <td className="px-6 py-4 font-medium text-slate-700">{item.medicine}</td>
                    <td className="px-6 py-4 text-slate-700">{item.activeIngredient}</td>
                    <td className="px-6 py-4 text-slate-700">{item.therapeuticGroup}</td>
                    <td className="px-6 py-4 text-slate-700">{item.lot}</td>
                    <td className="px-6 py-4 text-slate-700">{item.stock}</td>
                    <td className="px-6 py-4 text-slate-700">{item.reserved}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{item.available}</td>
                    <td className="px-6 py-4 text-slate-700">{item.location}</td>
                    <td className="px-6 py-4 text-slate-700">{item.expiry}</td>
                    <td className="px-6 py-4 text-slate-700">{item.alert}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredInventory.length === 0 && (
            <div className="p-6 text-center text-sm text-slate-500">
              No se encontraron medicamentos con esa búsqueda.
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Warehouse({ inventory, setInventory, setMovements }: any) {
  const [mode, setMode] = useState("stock");
  const [medicineId, setMedicineId] = useState(inventory[0]?.id || 1);
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

  const selected = inventory.find((item: any) => item.id === Number(medicineId));

  const registerProviderEntry = () => {
    if (!selected || quantity <= 0 || provider.trim() === "" || invoice.trim() === "") {
      setMessage("Completa medicamento, cantidad, proveedor y folio/factura.");
      return;
    }
    setInventory((prev: any[]) => prev.map((item) => item.id === selected.id ? { ...item, stock: item.stock + quantity, alert: item.stock + quantity <= 10 ? item.alert : "Normal" } : item));
    setMovements((prev: any[]) => [{ id: Date.now(), folio: `ENT-${Date.now().toString().slice(-6)}`, date: "Ahora", expiresAt: "", status: `Entrada de proveedor: +${quantity}`, medicineId: selected.id, medicine: selected.medicine, patient: "", diagnosis: "Entrada de almacén", doctor: "Almacén", responsible: `Proveedor: ${provider} · Folio: ${invoice}`, lot: selected.lot, quantity, remaining: selected.stock + quantity }, ...prev]);
    setMessage(`Entrada registrada: +${quantity} unidades de ${selected.medicine}. Stock actualizado.`);
  };

  const registerNewMedicine = () => {
    if (newMedicine.trim() === "" || newActiveIngredient.trim() === "" || newTherapeuticGroup.trim() === "" || newLot.trim() === "" || newLocation.trim() === "" || provider.trim() === "" || invoice.trim() === "" || newStock <= 0) {
      setMessage("Completa todos los campos del medicamento nuevo, incluyendo principio activo y grupo terapéutico.");
      return;
    }
    const newId = Math.max(...inventory.map((item: any) => item.id), 0) + 1;
    const item = { id: newId, medicine: newMedicine, activeIngredient: newActiveIngredient, therapeuticGroup: newTherapeuticGroup, lot: newLot, stock: newStock, reserved: 0, location: newLocation, expiry: newExpiry, alert: newStock <= 10 ? "Stock bajo" : "Normal" };
    setInventory((prev: any[]) => [...prev, item]);
    setMovements((prev: any[]) => [{ id: Date.now(), folio: `NEW-${Date.now().toString().slice(-6)}`, date: "Ahora", expiresAt: "", status: `Medicamento nuevo: +${newStock}`, medicineId: newId, medicine: newMedicine, patient: "", diagnosis: "Alta de medicamento en almacén", doctor: "Almacén", responsible: `Proveedor: ${provider} · Folio: ${invoice}`, lot: newLot, quantity: newStock, remaining: newStock }, ...prev]);
    setMessage(`Medicamento nuevo registrado: ${newMedicine}, lote ${newLot}, stock inicial ${newStock}.`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="mb-5 rounded-3xl border-0 bg-slate-900 text-white text-white shadow-sm"><CardContent className="p-6"><h3 className="text-2xl font-bold text-white">Almacén</h3><p className="mt-2 text-slate-300">Registra entradas de proveedor, aumenta stock existente o da de alta nuevos medicamentos.</p><div className="mt-5 flex flex-wrap gap-3"><Button onClick={() => setMode("stock")} className={`rounded-2xl px-5 py-6 ${mode === "stock" ? "bg-white text-slate-900 hover:bg-slate-100" : "bg-white/10 text-white hover:bg-white/20"}`}>Agregar stock existente</Button><Button onClick={() => setMode("new")} className={`rounded-2xl px-5 py-6 ${mode === "new" ? "bg-white text-slate-900 hover:bg-slate-100" : "bg-white/10 text-white hover:bg-white/20"}`}>Registrar medicamento nuevo</Button></div></CardContent></Card>
      {mode === "stock" ? <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-6"><h3 className="text-xl font-bold mb-1">Entrada de proveedor</h3><p className="mb-6 text-sm text-slate-500">Suma unidades a un medicamento existente y deja trazabilidad del proveedor.</p><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><Field label="Medicamento existente"><Select value={medicineId} onChange={(e) => setMedicineId(Number(e.target.value))}>{inventory.map((item: any) => <option key={item.id} value={item.id}>{item.medicine} · {item.activeIngredient} · Lote {item.lot} · Stock {item.stock}</option>)}</Select></Field><Field label="Cantidad recibida"><Input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} /></Field><Field label="Proveedor"><Input value={provider} onChange={(e) => setProvider(e.target.value)} /></Field><Field label="Folio / factura"><Input value={invoice} onChange={(e) => setInvoice(e.target.value)} /></Field></div><div className="mt-6"><Button onClick={registerProviderEntry} className="rounded-2xl bg-slate-900 text-white px-6 py-6 hover:bg-slate-800">Registrar entrada de proveedor</Button></div>{message && <div className="mt-5 rounded-2xl bg-slate-100 p-4 font-medium text-slate-700">{message}</div>}</CardContent></Card> : <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-6"><h3 className="text-xl font-bold mb-1">Registrar medicamento nuevo</h3><p className="mb-6 text-sm text-slate-500">Alta inicial de medicamento, lote, ubicación, caducidad, proveedor y folio.</p><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><Field label="Nombre del medicamento"><Input value={newMedicine} onChange={(e) => setNewMedicine(e.target.value)} /></Field><Field label="Principio activo"><Input value={newActiveIngredient} onChange={(e) => setNewActiveIngredient(e.target.value)} /></Field><Field label="Grupo terapéutico"><Input value={newTherapeuticGroup} onChange={(e) => setNewTherapeuticGroup(e.target.value)} /></Field><Field label="Stock inicial"><Input type="number" min="1" value={newStock} onChange={(e) => setNewStock(Number(e.target.value))} /></Field><Field label="Lote"><Input value={newLot} onChange={(e) => setNewLot(e.target.value)} /></Field><Field label="Ubicación"><Input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} /></Field><Field label="Caducidad"><Input type="date" value={newExpiry} onChange={(e) => setNewExpiry(e.target.value)} /></Field><Field label="Proveedor"><Input value={provider} onChange={(e) => setProvider(e.target.value)} /></Field><Field label="Folio / factura"><Input value={invoice} onChange={(e) => setInvoice(e.target.value)} /></Field></div><div className="mt-6"><Button onClick={registerNewMedicine} className="rounded-2xl bg-slate-900 text-white px-6 py-6 hover:bg-slate-800">Guardar medicamento nuevo</Button></div>{message && <div className="mt-5 rounded-2xl bg-slate-100 p-4 font-medium text-slate-700">{message}</div>}</CardContent></Card>}
    </motion.div>
  );
}

function Pharmacy({ movements, setMovements, setInventory }: any) {
  const confirmPickup = (movement: any) => {
    if (movement.status !== "Reservado") return;
    setInventory((prev: any[]) => prev.map((m) => m.id === movement.medicineId ? { ...m, stock: m.stock - movement.quantity, reserved: Math.max(m.reserved - movement.quantity, 0), alert: m.stock - movement.quantity <= 10 ? "Stock bajo" : m.alert } : m));
    setMovements((prev: any[]) => prev.map((m) => m.id === movement.id ? { ...m, status: "Entregado", responsible: "Farmacia confirmó recolección", remaining: Math.max(m.remaining - m.quantity, 0) } : m));
  };

  const releaseReservation = (movement: any) => {
    if (movement.status !== "Reservado") return;
    setInventory((prev: any[]) => prev.map((m) => m.id === movement.medicineId ? { ...m, reserved: Math.max(m.reserved - movement.quantity, 0) } : m));
    setMovements((prev: any[]) => prev.map((m) => m.id === movement.id ? { ...m, status: "Vencido", responsible: "Reserva liberada: paciente no recolectó en 24 horas" } : m));
  };

  const simulate24Hours = () => {
    movements.filter((m: any) => m.status === "Reservado").forEach((m: any) => releaseReservation(m));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-3xl border-0 shadow-sm overflow-hidden"><CardContent className="p-6"><div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"><div><h3 className="text-xl font-bold">Farmacia · Confirmación de recolección</h3><p className="mt-1 text-sm text-slate-500">La receta reserva inventario por 24 horas. Solo se descuenta cuando farmacia confirma entrega.</p></div><Button onClick={simulate24Hours} className="rounded-2xl bg-slate-900 text-white hover:bg-slate-800 px-5 py-6">Simular 24 horas</Button></div>
        <div className="mt-5 space-y-4">{movements.map((m: any) => <div key={m.id} className="rounded-3xl border bg-white p-5"><div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center"><div className="lg:col-span-2"><p className="font-bold">{m.medicine}</p><p className="text-xs font-semibold text-slate-400">Folio: {m.folio || "RX-DEMO-001"}</p><p className="text-sm text-slate-500">Paciente: {m.patient || "Movimiento de almacén"} · Lote {m.lot}</p><p className="text-sm text-slate-500">Diagnóstico: {m.diagnosis || "No registrado"}</p></div><div><p className="text-sm text-slate-500">Cantidad</p><p className="font-semibold">{m.quantity}</p></div><div><p className="text-sm text-slate-500">Estado</p><StatusBadge status={m.status} /><p className="text-xs text-slate-500 mt-1">Vence: {m.expiresAt || "No aplica"}</p></div><div className="flex flex-col gap-2"><Button onClick={() => confirmPickup(m)} disabled={m.status !== "Reservado"} className="rounded-2xl bg-slate-900 text-white hover:bg-slate-800">Confirmar recolección</Button><Button onClick={() => releaseReservation(m)} disabled={m.status !== "Reservado"} className="rounded-2xl bg-white text-slate-900 border hover:bg-slate-100">Liberar reserva</Button></div></div></div>)}</div>
      </CardContent></Card>
    </motion.div>
  );
}

function Traceability({ movements }: any) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-6"><h3 className="text-xl font-bold mb-5">Timeline de trazabilidad</h3><div className="space-y-4">{movements.map((m: any) => <div key={m.id} className="rounded-3xl border bg-white p-5"><div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"><div><p className="text-sm text-slate-500 flex items-center gap-2"><CalendarClock size={15}/> {m.date}</p><h4 className="text-lg font-bold mt-1">{m.medicine}</h4><p className="text-xs font-semibold text-slate-400">Folio: {m.folio || "RX-DEMO-001"}</p><p className="text-sm text-slate-500">Lote {m.lot} · Cantidad: {m.quantity}</p><p className="text-sm text-slate-500">Diagnóstico: {m.diagnosis || "No registrado"}</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm"><div className="rounded-2xl bg-slate-50 p-3"><b>Paciente</b><br/>{m.patient || "Almacén"}</div><div className="rounded-2xl bg-slate-50 p-3"><b>Responsable</b><br/>{m.doctor}</div><div className="rounded-2xl bg-slate-50 p-3"><b>Estado</b><br/><StatusBadge status={m.status} /></div></div></div></div>)}</div></CardContent></Card></motion.div>;
}

function AIChat({ inventory, movements, doctor }: any) {
  const [question, setQuestion] = useState("¿Qué alternativa hay para Paracetamol?");
  const [answer, setAnswer] = useState("Haz una consulta para analizar inventario, alternativas terapéuticas, farmacia y trazabilidad.");

  const ask = () => {
    const q = question.toLowerCase();

    if (q.includes("alternativa") || q.includes("sustituto") || q.includes("genérico") || q.includes("generico")) {
      const requestedMedicine = inventory.find((item: any) =>
        q.includes(item.medicine.toLowerCase().split(" ")[0]) ||
        q.includes(item.activeIngredient?.toLowerCase())
      );

      if (!requestedMedicine) {
        setAnswer("Biofex no encontró el medicamento solicitado. Puedes consultar por nombre comercial o principio activo, por ejemplo: Paracetamol, Ceftriaxona o Ketorolaco.");
        return;
      }

      const alternatives = findTherapeuticAlternatives(inventory, requestedMedicine, 1);

      if (alternatives.length === 0) {
        setAnswer(`No encontré alternativas disponibles con el mismo principio activo para ${requestedMedicine.medicine}. Se recomienda escalar a farmacia/compras.`);
        return;
      }

      setAnswer(
        `Medicamento consultado: ${requestedMedicine.medicine}. Principio activo: ${requestedMedicine.activeIngredient}. ` +
        `Alternativas disponibles para validación médica: ` +
        alternatives.map((alt: any) => `${alt.medicine} con ${getAvailableUnits(alt)} unidades disponibles, lote ${alt.lot}`).join("; ") +
        ". Nota: Biofex sugiere opciones operativas, la decisión final debe validarla personal médico o farmacia."
      );
    }
    else if (q.includes("agotarse") || q.includes("stock")) {
      setAnswer(
        inventory
          .filter((m: any) => getAvailableUnits(m) <= 12)
          .map((m: any) => `${m.medicine}, principio activo ${m.activeIngredient}, lote ${m.lot}, disponible ${getAvailableUnits(m)} unidades.`)
          .join(" ") || "No hay medicamentos críticos."
      );
    }
    else if (q.includes("lote") || q.includes("crx")) {
      setAnswer(
        movements
          .filter((m: any) => m.lot.toLowerCase().includes("crx"))
          .map((m: any) => `${m.lot}: ${m.status}, paciente ${m.patient || "Almacén"}, diagnóstico ${m.diagnosis}, responsable ${m.doctor}.`)
          .join(" ") || "No encontré ese lote."
      );
    }
    else if (q.includes("farmacia")) {
      setAnswer(`Farmacia tiene ${movements.filter((m: any) => m.status === "Reservado").length} recetas pendientes de recolección.`);
    }
    else {
      setAnswer(`Copiloto IA: ${doctor.name}, puedo ayudarte a consultar recetas, pacientes, lotes, farmacia, almacén, inventario y alternativas por principio activo.`);
    }
  };

  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><Card className="rounded-3xl border-0 shadow-sm bg-slate-900 text-white text-white"><CardContent className="p-6 md:p-8"><div className="flex items-center gap-3 mb-5"><div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center"><Bot/></div><div><h3 className="text-2xl font-bold text-white">Agente Biofex</h3><p className="text-slate-300 text-sm">Consulta trazabilidad, riesgos, existencias y alternativas por principio activo.</p></div></div><div className="flex flex-col md:flex-row gap-3"><input value={question} onChange={(e) => setQuestion(e.target.value)} className="flex-1 rounded-2xl bg-white px-4 py-4 text-slate-900 outline-none"/><Button onClick={ask} className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100 py-6 px-6">Consultar agente</Button></div><div className="mt-6 rounded-3xl bg-white/10 p-6 leading-relaxed text-slate-100">{answer}</div><div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">{["¿Qué alternativa hay para Paracetamol?", "¿Qué medicamentos están por agotarse?", "¿Dónde quedó el lote CRX-2026?", "Resumen de farmacia"].map((q) => <button key={q} onClick={() => setQuestion(q)} className="rounded-2xl bg-white/10 p-3 text-left hover:bg-white/20 transition text-white">{q}</button>)}</div></CardContent></Card></motion.div>;
}

export default function App() {
  const [doctor, setDoctor] = useState<any>(null);
  const [active, setActive] = useState("dashboard");
  const [inventory, setInventory] = useState(initialInventory);
  const [movements, setMovements] = useState(initialMovements);

  if (!doctor) return <Login onLogin={setDoctor} />;

  const logout = () => {
    setDoctor(null);
    setActive("dashboard");
  };

  const views: any = {
    dashboard: <Dashboard setActive={setActive} inventory={inventory} movements={movements} />,
    prescription: <Prescription doctor={doctor} inventory={inventory} setInventory={setInventory} setMovements={setMovements} setActive={setActive} />,
    patients: <Patients />,
    inventory: <Inventory inventory={inventory} />,
    warehouse: <Warehouse inventory={inventory} setInventory={setInventory} setMovements={setMovements} />,
    pharmacy: <Pharmacy movements={movements} setMovements={setMovements} inventory={inventory} setInventory={setInventory} />,
    trace: <Traceability movements={movements} />,
    ai: <AIChat inventory={inventory} movements={movements} doctor={doctor} />,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Sidebar active={active} setActive={setActive} doctor={doctor} />
      <main className="flex-1 p-4 md:p-8 overflow-hidden">
        <div className="md:hidden mb-4 flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 font-bold"><Pill /> TrazaMed AI</div>
          <span className="text-sm text-slate-500">Demo MVP</span>
        </div>

        <Header
          doctor={doctor}
          logout={logout}
          setActive={setActive}
          active={active}
        />

        {views[active]}
      </main>
    </div>
  );
}