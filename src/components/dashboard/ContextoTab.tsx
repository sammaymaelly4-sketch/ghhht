import { DB } from "../../data/db";
import {
  Map,
  User,
  Landmark,
  Newspaper,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Users,
  type LucideIcon,
} from "lucide-react";

export function ContextoTab({ city }: { city: string }) {
  const d = DB[city];

  return (
    <div className="space-y-7">
      {/* IBGE Data */}
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-800">
          <Landmark className="h-6 w-6 text-emerald-600" />
          Dados Socioeconômicos (IBGE)
        </h2>
        {d.ibge_dados ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <IbgeCard
              icon={Users}
              label="População"
              val={d.pop ? d.pop.toLocaleString("pt-BR") : "N/D"}
              sub="Habitantes"
            />
            <IbgeCard
              icon={TrendingUp}
              label="PIB per capita"
              val={`R$ ${d.ibge_dados.pib_per_capita.toLocaleString("pt-BR")}`}
              sub="Anual"
            />
            <IbgeCard
              icon={MapPin}
              label="Área Territorial"
              val={`${d.ibge_dados.area.toLocaleString("pt-BR")} km²`}
              sub={`Densidade: ${d.ibge_dados.densidade} hab/km²`}
            />
            <IbgeCard
              icon={Landmark}
              label="IDHM"
              val={d.ibge_dados.idhm.toFixed(3)}
              sub="Índice Desenv. Humano"
            />
          </div>
        ) : (
          <div className="rounded-xl bg-slate-50 p-6 text-center text-slate-500">
            Dados do IBGE não disponíveis para este município.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
        {/* Prefeito */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-800">
            <User className="h-6 w-6 text-blue-600" />
            Histórico Político
          </h2>
          {d.prefeito ? (
            <div>
              <div className="mb-6 flex items-center gap-4 rounded-xl border-2 border-slate-100 bg-slate-50 p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <User className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">
                    {d.prefeito.nome}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500">
                    {d.prefeito.partido} · Mandato {d.prefeito.mandato}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Contexto da Gestão
                </h4>
                <ul className="space-y-3">
                  {d.prefeito.historico.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {d.prefeito.secretarios && d.prefeito.secretarios.length > 0 && (
                <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Secretariado Chave
                  </h4>
                  <ul className="space-y-3">
                    {d.prefeito.secretarios.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
                        <span className="flex h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-xl bg-slate-50 p-6 text-center text-slate-500">
              Dados políticos não disponíveis.
            </div>
          )}
        </div>

        {/* Notícias */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-800">
            <Newspaper className="h-6 w-6 text-purple-600" />
            Radar de Notícias
          </h2>
          {d.noticias && d.noticias.length > 0 ? (
            <div className="space-y-4">
              {d.noticias.map((noticia, idx) => (
                <NoticiaCard key={idx} noticia={noticia} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-slate-50 p-6 text-center text-slate-500">
              Nenhuma notícia recente mapeada.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface IbgeCardProps {
  icon: LucideIcon;
  label: string;
  val: string;
  sub: string;
}

function IbgeCard({ icon: Icon, label, val, sub }: IbgeCardProps) {
  return (
    <div className="rounded-xl border-2 border-slate-100 p-5 transition-all hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50">
      <div className="mb-3 flex items-center gap-3">
        <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-sm font-semibold text-slate-500">{label}</p>
      </div>
      <p className="text-2xl font-black text-slate-800">{val}</p>
      <p className="mt-1 text-xs text-slate-400">{sub}</p>
    </div>
  );
}

interface Noticia {
  data: string;
  manchete: string;
  fonte: string;
  impacto: "positivo" | "negativo" | "neutro" | "alerta";
}

interface NoticiaCardProps {
  noticia: Noticia;
}

function NoticiaCard({ noticia }: NoticiaCardProps) {
  const styles: Record<string, string> = {
    positivo: "border-emerald-200 bg-emerald-50 text-emerald-700",
    negativo: "border-red-200 bg-red-50 text-red-700",
    alerta: "border-amber-200 bg-amber-50 text-amber-700",
    neutro: "border-slate-200 bg-slate-50 text-slate-700",
  };
  const icons: Record<string, JSX.Element> = {
    positivo: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
    negativo: <AlertCircle className="h-4 w-4 text-red-600" />,
    alerta: <AlertCircle className="h-4 w-4 text-amber-600" />,
    neutro: <Newspaper className="h-4 w-4 text-slate-600" />,
  };

  const st = styles[noticia.impacto] || styles.neutro;
  const ic = icons[noticia.impacto] || icons.neutro;

  return (
    <div className={`rounded-xl border-2 p-4 transition-all hover:-translate-y-1 ${st}`}>
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
          {ic}
          {noticia.impacto}
        </span>
        <span className="text-xs font-semibold opacity-70">{noticia.data}</span>
      </div>
      <h4 className="mb-2 font-bold leading-snug">{noticia.manchete}</h4>
      <p className="text-xs font-medium opacity-70">Fonte: {noticia.fonte}</p>
    </div>
  );
}
