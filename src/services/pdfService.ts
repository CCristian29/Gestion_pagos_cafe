import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { createRoot } from 'react-dom/client';
import React from 'react';

const PDF_CONFIG = {
  format: 'a4',
  unit: 'mm',
  orientation: 'portrait',
  compress: true
};

const CANVAS_CONFIG = {
  scale: 2,
  useCORS: true,
  logging: false,
  allowTaint: true,
  letterRendering: true,
  imageTimeout: 0,
  removeContainer: true,
  backgroundColor: '#ffffff'
};

const generatePDF = async (element: HTMLElement, filename: string) => {
  const canvas = await html2canvas(element, CANVAS_CONFIG);
  
  const pdf = new jsPDF(PDF_CONFIG);

  // Calculate dimensions to fit A4
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const aspectRatio = canvas.height / canvas.width;
  
  // Set optimal width while maintaining aspect ratio
  const imgWidth = pageWidth - 20; // 10mm margins
  const imgHeight = imgWidth * aspectRatio;
  
  // Convert canvas to compressed JPEG for smaller file size
  const imgData = canvas.toDataURL('image/jpeg', 0.8);
  
  // Add image centered on page with compression
  pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight, undefined, 'FAST');
  
  // Enable maximum compression
  pdf.setProperties({
    compression: true,
    compressPdf: true
  });
  
  pdf.save(filename);
};

export const printToPDF = async (
  Component: React.ComponentType<any>,
  props: any,
  filename: string
): Promise<void> => {
  // Create a temporary container with specific dimensions for better PDF quality
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '595px'; // A4 width at 72 DPI
  document.body.appendChild(container);

  try {
    const root = createRoot(container);
    await new Promise<void>((resolve) => {
      root.render(
        React.createElement('div', 
          { style: { backgroundColor: 'white', padding: '20px', width: '100%' } },
          React.createElement(Component, props)
        )
      );
      setTimeout(resolve, 100);
    });

    await generatePDF(container, filename);
  } finally {
    document.body.removeChild(container);
  }
};