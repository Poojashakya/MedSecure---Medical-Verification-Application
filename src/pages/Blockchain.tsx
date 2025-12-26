import React, { useState } from 'react';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Hash, 
  Search,
  Filter
} from 'lucide-react';
import { mockBlockchainRecords, mockMedicines } from '../data/mockDatabase';

const Blockchain: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'safe' | 'unsafe'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = mockBlockchainRecords.filter(record => {
    const matchesFilter = filter === 'all' || record.verificationResult === filter;
    const medicine = mockMedicines.find(m => m.id === record.medicineId);
    const matchesSearch = !searchTerm || 
      medicine?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine?.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.transactionHash.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getMedicine = (medicineId: string) => {
    return mockMedicines.find(m => m.id === medicineId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Blockchain Verification Records</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Immutable verification records stored on Ethereum/Polygon testnet. 
          Every verification is permanently logged with cryptographic proof.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {mockBlockchainRecords.length}
              </div>
              <div className="text-sm text-gray-600">Total Records</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {mockBlockchainRecords.filter(r => r.verificationResult === 'safe').length}
              </div>
              <div className="text-sm text-gray-600">Safe Verifications</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {mockBlockchainRecords.filter(r => r.verificationResult === 'unsafe').length}
              </div>
              <div className="text-sm text-gray-600">Unsafe Detected</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Hash className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.max(...mockBlockchainRecords.map(r => r.blockNumber))}
              </div>
              <div className="text-sm text-gray-600">Latest Block</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by medicine name, batch number, or transaction hash..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'safe' | 'unsafe')}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Records</option>
              <option value="safe">Safe Only</option>
              <option value="unsafe">Unsafe Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Records Found</h3>
            <p className="text-gray-500">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'No verification records available'}
            </p>
          </div>
        ) : (
          filteredRecords.map((record) => {
            const medicine = getMedicine(record.medicineId);
            if (!medicine) return null;

            return (
              <div key={record.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {record.verificationResult === 'safe' ? (
                      <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-600 mt-1 flex-shrink-0" />
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {medicine.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          record.verificationResult === 'safe' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.verificationResult.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <p><span className="font-medium">Batch:</span> {medicine.batchNumber}</p>
                          <p><span className="font-medium">Manufacturer:</span> {medicine.manufacturer}</p>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>Verified by: {record.verifiedBy}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{formatTimestamp(record.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">Block #{record.blockNumber}</div>
                  </div>
                </div>
                
                {/* Transaction Details */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Hash className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Transaction Hash</span>
                    </div>
                    <div className="font-mono text-xs text-gray-600 break-all">
                      {record.transactionHash}
                    </div>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <span>Block: #{record.blockNumber}</span>
                      <span>Gas: 21000</span>
                      <a 
                        href={`https://polygonscan.com/tx/${record.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        View on Explorer
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Blockchain Info */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white p-6">
        <div className="flex items-center mb-4">
          <Shield className="h-8 w-8 mr-3" />
          <h2 className="text-2xl font-bold">Blockchain Security</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Immutable Records</h3>
            <p className="text-purple-100">
              Every verification is cryptographically secured and cannot be altered or deleted, 
              ensuring complete audit trail integrity.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Transparent Verification</h3>
            <p className="text-purple-100">
              All records are publicly verifiable on the blockchain, providing unprecedented 
              transparency in medicine verification processes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blockchain;