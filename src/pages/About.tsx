import React from 'react';
import { 
  Shield, 
  Zap, 
  Globe, 
  Award, 
  Users, 
  TrendingUp,
  CheckCircle,
  Lightbulb,
  Heart,
  Lock
} from 'lucide-react';

const About: React.FC = () => {
  const innovations = [
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Immutable verification records on Ethereum/Polygon ensuring complete audit trail integrity'
    },
    {
      icon: Zap,
      title: 'Real-time IoT',
      description: 'Continuous cold chain monitoring with instant alerts for temperature deviations'
    },
    {
      icon: Globe,
      title: 'Computer Vision',
      description: 'AI-powered analysis of packaging integrity, seals, and potential tampering'
    },
    {
      icon: Award,
      title: 'Multi-layer Verification',
      description: 'Database, IoT, and visual inspection combined for comprehensive authentication'
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Patient Safety',
      description: 'Prevents counterfeit medicines from reaching patients, saving lives and preventing treatment failures'
    },
    {
      icon: Lock,
      title: 'Supply Chain Security',
      description: 'End-to-end visibility and verification from manufacturer to patient'
    },
    {
      icon: TrendingUp,
      title: 'Operational Efficiency',
      description: 'Streamlined verification process reducing manual checks and human error'
    },
    {
      icon: CheckCircle,
      title: 'Regulatory Compliance',
      description: 'Automated compliance reporting and audit trails for regulatory authorities'
    }
  ];

  const stats = [
    { number: '1M+', label: 'Lives Protected', description: 'Through counterfeit detection' },
    { number: '99.9%', label: 'Accuracy Rate', description: 'In medicine verification' },
    { number: '500+', label: 'Healthcare Partners', description: 'Hospitals and pharmacies' },
    { number: '25+', label: 'Countries', description: 'Global deployment' }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Research & Development',
      description: 'Identified the critical need for comprehensive medicine verification in healthcare supply chains'
    },
    {
      year: '2024',
      title: 'Prototype Development',
      description: 'Built initial blockchain-based verification system with IoT integration'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Added computer vision capabilities for packaging and seal integrity analysis'
    },
    {
      year: '2025',
      title: 'Global Launch',
      description: 'Launched MedSecure platform serving hospitals and pharmacies worldwide'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Innovation in <span className="text-blue-600">Medical Safety</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          MedSecure combines cutting-edge blockchain technology, IoT sensors, and AI-powered computer vision 
          to create the world's most comprehensive medicine verification platform.
        </p>
      </div>

      {/* Problem & Solution */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-red-800">The Global Crisis</h2>
          </div>
          <div className="space-y-4 text-red-700">
            <p>
              <strong>1 million deaths annually</strong> from counterfeit medicines according to WHO
            </p>
            <p>
              <strong>Up to 30% of medicines</strong> in developing countries are counterfeit or substandard
            </p>
            <p>
              <strong>$200 billion market</strong> for fake medicines threatens global health security
            </p>
            <p>
              <strong>Temperature-sensitive medicines</strong> like vaccines lose efficacy without proper cold chain
            </p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-8">
          <div className="flex items-center mb-4">
            <Lightbulb className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-green-800">Our Solution</h2>
          </div>
          <div className="space-y-4 text-green-700">
            <p>
              <strong>Multi-layer verification</strong> combining database checks, IoT monitoring, and AI analysis
            </p>
            <p>
              <strong>Blockchain immutability</strong> ensures verification records cannot be tampered with
            </p>
            <p>
              <strong>Real-time monitoring</strong> of cold chain integrity prevents medicine degradation
            </p>
            <p>
              <strong>Instant safety determination</strong> protects patients from harmful counterfeit medicines
            </p>
          </div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Our Global Impact</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-xl font-semibold mb-1">{stat.label}</div>
              <div className="text-blue-100 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Innovations */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technology Innovations</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {innovations.map((innovation, index) => {
            const Icon = innovation.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-lg p-3 mr-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{innovation.title}</h3>
                </div>
                <p className="text-gray-600">{innovation.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Benefits for Healthcare</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-lg p-3 mr-4 flex-shrink-0">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Development Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Development Journey</h2>
        <div className="space-y-8">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="bg-blue-100 rounded-full p-3 mr-6 flex-shrink-0">
                <div className="text-blue-600 font-bold text-sm">{item.year}</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Architecture */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Architecture</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Frontend Layer</h3>
            <p className="text-gray-600">
              React-based interface with responsive design, camera integration, and real-time data visualization
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Layer</h3>
            <p className="text-gray-600">
              AI/ML models for computer vision, IoT data processing, and verification logic with real-time analysis
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Lock className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Blockchain Layer</h3>
            <p className="text-gray-600">
              Ethereum/Polygon smart contracts for immutable record storage with cryptographic security
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Users className="h-8 w-8 mr-3" />
          <h2 className="text-3xl font-bold">Join the Revolution</h2>
        </div>
        <p className="text-xl text-green-100 mb-6 max-w-2xl mx-auto">
          Be part of the solution to protect patients worldwide from counterfeit medicines. 
          Together, we can ensure every medicine is safe, authentic, and effective.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Partner with Us
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;