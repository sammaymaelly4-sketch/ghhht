import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ArrowLeft } from 'lucide-react';

// Fix for Leaflet default marker icon in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// COMPONENTES EXTRAÍDOS PARA EVITAR RE-RENDER E VAZAMENTO DE MEMÓRIA
interface KPICardProps {
  titulo: string;
  valor: string | number;
  icon: string;
  tendencia: string;
}

const KPICard = React.memo(({ titulo, valor, icon, tendencia }: KPICardProps) => (
  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
    <p className="text-sm text-gray-600">{titulo}</p>
    <p className="text-2xl font-bold mt-2">{valor}</p>
    <p className={`text-sm mt-2 font-semibold ${tendencia.includes('+') ? 'text-red-600' : 'text-green-600'}`}>
      {tendencia.includes('+') ? '📈' : '📉'} {tendencia}
    </p>
  </div>
));

const RiscoTrabalhistaApp = ({ onBack }: { onBack?: () => void }) => {
  // ==================== DADOS ====================
  const municipiosData = useMemo(() => [
    {
      id: 1,
      nome: "Santo Antônio do Pinhal",
      lat: -22.8167,
      lng: -45.9167,
      ibge: 3548203,
      exposicao: 350000,
      populacao: 1250,
      risco: 35,
      processosAtivos: 8,
      totalLitigio: 250000,
      prestatarios: 45,
      exposicaoSST: 85000,
      brasao: "🔵",
      tendencia: "+5%"
    },
    {
      id: 2,
      nome: "São José dos Campos",
      lat: -23.1791,
      lng: -45.8877,
      ibge: 3549904,
      exposicao: 2500000,
      populacao: 650000,
      risco: 72,
      processosAtivos: 145,
      totalLitigio: 1800000,
      prestatarios: 1250,
      exposicaoSST: 650000,
      brasao: "🟡",
      tendencia: "-3%"
    },
    {
      id: 3,
      nome: "Jacareí",
      lat: -23.2965,
      lng: -45.9658,
      ibge: 3524402,
      exposicao: 1200000,
      populacao: 230000,
      risco: 65,
      processosAtivos: 78,
      totalLitigio: 900000,
      prestatarios: 540,
      exposicaoSST: 320000,
      brasao: "🟠",
      tendencia: "+8%"
    }
  ], []);

  // ==================== STATE ====================
  const [selectedMunicipio, setSelectedMunicipio] = useState(municipiosData[0]);
  const [filtros, setFiltros] = useState({
    periodo: 'mes',
    risco: [0, 100],
    exposicao: [0, 5000000]
  });
  const [viewType, setViewType] = useState('mapa'); // 'mapa' ou 'lista'

  // ==================== DADOS PROCESSADOS ====================
  const municipiosFiltrados = useMemo(() => {
    return municipiosData.filter(m => 
      m.risco >= filtros.risco[0] && 
      m.risco <= filtros.risco[1] &&
      m.exposicao >= filtros.exposicao[0] &&
      m.exposicao <= filtros.exposicao[1]
    );
  }, [filtros, municipiosData]);

  const top5Exposicao = useMemo(() => {
    return [...municipiosData]
      .sort((a, b) => b.exposicao - a.exposicao)
      .slice(0, 5)
      .map(m => ({
        nome: m.nome,
        exposicao: m.exposicao / 1000000,
        risco: m.risco,
        percentualTotal: ((m.exposicao / municipiosData.reduce((sum, x) => sum + x.exposicao, 0)) * 100).toFixed(1)
      }));
  }, [municipiosData]);

  const distribuicaoRisco = useMemo(() => {
    const alto = municipiosData.filter(m => m.risco >= 70).length;
    const medio = municipiosData.filter(m => m.risco >= 40 && m.risco < 70).length;
    const baixo = municipiosData.filter(m => m.risco < 40).length;

    return [
      { name: 'Alto Risco', value: alto, cor: '#ef4444' },
      { name: 'Médio Risco', value: medio, cor: '#f97316' },
      { name: 'Baixo Risco', value: baixo, cor: '#22c55e' }
    ];
  }, [municipiosData]);

  const timelineData = useMemo(() => [
    { mes: 'Jan', volume: 450, exposicao: 1200000 },
    { mes: 'Fev', volume: 520, exposicao: 1350000 },
    { mes: 'Mar', volume: 480, exposicao: 1280000 },
    { mes: 'Abr', volume: 610, exposicao: 1520000 },
    { mes: 'Mai', volume: 550, exposicao: 1400000 },
    { mes: 'Jun', volume: 700, exposicao: 1680000 }
  ], []);

  // ==================== RENDER PRINCIPAL ====================
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* HEADER INLINED */}
      <div className="bg-white border-b-2 border-gray-200 p-4 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            {onBack && (
              <button onClick={onBack} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedMunicipio.nome}</h1>
              <p className="text-sm text-gray-600">IBGE: {selectedMunicipio.ibge}</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              selectedMunicipio.risco >= 70 ? 'bg-red-100 text-red-800' :
              selectedMunicipio.risco >= 40 ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {selectedMunicipio.risco >= 70 ? 'RISCO ALTO' :
               selectedMunicipio.risco >= 40 ? 'RISCO MÉDIO' :
               'RISCO BAIXO'}
            </span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              📥 Exportar PDF
            </button>
          </div>
        </div>

        {/* BANNER DE EXPOSIÇÃO */}
        <div className="bg-red-600 text-white p-4 rounded-lg mt-4 max-w-7xl mx-auto shadow-md">
          <p className="text-lg font-bold">Exposição Total Estimada: R$ {(selectedMunicipio.exposicao / 1000000).toFixed(2)}M</p>
          <p className="text-sm opacity-90">0,8% RCL anual | ATUALIZADO: MARÇO 2026</p>
        </div>
      </div>

      {/* FILTROS PERSISTENTES INLINED */}
      <div className="bg-gray-100 p-4 sticky top-[140px] z-10 border-b shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Período</label>
            <select value={filtros.periodo} onChange={(e) => setFiltros(f => ({...f, periodo: e.target.value}))}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="semana">Última Semana</option>
              <option value="mes">Último Mês</option>
              <option value="trimestre">Último Trimestre</option>
              <option value="ano">Último Ano</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Risco: {filtros.risco[0]}-{filtros.risco[1]}</label>
            <input type="range" min="0" max="100" 
              onChange={(e) => setFiltros(f => ({...f, risco: [parseInt(e.target.value), f.risco[1]]}))}
              className="w-full accent-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Exposição: até R$ {(filtros.exposicao[1] / 1000000).toFixed(1)}M</label>
            <input type="range" min="0" max="5000000" step="100000"
              onChange={(e) => setFiltros(f => ({...f, exposicao: [0, parseInt(e.target.value)]}))}
              className="w-full accent-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Visualização</label>
            <div className="flex gap-2">
              <button onClick={() => setViewType('mapa')} 
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${viewType === 'mapa' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                🗺️ Mapa
              </button>
              <button onClick={() => setViewType('lista')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${viewType === 'lista' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                📋 Lista
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* KPI CARDS INLINED */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <KPICard 
            titulo="Processos Ativos" 
            valor={selectedMunicipio.processosAtivos}
            icon="⚖️"
            tendencia="+5%"
          />
          <KPICard 
            titulo="Total em Litígio" 
            valor={`R$ ${(selectedMunicipio.totalLitigio / 1000000).toFixed(2)}M`}
            icon="💰"
            tendencia="-3%"
          />
          <KPICard 
            titulo="Prestatários" 
            valor={selectedMunicipio.prestatarios}
            icon="👥"
            tendencia="+8%"
          />
          <KPICard 
            titulo="Exposição SST" 
            valor={`R$ ${(selectedMunicipio.exposicaoSST / 1000000).toFixed(2)}M`}
            icon="🏥"
            tendencia="+2%"
          />
        </div>

        {/* MAPA OU TABELA */}
        {viewType === 'mapa' ? (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Seleção de Município - Mapa Interativo</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 h-[400px] relative z-0">
              <MapContainer center={[-23.1791, -45.8877]} zoom={9} className="h-full w-full rounded-lg relative z-0">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                {municipiosFiltrados.map(municipio => (
                  <Marker
                    key={municipio.id}
                    position={[municipio.lat, municipio.lng]}
                    eventHandlers={{
                      click: () => setSelectedMunicipio(municipio),
                    }}
                  >
                    <Popup>
                      <div className="font-bold text-gray-900">{municipio.nome}</div>
                      <div className="text-sm text-gray-600">Risco: <span className="font-semibold">{municipio.risco}/100</span></div>
                      <div className="text-sm text-gray-600">Exposição: <span className="font-semibold text-red-600">R$ {(municipio.exposicao / 1000000).toFixed(2)}M</span></div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Visão em Lista - Todos os Municípios</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 text-left font-semibold text-gray-700">Município</th>
                    <th className="p-4 text-left font-semibold text-gray-700">Exposição</th>
                    <th className="p-4 text-left font-semibold text-gray-700">População</th>
                    <th className="p-4 text-left font-semibold text-gray-700">Risco</th>
                    <th className="p-4 text-left font-semibold text-gray-700">Processos</th>
                    <th className="p-4 text-left font-semibold text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {municipiosFiltrados.map((municipio) => (
                    <tr key={municipio.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">{municipio.brasao} {municipio.nome}</td>
                      <td className="p-4 text-gray-600">R$ {(municipio.exposicao / 1000000).toFixed(2)}M</td>
                      <td className="p-4 text-gray-600">{municipio.populacao.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          municipio.risco >= 70 ? 'bg-red-100 text-red-800' :
                          municipio.risco >= 40 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {municipio.risco}/100
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">{municipio.processosAtivos}</td>
                      <td className="p-4">
                        <button onClick={() => setSelectedMunicipio(municipio)} className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                          Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* GRÁFICOS INLINED */}
        <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 col-span-1">
            <h3 className="text-base font-bold mb-4 text-gray-800">Top 5: Maior Exposição</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={top5Exposicao} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="nome" angle={-45} textAnchor="end" height={60} fontSize={10} tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                  <YAxis fontSize={10} tickFormatter={(val) => `${val}M`} tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} formatter={(value: number) => `R$ ${value.toFixed(1)}M`} />
                  <Bar dataKey="exposicao" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-base font-bold mb-4 text-gray-800">Distribuição de Risco</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribuicaoRisco}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                  >
                    {distribuicaoRisco.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '12px'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-base font-bold mb-4 text-gray-800">Timeline - Últimos 6 Meses</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="mes" fontSize={10} tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                  <YAxis fontSize={10} tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '12px'}} />
                  <Line type="monotone" dataKey="volume" stroke="#f97316" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} name="Volume" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiscoTrabalhistaApp;
