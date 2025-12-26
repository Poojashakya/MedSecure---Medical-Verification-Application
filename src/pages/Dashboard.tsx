import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  Thermometer,
  Users,
  Package,
  Clock
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { generateIoTData, mockMedicines, mockBlockchainRecords } from '../data/mockDatabase';

const Dashboard: React.FC = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(mockMedicines[0]);
  
  // Generate IoT data for the selected medicine
  const iotData = generateIoTData(selectedMedicine.id);

  // Verification statistics
  const verificationStats = {
    total: mockBlockchainRecords.length,
    safe: mockBlockchainRecords.filter(r => r.verificationResult === 'safe').length,
    unsafe: mockBlockchainRecords.filter(r => r.verificationResult === 'unsafe').length,
    thisWeek: Math.floor(mockBlockchainRecords.length * 0.6)
  };

  // Mock category data for charts
  const categoryData = [
    { name: 'Vaccines', count: 45, color: '#3B82F6' },
    { name: 'Insulin', count: 32, color: '#10B981' },
    { name: 'Antibiotics', count: 28, color: '#F59E0B' },
    { name: 'Painkillers', count: 21, color: '#EF4444' },
    { name: 'Vitamins', count: 18, color: '#8B5CF6' }
  ];

  const monthlyData = [
    { month: 'Jan', verifications: 120, unsafe: 15 },
    { month: 'Feb', verifications: 135, unsafe: 18 },
    { month: 'Mar', verifications: 150, unsafe: 12 },
    { month: 'Apr', verifications: 165, unsafe: 20 },
    { month: 'May', verifications: 180, unsafe: 14 },
    { month: 'Jun', verifications: 195, unsafe: 16 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MedSecure Dashboard</h1>
        <p className="text-gray-600">
          Monitor medicine verification activities, IoT data, and system performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {verificationStats.total}
              </div>
              <div className="text-sm text-gray-600">Total Verifications</div>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+12% vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {verificationStats.safe}
              </div>
              <div className="text-sm text-gray-600">Safe Medicines</div>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {Math.round((verificationStats.safe / verificationStats.total) * 100)}% success rate
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {verificationStats.unsafe}
              </div>
              <div className="text-sm text-gray-600">Unsafe Detected</div>
            </div>
          </div>
          <div className="mt-2 text-sm text-red-500">
            Requires immediate attention
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {verificationStats.thisWeek}
              </div>
              <div className="text-sm text-gray-600">This Week</div>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+8% vs last week</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Verification Trends */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="verifications" fill="#3B82F6" name="Total" />
              <Bar dataKey="unsafe" fill="#EF4444" name="Unsafe" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Medicine Categories */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Medicine Categories</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* IoT Monitoring Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Thermometer className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">IoT Cold Chain Monitoring</h3>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700">Medicine:</label>
            <select
              value={selectedMedicine.id}
              onChange={(e) => setSelectedMedicine(mockMedicines.find(m => m.id === e.target.value) || mockMedicines[0])}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {mockMedicines.filter(m => m.requiresColdChain).map((medicine) => (
                <option key={medicine.id} value={medicine.id}>
                  {medicine.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Status */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <Thermometer className="h-6 w-6 text-blue-600 mr-2" />
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {iotData[iotData.length - 1].temperature}°C
                </div>
                <div className="text-sm text-blue-600">Current Temperature</div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <Package className="h-6 w-6 text-green-600 mr-2" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {iotData[iotData.length - 1].humidity}%
                </div>
                <div className="text-sm text-green-600">Current Humidity</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-gray-600 mr-2" />
              <div>
                <div className={`text-2xl font-bold ${
                  iotData[iotData.length - 1].status === 'optimal' ? 'text-green-600' :
                  iotData[iotData.length - 1].status === 'warning' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {iotData[iotData.length - 1].status}
                </div>
                <div className="text-sm text-gray-600">Chain Status</div>
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Chart */}
        <div>
          <h4 className="text-md font-semibold text-gray-800 mb-3">24-Hour Temperature History</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={iotData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleString()}
                formatter={(value) => [`${value}°C`, 'Temperature']}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Verification Activity</h3>
        <div className="space-y-3">
          {mockBlockchainRecords.slice(0, 5).map((record) => {
            const medicine = mockMedicines.find(m => m.id === record.medicineId);
            if (!medicine) return null;

            return (
              <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {record.verificationResult === 'safe' ? (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  ) : (
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">{medicine.name}</div>
                    <div className="text-sm text-gray-600">
                      Batch: {medicine.batchNumber} | Verified by: {record.verifiedBy}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    record.verificationResult === 'safe' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {record.verificationResult.toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(record.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;