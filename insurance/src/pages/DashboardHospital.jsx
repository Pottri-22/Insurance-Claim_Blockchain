import React, { useState, useEffect } from 'react';
import {
  Shield, FileText, DollarSign, Clock,
  TrendingUp, Users, Bell, Settings,
  LogOut, Plus, Eye, Download,
  CheckCircle, XCircle, AlertCircle,
  ChevronRight, BarChart3, CreditCard,
  ShieldCheck, Calendar, FileCheck,
  Package, Home, Car, User, Briefcase,
  Search, Filter, MoreVertical, ArrowUpRight,
  Activity, Stethoscope, Receipt, Wallet,
  Building, UserCheck, AlertTriangle, Check,
  ChevronDown, Hospital, ClipboardList, FilePlus,
  TrendingUp as TrendingUpIcon, PieChart, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHospital = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mock data for hospital dashboard
  const hospitalData = {
    name: "City General Hospital",
    id: "HOSP-001",
    todayStats: {
      patients: 12,
      claimsSubmitted: 8,
      revenue: "₹3.2L"
    }
  };

  const keyMetrics = [
    {
      title: 'Pending Claims',
      value: '8',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'bg-orange-500'
    },
    {
      title: 'Approved Today',
      value: '5',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Awaiting Payment',
      value: '3',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Revenue',
      value: '₹3.2L',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-purple-500'
    }
  ];

  const recentPatients = [
    {
      uhid: 'PT-2025-1234',
      name: 'Priya Sharma',
      age: 34,
      gender: 'F',
      phone: '+91 98765 43210',
      admissionDate: 'Jan 30, 2025 08:30 AM',
      type: 'Emergency',
      department: 'General Surgery',
      doctor: 'Dr. Ramesh Sharma',
      policy: 'HLTH-2024-5678',
      insurer: 'BlockClaim',
      coverage: 500000,
      available: 260000,
      status: 'Discharged',
      billAmount: 85000,
      verified: true,
      hasClaim: false
    },
    {
      uhid: 'PT-2025-1220',
      name: 'Amit Kumar',
      age: 45,
      gender: 'M',
      phone: '+91 87654 32109',
      admissionDate: 'Jan 29, 2025 02:15 PM',
      type: 'Elective',
      department: 'Cardiology',
      doctor: 'Dr. Priya Patel',
      policy: 'HLTH-2023-9012',
      insurer: 'BlockClaim',
      coverage: 750000,
      available: 605000,
      status: 'Admitted',
      billAmount: 145000,
      verified: true,
      hasClaim: true,
      claimId: 'CLM-2025-005',
      claimStatus: 'Pending'
    },
    {
      uhid: 'PT-2025-1215',
      name: 'Rajesh Gupta',
      age: 28,
      gender: 'M',
      phone: '+91 76543 21098',
      admissionDate: 'Jan 28, 2025 11:45 AM',
      type: 'Emergency',
      department: 'Emergency Medicine',
      doctor: 'Dr. Sanjay Verma',
      policy: 'HLTH-2024-3456',
      insurer: 'BlockClaim',
      coverage: 300000,
      available: 288000,
      status: 'Discharged',
      billAmount: 12000,
      verified: true,
      hasClaim: true,
      claimId: 'CLM-2025-002',
      claimStatus: 'Paid'
    }
  ];

  const hospitalClaims = [
    { id: 'CLM-005', patient: 'A.Kumar', amount: '₹1,45,000', status: 'Pending', date: 'Jan 29, 2025' },
    { id: 'CLM-003', patient: 'P.Sharma', amount: '₹85,000', status: 'Approved', date: 'Jan 30, 2025' },
    { id: 'CLM-002', patient: 'R.Gupta', amount: '₹12,000', status: 'Paid', date: 'Jan 28, 2025' },
    { id: 'CLM-001', patient: 'S.Patel', amount: '₹45,000', status: 'Rejected', date: 'Jan 27, 2025' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

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

  const handleSubmitClaim = (patient) => {
    setSelectedPatient(patient);
    setShowClaimModal(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'Approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Paid': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Paid': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      {/* Header */}
           <header className="bg-white shadow-lg border-b-3 border-emerald-500">
        <div className="flex items-center justify-between h-20 px-6">
          {/* Hospital Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Hospital className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                BlockClaim
              </h1>
              <p className="text-sm text-slate-600">Hospital Claims Portal</p>
            </div>
          </div>

          {/* Hospital Badge */}
          <div className="bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-semibold text-slate-700">{hospitalData.name}</span>
              <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">{hospitalData.id}</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
              { id: 'patients', label: 'Patients', icon: <UserCheck className="w-5 h-5" /> },
              { id: 'submit-claims', label: 'Submit', icon: <FilePlus className="w-5 h-5" /> },
              { id: 'track', label: 'Track', icon: <Activity className="w-5 h-5" /> },
              { id: 'reports', label: 'Reports', icon: <PieChart className="w-5 h-5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === tab.id
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors relative">
              <Bell className="w-6 h-6 text-slate-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
            </button>

            <div className="relative group">
              <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center text-white font-bold">
                  DA
                </div>
                <ChevronDown className="w-4 h-4 text-slate-600" />
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <a href="#" className="block px-4 py-3 hover:bg-slate-50 text-slate-700">My Profile</a>
                <a href="#" className="block px-4 py-3 hover:bg-slate-50 text-slate-700">Settings</a>
                <hr className="border-slate-200" />
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 font-medium">
                  <LogOut className="w-4 h-4 inline mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-emerald-50 border-t border-emerald-100 px-6 py-2">
          <div className="flex items-center justify-center gap-6 text-xs">
            <span className="text-emerald-700 font-medium whitespace-nowrap">Today: {hospitalData.todayStats.patients} Patients</span>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-700 font-medium whitespace-nowrap">{hospitalData.todayStats.claimsSubmitted} Claims Submitted</span>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-700 font-medium whitespace-nowrap">{hospitalData.todayStats.revenue} Revenue</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        {activeTab === 'dashboard' && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {keyMetrics.map((metric, index) => (
                <div key={index} className={`${metric.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      {metric.icon}
                    </div>
                    <span className="text-3xl font-bold">{metric.value}</span>
                  </div>
                  <p className="text-sm font-medium opacity-90">{metric.title}</p>
                </div>
              ))}
            </div>

            {/* Recent Patients */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Patients</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {recentPatients.map((patient) => (
                  <div key={patient.uhid} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100 hover:shadow-xl transition-all">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium">{patient.uhid}</span>
                      <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Insurance Verified
                      </div>
                    </div>

                    {/* Patient Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-emerald-600" />
                        <span className="font-semibold text-slate-900">{patient.name}, {patient.age}{patient.gender}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-600">📞</span>
                        <span className="text-slate-700">{patient.phone}</span>
                      </div>
                    </div>

                    <hr className="border-slate-200 mb-4" />

                    {/* Admission Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Admission:</span>
                        <span className="text-slate-900 font-medium">{patient.admissionDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Type:</span>
                        <span className="text-slate-900 font-medium">{patient.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Department:</span>
                        <span className="text-slate-900 font-medium">{patient.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Doctor:</span>
                        <span className="text-slate-900 font-medium">{patient.doctor}</span>
                      </div>
                    </div>

                    <hr className="border-slate-200 mb-4" />

                    {/* Insurance Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Policy:</span>
                        <span className="text-slate-900 font-medium">{patient.policy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Insurer:</span>
                        <span className="text-slate-900 font-medium">{patient.insurer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Coverage:</span>
                        <span className="text-slate-900 font-medium">{formatCurrency(patient.coverage)} (Available: {formatCurrency(patient.available)})</span>
                      </div>
                    </div>

                    <hr className="border-slate-200 mb-4" />

                    {/* Status and Bill */}
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Status:</span>
                        <span className="text-slate-900 font-medium">{patient.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Bill Amount:</span>
                        <span className="text-2xl font-bold text-slate-900">{formatCurrency(patient.billAmount)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                      <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Submit Claim
                      </button>
                      <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Bill
                      </button>
                      <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4" />
                        Records
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hospital Claims Table */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-900">Hospital Claims</h2>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700">
                      <Filter className="w-4 h-4" />
                      Filters
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Claim ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {hospitalClaims.map((claim, index) => (
                      <tr key={claim.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{claim.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{claim.patient}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">{claim.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                            {getStatusIcon(claim.status)}
                            {claim.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-slate-400 hover:text-emerald-600 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Showing 4 of 156 claims</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 border border-slate-300 rounded text-slate-600 hover:bg-white">← Previous</button>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded font-medium">Page 1 of 52</span>
                    <button className="px-3 py-1 border border-slate-300 rounded text-slate-600 hover:bg-white">Next →</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'submit-claims' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Submit Insurance Claim</h2>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Patient</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentPatients.filter(p => !p.hasClaim).map((patient) => (
                    <button
                      key={patient.uhid}
                      onClick={() => handleSubmitClaim(patient)}
                      className="p-4 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-left"
                    >
                      <div className="font-medium text-slate-900">{patient.name}</div>
                      <div className="text-sm text-slate-600">{patient.uhid} • {formatCurrency(patient.billAmount)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div className="text-center py-32">
            <div className="bg-slate-200/50 border-2 border-dashed border-slate-400 rounded-3xl w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              <UserCheck className="w-16 h-16 text-slate-400" />
            </div>
            <p className="text-3xl text-slate-500 font-medium">Patient Management</p>
            <p className="text-slate-400 mt-2">Patient registration and management coming soon...</p>
          </div>
        )}

        {activeTab === 'track' && (
          <div className="text-center py-32">
            <div className="bg-slate-200/50 border-2 border-dashed border-slate-400 rounded-3xl w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              <Activity className="w-16 h-16 text-slate-400" />
            </div>
            <p className="text-3xl text-slate-500 font-medium">Claims Tracking</p>
            <p className="text-slate-400 mt-2">Advanced tracking and analytics coming soon...</p>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="text-center py-32">
            <div className="bg-slate-200/50 border-2 border-dashed border-slate-400 rounded-3xl w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              <PieChart className="w-16 h-16 text-slate-400" />
            </div>
            <p className="text-3xl text-slate-500 font-medium">Reports & Analytics</p>
            <p className="text-slate-400 mt-2">Financial reports and analytics coming soon...</p>
          </div>
        )}
      </main>

      {/* Claim Submission Modal */}
      {showClaimModal && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Submit Claim - {selectedPatient.uhid}</h2>
                    <p className="text-emerald-100">{selectedPatient.name}</p>
                  </div>
                </div>
                <button onClick={() => setShowClaimModal(false)} className="text-white/80 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Patient & Policy Verification */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-slate-700">Patient:</span>
                  <span className="text-slate-900 flex items-center gap-2">{selectedPatient.name} <CheckCircle className="w-5 h-5 text-emerald-600" /></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">Policy:</span>
                  <span className="text-slate-900 flex items-center gap-2">{selectedPatient.policy} <CheckCircle className="w-5 h-5 text-emerald-600" /></span>
                </div>
              </div>

              {/* Treatment Details */}
              <div className="border border-emerald-200 rounded-lg p-4 bg-emerald-50/30">
                <h3 className="font-bold text-slate-700 mb-3 text-center">Treatment Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-700">Diagnosis:</span>
                    <span className="text-slate-900 font-medium">{selectedPatient.department === 'General Surgery' ? 'Acute appendicitis' : 'Cardiac procedure'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Procedure:</span>
                    <span className="text-slate-900 font-medium">{selectedPatient.department === 'General Surgery' ? 'Emergency appendectomy' : 'Angioplasty'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Date:</span>
                    <span className="text-slate-900 font-medium">{selectedPatient.admissionDate.split(' ')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Billing Breakdown */}
              <div className="border border-emerald-200 rounded-lg p-4 bg-emerald-50/30">
                <h3 className="font-bold text-slate-700 mb-3 text-center">Billing Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-700">Room Charges:</span>
                    <span className="text-slate-900">{formatCurrency(Math.round(selectedPatient.billAmount * 0.2))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">OT Charges:</span>
                    <span className="text-slate-900">{formatCurrency(Math.round(selectedPatient.billAmount * 0.4))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Surgeon Fees:</span>
                    <span className="text-slate-900">{formatCurrency(Math.round(selectedPatient.billAmount * 0.2))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Medicines:</span>
                    <span className="text-slate-900">{formatCurrency(Math.round(selectedPatient.billAmount * 0.15))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Tests:</span>
                    <span className="text-slate-900">{formatCurrency(Math.round(selectedPatient.billAmount * 0.05))}</span>
                  </div>
                  <hr className="border-emerald-300 my-2" />
                  <div className="flex justify-between font-bold">
                    <span className="text-emerald-700">Total:</span>
                    <span className="text-emerald-700 text-lg">{formatCurrency(selectedPatient.billAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="border border-emerald-200 rounded-lg p-4 bg-emerald-50/30">
                <h3 className="font-bold text-slate-700 mb-3 text-center">Documents</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Hospital Bill</span>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Discharge Summary</span>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Lab Reports</span>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Payment Receipt</span>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Settlement Options */}
              <div className="border border-emerald-200 rounded-lg p-4 bg-emerald-50/30">
                <h3 className="font-bold text-slate-700 mb-3">Settlement</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input type="radio" name="settlement" defaultChecked className="text-emerald-600 focus:ring-emerald-500" />
                    <span className="text-slate-700">Direct to Hospital Account</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="settlement" className="text-emerald-600 focus:ring-emerald-500" />
                    <span className="text-slate-700">Reimburse to Patient</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button onClick={() => setShowClaimModal(false)} className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
                  Submit to Blockchain →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHospital;