import React from 'react';
import { Printer } from 'lucide-react';
import { Receipt } from './Receipt';
import { createRoot } from 'react-dom/client';

interface PrintButtonProps {
  entry: {
    name: string;
    kg: number;
    pricePerKg: number;
    total: number;
    date: string;
  };
}

export const PrintButton: React.FC<PrintButtonProps> = ({ entry }) => {
  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Create a container for the receipt
    const container = printWindow.document.createElement('div');
    printWindow.document.body.appendChild(container);

    // Add necessary styles
    const styleSheet = printWindow.document.createElement('style');
    styleSheet.textContent = `
      @media print {
        @page { margin: 0; }
        body { margin: 1cm; }
      }
      body { font-family: system-ui, -apple-system, sans-serif; }
    `;
    printWindow.document.head.appendChild(styleSheet);

    // Render the receipt in the new window
    const root = createRoot(container);
    root.render(<Receipt {...entry} />);

    // Print after the content is rendered
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <button
      onClick={handlePrint}
      className="text-amber-600 hover:text-amber-700 p-2 rounded-full hover:bg-amber-50 transition-colors"
      title="Imprimir recibo"
    >
      <Printer className="w-5 h-5" />
    </button>
  );
};