import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  Gavel,
  Coins,
  HardHat,
  ListChecks,
  Handshake,
  Database,
  Map,
  Menu,
  X,
  ArrowLeft,
  Building2,
  AlertTriangle,
  Download,
  Clock,
  AlertCircle
} from "lucide-react";
import { DB, NV_BADGE_BG, NV_LABEL } from "../data/db";
import { fmtFull } from "../lib/utils";
import { OverviewTab } from "./dashboard/OverviewTab";
import { ProcessosTab } from "./dashboard/ProcessosTab";
import { FinanceiroTab } from "./dashboard/FinanceiroTab";
import { SstTab } from "./dashboard/SstTab";
import { PlanoTab } from "./dashboard/PlanoTab";
import { PropostaTab } from "./dashboard/PropostaTab";
import { DetalhesTab } from "./dashboard/DetalhesTab";
import { ContextoTab } from "./dashboard/ContextoTab";

const TABS = [
  { id: "dashboard", label: "Visão Geral", icon: TrendingUp },
  { id: "contexto", label: "Contexto Local", icon: Map },
  { id: "processos", label: "Processos", icon: Gavel },
  { id: "financeiro", label: "Financeiro", icon: Coins },
  { id: "sst", label: "Auditoria SST", icon: HardHat },
  { id: "plano", label: "Plano de Ação", icon: ListChecks },
  { id: "proposta", label: "Proposta", icon: Handshake },
  { id: "detalhes", label: "Dados Brutos", icon: Database },
];

export function DashboardScreen({
  city,
  onBack,
}: {
  city: string;
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const d = DB[city];
  const tot = d.fin.litigio + d.fin.precatorios + d.fin.sst;
  const pct = d.rcl ? ((tot / d.rcl) * 100).toFixed(1) : "—";

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 shadow-2xl lg:static lg:block ${isSidebarOpen ? 'block' : 'hidden'}`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-slate-800/60 bg-slate-900/50">
            <div className="flex items-center gap-3 text-white">
              <div className="rounded-xl bg-blue-600 p-2.5 shadow-lg shadow-blue-900/20">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="block font-black text-lg tracking-tight leading-none">GovAudit Pro</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">TRT-15 Compliance</span>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
            <div className="mb-4 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">
              Módulos de Análise
            </div>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-900/20 translate-x-1"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-blue-200" : "opacity-70"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-800/60 bg-slate-900/50">
            <button
              onClick={onBack}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Trocar Município
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-800 flex items-center gap-3">
                {city}
                <span
                  className="hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
                  style={{ backgroundColor: NV_BADGE_BG[d.nivel] }}
                >
                  <AlertTriangle className="h-3 w-3" />
                  {NV_LABEL[d.nivel]}
                </span>
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-semibold text-slate-500">
                  IBGE: {d.ibge}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-500">
                  Vara: {d.vara_principal}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex cursor-pointer items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-900"
            >
              <Download className="h-4 w-4" />
              Exportar PDF
            </button>
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-3 text-right">
              <div className="hidden sm:block text-sm">
                <p className="font-bold text-slate-800 leading-tight">Auditor Chefe</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sessão Ativa</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 border-2 border-white shadow-md flex items-center justify-center text-white font-black text-sm">
                AC
              </div>
            </div>
          </div>
        </header>

        {/* Alert Bar (Sticky under header) */}
        <div className="shrink-0 bg-gradient-to-r from-red-600 to-red-500 px-4 sm:px-8 py-3 text-white shadow-md z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative rounded-full bg-white/20 p-2">
              <div className="absolute inset-0 animate-ping rounded-full bg-white/20" />
              <AlertCircle className="relative z-10 h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-black tracking-wide">
                Exposição Total Estimada: R$ {fmtFull(tot)}
              </p>
              <p className="text-xs font-medium text-red-100">
                {pct !== "—" ? `${pct}% da RCL anual` : "RCL indisponível"}
              </p>
            </div>
          </div>
          <p className="hidden items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-100 sm:flex">
            <Clock className="h-3.5 w-3.5 animate-[spin_3s_linear_infinite]" />
            Atualizado: Março 2026
          </p>
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-4 sm:p-8">
          <div className="mx-auto max-w-6xl pb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "dashboard" && <OverviewTab city={city} />}
                {activeTab === "contexto" && <ContextoTab city={city} />}
                {activeTab === "processos" && <ProcessosTab city={city} />}
                {activeTab === "financeiro" && <FinanceiroTab city={city} />}
                {activeTab === "sst" && <SstTab city={city} />}
                {activeTab === "plano" && <PlanoTab city={city} />}
                {activeTab === "proposta" && <PropostaTab city={city} />}
                {activeTab === "detalhes" && <DetalhesTab city={city} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
