import { useState } from "react";
import { Delete } from "lucide-react";

export default function ProgrammingCalculator() {
  const [decimalValue, setDecimalValue] = useState("0");
  const [selectedBase, setSelectedBase] = useState<"bin" | "oct" | "dec" | "hex">("dec");

  const handleNumberClick = (num: string | number) => {
    // Validate input based on selected base
    const numStr = String(num);
    let isValid = true;

    if (selectedBase === "bin" && (numStr !== "0" && numStr !== "1")) {
      isValid = false;
    } else if (selectedBase === "oct" && !/^[0-7]$/.test(numStr)) {
      isValid = false;
    } else if (selectedBase === "hex" && !/^[0-9A-Fa-f]$/.test(numStr)) {
      isValid = false;
    }

    if (!isValid) return;

    const current = decimalValue === "0" ? numStr : decimalValue + numStr;
    const decimal = convertToDecimal(current, selectedBase);
    setDecimalValue(String(decimal));
  };

  const convertToDecimal = (value: string, base: string): number => {
    try {
      if (base === "dec") return parseInt(value, 10);
      if (base === "bin") return parseInt(value, 2);
      if (base === "oct") return parseInt(value, 8);
      if (base === "hex") return parseInt(value, 16);
      return 0;
    } catch {
      return 0;
    }
  };

  const convertFromDecimal = (decimal: number, base: string): string => {
    try {
      if (decimal < 0) return "-" + convertFromDecimal(-decimal, base);
      if (base === "dec") return decimal.toString(10);
      if (base === "bin") return decimal.toString(2);
      if (base === "oct") return decimal.toString(8);
      if (base === "hex") return decimal.toString(16).toUpperCase();
      return "0";
    } catch {
      return "0";
    }
  };

  const getCurrentBaseValue = (): string => {
    return convertFromDecimal(parseInt(decimalValue) || 0, selectedBase);
  };

  const handleClear = () => {
    setDecimalValue("0");
  };

  const handleBackspace = () => {
    const current = getCurrentBaseValue();
    if (current.length === 1) {
      setDecimalValue("0");
    } else {
      const newValue = current.slice(0, -1);
      const decimal = convertToDecimal(newValue, selectedBase);
      setDecimalValue(String(decimal));
    }
  };

  const handleOperation = (op: string) => {
    const current = parseInt(decimalValue) || 0;
    let result = 0;

    switch (op) {
      case "NOT":
        result = ~current;
        break;
      case "<<":
        result = current << 1;
        break;
      case ">>":
        result = current >> 1;
        break;
      default:
        return;
    }

    setDecimalValue(String(result));
  };

  const handleBinaryOperation = (op: string, num: number) => {
    const current = parseInt(decimalValue) || 0;
    let result = 0;

    switch (op) {
      case "AND":
        result = current & num;
        break;
      case "OR":
        result = current | num;
        break;
      case "XOR":
        result = current ^ num;
        break;
      default:
        return;
    }

    setDecimalValue(String(result));
  };

  const getBaseInfo = () => {
    const value = parseInt(decimalValue) || 0;
    return {
      dec: value.toString(10),
      hex: value.toString(16).toUpperCase(),
      oct: value.toString(8),
      bin: value.toString(2),
    };
  };

  const baseInfo = getBaseInfo();
  const currentBaseDisplay = getCurrentBaseValue();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-2">
            Programming Calculator
          </h2>
          <p className="text-blue-700">
            Binary, Octal, Decimal & Hexadecimal Converter
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Display Section */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-800 p-8">
            <div className="space-y-4">
              {/* Base Selector Buttons */}
              <div className="flex gap-2 mb-6">
                {(["bin", "oct", "dec", "hex"] as const).map((base) => (
                  <button
                    key={base}
                    onClick={() => setSelectedBase(base)}
                    className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                      selectedBase === base
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {base.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Current Value Display */}
              <div className="text-right">
                <div className="text-slate-500 text-sm mb-2">
                  {selectedBase === "bin" && "Binary"}
                  {selectedBase === "oct" && "Octal"}
                  {selectedBase === "dec" && "Decimal"}
                  {selectedBase === "hex" && "Hexadecimal"}
                </div>
                <div className="text-white text-5xl font-bold break-words mb-6">
                  {currentBaseDisplay}
                </div>
              </div>

              {/* Base Conversion Display */}
              <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-700">
                <div className="text-center">
                  <div className="text-slate-400 text-xs font-semibold mb-1">
                    DEC
                  </div>
                  <div className="text-green-400 text-lg font-bold break-all">
                    {baseInfo.dec}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-xs font-semibold mb-1">
                    HEX
                  </div>
                  <div className="text-cyan-400 text-lg font-bold break-all">
                    {baseInfo.hex}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-xs font-semibold mb-1">
                    OCT
                  </div>
                  <div className="text-yellow-400 text-lg font-bold break-all">
                    {baseInfo.oct}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-xs font-semibold mb-1">
                    BIN
                  </div>
                  <div className="text-orange-400 text-lg font-bold break-all">
                    {baseInfo.bin.length > 8 ? baseInfo.bin.slice(-8) : baseInfo.bin}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="p-6 space-y-3">
            {/* Row 1: AC, DEL, NOT, << */}
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
                onClick={() => handleOperation("NOT")}
                className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
              >
                NOT
              </button>
              <button
                onClick={() => handleOperation("<<")}
                className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
              >
                &lt;&lt;
              </button>
            </div>

            {/* Row 2: F, E, D, C & >> */}
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => handleNumberClick("F")}
                className={`font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm ${
                  selectedBase === "hex"
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                }`}
                disabled={selectedBase !== "hex"}
              >
                F
              </button>
              <button
                onClick={() => handleNumberClick("E")}
                className={`font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm ${
                  selectedBase === "hex"
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                }`}
                disabled={selectedBase !== "hex"}
              >
                E
              </button>
              <button
                onClick={() => handleNumberClick("D")}
                className={`font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm ${
                  selectedBase === "hex"
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                }`}
                disabled={selectedBase !== "hex"}
              >
                D
              </button>
              <button
                onClick={() => handleNumberClick("C")}
                className={`font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm ${
                  selectedBase === "hex"
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                }`}
                disabled={selectedBase !== "hex"}
              >
                C
              </button>
              <button
                onClick={() => handleOperation(">>")}
                className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
              >
                &gt;&gt;
              </button>
            </div>

            {/* Row 3: B, A, 9, 8 & AND */}
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => handleNumberClick("B")}
                className={`font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm ${
                  selectedBase === "hex"
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                }`}
                disabled={selectedBase !== "hex"}
              >
                B
              </button>
              <button
                onClick={() => handleNumberClick("A")}
                className={`font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm ${
                  selectedBase === "hex"
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                }`}
                disabled={selectedBase !== "hex"}
              >
                A
              </button>
              <button
                onClick={() => handleNumberClick(9)}
                className={`font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm ${
                  ["hex", "dec"].includes(selectedBase)
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                }`}
                disabled={!["hex", "dec"].includes(selectedBase)}
              >
                9
              </button>
              <button
                onClick={() => handleNumberClick(8)}
                className={`font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm ${
                  ["hex", "dec", "oct"].includes(selectedBase)
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                }`}
                disabled={!["hex", "dec", "oct"].includes(selectedBase)}
              >
                8
              </button>
              <button
                onClick={() => handleBinaryOperation("AND", 1)}
                className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
              >
                AND
              </button>
            </div>

            {/* Row 4: 7, 6, 5, 4 & OR */}
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => handleNumberClick(7)}
                className={`font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm ${
                  ["hex", "dec", "oct"].includes(selectedBase)
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                }`}
                disabled={!["hex", "dec", "oct"].includes(selectedBase)}
              >
                7
              </button>
              <button
                onClick={() => handleNumberClick(6)}
                className={`font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm ${
                  ["hex", "dec"].includes(selectedBase)
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                }`}
                disabled={!["hex", "dec"].includes(selectedBase)}
              >
                6
              </button>
              <button
                onClick={() => handleNumberClick(5)}
                className={`font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm ${
                  ["hex", "dec"].includes(selectedBase)
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                }`}
                disabled={!["hex", "dec"].includes(selectedBase)}
              >
                5
              </button>
              <button
                onClick={() => handleNumberClick(4)}
                className={`font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm ${
                  ["hex", "dec"].includes(selectedBase)
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                }`}
                disabled={!["hex", "dec"].includes(selectedBase)}
              >
                4
              </button>
              <button
                onClick={() => handleBinaryOperation("OR", 1)}
                className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
              >
                OR
              </button>
            </div>

            {/* Row 5: 3, 2, 1, 0 & XOR */}
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => handleNumberClick(3)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
              >
                3
              </button>
              <button
                onClick={() => handleNumberClick(2)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
              >
                2
              </button>
              <button
                onClick={() => handleNumberClick(1)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
              >
                1
              </button>
              <button
                onClick={() => handleNumberClick(0)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
              >
                0
              </button>
              <button
                onClick={() => handleBinaryOperation("XOR", 1)}
                className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm"
              >
                XOR
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <h3 className="text-lg font-bold text-blue-600 mb-3">
            Bitwise Operations Guide
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-blue-700 font-semibold mb-1">Base Conversion</p>
              <p className="text-slate-600">
                Automatically converts between Binary, Octal, Decimal, and Hexadecimal
              </p>
            </div>
            <div>
              <p className="text-blue-700 font-semibold mb-1">Bitwise Operators</p>
              <p className="text-slate-600">
                AND, OR, XOR, NOT, Left Shift (&lt;&lt;), Right Shift (&gt;&gt;)
              </p>
            </div>
            <div>
              <p className="text-blue-700 font-semibold mb-1">Programming Use</p>
              <p className="text-slate-600">
                Perfect for developers working with binary, hex, and bitwise operations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
