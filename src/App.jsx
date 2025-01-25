import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import ResultsPage from './components/ResultsPage';
import History from './components/History';

function App() {
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];
    setHistory(storedHistory);
  }, []);

  const handleCalculation = (calculatedResults) => {
    setResults(calculatedResults);

    const newHistory = [calculatedResults, ...history.slice(0, 9)]; // Keep only the last 10 calculations
    setHistory(newHistory);
    localStorage.setItem('calculationHistory', JSON.stringify(newHistory));
  };

  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {!results ? (
        <>
          <InputForm onCalculate={handleCalculation} />
          <History history={history} onViewDetails={setResults} />
        </>
      ) : (
        <ResultsPage results={results} onReset={() => setResults(null)} />
      )}
    </div>
  );
}
export default App;