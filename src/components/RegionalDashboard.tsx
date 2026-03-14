import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  TrendingUp,
  Map,
  AlertTriangle,
  Users,
  Building2,
  PieChart as PieChartIcon,
  BarChart3,
  Activity
} from "lucide-react";
import { DB, CITY_ORDER, NV_COL, NV_LABEL } from "../data/db";
import { fmtM, fmtFull } from "../lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export function RegionalDashboard({ onBack }: { onBack: () => void }) {
  // Aggregate Data
  const stats = useMemo(() => {
    let totalPop = 0;
    let totalExposure = 0;
    let totalProcs = 0;
    const riskCount = { critico: 0, alto: 0, medio: 0, baixo: 0 };
    const partyCount: Record<string, number> = {};
    
    const cityData = CITY_ORDER.map(city => {
      const d = DB[city];
      const exposure = d.fin.litigio + d.fin.precatorios + d.fin.sst;
      
      totalPop += d.pop || 0;
      totalExposure += exposure;
      totalProcs += d.proc.total;
      riskCount[d.nivel]++;
      
      if (d.prefeito) {
        partyCount[d.prefeito.partido] = (partyCount[d.prefeito.partido] || 0) + 1;
      }

      return {
        name: city,
        pop: d.pop || 0,
        exposure,
        score: d.score,
        nivel: d.nivel,
        procs: d.proc.total,
        partido: d.prefeito?.partido || "N/D"
      };
    });

    // Sort for top exposure
    const topExposure = [...cityData].sort((a, b) => b.exposure - a.exposure).slice(0, 5);

    // Format for PieChart
    const partyData = Object.entries(partyCount).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

    return { totalPop, totalExposure, totalProcs, riskCount, cityData, topExposure, partyData };
  }, []);

  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800 flex items-center gap-2">
              <Map className="h-6 w-6 text-blue-600" />
              Inteligência Regional
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Vale do Paraíba Histórico ({CITY_ORDER.length} Municípios)
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6 space-y-8">
        
        {/* Top KPIs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard 
            title="Exposição Total (Região)" 
            value={`R$ ${fmtM(stats.totalExposure)}`} 
            subtitle="Soma de passivos e litígios" 
            icon={AlertTriangle} 
            color="text-red-600" 
            bg="bg-red-100" 
          />
          <KpiCard 
            title="População Impactada" 
            value={stats.totalPop.toLocaleString('pt-BR')} 
            subtitle="Habitantes na base" 
            icon={Users} 
            color="text-blue-600" 
            bg="bg-blue-100" 
          />
          <KpiCard 
            title="Volume Processual" 
            value={stats.totalProcs.toString()} 
            subtitle="Ações ativas no TRT-15" 
            icon={Building2} 
            color="text-amber-600" 
            bg="bg-amber-100" 
          />
          <KpiCard 
            title="Média de Risco" 
            value={(stats.cityData.reduce((acc, c) => acc + c.score, 0) / stats.cityData.length).toFixed(1)} 
            subtitle="Score médio (0-100)" 
            icon={Activity} 
            color="text-emerald-600" 
            bg="bg-emerald-100" 
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Top 5 Exposição */}
          <div className="col-span-1 lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-800">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Top 5: Maior Exposição Financeira
            </h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.topExposure} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <XAxis type="number" tickFormatter={(val) => `R$${(val/1000000).toFixed(1)}M`} />
                  <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 12, fontWeight: 600}} />
                  <Tooltip 
                    formatter={(value: number) => [`R$ ${fmtFull(value)}`, 'Exposição']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="exposure" radius={[0, 4, 4, 0]}>
                    {stats.topExposure.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={NV_COL[entry.nivel as keyof typeof NV_COL]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribuição Partidária */}
          <div className="col-span-1 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-800">
              <PieChartIcon className="h-5 w-5 text-purple-600" />
              Hegemonia Partidária
            </h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.partyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.partyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scatter Plot: População vs Exposição */}
          <div className="col-span-1 lg:col-span-3 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-slate-800">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Correlação: População vs. Exposição Financeira
            </h2>
            <p className="mb-6 text-sm text-slate-500">
              Analisa se municípios maiores possuem proporcionalmente mais passivos trabalhistas. O tamanho da bolha representa o Score de Risco.
            </p>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <XAxis 
                    type="number" 
                    dataKey="pop" 
                    name="População" 
                    tickFormatter={(val) => `${(val/1000).toFixed(1)}k`}
                    label={{ value: 'População', position: 'insideBottomRight', offset: -10 }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="exposure" 
                    name="Exposição" 
                    tickFormatter={(val) => `R$${(val/1000000).toFixed(1)}M`}
                    label={{ value: 'Exposição (R$)', angle: -90, position: 'insideLeft' }}
                  />
                  <ZAxis type="number" dataKey="score" range={[100, 1000]} name="Score de Risco" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100">
                            <p className="font-bold text-slate-800 mb-2">{data.name}</p>
                            <p className="text-sm text-slate-600">População: <span className="font-semibold">{data.pop.toLocaleString()}</span></p>
                            <p className="text-sm text-slate-600">Exposição: <span className="font-semibold text-red-600">R$ {fmtFull(data.exposure)}</span></p>
                            <p className="text-sm text-slate-600">Score: <span className="font-semibold" style={{color: NV_COL[data.nivel as keyof typeof NV_COL]}}>{data.score} ({NV_LABEL[data.nivel as keyof typeof NV_LABEL]})</span></p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  {Object.keys(NV_COL).map((nivel) => (
                    <Scatter 
                      key={nivel}
                      name={NV_LABEL[nivel as keyof typeof NV_LABEL]} 
                      data={stats.cityData.filter(c => c.nivel === nivel)} 
                      fill={NV_COL[nivel as keyof typeof NV_COL]} 
                      fillOpacity={0.7}
                    />
                  ))}
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function KpiCard({ title, value, subtitle, icon: Icon, color, bg }: any) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex items-start gap-4">
      <div className={`rounded-xl ${bg} p-3 ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{title}</p>
        <p className="text-2xl font-black text-slate-800 leading-none mb-1">{value}</p>
        <p className="text-xs font-medium text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}
