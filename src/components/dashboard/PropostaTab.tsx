import { DB } from "../../data/db";
import { fmtFull } from "../../lib/utils";
import {
  Handshake,
  TrendingUp,
  ShieldHalf,
  Gavel,
  Calculator,
  MessageCircle,
  Mail,
} from "lucide-react";

export function PropostaTab({ city }: { city: string }) {
  const d = DB[city];
  const tot = d.fin.litigio + d.fin.precatorios + d.fin.sst;

  return (
    <div className="space-y-7">
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-800">
          <Handshake className="h-6 w-6 text-purple-600" />
          Proposta de Consultoria — Compliance Trabalhista
        </h2>
        <div className="mb-7 rounded-xl bg-gradient-to-br from-blue-900 via-blue-600 to-blue-500 p-6 text-white">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="mb-1 text-lg font-bold">
                Gestão Completa de Passivo Trabalhista
              </h3>
              <p className="text-sm text-blue-100">
                Prefeitura Municipal de {city} · TRT-15
              </p>
            </div>
            <div className="rounded-xl bg-white/20 p-4 text-right">
              <p className="mb-1 text-xs text-blue-200">Retorno sobre investimento</p>
              <p className="text-3xl font-black">{Math.round(tot / 120000)}:1</p>
              <p className="mt-1 text-xs text-blue-200">vs. custo de regularização</p>
            </div>
          </div>
        </div>
        <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <PropCard
            col="blue"
            icon={TrendingUp}
            title="Diagnóstico"
            price="R$ 8.500"
            desc="Mapeamento completo · Relatório detalhado · Roadmap de ação"
          />
          <PropCard
            col="emerald"
            icon={ShieldHalf}
            title="Regularização SST"
            price="R$ 12.000/ano"
            desc="Gestão contínua · Laudos e documentos · Interface MTE/TRT-15"
          />
          <PropCard
            col="purple"
            icon={Gavel}
            title="Gestão Judicial"
            price="10% + 5%"
            desc="Processos existentes + novos · Honorários por resultado"
          />
        </div>
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
          <h4 className="mb-4 flex items-center gap-2 font-bold text-blue-800">
            <Calculator className="h-5 w-5 text-blue-600" />
            Análise Custo-Benefício
          </h4>
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-sm font-semibold text-slate-700">
                Cenário sem intervenção
              </p>
              <p className="text-2xl font-black text-red-700">R$ {fmtFull(tot)}</p>
              <p className="text-xs text-slate-500">
                Exposição total (litígio + precatórios + SST)
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold text-slate-700">
                Investimento em consultoria
              </p>
              <p className="text-2xl font-black text-emerald-700">~R$ 120.000/ano</p>
              <p className="text-xs text-slate-500">
                Gestão completa SST + judicial + compliance
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 p-4 text-white">
            <p className="flex items-center gap-2 font-bold">
              <TrendingUp className="h-5 w-5" />
              Potencial de redução: 40–60% do passivo em 24 meses
            </p>
            <p className="mt-1 text-sm text-emerald-100">
              Equivalente a R$ {fmtFull(Math.round(tot * 0.5))} protegidos para o
              município
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-5 text-center shadow-sm sm:p-7">
        <h3 className="mb-2 text-xl font-bold text-slate-800">
          Agende uma Reunião Técnica
        </h3>
        <p className="mb-5 text-slate-500">
          Apresentação completa do relatório para a gestão municipal de {city}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/5512981234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3 font-bold text-white transition-all hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-lg"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>
          <a
            href="mailto:contato@compliance.db"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-bold text-white transition-all hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
          >
            <Mail className="h-5 w-5" />
            E-mail
          </a>
        </div>
      </div>
    </div>
  );
}

function PropCard({ col, icon: Icon, title, price, desc }: any) {
  const colors: any = {
    blue: "border-blue-200 hover:border-blue-400 bg-blue-100 text-blue-600 text-blue-700",
    emerald: "border-emerald-200 hover:border-emerald-400 bg-emerald-100 text-emerald-600 text-emerald-700",
    purple: "border-purple-200 hover:border-purple-400 bg-purple-100 text-purple-600 text-purple-700",
  };
  const [border, hover, iconBg, iconColor, priceColor] = colors[col].split(" ");

  return (
    <div
      className={`rounded-xl border-2 p-5 text-center transition-all hover:-translate-y-1 ${border} ${hover}`}
    >
      <div
        className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <h4 className="mb-1 font-bold text-slate-800">{title}</h4>
      <p className={`mb-2 text-2xl font-black ${priceColor}`}>{price}</p>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  );
}
