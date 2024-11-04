import React from 'react';
import { Coffee, Calendar, User, Scale, Wallet } from 'lucide-react';
import { formatCOP } from './CurrencyFormat';

interface ReceiptProps {
  name: string;
  kg: number;
  pricePerKg: number;
  total: number;
  date: string;
}

export const Receipt: React.FC<ReceiptProps> = ({ name, kg, pricePerKg, total, date }) => {
  return (
    <div className="w-full max-w-[600px] mx-auto bg-white" id="receipt">
      <div className="text-center mb-6 border-b pb-4">
        <div className="flex justify-center mb-2">
          <Coffee className="w-10 h-10 text-amber-700" />
        </div>
        <h2 className="text-xl font-bold text-amber-900">Finca "La Esperanza"</h2>
        <p className="text-base font-semibold text-amber-800">Comprobante de Pago</p>
        <p className="text-sm text-gray-600">Recolección de Café</p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="text-gray-600 w-24">Fecha:</span>
          <span className="font-medium">{date}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="text-gray-600 w-24">Recolector:</span>
          <span className="font-medium">{name}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Scale className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="text-gray-600 w-24">Kilogramos:</span>
          <span className="font-medium">{kg.toFixed(2)} kg</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Wallet className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="text-gray-600 w-24">Precio por kg:</span>
          <span className="font-medium">{formatCOP(pricePerKg)}</span>
        </div>
      </div>

      <div className="border-t border-amber-100 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-gray-700">Total a Pagar:</span>
          <span className="text-xl font-bold text-amber-700">{formatCOP(total)}</span>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 border-t pt-4">
        <p>¡Gracias por su trabajo!</p>
        <p className="mt-1">Este documento es un comprobante de pago válido</p>
        <p className="mt-1">Finca La Esperanza - {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};