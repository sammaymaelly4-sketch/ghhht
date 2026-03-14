import { DB } from "../../data/db";
import { fmtFull } from "../../lib/utils";
import {
  Coins,
  Target,
  Gavel,
  FileText,
  AlertTriangle,
  Scale,
  type LucideIcon,
} from "lucide-react";

export function FinanceiroTab({ city }: { city: string }) {
  const d = DB[city];
  const tot = d.fin.litigio + d.fin.precatorios + d.fin.sst;
  const pct = d.rcl ? ((tot / d.rcl) * 100).toFixed(1) : "—";

  return (
    <div className="space-y-7">
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-800">
          <Coins className="h-6 w-6 text-emerald-600" />
          Exposição Financeira Consolidada
        </h2>
        <div className="mb-7 rounded-xl bg-gradient-to-br from-red-600 to-red-500 p-6 text-white">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
                <Target className="h-5 w-5" />
                EXPOSIÇÃO TOTAL ESTIMADA
              </h3>
              <p className="text-5xl font-black">{(tot / 1e6).toFixed(2)}</p>
              <p className="mt-2 text-sm text-red-100">
                R$ milhões · {pct !== "—" ? `${pct}% da RCL` : "RCL indisponível"}
              </p>
            </div>
            <div className="rounded-xl bg-white/20 p-4 transition-all hover:bg-white/30">
              <p className="mb-1 text-sm text-red-100">Custo de Regularização SST</p>
              <p className="text-2xl font-black">R$ 50K–R$ 120K</p>
              <p className="mt-1 text-xs text-red-100">Fração mínima frente ao passivo</p>
            </div>
          </div>
        </div>
        <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <FinCard
            col="red"
            icon={Gavel}
            title="Passivo Judicial"
            val={d.fin.litigio}
            sub={`${d.proc.total} processos em andamento`}
          />
          <FinCard
            col="purple"
            icon={FileText}
            title="Precatórios"
            val={d.fin.precatorios}
            sub="Condenações com força de lei"
          />
          <FinCard
            col="orange"
            icon={AlertTriangle}
            title="Multas SST"
            val={d.fin.sst}
            sub="Exposição eSocial + MTE"
          />
        </div>
        {d.rcl ? (
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
            <h4 className="mb-4 flex items-center gap-2 font-bold text-amber-800">
              <Scale className="h-5 w-5" />
              Proporção sobre RCL Anual (R$ {fmtFull(d.rcl)})
            </h4>
            <div className="space-y-3">
              <RclBar label="Passivo Judicial" val={d.fin.litigio} rcl={d.rcl} col="bg-red-500" />
              <RclBar label="Precatórios" val={d.fin.precatorios} rcl={d.rcl} col="bg-purple-500" />
              <RclBar label="Exposição SST" val={d.fin.sst} rcl={d.rcl} col="bg-orange-500" />
              <RclBar label="TOTAL EXPOSTO" val={tot} rcl={d.rcl} col="bg-slate-700" />
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-slate-100 p-5 text-center text-slate-500">
            RCL não disponível para análise proporcional.
          </div>
        )}
      </div>
    </div>
  );
}

interface FinCardProps {
  col: "red" | "purple" | "orange";
  icon: LucideIcon;
  title: string;
  val: number;
  sub: string;
}

function FinCard({ col, icon: Icon, title, val, sub }: FinCardProps) {
  const colors: Record<string, string> = {
    red: "border-red-200 bg-red-50 hover:border-red-400 text-red-500 bg-red-500",
    purple: "border-purple-200 bg-purple-50 hover:border-purple-400 text-purple-500 bg-purple-500",
    orange: "border-orange-200 bg-orange-50 hover:border-orange-400 text-orange-500 bg-orange-500",
  };
  const [border, bg, hover, text, iconBg] = colors[col].split(" ");

  return (
    <div className={`rounded-xl border-2 p-5 transition-all hover:-translate-y-1 ${border} ${bg} ${hover}`}>
      <div className="mb-2 flex items-center gap-3">
        <div className={`rounded-xl p-3 ${iconBg}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-2xl font-black text-slate-800">R$ {fmtFull(val)}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  );
}

interface RclBarProps {
  label: string;
  val: number;
  rcl: number;
  col: string;
}

function RclBar({ label, val, rcl, col }: RclBarProps) {
  const p = ((val / rcl) * 100).toFixed(1);
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-bold text-slate-800">{p}% da RCL</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${col}`}
          style={{ width: `${Math.min(Number(p), 100)}%` }}
        />
      </div>
    </div>
  );
}
