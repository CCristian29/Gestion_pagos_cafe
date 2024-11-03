import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { Receipt } from '../components/Receipt';
import { SummaryReceipt } from '../components/SummaryReceipt';

const generatePDF = async (element: HTMLElement, filename: string) => {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const imgWidth = 210; // A4 width in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save(filename);
};

export const printToPDF = async (
  Component: React.ComponentType<any>,
  props: any,
  filename: string
) => {
  // Create a temporary container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  document.body.appendChild(container);

  // Render the component
  const root = createRoot(container);
  await new Promise<void>((resolve) => {
    root.render(
      React.createElement('div', 
        { style: { width: '800px', backgroundColor: 'white' } },
        React.createElement(Component, props)
      )
    );
    setTimeout(resolve, 100); // Wait for render
  });

  // Generate PDF
  await generatePDF(container, filename);

  // Cleanup
  document.body.removeChild(container);
  root.unmount();
};