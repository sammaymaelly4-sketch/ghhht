import { DB } from "../../data/db";
import { fmtFull } from "../../lib/utils";
import { HardHat, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export function SstTab({ city }: { city: string }) {
  const d = DB[city];
  const conf = Object.values(d.sst).filter((v) => v === 1).length;

  return (
    <div className="space-y-7">
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-800">
          <HardHat className="h-6 w-6 text-yellow-600" />
          Auditoria SST — Saúde e Segurança do Trabalho
        </h2>
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div
            className={`rounded-xl border-2 p-5 text-center ${
              conf >= 3 ? "border-emerald-300 bg-emerald-50" : "border-red-300 bg-red-50"
            }`}
          >
            <p
              className={`mb-1 text-4xl font-black ${
                conf >= 3 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {conf}/5
            </p>
            <p className="text-sm font-semibold text-slate-700">Itens Conformes</p>
            <p className="mt-0.5 text-xs text-slate-500">Score SST: {d.s_sst}/25</p>
          </div>
          <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-5 text-center">
            <p className="mb-1 text-4xl font-black text-blue-700">{5 - conf}/5</p>
            <p className="text-sm font-semibold text-slate-700">Pendências</p>
            <p className="mt-0.5 text-xs text-slate-500">Risco de autuação MTE</p>
          </div>
          <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 text-center">
            <p className="mb-1 text-2xl font-black text-amber-700">
              R$ {fmtFull(d.fin.sst)}
            </p>
            <p className="text-sm font-semibold text-slate-700">Exposição SST</p>
            <p className="mt-0.5 text-xs text-slate-500">Multas MTE + eSocial</p>
          </div>
        </div>
        <div className="mb-7 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gradient-to-br from-blue-900 via-blue-600 to-blue-500 text-white">
                <th className="px-5 py-3 text-left text-sm font-bold">Documento</th>
                <th className="px-5 py-3 text-center text-sm font-bold">Status</th>
                <th className="px-5 py-3 text-center text-sm font-bold">Criticidade</th>
                <th className="hidden px-5 py-3 text-left text-sm font-bold sm:table-cell">
                  Impacto
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <SstRow
                doc="PCMSO"
                ok={d.sst.pcmso}
                desc="Programa de Controle Médico de Saúde Ocupacional"
                crit="Crítico"
                imp="ASO obrigatório · Base de 40% das ações"
              />
              <SstRow
                doc="PGR"
                ok={d.sst.pgr}
                desc="Programa de Gerenciamento de Riscos"
                crit="Crítico"
                imp="Substituto do PPRA desde 01/2022"
              />
              <SstRow
                doc="LTCAT"
                ok={d.sst.ltcat}
                desc="Laudo Técnico das Condições Ambientais do Trabalho"
                crit="Alto"
                imp="Aposentadoria especial + NR-9"
              />
              <SstRow
                doc="eSocial S-2240"
                ok={d.sst.esocial}
                desc="Condições Ambientais do Trabalho no eSocial"
                crit="Crítico"
                imp="Multas R$ 402 a R$ 6.433 por trabalhador"
              />
              <SstRow
                doc="Sem Autuação MTE"
                ok={d.sst.mte}
                desc="Histórico limpo de fiscalização"
                crit="Médio"
                imp="Indica conformidade operacional"
              />
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5">
          <h4 className="mb-4 flex items-center gap-2 font-bold text-red-800">
            <AlertCircle className="h-5 w-5 animate-pulse" />
            Estimativa de Multas eSocial (Port. MTE 1.131/2025)
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <p className="mb-1 text-xs text-slate-600">S-2220 (ASO)</p>
              <p className="text-2xl font-black text-red-600">
                R$ {fmtFull(Math.round((d.pop || 300) * 402))}
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <p className="mb-1 text-xs text-slate-600">S-2240 (Agentes Nocivos)</p>
              <p className="text-2xl font-black text-red-600">
                R$ {fmtFull(Math.round((d.pop || 300) * 1812))}
              </p>
            </div>
            <div className="rounded-xl bg-red-100 p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <p className="mb-1 text-xs text-slate-600">TOTAL ESTIMADO</p>
              <p className="text-2xl font-black text-red-800">
                R$ {fmtFull(d.fin.sst)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SstRow({ doc, ok, desc, crit, imp }: any) {
  const isOk = ok === 1;
  return (
    <tr className="border-b border-slate-200 transition-colors hover:bg-slate-50">
      <td className="px-5 py-3 font-semibold">
        <div className="flex items-start gap-2">
          {isOk ? (
            <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-500" />
          ) : (
            <XCircle className="mt-0.5 h-4 w-4 text-red-500" />
          )}
          <div>
            <p>{doc}</p>
            <p className="text-xs font-normal text-slate-400">{desc}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-3 text-center">
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            isOk ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isOk ? "✓ Conforme" : "✗ Pendente"}
        </span>
      </td>
      <td className="px-5 py-3 text-center">
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold text-white ${
            crit === "Crítico"
              ? "bg-red-500"
              : crit === "Alto"
                ? "bg-orange-500"
                : "bg-yellow-500"
          }`}
        >
          {crit}
        </span>
      </td>
      <td className="hidden px-5 py-3 text-xs text-slate-600 sm:table-cell">
        {imp}
      </td>
    </tr>
  );
}
