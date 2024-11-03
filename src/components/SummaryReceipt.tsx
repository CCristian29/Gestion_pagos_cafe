import React from 'react';
import { Coffee, Calendar } from 'lucide-react';
import { formatCOP } from './CurrencyFormat';

interface HarvestEntry {
  id: number;
  name: string;
  kg: number;
  pricePerKg: number;
  total: number;
  date: string;
}

interface SummaryReceiptProps {
  entries: HarvestEntry[];
  totalKg: number;
  totalPayment: number;
}

export const SummaryReceipt: React.FC<SummaryReceiptProps> = ({ entries, totalKg, totalPayment }) => {
  return (
    <div className="p-8 bg-white min-w-[700px] max-w-[800px] mx-auto" id="summary-receipt">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3 mb-2">
          <Coffee className="w-16 h-16 text-amber-700" />
        </div>
        <h1 className="text-3xl font-bold text-amber-900 mb-1">Finca "La Esperanza"</h1>
        <h2 className="text-xl font-semibold text-amber-800 mb-4">Reporte de Pagos - Recolección de Café</h2>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
      </div>

      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-amber-200">
              <th className="py-3 px-4 text-left">Fecha</th>
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-right">Kg</th>
              <th className="py-3 px-4 text-right">Precio/Kg</th>
              <th className="py-3 px-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-b border-amber-100">
                <td className="py-3 px-4">{entry.date}</td>
                <td className="py-3 px-4">{entry.name}</td>
                <td className="py-3 px-4 text-right">{entry.kg.toFixed(2)}</td>
                <td className="py-3 px-4 text-right">{formatCOP(entry.pricePerKg)}</td>
                <td className="py-3 px-4 text-right">{formatCOP(entry.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t-2 border-amber-200 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">Total Kilogramos:</span>
          <span className="text-xl font-bold">{totalKg.toFixed(2)} kg</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total a Pagar:</span>
          <span className="text-2xl font-bold text-amber-700">{formatCOP(totalPayment)}</span>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>Finca "La Esperanza" - Recolección de Café</p>
        <p>Este documento es un comprobante de pago válido</p>
      </footer>
    </div>
  );
};