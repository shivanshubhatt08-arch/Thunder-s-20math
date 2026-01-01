import { useState } from "react";
import { Delete, RotateCcw } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-6 space-y-4">
          {/* Display */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-2xl p-6 text-right border border-white/20">
            <div className="text-white/60 text-sm h-6 mb-2">
              {operation && previousValue !== null
                ? `${previousValue} ${operation}`
                : ""}
            </div>
            <div className="text-white text-5xl font-light tracking-tight break-words">
              {display}
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1: Clear, Backspace, Percentage, Divide */}
            <button
              onClick={handleClear}
              className="col-span-2 bg-gradient-to-br from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-red-400/30"
            >
              <div className="flex items-center justify-center gap-2">
                <RotateCcw size={18} />
                Clear
              </div>
            </button>
            <button
              onClick={handleBackspace}
              className="bg-gradient-to-br from-orange-500/80 to-orange-600/80 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-orange-400/30"
            >
              <Delete size={20} />
            </button>
            <button
              onClick={handlePercentage}
              className="bg-gradient-to-br from-orange-500/80 to-orange-600/80 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-orange-400/30"
            >
              %
            </button>

            {/* Row 2: 7, 8, 9, ÷ */}
            <button
              onClick={() => handleNumberClick("7")}
              className="bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/15 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-white/20"
            >
              7
            </button>
            <button
              onClick={() => handleNumberClick("8")}
              className="bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/15 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-white/20"
            >
              8
            </button>
            <button
              onClick={() => handleNumberClick("9")}
              className="bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/15 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-white/20"
            >
              9
            </button>
            <button
              onClick={() => handleOperation("÷")}
              className="bg-gradient-to-br from-blue-500/80 to-blue-600/80 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-blue-400/30"
            >
              ÷
            </button>

            {/* Row 3: 4, 5, 6, × */}
            <button
              onClick={() => handleNumberClick("4")}
              className="bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/15 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-white/20"
            >
              4
            </button>
            <button
              onClick={() => handleNumberClick("5")}
              className="bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/15 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-white/20"
            >
              5
            </button>
            <button
              onClick={() => handleNumberClick("6")}
              className="bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/15 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-white/20"
            >
              6
            </button>
            <button
              onClick={() => handleOperation("×")}
              className="bg-gradient-to-br from-blue-500/80 to-blue-600/80 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-blue-400/30"
            >
              ×
            </button>

            {/* Row 4: 1, 2, 3, − */}
            <button
              onClick={() => handleNumberClick("1")}
              className="bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/15 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-white/20"
            >
              1
            </button>
            <button
              onClick={() => handleNumberClick("2")}
              className="bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/15 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-white/20"
            >
              2
            </button>
            <button
              onClick={() => handleNumberClick("3")}
              className="bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/15 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-white/20"
            >
              3
            </button>
            <button
              onClick={() => handleOperation("−")}
              className="bg-gradient-to-br from-blue-500/80 to-blue-600/80 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-blue-400/30"
            >
              −
            </button>

            {/* Row 5: 0, +/-, ., + */}
            <button
              onClick={() => handleNumberClick("0")}
              className="col-span-2 bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/15 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-white/20"
            >
              0
            </button>
            <button
              onClick={handlePlusMinus}
              className="bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/15 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-white/20"
            >
              +/−
            </button>
            <button
              onClick={handleDecimal}
              className="bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/15 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-white/20"
            >
              .
            </button>

            {/* Row 6: + and = */}
            <button
              onClick={() => handleOperation("+")}
              className="bg-gradient-to-br from-blue-500/80 to-blue-600/80 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-blue-400/30"
            >
              +
            </button>
            <button
              onClick={handleEquals}
              className="col-span-3 bg-gradient-to-br from-green-500/80 to-emerald-600/80 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-4 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm border border-green-400/30 text-lg"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
