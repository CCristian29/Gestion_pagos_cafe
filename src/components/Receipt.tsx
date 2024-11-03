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
    <div className="p-8 bg-white min-w-[300px] max-w-[400px] mx-auto" id="receipt">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2">
          <Coffee className="w-12 h-12 text-amber-700" />
        </div>
        <h2 className="text-2xl font-bold text-amber-900">Finca "La Esperanza"</h2>
        <p className="text-lg font-semibold text-amber-800">Comprobante de Pago</p>
        <p className="text-sm text-gray-600">Recolección de Café</p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-700" />
          <span className="text-gray-600">Fecha:</span>
          <span className="font-medium">{date}</span>
        </div>

        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-amber-700" />
          <span className="text-gray-600">Recolector:</span>
          <span className="font-medium">{name}</span>
        </div>

        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-amber-700" />
          <span className="text-gray-600">Kilogramos:</span>
          <span className="font-medium">{kg.toFixed(2)} kg</span>
        </div>

        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-amber-700" />
          <span className="text-gray-600">Precio por kg:</span>
          <span className="font-medium">{formatCOP(pricePerKg)}</span>
        </div>
      </div>

      <div className="border-t-2 border-amber-100 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">Total a Pagar:</span>
          <span className="text-2xl font-bold text-amber-700">{formatCOP(total)}</span>
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-gray-500">
        <p>¡Gracias por su trabajo!</p>
        <p className="mt-2">Este documento es un comprobante de pago válido</p>
      </div>
    </div>
  );
};