import { useState } from "react";
import { Delete } from "lucide-react";
import { Link } from "react-router-dom";

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isScientific, setIsScientific] = useState(false);
  const [angleMode, setAngleMode] = useState<"degree" | "radian">("degree");

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

  const handlePi = () => {
    setExpression(expression + Math.PI.toString());
  };

  const handleE = () => {
    setExpression(expression + Math.E.toString());
  };

  const calculateSin = () => {
    try {
      const value = parseFloat(expression);
      if (isNaN(value)) return;
      const radians = angleMode === "degree" ? (value * Math.PI) / 180 : value;
      const res = Math.sin(radians);
      setExpression(String(res.toFixed(6)));
      setResult(null);
    } catch {}
  };

  const calculateCos = () => {
    try {
      const value = parseFloat(expression);
      if (isNaN(value)) return;
      const radians = angleMode === "degree" ? (value * Math.PI) / 180 : value;
      const res = Math.cos(radians);
      setExpression(String(res.toFixed(6)));
      setResult(null);
    } catch {}
  };

  const calculateTan = () => {
    try {
      const value = parseFloat(expression);
      if (isNaN(value)) return;
      const radians = angleMode === "degree" ? (value * Math.PI) / 180 : value;
      const res = Math.tan(radians);
      setExpression(String(res.toFixed(6)));
      setResult(null);
    } catch {}
  };

  const calculateSqrt = () => {
    try {
      const value = parseFloat(expression);
      if (isNaN(value) || value < 0) return;
      const res = Math.sqrt(value);
      setExpression(String(res.toFixed(6)));
      setResult(null);
    } catch {}
  };

  const calculateLog = () => {
    try {
      const value = parseFloat(expression);
      if (isNaN(value) || value <= 0) return;
      const res = Math.log10(value);
      setExpression(String(res.toFixed(6)));
      setResult(null);
    } catch {}
  };

  const calculateLn = () => {
    try {
      const value = parseFloat(expression);
      if (isNaN(value) || value <= 0) return;
      const res = Math.log(value);
      setExpression(String(res.toFixed(6)));
      setResult(null);
    } catch {}
  };

  const calculateFactorial = () => {
    try {
      const value = parseInt(expression);
      if (isNaN(value) || value < 0) return;
      let res = 1;
      for (let i = 2; i <= value; i++) {
        res *= i;
      }
      setExpression(String(res));
      setResult(null);
    } catch {}
  };

  const calculatePower = () => {
    if (expression && !expression.endsWith(" ")) {
      setExpression(expression + " ^ ");
      setResult(null);
    }
  };

  const calculate = (): string => {
    try {
      let calcExpression = expression
        .replace(/−/g, "-")
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/\^/g, "**");

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
    } catch {}
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
      } catch {}
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          >
            ⚡ Thunder's Math
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsScientific(!isScientific)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isScientific
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {isScientific ? "Scientific" : "Basic"}
            </button>
            <Link
              to="/"
              className="text-sm px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-2xl">
          {/* Calculator Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Display Section */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 p-8 min-h-40 flex flex-col justify-end">
              <div className="space-y-4">
                {/* Mode Indicator */}
                <div className="text-right text-slate-500 text-sm">
                  {isScientific && angleMode === "degree" && "DEG"}
                  {isScientific && angleMode === "radian" && "RAD"}
                </div>

                {/* Expression Display */}
                <div className="text-right">
                  <div className="text-slate-400 text-2xl font-light tracking-wide break-words min-h-10">
                    {expression || "0"}
                  </div>
                </div>

                {/* Result Display */}
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
              {/* Basic Mode Row 1: AC, DEL, %, ÷ */}
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

              {/* Scientific Mode - Top Row */}
              {isScientific && (
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={calculateSin}
                    className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
                  >
                    sin
                  </button>
                  <button
                    onClick={calculateCos}
                    className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
                  >
                    cos
                  </button>
                  <button
                    onClick={calculateTan}
                    className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
                  >
                    tan
                  </button>
                  <button
                    onClick={() => setAngleMode(angleMode === "degree" ? "radian" : "degree")}
                    className="bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
                  >
                    {angleMode === "degree" ? "RAD" : "DEG"}
                  </button>
                </div>
              )}

              {/* Basic Mode Row 2 / Scientific Row 3: 7, 8, 9, × */}
              <div className="grid grid-cols-4 gap-2">
                {isScientific && (
                  <>
                    <button
                      onClick={calculateSqrt}
                      className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
                    >
                      √
                    </button>
                    <button
                      onClick={calculateLog}
                      className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
                    >
                      log
                    </button>
                    <button
                      onClick={calculateLn}
                      className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
                    >
                      ln
                    </button>
                    <button
                      onClick={calculateFactorial}
                      className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
                    >
                      n!
                    </button>
                  </>
                )}
                {!isScientific && (
                  <>
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
                  </>
                )}
              </div>

              {/* Basic Mode Row 3 / Scientific Row 4: 4, 5, 6, − */}
              <div className="grid grid-cols-4 gap-2">
                {isScientific && (
                  <>
                    <button
                      onClick={handlePi}
                      className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
                    >
                      π
                    </button>
                    <button
                      onClick={handleE}
                      className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
                    >
                      e
                    </button>
                    <button
                      onClick={calculatePower}
                      className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
                    >
                      x^y
                    </button>
                    <button
                      onClick={() => handleOperation("−")}
                      className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
                    >
                      −
                    </button>
                  </>
                )}
                {!isScientific && (
                  <>
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
                  </>
                )}
              </div>

              {/* Basic Mode Row 4 / Scientific Row 5: 1, 2, 3, + */}
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

              {/* Basic Mode Row 5 / Scientific Row 6: 0, +/-, . */}
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

              {/* Basic Mode Row 6 / Scientific Row 7: = Button (Full Width) */}
              <button
                onClick={handleEquals}
                className="w-full bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-2xl py-5 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                =
              </button>
            </div>
          </div>

          {/* Info Box */}
          {isScientific && (
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-blue-600 mb-3">Scientific Functions</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-700 font-semibold">Trigonometric</p>
                  <p className="text-slate-600">sin, cos, tan (Deg/Rad)</p>
                </div>
                <div>
                  <p className="text-blue-700 font-semibold">Logarithmic</p>
                  <p className="text-slate-600">log (base 10), ln (natural)</p>
                </div>
                <div>
                  <p className="text-blue-700 font-semibold">Power & Root</p>
                  <p className="text-slate-600">x^y, √x, n!</p>
                </div>
                <div>
                  <p className="text-blue-700 font-semibold">Constants</p>
                  <p className="text-slate-600">π, e</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
