import React from 'react';

export const formatCOP = (value: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

interface CurrencyProps {
  value: number;
  className?: string;
}

export const CurrencyDisplay: React.FC<CurrencyProps> = ({ value, className = '' }) => {
  return <span className={className}>{formatCOP(value)}</span>;
};