import { DB } from "../../data/db";
import { fmtFull } from "../../lib/utils";
import { Gavel, MinusCircle, Loader2, Scale, Landmark, BarChart } from "lucide-react";

export function ProcessosTab({ city }: { city: string }) {
  const d = DB[city];

  return (
    <div className="space-y-7">
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-800">
          <Gavel className="h-6 w-6 text-blue-600" />
          Carga Processual por Vara
        </h2>
        <div className="mb-7 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <VaraCard tit="1ª Vara" vara={d.vara_principal} v={d.proc.v1} tot={d.proc.total} />
          {d.proc.v2.n > 0 ? (
            <VaraCard tit="2ª Vara" vara={d.vara_principal} v={d.proc.v2} tot={d.proc.total} />
          ) : (
            <div className="flex items-center justify-center rounded-xl border-2 border-slate-200 p-6 text-slate-400">
              <div className="text-center">
                <MinusCircle className="mb-2 h-8 w-8" />
                <p className="text-sm">Vara única para este município</p>
              </div>
            </div>
          )}
        </div>
        <h3 className="mb-4 text-lg font-bold text-slate-800">Distribuição Geral por Fase</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[580px]">
            <thead>
              <tr className="bg-gradient-to-br from-blue-900 via-blue-600 to-blue-500 text-white">
                <th className="px-5 py-3 text-left text-sm font-bold">Fase</th>
                <th className="px-5 py-3 text-center text-sm font-bold">Vara 1</th>
                <th className="px-5 py-3 text-center text-sm font-bold">Vara 2</th>
                <th className="px-5 py-3 text-center text-sm font-bold">Total</th>
                <th className="px-5 py-3 text-center text-sm font-bold">%</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <TrFase label="Em Trâmite" hov="hover:bg-blue-50" v1={d.proc.v1.tr} v2={d.proc.v2.tr} tot={d.proc.fases.tramite} total={d.proc.total} />
              <TrFase label="1ª Instância" hov="hover:bg-purple-50" v1={d.proc.v1.p1} v2={d.proc.v2.p1} tot={d.proc.fases.primeira} total={d.proc.total} />
              <TrFase label="2ª Instância" hov="hover:bg-cyan-50" v1={d.proc.v1.p2} v2={d.proc.v2.p2} tot={d.proc.fases.segunda} total={d.proc.total} />
              {d.proc.fases.transitado > 0 && (
                <TrFase label="Transitados" hov="hover:bg-slate-50" v1={0} v2={0} tot={d.proc.fases.transitado} total={d.proc.total} />
              )}
              <tr className="bg-gradient-to-br from-emerald-600 to-emerald-500 font-bold text-white">
                <td className="px-5 py-3">TOTAL</td>
                <td className="px-5 py-3 text-center">{d.proc.v1.n}</td>
                <td className="px-5 py-3 text-center">{d.proc.v2.n}</td>
                <td className="px-5 py-3 text-center">{d.proc.total}</td>
                <td className="px-5 py-3 text-center">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-800">
          <BarChart className="h-5 w-5 text-blue-600" />
          Teses Processuais — Detalhamento
        </h3>
        <TeseDetail teses={d.proc.teses} total={d.proc.total} />
      </div>
    </div>
  );
}

interface VaraCardProps {
  tit: string;
  vara: string;
  v: { n: number; tr: number; p1: number; p2: number; val: number };
  tot: number;
}

function VaraCard({ tit, vara, v, tot }: VaraCardProps) {
  const p = tot ? ((v.n / tot) * 100).toFixed(0) : 0;
  return (
    <div className="rounded-xl border-2 border-slate-200 p-6 transition-all hover:-translate-y-1 hover:border-blue-400">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800">{tit}</h3>
          <p className="text-sm text-slate-500">{p}% do total</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black text-blue-600">{v.n}</div>
          <p className="text-xs text-slate-500">processos</p>
        </div>
      </div>
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between rounded-lg bg-blue-50 p-2.5">
          <span className="flex items-center gap-2 text-sm">
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            Em Trâmite
          </span>
          <span className="font-bold">{v.tr}</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-purple-50 p-2.5">
          <span className="flex items-center gap-2 text-sm">
            <Scale className="h-4 w-4 text-purple-500" />
            1ª Instância
          </span>
          <span className="font-bold">{v.p1}</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-cyan-50 p-2.5">
          <span className="flex items-center gap-2 text-sm">
            <Landmark className="h-4 w-4 text-cyan-500" />
            2ª Instância
          </span>
          <span className="font-bold">{v.p2}</span>
        </div>
      </div>
      <div className="border-t-2 border-slate-200 pt-4">
        <p className="mb-1 text-sm font-medium text-slate-600">Valor total em litígio</p>
        <p className="text-2xl font-black text-slate-800">
          {v.val > 0 ? `R$ ${fmtFull(v.val)}` : "—"}
        </p>
      </div>
    </div>
  );
}

interface TrFaseProps {
  label: string;
  hov: string;
  v1: number;
  v2: number;
  tot: number;
  total: number;
}

function TrFase({ label, hov, v1, v2, tot, total }: TrFaseProps) {
  const p = total ? ((tot / total) * 100).toFixed(0) : 0;
  return (
    <tr className={`border-b border-slate-200 transition-colors ${hov}`}>
      <td className="px-5 py-3 font-semibold">{label}</td>
      <td className="px-5 py-3 text-center">{v1}</td>
      <td className="px-5 py-3 text-center">{v2}</td>
      <td className="px-5 py-3 text-center font-bold">{tot}</td>
      <td className="px-5 py-3 text-center">{p}%</td>
    </tr>
  );
}

interface TeseDetailProps {
  teses: { jornada: number; adicionais: number; reajuste: number; outros: number };
  total: number;
}

function TeseDetail({ teses, total }: TeseDetailProps) {
  const cols: Record<string, string> = {
    jornada: "bg-red-500",
    adicionais: "bg-amber-500",
    reajuste: "bg-emerald-500",
    outros: "bg-slate-400",
  };
  const lbls: Record<string, string> = {
    jornada: "Excesso de Jornada",
    adicionais: "Adicionais (Insalubridade/Periculosidade)",
    reajuste: "Reajuste Salarial",
    outros: "Outras Teses",
  };
  const max = Math.max(...Object.values(teses), 1);

  return (
    <div className="space-y-3">
      {Object.entries(teses).map(([k, v]) => {
        const p = total ? ((v / total) * 100).toFixed(1) : 0;
        const bw = Math.round((v / max) * 100);
        return (
          <div key={k} className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-0">
            <div className="w-40 shrink-0 text-sm font-semibold text-slate-700">{lbls[k]}</div>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${cols[k]}`}
                style={{ width: `${bw}%` }}
              />
            </div>
            <div className="w-16 shrink-0 text-right">
              <p className="font-black text-slate-800">{v}</p>
              <p className="text-xs text-slate-500">{p}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
