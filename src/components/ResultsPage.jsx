import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ResultsPage({ results, onReset }) {
  const { totalYears, totalMonths, remainingDays, breakdown, startDate, endDate, principal, rate } = results;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Interest Calculation Breakdown', 20, 20);

    doc.setFontSize(12);
    doc.text(`Start Date: ${startDate}`, 20, 40);
    doc.text(`End Date: ${endDate}`, 20, 50);
    doc.text(`Principal Amount: ₹${principal}`, 20, 60);
    doc.text(`Rate of Interest: ${rate}%`, 20, 70);

    const tableData = breakdown.map((item, index) => [
      index + 1,
      item.type,
      item.period,
      item.interest,
      item.total,
    ]);

    doc.autoTable({
      head: [['#', 'Type', 'Period', 'Interest', 'Total Amount']],
      body: tableData,
      startY: 80,
    });

    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/)) {
      const pdfOutput = doc.output('blob');
      const url = URL.createObjectURL(pdfOutput);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Interest_Calculation_Breakdown.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } else {
      doc.save('Interest_Calculation_Breakdown.pdf');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 max-w-4xl w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">Calculation Results</h1>
      <div className="mb-6">
        <p><strong>Start Date:</strong> {startDate}</p>
        <p><strong>End Date:</strong> {endDate}</p>
        <p><strong>Principal Amount:</strong> ₹{principal}</p>
        <p><strong>Rate of Interest:</strong> {rate}%</p>
        <p><strong>Total Years:</strong> {totalYears}</p>
        <p><strong>Total Months:</strong> {totalMonths}</p>
        <p><strong>Remaining Days:</strong> {remainingDays}</p>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-200">
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Period</th>
            <th className="border border-gray-300 p-2">Interest</th>
            <th className="border border-gray-300 p-2">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {breakdown.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
              <td className="border border-gray-300 p-2 text-center">{item.type}</td>
              <td className="border border-gray-300 p-2 text-center">{item.period}</td>
              <td className="border border-gray-300 p-2 text-center">{item.interest}</td>
              <td className="border border-gray-300 p-2 text-center">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 flex justify-between flex-col sm:flex-row gap-4">
        <button
          onClick={onReset}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all"
        >
          Reset
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;
