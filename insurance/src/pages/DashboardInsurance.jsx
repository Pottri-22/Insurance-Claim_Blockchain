import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Clock, CheckCircle, DollarSign, Search, Filter,
  Eye, User, Building, AlertTriangle, X, Check, FileCheck,
  TrendingUp, Users, Shield
} from 'lucide-react';

const DashboardInsurance = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [submittedByFilter, setSubmittedByFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

  // Mock claims data
  const [claims, setClaims] = useState([
    {
      id: 'CLM-2025-001',
      type: 'Emergency Surgery',
      submittedBy: 'User',
      hospitalName: 'City General Hospital',
      amount: 85000,
      status: 'Pending Review',
      priority: 'High',
      patientName: 'John Doe',
      policyNumber: 'HLTH-2024-1234',
      treatmentDescription: 'Emergency appendectomy surgery with complications',
      documents: ['Hospital Bill.pdf', 'Discharge Summary.pdf', 'Doctor Prescription.pdf'],
      blockchainStatus: 'Validated'
    },
    {
      id: 'CLM-2025-002',
      type: 'Hospitalization',
      submittedBy: 'Hospital',
      hospitalName: 'Metro Medical Center',
      amount: 45000,
      status: 'Approved',
      priority: 'Medium',
      patientName: 'Jane Smith',
      policyNumber: 'HLTH-2024-5678',
      treatmentDescription: '5-day hospitalization for pneumonia treatment',
      documents: ['Hospital Bill.pdf', 'Lab Reports.pdf', 'Payment Receipt.pdf'],
      blockchainStatus: 'Validated'
    },
    {
      id: 'CLM-2025-003',
      type: 'OPD',
      submittedBy: 'User',
      hospitalName: 'Care Clinic',
      amount: 2500,
      status: 'Rejected',
      priority: 'Low',
      patientName: 'Bob Johnson',
      policyNumber: 'HLTH-2024-9012',
      treatmentDescription: 'Consultation and basic checkup',
      documents: ['Doctor Prescription.pdf'],
      blockchainStatus: 'Validated'
    },
    {
      id: 'CLM-2025-004',
      type: 'Diagnostic Tests',
      submittedBy: 'Hospital',
      hospitalName: 'Diagnostic Labs',
      amount: 12000,
      status: 'Pending Review',
      priority: 'Medium',
      patientName: 'Alice Brown',
      policyNumber: 'HLTH-2024-3456',
      treatmentDescription: 'MRI scan and blood tests',
      documents: ['Lab Reports.pdf', 'Payment Receipt.pdf'],
      blockchainStatus: 'Pending'
    }
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('blockclaim_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('blockclaim_user');
    localStorage.removeItem('blockclaim_token');
    navigate('/login');
  };

  const filteredClaims = claims.filter(claim => {
    const matchesStatus = statusFilter === 'all' || claim.status.toLowerCase().includes(statusFilter.toLowerCase());
    const matchesSubmittedBy = submittedByFilter === 'all' || claim.submittedBy.toLowerCase() === submittedByFilter.toLowerCase();
    const matchesSearch = searchTerm === '' ||
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.hospitalName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSubmittedBy && matchesSearch;
  });

  const handleClaimAction = (action, partialAmount = null) => {
    if (!selectedClaim) return;

    const updatedClaims = claims.map(claim => {
      if (claim.id === selectedClaim.id) {
        let newStatus = claim.status;
        if (action === 'approve') {
          newStatus = 'Approved';
        } else if (action === 'reject') {
          newStatus = 'Rejected';
        } else if (action === 'partial') {
          newStatus = `Approved (₹${partialAmount})`;
        }
        return { ...claim, status: newStatus };
      }
      return claim;
    });

    setClaims(updatedClaims);
    setSelectedClaim(null);
    setMessage(`${action.charAt(0).toUpperCase() + action.slice(1)} successful!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    if (status.includes('Approved')) return 'bg-green-100 text-green-800 border-green-200';
    if (status.includes('Rejected')) return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const getPriorityColor = (priority) => {
    if (priority === 'High') return 'bg-red-100 text-red-800';
    if (priority === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Insurance Company Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 bg-slate-50">
          {/* Success Message */}
          {message && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              {message}
            </div>
          )}

          {/* Summary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Claims Received</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">247</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Pending Claims</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">23</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Approved Today</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">12</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Amount Paid</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">₹2.4M</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by Claim ID or Hospital name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>

                <select
                  value={submittedByFilter}
                  onChange={(e) => setSubmittedByFilter(e.target.value)}
                  className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Submitters</option>
                  <option value="user">User</option>
                  <option value="hospital">Hospital</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Claims List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">Recent Claims</h3>
                  <p className="text-slate-600 text-sm mt-1">Click on a claim to review details</p>
                </div>

                <div className="divide-y divide-slate-200">
                  {filteredClaims.map((claim) => (
                    <div
                      key={claim.id}
                      onClick={() => setSelectedClaim(claim)}
                      className={`p-6 cursor-pointer hover:bg-slate-50 transition-colors ${
                        selectedClaim?.id === claim.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-slate-900">{claim.id}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                              {claim.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(claim.priority)}`}>
                              {claim.priority}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
                            <div>
                              <span className="font-medium">Type:</span> {claim.type}
                            </div>
                            <div>
                              <span className="font-medium">Submitted by:</span> {claim.submittedBy}
                            </div>
                            <div>
                              <span className="font-medium">Hospital:</span> {claim.hospitalName}
                            </div>
                            <div>
                              <span className="font-medium">Amount:</span> {formatCurrency(claim.amount)}
                            </div>
                          </div>
                        </div>

                        <Eye className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>

                {filteredClaims.length === 0 && (
                  <div className="p-12 text-center">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No claims found matching your filters.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Claim Review Panel */}
            <div className="lg:col-span-1">
              {selectedClaim ? (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">Claim Review</h3>
                    <p className="text-slate-600 text-sm mt-1">{selectedClaim.id}</p>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Patient Name</label>
                      <p className="text-slate-900">{selectedClaim.patientName}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700">Policy Number</label>
                      <p className="text-slate-900">{selectedClaim.policyNumber}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700">Treatment Description</label>
                      <p className="text-slate-600 text-sm">{selectedClaim.treatmentDescription}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700">Hospital</label>
                      <p className="text-slate-900">{selectedClaim.hospitalName}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700">Claim Amount</label>
                      <p className="text-slate-900 font-semibold">{formatCurrency(selectedClaim.amount)}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700">Submitted Documents</label>
                      <div className="mt-2 space-y-2">
                        {selectedClaim.documents.map((doc, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                            <FileCheck className="w-4 h-4" />
                            {doc}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700">Blockchain Status</label>
                      <div className="flex items-center gap-2 mt-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-700">{selectedClaim.blockchainStatus}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 border-t border-slate-200 space-y-3">
                    <button
                      onClick={() => handleClaimAction('approve')}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Approve Claim
                    </button>

                    <button
                      onClick={() => handleClaimAction('partial', selectedClaim.amount * 0.8)}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <TrendingUp className="w-4 h-4" />
                      Approve Partial (80%)
                    </button>

                    <button
                      onClick={() => handleClaimAction('reject')}
                      className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Reject Claim
                    </button>

                    <button
                      onClick={() => handleClaimAction('request')}
                      className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Request More Documents
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
                  <Eye className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Select a claim to review details</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardInsurance;