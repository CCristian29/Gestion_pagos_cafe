import React, { useState } from 'react';
import { Coffee, Wallet, Scale, User, Printer, FileText } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coffee className="w-12 h-12 text-amber-700" />
            <h1 className="text-4xl font-bold text-amber-900">Finca "La Esperanza"</h1>
          </div>
          <p className="text-amber-700">Sistema de Pago - Recolección de Café</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-amber-900 mb-6 flex items-center gap-2">
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
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Ingrese el precio por kg"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                Registrar Recolección
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Scale className="w-6 h-6 text-amber-600" />
                  <h3 className="text-lg font-semibold text-gray-700">Total Kg</h3>
                </div>
                <p className="text-3xl font-bold text-amber-600">{totalKg.toFixed(2)}</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Wallet className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-700">Total a Pagar</h3>
                </div>
                <CurrencyDisplay value={totalPayment} className="text-3xl font-bold text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-amber-900">Registros Recientes</h2>
                {entries.length > 0 && (
                  <button
                    onClick={handlePrintSummary}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                    Descargar Reporte PDF
                  </button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-amber-100">
                      <th className="text-left py-3 px-4">Fecha</th>
                      <th className="text-left py-3 px-4">Nombre</th>
                      <th className="text-right py-3 px-4">Kg</th>
                      <th className="text-right py-3 px-4">Precio/Kg</th>
                      <th className="text-right py-3 px-4">Total</th>
                      <th className="text-center py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id} className="border-b border-amber-50 hover:bg-amber-50">
                        <td className="py-3 px-4">{entry.date}</td>
                        <td className="py-3 px-4">{entry.name}</td>
                        <td className="py-3 px-4 text-right">{entry.kg.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right">{formatCOP(entry.pricePerKg)}</td>
                        <td className="py-3 px-4 text-right font-semibold">{formatCOP(entry.total)}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handlePrintReceipt(entry)}
                            className="text-amber-600 hover:text-amber-700 p-2 rounded-full hover:bg-amber-50 transition-colors"
                            title="Descargar recibo PDF"
                          >
                            <Printer className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {entries.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No hay registros aún</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;