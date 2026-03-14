import { DB } from "../../data/db";
import { fmtFull } from "../../lib/utils";
import { ListChecks, CheckCircle2 } from "lucide-react";

export function PlanoTab({ city }: { city: string }) {
  const d = DB[city];

  return (
    <div className="space-y-7">
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-800">
          <ListChecks className="h-6 w-6 text-blue-600" />
          Plano de Ação · 3 Horizontes Temporais
        </h2>
        <div className="space-y-7">
          <Horizonte
            num="1"
            bord="border-red-500"
            bg="bg-red-500"
            title="0–90 DIAS"
            sub="Ações Imediatas · Prioridade Máxima"
            items={[
              {
                t: "Contratar empresa de SST completa via pregão",
                d: `Escopo: PGR + LTCAT + PCMSO + laudos | Custo: R$ 50K–120K | Elimina causa raiz de ${
                  Math.round(
                    ((d.proc.teses.jornada + d.proc.teses.adicionais) /
                      d.proc.total) *
                      100
                  ) || 0
                }% dos processos`,
              },
              {
                t: "Implantar controle de ponto eletrônico (REP-P)",
                d: `CLT Art. 74 §2º | Impacto: elimina vulnerabilidade em ${d.proc.teses.jornada} processos de horas extras`,
              },
              {
                t: "Carga retroativa S-2240 no eSocial",
                d: "Prazo crítico: Port. MTE 1.131/2025 — desconto automático eliminado após jul/2025",
              },
              {
                t: "Provisionar precatórios no PPA/LOA",
                d: `R$ ${fmtFull(
                  d.fin.precatorios
                )} com prioridade constitucional (Art. 100 CF)`,
              },
            ]}
            col="red"
          />
          <Horizonte
            num="2"
            bord="border-orange-500"
            bg="bg-orange-500"
            title="90–180 DIAS"
            sub="Consolidação · Regularização"
            items={[
              {
                t: "Regularizar PCMSO e ASOs pendentes",
                d: "Atualização de todos os atestados de saúde ocupacional · Base para defesa processual",
              },
              {
                t: "Capacitação de gestores em conformidade trabalhista",
                d: "Reduz recorrência sistêmica · Prevenção de novas ações judiciais",
              },
              {
                t: "Negociar acordos nos processos de menor valor",
                d: `Potencial de economia de 30–40% sobre R$ ${fmtFull(
                  d.fin.litigio
                )} em litígio`,
              },
            ]}
            col="orange"
          />
          <Horizonte
            num="3"
            bord="border-emerald-500"
            bg="bg-emerald-500"
            title="180–365 DIAS"
            sub="Sustentação · Monitoramento"
            items={[
              {
                t: "Implementar software de gestão de passivos",
                d: "Acompanhamento em tempo real · Integração PJe TRT-15",
              },
              {
                t: "Auditoria anual de conformidade SST",
                d: "Manter conformidade e monitorar vencimentos de laudos e ASOs",
              },
              {
                t: "Relatório de risco semestral para gestão municipal",
                d: "Transparência pública · Prevenção orçamentária proativa",
              },
            ]}
            col="emerald"
          />
        </div>
      </div>
    </div>
  );
}

function Horizonte({ num, bord, bg, title, sub, items, col }: any) {
  const colors: any = {
    red: "bg-red-50 border-red-200 hover:border-red-400 text-red-500 text-red-800",
    orange: "bg-orange-50 border-orange-200 hover:border-orange-400 text-orange-500 text-orange-800",
    emerald: "bg-emerald-50 border-emerald-200 hover:border-emerald-400 text-emerald-500 text-emerald-800",
  };
  const [itemBg, itemBorder, itemHover, iconColor, titleColor] = colors[col].split(" ");

  return (
    <div className={`border-l-4 pl-5 sm:pl-7 ${bord}`}>
      <div className="mb-4 flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg ${bg}`}
        >
          {num}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">{sub}</p>
        </div>
      </div>
      <div className="space-y-3">
        {items.map((i: any, idx: number) => (
          <div
            key={idx}
            className={`rounded-xl border-2 p-4 transition-all hover:-translate-y-1 ${itemBg} ${itemBorder} ${itemHover}`}
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${iconColor}`} />
              <div>
                <p className={`font-bold ${titleColor}`}>{i.t}</p>
                <p className="mt-1 text-sm text-slate-600">{i.d}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
