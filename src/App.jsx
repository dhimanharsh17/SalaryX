import { useState } from "react";
import SalaryForm from "./components/SalaryForm";
import SalaryResult from "./components/SalaryResult";

function App() {
  const [details, setDetails] = useState(null);

  const calculateInHand = (totalCtc, regime, originalCtc, bonus) => {
    const basic = totalCtc * 0.50;
    const pfEmployee = basic * 0.12;
    const professionalTax = 200 * 12;

    let taxableIncome = totalCtc - pfEmployee;
    let incomeTax = 0;

    if (regime === "new") {
      if (taxableIncome <= 300000) incomeTax = 0;
      else if (taxableIncome <= 600000) incomeTax = (taxableIncome - 300000) * 0.05;
      else if (taxableIncome <= 900000) incomeTax = (300000 * 0.05) + (taxableIncome - 600000) * 0.10;
      else if (taxableIncome <= 1200000) incomeTax = (300000 * 0.05) + (300000 * 0.10) + (taxableIncome - 900000) * 0.15;
      else if (taxableIncome <= 1500000) incomeTax = (300000 * 0.05) + (300000 * 0.10) + (300000 * 0.15) + (taxableIncome - 1200000) * 0.20;
      else incomeTax = (300000 * 0.05) + (300000 * 0.10) + (300000 * 0.15) + (300000 * 0.20) + (taxableIncome - 1500000) * 0.30;
    } else {
      if (taxableIncome <= 250000) incomeTax = 0;
      else if (taxableIncome <= 500000) incomeTax = (taxableIncome - 250000) * 0.05;
      else if (taxableIncome <= 1000000) incomeTax = (250000 * 0.05) + (taxableIncome - 500000) * 0.20;
      else incomeTax = (250000 * 0.05) + (500000 * 0.20) + (taxableIncome - 1000000) * 0.30;
    }

    const totalDeductions = pfEmployee + professionalTax + incomeTax;
    const annualInHand = totalCtc - totalDeductions;
    const monthlyInHand = annualInHand / 12;

    setDetails({
      ctc: totalCtc,
      pfEmployee,
      professionalTax,
      incomeTax,
      totalDeductions,
      annualInHand,
      monthlyInHand,
      regime,
      originalCtc,
      bonus,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4 relative">
       <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-ping"></div>
       </div>
      
      <h1 className="text-3xl font-bold mb-6">SalaryX - CTC Calculator</h1>

      <p className="mb-8 text-center max-w-xl text-gray-600">
        Calculate your take-home salary and understand your complete compensation structure.
      </p>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6">
        <SalaryForm onCalculate={calculateInHand} />
      </div>

      {details && (
        <div className="mt-8 w-full max-w-md">
          <SalaryResult details={details} />
        </div>
      )}
    </div>
  );
}

export default App;
