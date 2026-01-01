import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConversionUnit {
  name: string;
  symbol: string;
  toBase: number; // Multiply by this to convert to base unit
}

interface ConversionCategory {
  name: string;
  baseUnit: string;
  units: Record<string, ConversionUnit>;
}

const categories: Record<string, ConversionCategory> = {
  length: {
    name: "Length",
    baseUnit: "meter",
    units: {
      millimeter: { name: "Millimeter", symbol: "mm", toBase: 0.001 },
      centimeter: { name: "Centimeter", symbol: "cm", toBase: 0.01 },
      meter: { name: "Meter", symbol: "m", toBase: 1 },
      kilometer: { name: "Kilometer", symbol: "km", toBase: 1000 },
      inch: { name: "Inch", symbol: "in", toBase: 0.0254 },
      foot: { name: "Foot", symbol: "ft", toBase: 0.3048 },
      yard: { name: "Yard", symbol: "yd", toBase: 0.9144 },
      mile: { name: "Mile", symbol: "mi", toBase: 1609.34 },
    },
  },
  weight: {
    name: "Weight",
    baseUnit: "kilogram",
    units: {
      milligram: { name: "Milligram", symbol: "mg", toBase: 0.000001 },
      gram: { name: "Gram", symbol: "g", toBase: 0.001 },
      kilogram: { name: "Kilogram", symbol: "kg", toBase: 1 },
      ton: { name: "Ton", symbol: "t", toBase: 1000 },
      ounce: { name: "Ounce", symbol: "oz", toBase: 0.0283495 },
      pound: { name: "Pound", symbol: "lb", toBase: 0.453592 },
    },
  },
  temperature: {
    name: "Temperature",
    baseUnit: "celsius",
    units: {
      celsius: { name: "Celsius", symbol: "°C", toBase: 1 },
      fahrenheit: { name: "Fahrenheit", symbol: "°F", toBase: 1 },
      kelvin: { name: "Kelvin", symbol: "K", toBase: 1 },
    },
  },
  volume: {
    name: "Volume",
    baseUnit: "liter",
    units: {
      milliliter: { name: "Milliliter", symbol: "ml", toBase: 0.001 },
      liter: { name: "Liter", symbol: "l", toBase: 1 },
      gallon: { name: "Gallon (US)", symbol: "gal", toBase: 3.78541 },
      pint: { name: "Pint (US)", symbol: "pt", toBase: 0.473176 },
      cup: { name: "Cup (US)", symbol: "cup", toBase: 0.236588 },
    },
  },
  currency: {
    name: "Currency",
    baseUnit: "usd",
    units: {
      usd: { name: "US Dollar", symbol: "$", toBase: 1 },
      eur: { name: "Euro", symbol: "€", toBase: 0.92 },
      gbp: { name: "British Pound", symbol: "£", toBase: 0.79 },
      inr: { name: "Indian Rupee", symbol: "₹", toBase: 83.12 },
      jpy: { name: "Japanese Yen", symbol: "¥", toBase: 149.5 },
      aud: { name: "Australian Dollar", symbol: "A$", toBase: 1.53 },
      cad: { name: "Canadian Dollar", symbol: "C$", toBase: 1.36 },
      chf: { name: "Swiss Franc", symbol: "CHF", toBase: 0.88 },
    },
  },
};

export default function UnitConverter() {
  const [selectedCategory, setSelectedCategory] = useState("length");
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("centimeter");
  const [toUnit, setToUnit] = useState("meter");

  const currentCategory = categories[selectedCategory];

  const convertValue = (): string => {
    if (!inputValue || isNaN(Number(inputValue))) {
      return "0";
    }

    const numValue = Number(inputValue);
    const fromUnitData = currentCategory.units[fromUnit];
    const toUnitData = currentCategory.units[toUnit];

    if (!fromUnitData || !toUnitData) {
      return "0";
    }

    // Special handling for temperature
    if (selectedCategory === "temperature") {
      let valueInCelsius = numValue;

      // Convert from input unit to Celsius
      if (fromUnit === "fahrenheit") {
        valueInCelsius = (numValue - 32) * (5 / 9);
      } else if (fromUnit === "kelvin") {
        valueInCelsius = numValue - 273.15;
      }

      // Convert from Celsius to output unit
      if (toUnit === "fahrenheit") {
        return (valueInCelsius * (9 / 5) + 32).toFixed(6);
      } else if (toUnit === "kelvin") {
        return (valueInCelsius + 273.15).toFixed(6);
      }
      return valueInCelsius.toFixed(6);
    }

    // Regular conversion for other categories
    const baseValue = numValue * fromUnitData.toBase;
    const result = baseValue / toUnitData.toBase;

    return result.toFixed(6);
  };

  const result = convertValue();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-2">
            Unit Converter
          </h2>
          <p className="text-blue-700">
            Convert between different units easily
          </p>
        </div>

        {/* Converter Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Select Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full border-slate-300">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categories).map(([key, category]) => (
                    <SelectItem key={key} value={key}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Input Value */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Enter Value
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a number"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              />
            </div>

            {/* From Unit */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                From
              </label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger className="w-full border-slate-300">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currentCategory.units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* To Unit */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                To
              </label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger className="w-full border-slate-300">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currentCategory.units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Result Display */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6">
              <div className="space-y-2">
                <div className="text-slate-400 text-sm">
                  {inputValue || "0"}{" "}
                  {currentCategory.units[fromUnit]?.symbol || ""}
                </div>
                <div className="text-green-400 text-4xl font-bold">
                  {result}
                </div>
                <div className="text-slate-400 text-sm">
                  {currentCategory.units[toUnit]?.symbol || ""}
                </div>
              </div>
            </div>

            {/* Conversion Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">
                  1 {currentCategory.units[fromUnit]?.symbol}
                </span>{" "}
                ={" "}
                <span className="font-semibold">
                  {(
                    currentCategory.units[fromUnit].toBase /
                    currentCategory.units[toUnit].toBase
                  ).toFixed(6)}{" "}
                  {currentCategory.units[toUnit]?.symbol}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Conversion Examples */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Quick Conversions
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                label: "1 Centimeter",
                value: "0.01",
                unit: "Meter",
              },
              {
                label: "1 Mile",
                value: "1.60934",
                unit: "Kilometer",
              },
              {
                label: "100 Pound",
                value: "45.3592",
                unit: "Kilogram",
              },
              {
                label: "32°F",
                value: "0",
                unit: "°Celsius",
              },
              {
                label: "1 USD",
                value: "83.12",
                unit: "Indian Rupee",
              },
              {
                label: "1 Gallon",
                value: "3.78541",
                unit: "Liter",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 transition-colors"
              >
                <div className="text-slate-600 text-sm">{item.label}</div>
                <div className="text-xl font-bold text-blue-600 mt-1">
                  {item.value} {item.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
