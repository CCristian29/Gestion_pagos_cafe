# Coffee Harvester Payment System 🌱

A professional web application for managing coffee harvest payments at "La Esperanza" farm. Built with React, TypeScript, and Tailwind CSS.

![Coffee Harvester Payment System](https://images.unsplash.com/photo-1611174243622-4f7a6228d650?auto=format&fit=crop&q=80&w=2000)

## Features

- 📝 Record daily coffee harvest entries
- 💰 Calculate payments automatically
- 🧾 Generate PDF receipts for individual payments
- 📊 Create detailed summary reports
- 💱 Real-time currency formatting (COP)
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend Framework:** React with TypeScript
- **Styling:** Tailwind CSS
- **PDF Generation:** html2canvas + jsPDF
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/coffee-harvester-payment.git
cd coffee-harvester-payment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Recording a New Harvest

1. Enter the harvester's name
2. Input the collected kilograms
3. Verify/adjust the price per kilogram
4. Click "Registrar Recolección"

### Generating Receipts

- Click the printer icon next to any entry to generate a PDF receipt
- Use the "Descargar Reporte PDF" button to create a summary report

## Project Structure

```
src/
├── components/         # React components
│   ├── Receipt.tsx    # Individual receipt component
│   ├── SummaryReceipt.tsx  # Summary report component
│   └── CurrencyFormat.tsx  # Currency formatting utilities
├── services/          # Business logic and services
│   └── pdfService.ts  # PDF generation service
└── python/           # Python calculation utilities
    └── calculator.py  # Payment calculation module
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses ESLint and TypeScript for code quality. Ensure your code follows the established patterns:

- Use TypeScript types for all props and state
- Follow the existing component structure
- Maintain consistent naming conventions
- Write clear, descriptive comments

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Coffee icon by [Lucide React](https://lucide.dev)
- Farm photo by [Unsplash](https://unsplash.com)
- PDF generation powered by [html2canvas](https://html2canvas.hertzen.com) and [jsPDF](https://parall.ax/products/jspdf)

## Support

For support, email support@laesperanza.com or open an issue in the repository.

---

Made with ☕ at Finca "La Esperanza"