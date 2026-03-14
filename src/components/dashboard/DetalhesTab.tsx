import { DB } from "../../data/db";
import { Database } from "lucide-react";

export function DetalhesTab({ city }: { city: string }) {
  const data = DB[city];

  return (
    <div className="space-y-7">
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-800">
          <Database className="h-6 w-6 text-blue-600" />
          Dados Completos (Raw Data)
        </h2>
        <p className="mb-4 text-sm text-slate-500">
          Visualização integral de todos os pontos de dados disponíveis no banco de dados para o município de {city}.
        </p>
        <div className="overflow-x-auto rounded-xl bg-slate-900 p-6 text-sm text-emerald-400 shadow-inner">
          <pre className="font-mono">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
