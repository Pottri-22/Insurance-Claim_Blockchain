import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Shield, Users, Plus, Loader, CheckCircle, XCircle } from 'lucide-react';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hospitals');
  const [hospitalForm, setHospitalForm] = useState({ name: '', email: '', walletAddress: '' });
  const [insuranceForm, setInsuranceForm] = useState({ name: '', email: '', walletAddress: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('blockclaim_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== 'admin') {
        navigate('/login');
        return;
      }
      setUser(parsedUser);
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

  const handleHospitalSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const token = localStorage.getItem('blockclaim_token');
      const response = await fetch('http://localhost:5000/api/hospitals/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(hospitalForm),
      });

      if (response.ok) {
        setMessage('Hospital registered successfully!');
        setHospitalForm({ name: '', email: '', walletAddress: '' });
      } else {
        const error = await response.json();
        setMessage(error.message || 'Failed to register hospital');
      }
    } catch (error) {
      setMessage('Error registering hospital');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInsuranceSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const token = localStorage.getItem('blockclaim_token');
      const response = await fetch('http://localhost:5000/api/insurance-companies/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(insuranceForm),
      });

      if (response.ok) {
        setMessage('Insurance company registered successfully!');
        setInsuranceForm({ name: '', email: '', walletAddress: '' });
      } else {
        const error = await response.json();
        setMessage(error.message || 'Failed to register insurance company');
      }
    } catch (error) {
      setMessage('Error registering insurance company');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Loader className="w-8 h-8 animate-spin text-slate-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      {/* Metallic texture */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 rounded-lg flex items-center justify-center shadow-md border border-white/30">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-slate-600">Manage healthcare ecosystem</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">Welcome, {user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Hospitals</p>
                <p className="text-2xl font-bold text-slate-900">--</p>
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Insurance Companies</p>
                <p className="text-2xl font-bold text-slate-900">--</p>
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">--</p>
              </div>
            </div>
          </div>
        </div>

        {/* Management Section */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('hospitals')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'hospitals'
                    ? 'border-slate-500 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Add Hospital
              </button>
              <button
                onClick={() => setActiveTab('insurance')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'insurance'
                    ? 'border-slate-500 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Add Insurance Company
              </button>
            </nav>
          </div>

          <div className="p-6">
            {message && (
              <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                message.includes('successfully')
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {message.includes('successfully') ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                {message}
              </div>
            )}

            {activeTab === 'hospitals' && (
              <form onSubmit={handleHospitalSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-6 h-6 text-slate-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Register New Hospital</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Hospital Name</label>
                    <input
                      type="text"
                      required
                      value={hospitalForm.name}
                      onChange={(e) => setHospitalForm({...hospitalForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                      placeholder="General Hospital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={hospitalForm.email}
                      onChange={(e) => setHospitalForm({...hospitalForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                      placeholder="admin@hospital.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Wallet Address</label>
                  <input
                    type="text"
                    required
                    value={hospitalForm.walletAddress}
                    onChange={(e) => setHospitalForm({...hospitalForm, walletAddress: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                    placeholder="0x..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-slate-500 to-slate-600 text-white py-3 px-6 rounded-lg hover:from-slate-600 hover:to-slate-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Register Hospital
                </button>
              </form>
            )}

            {activeTab === 'insurance' && (
              <form onSubmit={handleInsuranceSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-slate-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Register New Insurance Company</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      required
                      value={insuranceForm.name}
                      onChange={(e) => setInsuranceForm({...insuranceForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                      placeholder="Health Insurance Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={insuranceForm.email}
                      onChange={(e) => setInsuranceForm({...insuranceForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                      placeholder="admin@insurance.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Wallet Address</label>
                  <input
                    type="text"
                    required
                    value={insuranceForm.walletAddress}
                    onChange={(e) => setInsuranceForm({...insuranceForm, walletAddress: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                    placeholder="0x..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-slate-500 to-slate-600 text-white py-3 px-6 rounded-lg hover:from-slate-600 hover:to-slate-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Register Insurance Company
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;