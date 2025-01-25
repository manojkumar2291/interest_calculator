import React from 'react';

function History({ history, onViewDetails }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-6 w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4">Calculation History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">No history available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Start Date</th>
              <th className="border border-gray-300 p-2">End Date</th>
              <th className="border border-gray-300 p-2">Principal</th>
              <th className="border border-gray-300 p-2">Rate</th>
              <th className="border border-gray-300 p-2">Total Amount</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 p-2 text-center">{item.startDate}</td>
                <td className="border border-gray-300 p-2 text-center">{item.endDate}</td>
                <td className="border border-gray-300 p-2 text-center">₹{item.principal}</td>
                <td className="border border-gray-300 p-2 text-center">{item.rate}%</td>
                <td className="border border-gray-300 p-2 text-center">₹{item.breakdown[item.breakdown.length - 1]?.total}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => onViewDetails(item)}
                    className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;