import { useState } from "react";

export default function SalaryForm({ onCalculate }) {
  const [ctc, setCtc] = useState("");
  const [bonus, setBonus] = useState("");
  const [regime, setRegime] = useState("new");

  const handleSubmit = (e) => {
    e.preventDefault();
    const bonusValue = parseFloat(bonus) || 0;
    const totalCtc = parseFloat(ctc) + bonusValue;
    if (ctc) {
      onCalculate(totalCtc, regime, parseFloat(ctc), bonusValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      <label className="block font-medium">Cost to Company (CTC)</label>
      
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
        <input
          type="number"
          placeholder="Enter your yearly CTC"
          value={ctc}
          onChange={(e) => setCtc(e.target.value)}
          className="pl-8 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <input
        type="number"
        placeholder="Bonus / Variable Pay (Optional)"
        value={bonus}
        onChange={(e) => setBonus(e.target.value)}
        className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div>
        <p className="font-medium mb-2">Select Tax Regime:</p>
        <div className="flex space-x-2">
          <button
            type="button"
            className={`flex-1 py-2 rounded border ${regime === "new" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
            onClick={() => setRegime("new")}
          >
            New Regime
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded border ${regime === "old" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
            onClick={() => setRegime("old")}
          >
            Old Regime
          </button>
        </div>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
        Calculate In-Hand Salary
      </button>
    </form>
  );
}
