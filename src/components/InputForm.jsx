// components/InputForm.js
import React, { useState } from 'react';
import { differenceInDays } from 'date-fns';

function InputForm({ onCalculate }) {
  const [formValues, setFormValues] = useState({
    principle: '',
    startDate: '',
    endDate: '',
    rate: '',
  });
  const [interestType, setInterestType] = useState('simple');
  const [amountType, setAmountType] = useState('percentage'); // for Fixed or Percentage Rate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { principle, startDate, endDate, rate,} = formValues;
    const P = parseFloat(principle);
    console.log("hi",amountType)
    const start = new Date(startDate);
    const end = new Date(endDate);
    let R=parseFloat(rate);
    if(amountType=='fixed'){
       R = parseFloat(rate)*12;
    }
    else{
       R = parseFloat(rate);
    }
    if (isNaN(P) || !startDate || !endDate || isNaN(R) || P <= 0 || R <= 0 || start > end) {
      alert('Please enter valid values and ensure the start date is before the end date.');
      return;
    }

    const totalDays = differenceInDays(end, start)-1;
    const totalYears = Math.floor(totalDays/ 365);
    const remainingDaysAfterYears = totalDays % 365;
    const totalMonths = Math.floor(remainingDaysAfterYears / 30);
    const remainingDays = remainingDaysAfterYears % 30;

    let breakdown = [];
    let currentAmount = P;

    // Calculation Logic for Simple Interest and Compound Interest
    const calculateInterest = (P, R, timePeriod, type) => {
      if (type === 'simple') {
        return (P * R * timePeriod) / 100;
      } else { // compound interest
        return P * Math.pow(1 + R / 100, timePeriod) - P;
      }
    };
 
    // Yearly Breakdown
    for (let i = 1; i <= totalYears; i++) {
      let interest = 0;
      
      
      interest = calculateInterest(currentAmount, R, 1, interestType);
      
      currentAmount += interest;
      breakdown.push({
        type: 'Year',
        period: `${i} Year`,
        interest: interest.toFixed(2),
        total: currentAmount.toFixed(2),
      });
    }

    // // Monthly Breakdown (considering 30 days per month)
    // for (let i = 1; i <= totalMonths; i++) {
    //   let interest = 0;
      
    //     interest = calculateInterest(currentAmount, R, 30 / 360, interestType); // Monthly interest calculation
      
    //   currentAmount += interest;
    //   breakdown.push({
    //     type: 'Month',
    //     period: `${i} Month`,
    //     interest: interest.toFixed(2),
    //     total: currentAmount.toFixed(2),
    //   });
    // }
    // Calculating interest for the remaining months
    const interestperyear=calculateInterest(currentAmount, R, 1, interestType);
const interestPerMonth =interestperyear/12 // Fixed interest per month for fixed rate

// Add a breakdown entry for Interest Per Month
breakdown.push({
type: 'Interest Per Month',
period: `1 Month`,
interest: interestPerMonth.toFixed(2),  // Interest for one month
total: currentAmount.toFixed(2),
});

// Multiply interest per month by the total months
const totalInterestForMonths = interestPerMonth * totalMonths;

// Update the current amount with the total interest for the months
currentAmount += totalInterestForMonths;

// Add a breakdown entry for Total Interest for Months
breakdown.push({
type: 'Total Interest for Months',
period: `${totalMonths} Month(s)`,
interest: totalInterestForMonths.toFixed(2),  // Total interest for all months
total: currentAmount.toFixed(2),
});

   // Calculating interest for the remaining days
const interestPerDay = interestPerMonth/30; // Fixed interest per day for fixed rate

// Add a breakdown entry for Interest Per Day
breakdown.push({
type: 'Interest Per Day',
period: `1 Day`,
interest: interestPerDay.toFixed(2),  // Interest for one day
total: currentAmount.toFixed(2),
});

// Multiply interest per day by the remaining days
const totalInterestForRemainingDays = interestPerDay * remainingDays;

// Update the current amount with the total interest for the remaining days
currentAmount += totalInterestForRemainingDays;

// Add a breakdown entry for Total Interest for Remaining Days
breakdown.push({
type: 'Remaining Days',
period: `${remainingDays} Day(s)`,
interest: totalInterestForRemainingDays.toFixed(2),  // Total interest for remaining days
total: currentAmount.toFixed(2),
});


    onCalculate({
      totalYears,
      totalMonths,
      remainingDays,
      breakdown,
      principal: P,
      startDate,
      endDate,
      rate: R,
      interestType,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6">
      <h1 className="text-2xl font-bold text-center">Interest Calculator</h1>
      <div>
        <label className="block text-lg font-medium">Amount (P):</label>
        <input
          type="number"
          name="principle"
          value={formValues.principle}
          onChange={handleChange}
          className="mt-1 w-full border-2 border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-lg font-medium">Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formValues.startDate}
          onChange={handleChange}
          className="mt-1 w-full border-2 border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-lg font-medium">End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formValues.endDate}
          onChange={handleChange}
          className="mt-1 w-full border-2 border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-full">
          <label className="block text-lg font-medium">Rate:</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="rate"
              value={formValues.rate}
              onChange={handleChange}
              className="mt-1 w-full border-2 border-gray-300 rounded-md p-2"
              required
            />
            <select
              name="rateType"
              value={amountType}
              onChange={(e) => setAmountType(e.target.value)}
              className="border-2 border-gray-300 rounded-md p-2"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Rupees</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="radio"
            value="simple"
            checked={interestType === 'simple'}
            onChange={() => setInterestType('simple')}
            className="mr-2"
          />
          Simple Interest
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="compound"
            checked={interestType === 'compound'}
            onChange={() => setInterestType('compound')}
            className="mr-2"
          />
          Compound Interest
        </label>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        Calculate
      </button>
    </form>
  );
}

export default InputForm;
