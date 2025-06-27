import jsPDF from "jspdf";

export default function SalaryResult({ details }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("SalaryX - Salary Slip", 20, 20);
    doc.setFontSize(12);

    doc.text(`Annual CTC: ₹ ${details.ctc.toLocaleString()}`, 20, 40);
    doc.text(`Employee PF: ₹ ${details.pfEmployee.toLocaleString()}`, 20, 50);
    doc.text(`Professional Tax: ₹ ${details.professionalTax.toLocaleString()}`, 20, 60);
    doc.text(`Income Tax: ₹ ${details.incomeTax.toLocaleString()}`, 20, 70);
    doc.text(`Total Deductions: ₹ ${details.totalDeductions.toLocaleString()}`, 20, 80);
    doc.text(`Annual In-Hand Salary: ₹ ${details.annualInHand.toLocaleString()}`, 20, 90);
    doc.text(`Monthly In-Hand Salary: ₹ ${details.monthlyInHand.toFixed(2)}`, 20, 100);

    doc.save("SalaryX_Salary_Slip.pdf");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Salary Breakdown</h2>
      
      <div className="flex justify-between">
        <span>Annual CTC:</span>
        <span>₹ {details.ctc.toLocaleString()}</span>
      </div>
      {details.bonus > 0 && (
        <div className="flex justify-between">
          <span>Includes Bonus:</span>
          <span>₹ {details.bonus.toLocaleString()}</span>
        </div>
      )}
      <div className="flex justify-between">
        <span>Employee PF:</span>
        <span>₹ {details.pfEmployee.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span>Professional Tax:</span>
        <span>₹ {details.professionalTax.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span>Income Tax ({details.regime} Regime):</span>
        <span>₹ {details.incomeTax.toLocaleString()}</span>
      </div>
      <div className="flex justify-between font-semibold">
        <span>Total Deductions:</span>
        <span>₹ {details.totalDeductions.toLocaleString()}</span>
      </div>

      <hr className="my-2"/>

      <div className="flex justify-between font-bold text-green-700">
        <span>Annual In-Hand Salary:</span>
        <span>₹ {details.annualInHand.toLocaleString()}</span>
      </div>
      <div className="flex justify-between font-bold text-green-700">
        <span>Monthly In-Hand Salary:</span>
        <span>₹ {details.monthlyInHand.toFixed(2)}</span>
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <button 
          onClick={generatePDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Download Excel
        </button>
      </div>
    </div>
  );
}

