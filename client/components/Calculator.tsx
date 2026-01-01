import { useState } from "react";
import { Delete, RotatCcw } from "lucide-react";
import { Link } from "react-router-dom";

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleNumberClick = (num: string) => {
    setExpression(expression + num);
  };

  const handleDecimal = () => {
    const lastToken = expression.split(/[\+\−\×\÷]/).pop() || "";
    if (!lastToken.includes(".")) {
      setExpression(expression + ".");
    }
  };

  const handleOperation = (op: string) => {
    if (expression && !expression.endsWith(" ")) {
      setExpression(expression + " " + op + " ");
      setResult(null);
    }
  };

  const calculate = (): string => {
    try {
      let calcExpression = expression
        .replace(/−/g, "-")
        .replace(/×/g, "*")
        .replace(/÷/g, "/");

      const evalResult = eval(calcExpression);
      return String(evalResult);
    } catch {
      return "Error";
    }
  };

  const handleEquals = () => {
    if (expression) {
      const calcResult = calculate();
      setResult(calcResult);
    }
  };

  const handleClear = () => {
    setExpression("");
    setResult(null);
  };

  const handleBackspace = () => {
    setExpression(expression.slice(0, -1));
    setResult(null);
  };

  const handlePercentage = () => {
    try {
      let calcExpression = expression
        .replace(/−/g, "-")
        .replace(/×/g, "*")
        .replace(/÷/g, "/");

      const evalResult = eval(calcExpression);
      setExpression(String(evalResult / 100));
      setResult(null);
    } catch {
      // Ignore errors
    }
  };

  const handlePlusMinus = () => {
    if (expression) {
      try {
        let calcExpression = expression
          .replace(/−/g, "-")
          .replace(/×/g, "*")
          .replace(/÷/g, "/");

        const evalResult = eval(calcExpression);
        setExpression(String(-evalResult));
        setResult(null);
      } catch {
        // Ignore errors
      }
    }
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
            ⚡ Thunder's Math
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
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 p-8 min-h-40 flex flex-col justify-end">
              <div className="space-y-4">
                {/* Expression Display */}
                <div className="text-right">
                  <div className="text-slate-400 text-2xl font-light tracking-wide break-words min-h-10">
                    {expression || "0"}
                  </div>
                </div>

                {/* Result Display (shown when equals is pressed) */}
                {result !== null && (
                  <div className="pt-4 border-t border-slate-700">
                    <div className="text-right text-green-400 text-5xl font-bold tracking-tight">
                      {result}
                    </div>
                  </div>
                )}
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

              {/* Row 5: 0, +/-, . */}
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
