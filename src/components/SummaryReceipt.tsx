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
    <div className="w-full max-w-[700px] mx-auto bg-white" id="summary-receipt">
      <div className="text-center mb-6 border-b pb-4">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Coffee className="w-12 h-12 text-amber-700" />
        </div>
        <h1 className="text-2xl font-bold text-amber-900 mb-1">Finca "La Esperanza"</h1>
        <h2 className="text-lg font-semibold text-amber-800 mb-2">Reporte de Pagos - Recolección de Café</h2>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
      </div>

      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-amber-200">
              <th className="py-2 px-3 text-left">Fecha</th>
              <th className="py-2 px-3 text-left">Nombre</th>
              <th className="py-2 px-3 text-right">Kg</th>
              <th className="py-2 px-3 text-right">Precio/Kg</th>
              <th className="py-2 px-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-b border-amber-50">
                <td className="py-2 px-3">{entry.date}</td>
                <td className="py-2 px-3">{entry.name}</td>
                <td className="py-2 px-3 text-right">{entry.kg.toFixed(2)}</td>
                <td className="py-2 px-3 text-right">{formatCOP(entry.pricePerKg)}</td>
                <td className="py-2 px-3 text-right">{formatCOP(entry.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-amber-200 pt-4 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold">Total Kilogramos:</span>
          <span className="font-bold">{totalKg.toFixed(2)} kg</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total a Pagar:</span>
          <span className="text-lg font-bold text-amber-700">{formatCOP(totalPayment)}</span>
        </div>
      </div>

      <footer className="mt-6 pt-4 border-t text-xs text-center text-gray-500">
        <p>Finca "La Esperanza" - Recolección de Café</p>
        <p className="mt-1">Este documento es un comprobante de pago válido</p>
        <p className="mt-1">{new Date().toLocaleDateString('es-CO')}</p>
      </footer>
    </div>
  );
};