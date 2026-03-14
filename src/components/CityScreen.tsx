import { motion } from "motion/react";
import { ShieldHalf, Calendar, LogOut, Gavel, Coins, BarChart3 } from "lucide-react";
import { DB, CITY_ORDER, NV_COL, NV_BG, NV_BR } from "../data/db";
import { fmtM } from "../lib/utils";

export function CityScreen({
  user,
  onSelectCity,
  onOpenRegional,
  onLogout,
}: {
  user: string;
  onSelectCity: (city: string) => void;
  onOpenRegional: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200">
      <header className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-600 to-blue-500 p-5 text-white">
        <div className="absolute -left-full top-0 h-full w-full animate-[shimH_3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="animate-[floatY_3s_ease-in-out_infinite] rounded-xl bg-white/20 p-2.5">
              <ShieldHalf className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">COMPLIANCE.DB</h1>
              <p className="flex items-center gap-1.5 text-xs text-blue-200">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-400" />
                TRT-15 · Vale do Paraíba ·
                <span className="ml-0.5 font-bold text-white uppercase">{user}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs">
              <Calendar className="h-3.5 w-3.5" />
              Março 2026
            </span>
            <button
              onClick={onLogout}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs text-white transition-colors hover:bg-white/25"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="px-2 font-mono text-[0.65rem] tracking-[0.15em] text-slate-400">
            // SELECIONE O MUNICÍPIO PARA AUDITORIA
          </p>
          <button
            onClick={onOpenRegional}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <BarChart3 className="h-4 w-4" />
            Inteligência Regional
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {CITY_ORDER.map((nome, i) => {
            const d = DB[nome];
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={nome}
                onClick={() => onSelectCity(nome)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ borderLeft: `4px solid ${NV_COL[d.nivel]}` }}
              >
                <div className="mb-3 flex items-start justify-between">
                  <span
                    className="rounded-full border px-2.5 py-1 text-[0.62rem] font-bold uppercase"
                    style={{
                      backgroundColor: NV_BG[d.nivel],
                      color: NV_COL[d.nivel],
                      borderColor: NV_BR[d.nivel],
                    }}
                  >
                    {d.nivel}
                  </span>
                  <span
                    className="text-3xl font-black leading-none"
                    style={{ color: NV_COL[d.nivel] }}
                  >
                    {d.score}
                  </span>
                </div>
                <h3 className="mb-1 text-base font-extrabold text-slate-800">{nome}</h3>
                <p className="mb-3 text-[0.68rem] text-slate-400">
                  IBGE {d.ibge} · {d.pop ? d.pop.toLocaleString("pt-BR") + "hab" : "N/D"}
                </p>
                <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${d.score}%`, backgroundColor: NV_COL[d.nivel] }}
                  />
                </div>
                <div className="flex justify-between text-[0.68rem] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Gavel className="h-3 w-3 text-blue-500" />
                    {d.proc.total} proc.
                  </span>
                  <span className="flex items-center gap-1">
                    <Coins className="h-3 w-3 text-emerald-600" />
                    {d.rcl ? "R$" + fmtM(d.rcl) : "N/D"}
                  </span>
                </div>
                {d.status !== "real" && (
                  <p className="mt-2 text-[0.58rem] italic text-slate-400">
                    ★ dados {d.status}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
