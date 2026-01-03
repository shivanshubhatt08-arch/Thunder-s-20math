import { Link } from "react-router-dom";
import { Calculator, Zap, Gauge, BarChart3, ArrowRight, Code2 } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Calculator,
      title: "Basic Calculations",
      description: "Quick and easy arithmetic operations with a clean interface",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant results with real-time calculations",
    },
    {
      icon: Gauge,
      title: "Precise Results",
      description: "Accurate calculations for all your mathematical needs",
    },
    {
      icon: BarChart3,
      title: "Track Values",
      description: "Keep track of your calculations with clear operation display",
    },
  ];

  const mathUnits = [
    { symbol: "π", value: "3.14159...", name: "Pi" },
    { symbol: "e", value: "2.71828...", name: "Euler" },
    { symbol: "φ", value: "1.61803...", name: "Golden Ratio" },
    { symbol: "√2", value: "1.41421...", name: "Square Root of 2" },
    { symbol: "∞", value: "Infinity", name: "Infinity" },
    { symbol: "0", value: "Zero", name: "Zero" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <span className="font-bold text-xl text-blue-600">Thunder's Math</span>
          </div>
            <div className="flex gap-2">
              <Link
                to="/calculator"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all duration-200"
              >
                Open Calculator
              </Link>
              <Link
                to="/programmer"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold hover:shadow-lg transition-all duration-200"
              >
                Programmer
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Main Numbers Display */}
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <span className="text-6xl font-bold text-blue-600">2</span>
              <span className="text-6xl font-bold text-slate-400">+</span>
              <span className="text-6xl font-bold text-purple-600">2</span>
              <span className="text-6xl font-bold text-slate-400">=</span>
              <span className="text-6xl font-bold text-green-600">4</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
                Your Perfect
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-600">
                Math Companion
              </span>
            </h1>

            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              Fast, accurate, and beautiful calculations at your fingertips. Designed for simplicity and efficiency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Standard Calculator
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/programmer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-slate-700 to-slate-900 text-white font-semibold hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Programming Calc
                <Code2 size={20} />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-slate-300 text-slate-900 font-semibold hover:bg-slate-50 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-600 mb-4">
              Why Choose Thunder's Math?
            </h2>
            <p className="text-lg text-blue-700">
              Powerful features wrapped in a simple, elegant design
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 hover:translate-y--2"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-blue-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mathematical Constants Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-600 mb-4">
              Mathematical Constants & Units
            </h2>
            <p className="text-lg text-blue-700">
              Explore the fascinating numbers that define our universe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mathUnits.map((unit, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-md"
              >
                <div className="text-5xl font-bold text-blue-600 mb-3">
                  {unit.symbol}
                </div>
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  {unit.name}
                </h3>
                <p className="text-blue-600 font-mono">
                  {unit.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Calculating Now
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the simplicity and power of Thunder's Math. Perfect for students, professionals, and everyone in between.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-600 font-bold text-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Standard Calculator
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/programmer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-800 text-white font-bold text-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Programming Calc
              <Code2 size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Credits Section */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-300 mb-4">Credits</h2>
            <p className="text-blue-200">Built with passion by an amazing team</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl bg-slate-700 border border-slate-600">
              <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                <Code2 size={24} />
                Developer
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-blue-200 font-semibold">Lightning Thunder</p>
                  <p className="text-slate-400 text-sm">Full-stack Development</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-700 border border-slate-600">
              <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                <Zap size={24} />
                Designer
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-blue-200 font-semibold">Lightning Thunder</p>
                  <p className="text-slate-400 text-sm">UI/UX Design</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-800 border border-blue-700 text-center">
            <p className="text-blue-200 text-lg mb-2">
              <span className="font-semibold">Special Thanks</span> to <span className="text-blue-300 font-bold">Lightning Thunder</span>
            </p>
            <p className="text-slate-300">
              For creating Thunder's Math - a powerful, beautiful, and user-friendly calculator application.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-blue-300 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold">⚡</span>
                </div>
                <span className="font-bold text-lg text-blue-400">Thunder's Math</span>
              </div>
              <p className="text-blue-300">Making calculations simple and beautiful.</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-3">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-300 hover:text-blue-200 transition">Basic Calc</a></li>
                <li><a href="#" className="text-blue-300 hover:text-blue-200 transition">Fast Results</a></li>
                <li><a href="#" className="text-blue-300 hover:text-blue-200 transition">Accurate</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-3">Contact</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-300 hover:text-blue-200 transition">Support</a></li>
                <li><a href="#" className="text-blue-300 hover:text-blue-200 transition">Feedback</a></li>
                <li><a href="#" className="text-blue-300 hover:text-blue-200 transition">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-blue-300">&copy; 2024 Thunder's Math. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
