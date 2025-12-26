export interface MedicineRecord {
  id: string;
  name: string;
  batchNumber: string;
  manufacturer: string;
  expiryDate: string;
  barcode: string;
  category: 'vaccine' | 'insulin' | 'antibiotic' | 'painkiller' | 'vitamin';
  requiresColdChain: boolean;
  status: 'active' | 'recalled' | 'expired';
}

export interface IoTData {
  medicineId: string;
  temperature: number;
  humidity: number;
  timestamp: string;
  status: 'optimal' | 'warning' | 'critical';
  location: string;
}

export interface BlockchainRecord {
  id: string;
  medicineId: string;
  verificationResult: 'safe' | 'unsafe';
  timestamp: string;
  verifiedBy: string;
  transactionHash: string;
  blockNumber: number;
}

export const mockMedicines: MedicineRecord[] = [
  {
    id: '1',
    name: 'Pfizer COVID-19 Vaccine',
    batchNumber: 'PF001-2024',
    manufacturer: 'Pfizer Inc.',
    expiryDate: '2025-06-15',
    barcode: '1234567890123',
    category: 'vaccine',
    requiresColdChain: true,
    status: 'active'
  },
  {
    id: '2',
    name: 'Humalog Insulin',
    batchNumber: 'HM234-2024',
    manufacturer: 'Eli Lilly',
    expiryDate: '2025-03-20',
    barcode: '2345678901234',
    category: 'insulin',
    requiresColdChain: true,
    status: 'active'
  },
  {
    id: '3',
    name: 'Amoxicillin 500mg',
    batchNumber: 'AMX789-2024',
    manufacturer: 'GSK',
    expiryDate: '2024-12-10',
    barcode: '3456789012345',
    category: 'antibiotic',
    requiresColdChain: false,
    status: 'expired'
  },
  {
    id: '4',
    name: 'Ibuprofen 200mg',
    batchNumber: 'IBU456-2024',
    manufacturer: 'Johnson & Johnson',
    expiryDate: '2026-01-15',
    barcode: '4567890123456',
    category: 'painkiller',
    requiresColdChain: false,
    status: 'active'
  },
  {
    id: '5',
    name: 'Vitamin D3 1000IU',
    batchNumber: 'VTD123-2024',
    manufacturer: 'Nature Made',
    expiryDate: '2025-08-30',
    barcode: '5678901234567',
    category: 'vitamin',
    requiresColdChain: false,
    status: 'active'
  }
];

export const generateIoTData = (medicineId: string): IoTData[] => {
  const data: IoTData[] = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const baseTemp = medicineId === '1' ? -70 : medicineId === '2' ? 4 : 20;
    const tempVariation = (Math.random() - 0.5) * 4;
    const temperature = baseTemp + tempVariation;
    
    let status: 'optimal' | 'warning' | 'critical' = 'optimal';
    if (medicineId === '1' && (temperature > -65 || temperature < -80)) status = 'critical';
    else if (medicineId === '2' && (temperature > 8 || temperature < 2)) status = 'warning';
    else if (temperature < -5 || temperature > 35) status = 'warning';
    
    data.push({
      medicineId,
      temperature: Math.round(temperature * 10) / 10,
      humidity: Math.round((50 + Math.random() * 20) * 10) / 10,
      timestamp: timestamp.toISOString(),
      status,
      location: 'Cold Storage Unit A'
    });
  }
  
  return data.reverse();
};

export const mockBlockchainRecords: BlockchainRecord[] = [
  {
    id: '1',
    medicineId: '1',
    verificationResult: 'safe',
    timestamp: '2025-01-15T10:30:00Z',
    verifiedBy: 'Dr. Sarah Johnson',
    transactionHash: '0xa1b2c3d4e5f6789012345678901234567890abcdef',
    blockNumber: 18234567
  },
  {
    id: '2',
    medicineId: '2',
    verificationResult: 'safe',
    timestamp: '2025-01-15T09:15:00Z',
    verifiedBy: 'Pharmacist Mike Chen',
    transactionHash: '0xb2c3d4e5f6789012345678901234567890abcdef12',
    blockNumber: 18234566
  },
  {
    id: '3',
    medicineId: '3',
    verificationResult: 'unsafe',
    timestamp: '2025-01-15T08:45:00Z',
    verifiedBy: 'Dr. Emma Wilson',
    transactionHash: '0xc3d4e5f6789012345678901234567890abcdef1234',
    blockNumber: 18234565
  }
];