import React, { useState } from 'react';
import { Coffee, Wallet, Scale, User, Printer, FileText, Menu, X, Home, History, Settings } from 'lucide-react';
import { CurrencyDisplay, formatCOP } from './components/CurrencyFormat';
import { Receipt } from './components/Receipt';
import { SummaryReceipt } from './components/SummaryReceipt';
import { printToPDF } from './services/pdfService';

interface HarvestEntry {
  id: number;
  name: string;
  kg: number;
  pricePerKg: number;
  total: number;
  date: string;
}

function App() {
  const [name, setName] = useState('');
  const [kg, setKg] = useState('');
  const [pricePerKg, setPricePerKg] = useState('3000');
  const [entries, setEntries] = useState<HarvestEntry[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'history' | 'settings'>('home');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !kg || !pricePerKg) return;

    const kgNum = parseFloat(kg);
    const priceNum = parseFloat(pricePerKg);
    const total = Math.round(kgNum * priceNum);

    const newEntry: HarvestEntry = {
      id: Date.now(),
      name,
      kg: kgNum,
      pricePerKg: priceNum,
      total,
      date: new Date().toLocaleDateString('es-CO')
    };

    setEntries([newEntry, ...entries]);
    setName('');
    setKg('');
  };

  const totalKg = entries.reduce((sum, entry) => sum + entry.kg, 0);
  const totalPayment = entries.reduce((sum, entry) => sum + entry.total, 0);

  const handlePrintReceipt = async (entry: HarvestEntry) => {
    const filename = `recibo-${entry.name.toLowerCase().replace(/\s+/g, '-')}-${entry.date.replace(/\//g, '-')}.pdf`;
    await printToPDF(Receipt, entry, filename);
  };

  const handlePrintSummary = async () => {
    const today = new Date().toLocaleDateString('es-CO').replace(/\//g, '-');
    const filename = `reporte-recoleccion-${today}.pdf`;
    await printToPDF(
      SummaryReceipt,
      { entries, totalKg, totalPayment },
      filename
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-semibold text-amber-900 mb-4 md:mb-6 flex items-center gap-2">
                <User className="w-6 h-6" />
                Nuevo Registro
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Recolector
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm md:text-base"
                    placeholder="Ingrese el nombre"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kilogramos Recolectados
                  </label>
                  <input
                    type="number"
                    value={kg}
                    onChange={(e) => setKg(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm md:text-base"
                    placeholder="Ingrese los kg"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio por Kg (COP)
                  </label>
                  <input
                    type="text"
                    value={pricePerKg}
                    onChange={(e) => setPricePerKg(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm md:text-base"
                    placeholder="Ingrese el precio por kg"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200 text-sm md:text-base"
                >
                  Registrar Recolección
                </button>
              </form>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-white rounded-xl shadow-lg p-3 md:p-4">
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <Scale className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                    <h3 className="text-sm md:text-lg font-semibold text-gray-700">Total Kg</h3>
                  </div>
                  <p className="text-lg md:text-3xl font-bold text-amber-600">{totalKg.toFixed(2)}</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-3 md:p-4">
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <Wallet className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                    <h3 className="text-sm md:text-lg font-semibold text-gray-700">Total</h3>
                  </div>
                  <CurrencyDisplay value={totalPayment} className="text-lg md:text-3xl font-bold text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
                  <h2 className="text-xl md:text-2xl font-semibold text-amber-900">Registros</h2>
                  {entries.length > 0 && (
                    <button
                      onClick={handlePrintSummary}
                      className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm whitespace-nowrap"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Descargar PDF</span>
                    </button>
                  )}
                </div>
                <div className="overflow-x-auto -mx-4 md:mx-0">
                  <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-amber-100">
                      <thead>
                        <tr className="text-xs md:text-sm">
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">Fecha</th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">Nombre</th>
                          <th className="px-3 py-2 text-right font-semibold text-gray-700">Kg</th>
                          <th className="px-3 py-2 text-right font-semibold text-gray-700 hidden sm:table-cell">Precio/Kg</th>
                          <th className="px-3 py-2 text-right font-semibold text-gray-700">Total</th>
                          <th className="px-3 py-2 text-center font-semibold text-gray-700 w-10">PDF</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-50 text-xs md:text-sm">
                        {entries.map((entry) => (
                          <tr key={entry.id} className="hover:bg-amber-50">
                            <td className="px-3 py-2 whitespace-nowrap">{entry.date}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{entry.name}</td>
                            <td className="px-3 py-2 text-right whitespace-nowrap">{entry.kg.toFixed(2)}</td>
                            <td className="px-3 py-2 text-right whitespace-nowrap hidden sm:table-cell">{formatCOP(entry.pricePerKg)}</td>
                            <td className="px-3 py-2 text-right whitespace-nowrap font-semibold">{formatCOP(entry.total)}</td>
                            <td className="px-3 py-2 text-center">
                              <button
                                onClick={() => handlePrintReceipt(entry)}
                                className="text-amber-600 hover:text-amber-700 p-1.5 rounded-full hover:bg-amber-50 transition-colors inline-flex items-center justify-center"
                                title="Descargar recibo PDF"
                              >
                                <Printer className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {entries.length === 0 && (
                      <p className="text-center text-gray-500 py-4 text-sm">No hay registros aún</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold text-amber-900 mb-4">Historial Completo</h2>
            <p className="text-gray-600 text-sm md:text-base">Próximamente: Visualización detallada del historial con filtros y estadísticas.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold text-amber-900 mb-4">Configuración</h2>
            <p className="text-gray-600 text-sm md:text-base">Próximamente: Ajustes de la aplicación y preferencias del usuario.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out z-30 w-64 bg-white shadow-xl`}>
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <Coffee className="w-7 h-7 md:w-8 md:h-8 text-amber-700" />
            <h1 className="text-lg md:text-xl font-bold text-amber-900">La Esperanza</h1>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => {
                setCurrentView('home');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm md:text-base ${currentView === 'home' ? 'bg-amber-100 text-amber-900' : 'hover:bg-gray-100'}`}
            >
              <Home className="w-5 h-5" />
              <span>Inicio</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('history');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm md:text-base ${currentView === 'history' ? 'bg-amber-100 text-amber-900' : 'hover:bg-gray-100'}`}
            >
              <History className="w-5 h-5" />
              <span>Historial</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('settings');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm md:text-base ${currentView === 'settings' ? 'bg-amber-100 text-amber-900' : 'hover:bg-gray-100'}`}
            >
              <Settings className="w-5 h-5" />
              <span>Configuración</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="lg:pl-64">
        <div className="container mx-auto px-4 py-4 md:py-8">
          <header className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-1">Sistema de Pagos</h1>
            <p className="text-amber-700 text-sm md:text-base">Recolección de Café</p>
          </header>

          {renderContent()}
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;