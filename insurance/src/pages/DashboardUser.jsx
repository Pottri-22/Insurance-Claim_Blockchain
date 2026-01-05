import React, { useState, useEffect } from 'react';
import {
  Shield, FileText, DollarSign, Clock, Bell, User, LogOut,
  Plus, Download, Eye, CheckCircle, AlertCircle, ChevronDown,
  Activity, FileCheck, TrendingUp, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data
  const patientData = {
    name: "Pottri Sellvan",
    email: "pottri.sharma@example.com",
    notifications: 1
  };

  const quickStats = {
    activePolicy: { count: 1 },
    pendingClaims: { count: 1 },
    approvedThisMonth: { count: 2 },
    totalPaid: { amount: 240000 }
  };

  const recentClaims = [
    {
      id: "CLM-2025-003",
      type: "Emergency Surgery",
      amount: 85000,
      status: "PENDING",
      submitted: "2 hours ago",
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      id: "CLM-2025-002",
      type: "Diagnostic Tests",
      amount: 12000,
      status: "PAID",
      paidOn: "Jan 28, 2025",
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      id: "CLM-2025-001",
      type: "Consultation",
      amount: 1500,
      status: "PAID",
      paidOn: "Jan 15, 2025",
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  const policyData = {
    number: "HLTH-2024-5678",
    sumInsured: 500000,
    used: 240000,
    available: 260000,
    usagePercentage: 48,
    premium: 18000,
    nextPayment: "Dec 15, 2025",
    status: "Active"
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('blockclaim_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('blockclaim_user');
    localStorage.removeItem('blockclaim_token');
    navigate('/login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-linear-to-br from-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600"></div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-200">
      {/* Navigation Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-linear-to-br from-slate-400 via-slate-500 to-slate-600 rounded-xl flex items-center justify-center shadow-xl border border-white/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-linear-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              BlockClaim
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-lg font-medium text-slate-800">{patientData.name}</span>
            <div className="relative">
              <button className="p-3 rounded-xl hover:bg-slate-100 transition-colors relative">
                <Bell className="w-6 h-6 text-slate-600" />
                {patientData.notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                    {patientData.notifications}
                  </span>
                )}
              </button>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="w-11 h-11 bg-linear-to-br from-slate-500 to-slate-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  PS
                </div>
                <ChevronDown className="w-5 h-5 text-slate-600" />
              </button>

              <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <a href="#" className="block px-6 py-4 hover:bg-slate-50 rounded-t-2xl text-slate-700">My Profile</a>
                <a href="#" className="block px-6 py-4 hover:bg-slate-50 text-slate-700">Policy Details</a>
                <a href="#" className="block px-6 py-4 hover:bg-slate-50 text-slate-700">Settings</a>
                <hr className="border-slate-200" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-6 py-4 hover:bg-red-50 text-red-600 font-medium flex items-center gap-3 rounded-b-2xl"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <nav className="bg-slate-50/80 backdrop-blur-sm border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex space-x-10 py-4">
              {['dashboard', 'claims', 'policies', 'documents', 'profile'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-2 font-medium text-base transition-all border-b-4 ${
                    activeTab === tab
                      ? 'border-slate-600 text-slate-700'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab === 'dashboard' ? 'Dashboard' :
                   tab === 'claims' ? 'My Claims' :
                   tab === 'policies' ? 'Policies' :
                   tab === 'documents' ? 'Documents' : 'Profile'}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        {activeTab === 'dashboard' && (
          <>
            {/* Welcome Hero Card */}
            <div className="relative overflow-hidden rounded-3xl p-10 mb-10 shadow-2xl bg-linear-to-br from-slate-600 via-slate-700 to-slate-800 text-white">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-6">Welcome Back, {patientData.name}! 👋</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <p className="text-slate-200 text-lg">Policy Status</p>
                    <p className="text-3xl font-bold mt-2 text-white">Active</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <p className="text-slate-200 text-lg">Claims This Year</p>
                    <p className="text-3xl font-bold mt-2 text-white">3</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <p className="text-slate-200 text-lg">Amount Used</p>
                    <p className="text-3xl font-bold mt-2 text-white">{formatCurrency(240000)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <button
                onClick={() => navigate('/claims/new')}
                className="bg-linear-to-r from-slate-600 to-slate-700 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-slate-500/30 transition-all hover:scale-105 flex items-center justify-center gap-4 border border-white/20"
              >
                <Plus className="w-7 h-7" />
                Submit New Claim
              </button>
              <button className="bg-white/90 backdrop-blur-md border border-slate-300 text-slate-800 px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3">
                <FileText className="w-6 h-6" />
                View All Claims
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-linear-to-br from-slate-400 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-4xl font-bold text-slate-900">{quickStats.activePolicy.count}</span>
                </div>
                <p className="text-slate-600 text-lg">Active Policy</p>
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-linear-to-br from-slate-400 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-4xl font-bold text-slate-900">{quickStats.pendingClaims.count}</span>
                </div>
                <p className="text-slate-600 text-lg">Pending Claims</p>
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-linear-to-br from-slate-400 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-4xl font-bold text-slate-900">{quickStats.approvedThisMonth.count}</span>
                </div>
                <p className="text-slate-600 text-lg">Approved This Month</p>
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-linear-to-br from-slate-400 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-slate-900">{formatCurrency(quickStats.totalPaid.amount)}</span>
                </div>
                <p className="text-slate-600 text-lg">Total Paid</p>
              </div>
            </div>

            {/* Recent Claims */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-8">Recent Claims</h3>
              <div className="space-y-6">
                {recentClaims.map((claim) => (
                  <div key={claim.id} className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-3">
                          <h4 className="text-2xl font-bold text-slate-900">{claim.id}</h4>
                          <span className={`px-5 py-2 rounded-full text-base font-semibold flex items-center gap-2 shadow-md ${
                            claim.status === 'PENDING'
                              ? 'bg-orange-100 text-orange-800 border border-orange-200'
                              : 'bg-green-100 text-green-800 border border-green-200'
                          }`}>
                            {claim.icon}
                            {claim.status}
                          </span>
                        </div>
                        <p className="text-xl font-medium text-slate-700 mb-2">{claim.type}</p>
                        <p className="text-3xl font-bold text-slate-900">{formatCurrency(claim.amount)}</p>
                        {claim.submitted && <p className="text-slate-500 mt-3">Submitted: {claim.submitted}</p>}
                        {claim.paidOn && <p className="text-slate-500 mt-3">Paid on: {claim.paidOn}</p>}
                      </div>
                      <div className="flex flex-col gap-3">
                        <button className="text-slate-600 hover:text-slate-700 font-semibold flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <Eye className="w-5 h-5" />
                          View Details
                        </button>
                        {claim.status === 'PAID' && (
                          <button className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
                            <Download className="w-5 h-5" />
                            Receipt
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Policy */}
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-8">Active Health Policy</h3>
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-slate-200">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="text-3xl font-bold text-slate-900">Policy: {policyData.number}</h4>
                    <span className="inline-flex items-center mt-4 px-6 py-3 rounded-full bg-green-100 text-green-800 font-semibold text-lg shadow-md border border-green-200">
                      <CheckCircle className="w-6 h-6 mr-2" />
                      Active
                    </span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="text-slate-600 text-lg mb-3">Coverage Usage</p>
                    <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-linear-to-r from-slate-500 to-slate-700 rounded-full shadow-lg"
                        style={{ width: `${policyData.usagePercentage}%` }}
                      />
                    </div>
                    <p className="text-right text-slate-600 mt-2 font-medium">{policyData.usagePercentage}% used</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                      <p className="text-slate-600 text-lg">Sum Insured</p>
                      <p className="text-3xl font-bold text-slate-900 mt-2">{formatCurrency(policyData.sumInsured)}</p>
                    </div>
                    <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                      <p className="text-slate-600 text-lg">Used Amount</p>
                      <p className="text-3xl font-bold text-orange-600 mt-2">{formatCurrency(policyData.used)}</p>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                      <p className="text-slate-600 text-lg">Available</p>
                      <p className="text-3xl font-bold text-green-600 mt-2">{formatCurrency(policyData.available)}</p>
                    </div>
                  </div>

                  <hr className="border-slate-300" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-slate-600 text-lg">Premium</p>
                      <p className="text-2xl font-bold text-slate-900">{formatCurrency(policyData.premium)} / year</p>
                    </div>
                    <div>
                      <p className="text-slate-600 text-lg">Next Payment</p>
                      <p className="text-2xl font-bold text-slate-900">{policyData.nextPayment}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 pt-6">
                    <button className="bg-linear-to-r from-slate-600 to-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-3 border border-white/20">
                      <Eye className="w-6 h-6" />
                      View Policy Details
                    </button>
                    <button className="bg-white border-2 border-slate-300 text-slate-800 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all hover:scale-105 flex items-center gap-3">
                      <Download className="w-6 h-6" />
                      Download Policy PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab !== 'dashboard' && (
          <div className="text-center py-32">
            <div className="bg-slate-200/50 border-2 border-dashed border-slate-400 rounded-3xl w-32 h-32 mx-auto mb-8" />
            <p className="text-3xl text-slate-500 font-medium">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section coming soon...
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardUser;