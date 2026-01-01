import { useState } from "react";
import { Delete, RotatCw } from "lucide-react";
import { Link } from "react-router-dom";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumberClick = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperation = (nextOperation: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(nextOperation);
    setWaitingForNewValue(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "−":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        return prev / current;
      case "%":
        return prev % current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    const currentValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(display);
    setDisplay(String(currentValue / 100));
  };

  const handlePlusMinus = () => {
    const currentValue = parseFloat(display);
    setDisplay(String(-currentValue));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          >
            CalcMath
          </Link>
          <Link
            to="/"
            className="text-sm px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Home
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-sm">
          {/* Calculator Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Display Section */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 p-6">
              <div className="text-right space-y-2">
                <div className="text-slate-400 text-sm h-6">
                  {operation && previousValue !== null
                    ? `${previousValue} ${operation}`
                    : ""}
                </div>
                <div className="text-white text-6xl font-light tracking-tight break-words">
                  {display}
                </div>
              </div>
            </div>

            {/* Button Grid */}
            <div className="p-6 space-y-3">
              {/* Row 1: AC, DEL, %, ÷ */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={handleClear}
                  className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
                >
                  AC
                </button>
                <button
                  onClick={handleBackspace}
                  className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <Delete size={20} />
                </button>
                <button
                  onClick={handlePercentage}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
                >
                  %
                </button>
                <button
                  onClick={() => handleOperation("÷")}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
                >
                  ÷
                </button>
              </div>

              {/* Row 2: 7, 8, 9, × */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleNumberClick("7")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xl py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
                >
                  7
                </button>
                <button
                  onClick={() => handleNumberClick("8")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xl py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
                >
                  8
                </button>
                <button
                  onClick={() => handleNumberClick("9")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xl py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
                >
                  9
                </button>
                <button
                  onClick={() => handleOperation("×")}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
                >
                  ×
                </button>
              </div>

              {/* Row 3: 4, 5, 6, − */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleNumberClick("4")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xl py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
                >
                  4
                </button>
                <button
                  onClick={() => handleNumberClick("5")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xl py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
                >
                  5
                </button>
                <button
                  onClick={() => handleNumberClick("6")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xl py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
                >
                  6
                </button>
                <button
                  onClick={() => handleOperation("−")}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
                >
                  −
                </button>
              </div>

              {/* Row 4: 1, 2, 3, + */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleNumberClick("1")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xl py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
                >
                  1
                </button>
                <button
                  onClick={() => handleNumberClick("2")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xl py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
                >
                  2
                </button>
                <button
                  onClick={() => handleNumberClick("3")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xl py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
                >
                  3
                </button>
                <button
                  onClick={() => handleOperation("+")}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
                >
                  +
                </button>
              </div>

              {/* Row 5: 0, +/-, ., = */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleNumberClick("0")}
                  className="col-span-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xl py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
                >
                  0
                </button>
                <button
                  onClick={handlePlusMinus}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-lg py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
                >
                  +/−
                </button>
                <button
                  onClick={handleDecimal}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xl py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
                >
                  .
                </button>
              </div>

              {/* Row 6: = Button (Full Width) */}
              <button
                onClick={handleEquals}
                className="w-full bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-2xl py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
