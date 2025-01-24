// App.js
import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultsPage from './components/ResultsPage';

function App() {
  const [results, setResults] = useState(null);

  const handleCalculation = (calculatedResults) => {
    setResults(calculatedResults);
  };

  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {!results ? (
        <InputForm onCalculate={handleCalculation} />
      ) : (
        <ResultsPage results={results} onReset={() => setResults(null)} />
      )}
    </div>
  );
}

export default App;