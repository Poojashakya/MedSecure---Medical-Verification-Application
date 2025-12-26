import React, { useState } from 'react';
import { 
  Upload, 
  Camera, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Thermometer,
  Eye,
  Shield,
  Clock,
  Building2,
  Package
} from 'lucide-react';
import { mockMedicines, generateIoTData, type MedicineRecord } from '../data/mockDatabase';

interface VerificationResult {
  medicine: MedicineRecord;
  iotData: any[];
  computerVision: {
    sealIntegrity: 'good' | 'damaged' | 'tampered';
    packagingQuality: 'excellent' | 'good' | 'poor';
    labelReadability: 'clear' | 'faded' | 'unreadable';
  };
  finalStatus: 'safe' | 'unsafe';
  issues: string[];
}

const Verification: React.FC = () => {
  const [scanType, setScanType] = useState<'upload' | 'camera' | 'manual'>('upload');
  const [isScanning, setIsScanning] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleScan = async () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Find medicine (use barcode input or simulate random selection)
    const targetBarcode = barcodeInput || mockMedicines[Math.floor(Math.random() * mockMedicines.length)].barcode;
    const medicine = mockMedicines.find(m => m.barcode === targetBarcode) || mockMedicines[0];
    
    // Generate IoT data
    const iotData = generateIoTData(medicine.id);
    
    // Simulate computer vision analysis
    const computerVision = {
      sealIntegrity: Math.random() > 0.8 ? 'damaged' : 'good' as 'good' | 'damaged',
      packagingQuality: Math.random() > 0.9 ? 'poor' : 'excellent' as 'excellent' | 'poor',
      labelReadability: Math.random() > 0.95 ? 'faded' : 'clear' as 'clear' | 'faded'
    };
    
    // Determine final status
    const issues: string[] = [];
    let finalStatus: 'safe' | 'unsafe' = 'safe';
    
    // Check expiry
    const expiryDate = new Date(medicine.expiryDate);
    if (expiryDate <= new Date()) {
      issues.push('Medicine has expired');
      finalStatus = 'unsafe';
    }
    
    // Check status
    if (medicine.status === 'recalled') {
      issues.push('Medicine has been recalled by manufacturer');
      finalStatus = 'unsafe';
    }
    
    // Check IoT data for cold chain medicines
    if (medicine.requiresColdChain) {
      const criticalReadings = iotData.filter(d => d.status === 'critical').length;
      if (criticalReadings > 0) {
        issues.push('Cold chain integrity compromised');
        finalStatus = 'unsafe';
      }
    }
    
    // Check computer vision
    if (computerVision.sealIntegrity === 'damaged') {
      issues.push('Package seal appears damaged or tampered');
      finalStatus = 'unsafe';
    }
    
    if (computerVision.packagingQuality === 'poor') {
      issues.push('Poor packaging quality detected');
      finalStatus = 'unsafe';
    }
    
    setResult({
      medicine,
      iotData,
      computerVision,
      finalStatus,
      issues
    });
    
    setIsScanning(false);
  };

  const handleNewScan = () => {
    setResult(null);
    setBarcodeInput('');
  };

  if (result) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Verification Results</h1>
          <button
            onClick={handleNewScan}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Scan
          </button>
        </div>

        {/* Final Status */}
        <div className={`rounded-xl p-6 ${
          result.finalStatus === 'safe' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center">
            {result.finalStatus === 'safe' ? (
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            ) : (
              <XCircle className="h-8 w-8 text-red-600 mr-3" />
            )}
            <div>
              <h2 className={`text-2xl font-bold ${
                result.finalStatus === 'safe' ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.finalStatus === 'safe' ? '✅ SAFE TO USE' : '❌ UNSAFE - DO NOT USE'}
              </h2>
              {result.issues.length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold text-red-700">Issues Found:</p>
                  <ul className="list-disc list-inside text-red-600">
                    {result.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Medicine Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Package className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">Medicine Information</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-lg text-gray-900">{result.medicine.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Batch Number</label>
                <p className="text-lg text-gray-900">{result.medicine.batchNumber}</p>
              </div>
              <div className="flex items-center">
                <Building2 className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-gray-700">{result.medicine.manufacturer}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-gray-700">Expires: {result.medicine.expiryDate}</span>
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                result.medicine.status === 'active' ? 'bg-green-100 text-green-800' :
                result.medicine.status === 'expired' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {result.medicine.status.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Computer Vision Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="text-xl font-semibold">Computer Vision Analysis</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Seal Integrity</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  result.computerVision.sealIntegrity === 'good' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {result.computerVision.sealIntegrity}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Packaging Quality</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  result.computerVision.packagingQuality === 'excellent' 
                    ? 'bg-green-100 text-green-800' 
                    : result.computerVision.packagingQuality === 'good'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {result.computerVision.packagingQuality}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Label Readability</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  result.computerVision.labelReadability === 'clear' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {result.computerVision.labelReadability}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* IoT Data (for cold chain medicines) */}
        {result.medicine.requiresColdChain && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Thermometer className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">Cold Chain Monitoring</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {result.iotData[result.iotData.length - 1].temperature}°C
                </div>
                <div className="text-sm text-blue-600">Current Temperature</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">
                  {result.iotData[result.iotData.length - 1].humidity}%
                </div>
                <div className="text-sm text-green-600">Current Humidity</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className={`text-2xl font-bold ${
                  result.iotData[result.iotData.length - 1].status === 'optimal' ? 'text-green-600' :
                  result.iotData[result.iotData.length - 1].status === 'warning' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {result.iotData[result.iotData.length - 1].status}
                </div>
                <div className="text-sm text-gray-600">Chain Status</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Last 24 hours of temperature monitoring data available in Dashboard
            </div>
          </div>
        )}

        {/* Blockchain Logging Simulation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold">Blockchain Record</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">
              Verification result logged to blockchain:
            </p>
            <div className="font-mono text-xs text-gray-800 break-all">
              Transaction Hash: 0x{Math.random().toString(16).substr(2, 40)}...
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Block: #{Math.floor(Math.random() * 1000000)} | Gas Used: 21000
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Medicine Verification</h1>
        <p className="text-gray-600">
          Scan, upload, or manually enter medicine information for comprehensive verification
        </p>
      </div>

      {/* Scan Type Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Choose Verification Method</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => setScanType('upload')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              scanType === 'upload' 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="font-semibold">Upload Image</div>
            <div className="text-sm text-gray-600">Upload barcode/QR image</div>
          </button>
          
          <button
            onClick={() => setScanType('camera')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              scanType === 'camera' 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Camera className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="font-semibold">Camera Scan</div>
            <div className="text-sm text-gray-600">Use device camera</div>
          </button>
          
          <button
            onClick={() => setScanType('manual')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              scanType === 'manual' 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Search className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="font-semibold">Manual Entry</div>
            <div className="text-sm text-gray-600">Enter barcode manually</div>
          </button>
        </div>
      </div>

      {/* Scanning Interface */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {scanType === 'upload' && (
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-gray-400 transition-colors">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">Upload Medicine Package Image</p>
              <p className="text-gray-500 mb-4">
                Upload clear images of barcode, QR code, or medicine package
              </p>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="file-upload"
              />
              <label 
                htmlFor="file-upload"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
              >
                Select Image
              </label>
            </div>
          </div>
        )}

        {scanType === 'camera' && (
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-12">
              <Camera className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">Camera Scanner</p>
              <p className="text-gray-500 mb-4">
                Position barcode or QR code in camera view
              </p>
              <div className="bg-black rounded-lg h-64 flex items-center justify-center mb-4">
                <div className="text-white text-center">
                  <Camera className="h-8 w-8 mx-auto mb-2" />
                  <p>Camera Preview</p>
                  <p className="text-sm text-gray-300">(Simulated)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {scanType === 'manual' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Barcode Number
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                placeholder="e.g., 1234567890123"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Try these sample barcodes: 1234567890123, 2345678901234, 3456789012345
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center mx-auto"
          >
            {isScanning ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Start Verification
              </>
            )}
          </button>
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-center mb-3">
            <Shield className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-blue-800">Verification Process</h3>
          </div>
          <ul className="text-blue-700 space-y-2">
            <li>• Database verification of batch & expiry</li>
            <li>• IoT cold chain monitoring (if applicable)</li>
            <li>• Computer vision packaging analysis</li>
            <li>• Blockchain logging of results</li>
            <li>• Final safety determination</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-xl p-6">
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-6 w-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-green-800">What We Check</h3>
          </div>
          <ul className="text-green-700 space-y-2">
            <li>• Medicine authenticity & recalls</li>
            <li>• Expiration date validation</li>
            <li>• Temperature control compliance</li>
            <li>• Package integrity & tampering</li>
            <li>• Manufacturer verification</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Verification;