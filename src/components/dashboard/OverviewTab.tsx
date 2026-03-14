import { DB, NV_COL } from "../../data/db";
import { fmtFull } from "../../lib/utils";
import {
  Gauge,
  Building,
  Banknote,
  FileText,
  Shield,
  PieChart,
  BarChart,
  School,
  Ambulance,
  Stethoscope,
  TrendingDown,
  AlertCircle,
  Gavel,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function nvDesc(n: string) {
  return (
    {
      critico: "Falhas estruturais sistêmicas",
      alto: "Irregularidades graves — ação urgente",
      medio: "Conformidade parcial — monitoramento necessário",
      baixo: "Dados insuficientes para análise completa",
    }[n] || ""
  );
}

function litDesc(v: number) {
  if (v > 2e6) return "1 Escola Municipal (6 salas) + 1 Posto de Saúde completo";
  if (v > 1e6) return "2–3 viaturas municipais + 6 meses de pavimentação";
  return "Investimento em infraestrutura básica municipal";
}

function precDesc(v: number) {
  if (v > 1e6) return "2 ambulâncias + 1 ano de merenda (500 alunos)";
  if (v > 4e5) return "1 ambulância + equipamentos para UBS";
  return "Reforma e equipamentos para unidades públicas";
}

function sstDesc(v: number) {
  if (v > 8e5) return "8–14 profissionais de saúde por 1 ano completo";
  if (v > 3e5) return "4–6 profissionais de saúde por 1 ano";
  return "2–4 servidores municipais por 1 ano";
}

function mainTese(t: any, tot: number) {
  const p = tot ? (((t.jornada + t.adicionais) / tot) * 100).toFixed(1) : 0;
  return `${p}% dos processos concentram-se em Jornada + Adicionais — falha estrutural sistêmica`;
}

export function OverviewTab({ city }: { city: string }) {
  const d = DB[city];
  const tot = d.fin.litigio + d.fin.precatorios + d.fin.sst;
  const pct = d.rcl ? ((tot / d.rcl) * 100).toFixed(1) : "—";
  const sc = NV_COL[d.nivel];

  const faseData = {
    labels: ["Em Trâmite", "1ª Instância", "2ª Instância", "Transitados"].filter(
      (_, i) =>
        i < 3 || (i === 3 && d.proc.fases.transitado > 0)
    ),
    datasets: [
      {
        data: [
          d.proc.fases.tramite,
          d.proc.fases.primeira,
          d.proc.fases.segunda,
          ...(d.proc.fases.transitado ? [d.proc.fases.transitado] : []),
        ],
        backgroundColor: ["#3b82f6", "#a855f7", "#06b6d4", "#64748b"],
        borderWidth: 0,
      },
    ],
  };

  const tesesData = {
    labels: ["Jornada", "Adicionais", "Reajuste", "Outros"],
    datasets: [
      {
        data: [
          d.proc.teses.jornada,
          d.proc.teses.adicionais,
          d.proc.teses.reajuste,
          d.proc.teses.outros,
        ],
        backgroundColor: ["#ef4444", "#f59e0b", "#10b981", "#6b7280"],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="space-y-7">
      {/* Score Card */}
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-slate-800">
              <Gauge className="h-5 w-5 text-blue-600" />
              Índice de Risco Trabalhista
            </h2>
            <p className="text-sm text-slate-500">
              {city} · Fonte: PJe TRT-15 + IBGE 2024/2025
            </p>
            {d.status !== "real" && (
              <p className="mt-1 text-xs font-semibold text-amber-600">
                ★ dados estimados proporcionalmente
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-end justify-end gap-2">
              <span className="text-5xl font-black" style={{ color: sc }}>
                {d.score}
              </span>
              <span className="mb-1 text-2xl text-slate-400">/100</span>
            </div>
            <span
              className="inline-flex animate-pulse items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-white uppercase"
              style={{ backgroundColor: sc }}
            >
              <AlertCircle className="h-3.5 w-3.5" />
              {d.nivel}
            </span>
          </div>
        </div>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-slate-600">Nível de Exposição</span>
            <span className="font-bold" style={{ color: sc }}>
              {nvDesc(d.nivel)}
            </span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${d.score}%`, backgroundColor: sc }}
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1 text-center text-xs text-slate-500">
            <span>
              Processual<br />
              <b className="text-slate-700">{d.s_proc}</b>
            </span>
            <span>
              Financeiro<br />
              <b className="text-slate-700">{d.s_fin}</b>
            </span>
            <span>
              SST<br />
              <b className="text-slate-700">{d.s_sst}</b>
            </span>
            <span>
              Expo/RCL<br />
              <b className="text-slate-700">{pct !== "—" ? `${pct}%` : "N/D"}</b>
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Processos Ativos"
          value={d.proc.total}
          icon={Gavel}
          iconColor="text-red-600"
          iconBg="bg-red-100"
          borderColor="hover:border-red-600"
          subIcon={Building}
          subText={d.vara_principal}
        />
        <MetricCard
          title="Total em Litígio"
          value={`R$ ${(d.fin.litigio / 1e6).toFixed(2)}M`}
          icon={Banknote}
          iconColor="text-orange-600"
          iconBg="bg-orange-100"
          borderColor="hover:border-orange-500"
          subIcon={Calendar}
          subText="2022 – Mar/2026"
        />
        <MetricCard
          title="Precatórios"
          value={`R$ ${(d.fin.precatorios / 1e6).toFixed(2)}M`}
          icon={FileText}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
          borderColor="hover:border-blue-600"
          subIcon={Shield}
          subText="Condenações transitadas"
        />
        <MetricCard
          title="Exposição SST"
          value={`~R$ ${Math.round(d.fin.sst / 1000)}K`}
          icon={Shield}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-100"
          borderColor="hover:border-emerald-600"
          subIcon={AlertTriangle}
          subText="Multas MTE + eSocial"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-800">
            <PieChart className="h-5 w-5 text-blue-600" />
            Distribuição por Fase Processual
          </h3>
          <div className="h-[200px]">
            <Doughnut
              data={faseData}
              options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}
            />
          </div>
          <div className="mt-4 space-y-2">
            <FaseItem color="bg-blue-500" label="Em Trâmite" val={d.proc.fases.tramite} tot={d.proc.total} />
            <FaseItem color="bg-purple-500" label="1ª Instância" val={d.proc.fases.primeira} tot={d.proc.total} />
            <FaseItem color="bg-cyan-500" label="2ª Instância" val={d.proc.fases.segunda} tot={d.proc.total} />
            {d.proc.fases.transitado > 0 && (
              <FaseItem color="bg-slate-500" label="Transitados" val={d.proc.fases.transitado} tot={d.proc.total} />
            )}
          </div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-800">
            <BarChart className="h-5 w-5 text-blue-600" />
            Teses Processuais
          </h3>
          <div className="h-[200px]">
            <Bar
              data={tesesData}
              options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}
            />
          </div>
          <div className="mt-4 rounded-xl border-2 border-red-200 bg-red-50 p-3.5">
            <p className="flex items-center gap-2 text-sm font-bold text-red-700">
              <AlertCircle className="h-4 w-4 animate-pulse" />
              {mainTese(d.proc.teses, d.proc.total)}
            </p>
          </div>
        </div>
      </div>

      {/* Impact */}
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-800">
          <Building className="h-5 w-5 text-blue-600" />
          O Que Essa Exposição Representa?
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <ImpactCard
            icon={School}
            color="blue"
            val={d.fin.litigio}
            label="Litígio Ativo"
            desc={litDesc(d.fin.litigio)}
          />
          <ImpactCard
            icon={Ambulance}
            color="emerald"
            val={d.fin.precatorios}
            label="Precatórios"
            desc={precDesc(d.fin.precatorios)}
          />
          <ImpactCard
            icon={Stethoscope}
            color="purple"
            val={d.fin.sst}
            label="Multas SST"
            desc={sstDesc(d.fin.sst)}
          />
        </div>
        <div className="mt-5 rounded-xl border-l-4 border-red-600 bg-red-50 p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-red-700">
            <TrendingDown className="h-4 w-4" />
            Cada real gasto em passivo judicial é um real que deixa de construir infraestrutura pública.
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, iconColor, iconBg, borderColor, subIcon: SubIcon, subText }: any) {
  return (
    <div className={`rounded-2xl bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg border-l-4 border-transparent ${borderColor}`}>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <div className={`rounded-xl p-2.5 ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
      <div className="text-3xl font-black text-slate-800 sm:text-4xl">{value}</div>
      <p className="mt-1.5 flex items-center gap-1 text-xs text-slate-500">
        <SubIcon className="h-3.5 w-3.5 text-blue-500" />
        {subText}
      </p>
    </div>
  );
}

function FaseItem({ color, label, val, tot }: any) {
  const p = tot ? ((val / tot) * 100).toFixed(0) : 0;
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5 text-sm transition-colors hover:bg-blue-50">
      <span className="flex items-center gap-2">
        <span className={`inline-block h-3 w-3 rounded-full ${color}`} />
        {label}
      </span>
      <span className="font-bold text-slate-800">
        {val} ({p}%)
      </span>
    </div>
  );
}

function ImpactCard({ icon: Icon, color, val, label, desc }: any) {
  const colors: any = {
    blue: "bg-blue-50 border-blue-200 hover:border-blue-400 text-blue-600 text-blue-800",
    emerald: "bg-emerald-50 border-emerald-200 hover:border-emerald-400 text-emerald-600 text-emerald-800",
    purple: "bg-purple-50 border-purple-200 hover:border-purple-400 text-purple-600 text-purple-800",
  };
  const c = colors[color];
  const [bg, border, hover, textLight, textDark] = c.split(" ");

  return (
    <div className={`rounded-xl border-2 p-5 transition-all hover:-translate-y-1 ${bg} ${border} ${hover}`}>
      <div className="mb-3 flex items-center gap-3">
        <Icon className={`h-10 w-10 animate-[floatY_3s_ease-in-out_infinite] ${textLight}`} />
        <div>
          <p className={`text-xl font-black ${textDark}`}>R$ {fmtFull(val)}</p>
          <p className={`text-xs ${textLight}`}>{label}</p>
        </div>
      </div>
      <p className="text-sm text-slate-700">{desc}</p>
    </div>
  );
}
