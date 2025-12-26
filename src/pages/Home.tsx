import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  Database, 
  Thermometer, 
  Eye, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  AlertTriangle,
  Users,
  Globe
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Scanning',
      description: 'Scan barcodes, QR codes, or upload images to verify medicine authenticity'
    },
    {
      icon: Database,
      title: 'Database Verification',
      description: 'Cross-reference batch numbers, expiry dates, and manufacturers'
    },
    {
      icon: Thermometer,
      title: 'IoT Cold Chain',
      description: 'Monitor temperature and humidity for vaccines and insulin in real-time'
    },
    {
      icon: Eye,
      title: 'Computer Vision',
      description: 'AI-powered packaging integrity and seal verification'
    },
    {
      icon: Shield,
      title: 'Blockchain Logging',
      description: 'Immutable verification records on Ethereum/Polygon testnet'
    },
    {
      icon: CheckCircle,
      title: 'Safety Verification',
      description: 'Final safety status: Safe ✅ or Unsafe ❌ with detailed reports'
    }
  ];

  const stats = [
    { label: 'Medicines Verified', value: '50,000+', icon: Shield },
    { label: 'Hospitals & Pharmacies', value: '500+', icon: Users },
    { label: 'Countries Served', value: '25+', icon: Globe },
    { label: 'Fake Medicines Detected', value: '2,100+', icon: AlertTriangle }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Secure Your <span className="text-blue-600">Medical Supply Chain</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            MedSecure uses advanced technology to verify medicine authenticity, monitor cold chain integrity, 
            and ensure patient safety through blockchain-verified verification records.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/verification" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Start Verification
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/dashboard" 
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-8">
        <div className="flex items-start">
          <AlertTriangle className="h-8 w-8 text-red-600 mr-4 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">The Critical Problem</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-2">Counterfeit Medicines</h3>
                <p className="text-red-600">
                  Over 1 million deaths annually from fake medicines. Up to 30% of medicines in developing 
                  countries are counterfeit, causing treatment failures and antimicrobial resistance.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-2">Cold Chain Failures</h3>
                <p className="text-red-600">
                  Temperature-sensitive medicines lose efficacy when cold chain is broken. Vaccines and 
                  insulin can become dangerous if improperly stored, risking patient safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Comprehensive Verification System</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Medical Supply Chain?</h2>
        <p className="text-xl text-blue-100 mb-6">
          Join hundreds of hospitals and pharmacies using MedSecure to protect patients
        </p>
        <Link 
          to="/verification"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
        >
          Start Verifying Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default Home;