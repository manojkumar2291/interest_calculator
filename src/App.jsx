import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultsPage from './components/ResultsPage';

function App() {
  const [results, setResults] = useState(null);

  const handleCalculation = (calculatedResults) => {
    setResults(calculatedResults);
  };

  return (
    <div className="App min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-4xl">
        {!results ? (
          <InputForm onCalculate={handleCalculation} />
        ) : (
          <ResultsPage results={results} onReset={() => setResults(null)} />
        )}
      </div>
    </div>
  );
}

export default App;
