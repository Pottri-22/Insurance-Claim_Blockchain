import React, { useState, useEffect } from 'react';
import { 
  Shield, FileText, DollarSign, Clock, 
  TrendingUp, Users, Bell, Settings,
  LogOut, Plus, Eye, Download,
  CheckCircle, XCircle, AlertCircle,
  ChevronRight, BarChart3, CreditCard,
  ShieldCheck, Calendar, FileCheck,
  Package, Home, Car, User, Briefcase,
  Search, Filter, MoreVertical, ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [policies, setPolicies] = useState([
    {
      id: 'POL-001',
      type: 'Health',
      name: 'Health Premium Plan',
      coverage: '$50,000',
      premium: '$150/month',
      expiry: '2024-12-31',
      status: 'active'
    },
    {
      id: 'POL-002',
      type: 'Auto',
      name: 'Auto Comprehensive',
      coverage: '$25,000',
      premium: '$120/month',
      expiry: '2024-11-30',
      status: 'active'
    },
    {
      id: 'POL-003',
      type: 'Home',
      name: 'Home Insurance',
      coverage: '$200,000',
      premium: '$85/month',
      expiry: '2024-10-15',
      status: 'active'
    }
  ]);

  // Mock user data - replace with actual auth
  useEffect(() => {
    const storedUser = localStorage.getItem('blockclaim_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user
      navigate('/');
    }
    setLoading(false);
  }, [navigate]);

  // Fetch policies
  useEffect(() => {
    const fetchPolicies = async () => {
      const token = localStorage.getItem('blockclaim_token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/policies/all', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setPolicies(data);
          setStats(prev => prev.map(s => 
            s.title === 'Active Policies' ? { ...s, value: data.length.toString() } : s
          ));
        }
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    };

    fetchPolicies();
  }, []);

  const [stats, setStats] = useState([
    { 
      title: 'Active Policies', 
      value: '3', 
      icon: <Shield className="w-6 h-6" />,
      change: '+1 this month',
      color: 'bg-blue-500'
    },
    { 
      title: 'Claims Submitted', 
      value: '7', 
      icon: <FileText className="w-6 h-6" />,
      change: '2 pending',
      color: 'bg-green-500'
    },
    { 
      title: 'Total Paid', 
      value: '$12,450', 
      icon: <DollarSign className="w-6 h-6" />,
      change: '+$2,500 this month',
      color: 'bg-purple-500'
    },
    { 
      title: 'Avg Processing Time', 
      value: '3.2 hours', 
      icon: <Clock className="w-6 h-6" />,
      change: 'Faster than 95% users',
      color: 'bg-orange-500'
    }
  ]);

  const recentClaims = [
    {
      id: 'CLM-001234',
      type: 'Health',
      amount: '$2,500',
      status: 'approved',
      date: '2024-01-15',
      policy: 'Health Premium'
    },
    {
      id: 'CLM-001235',
      type: 'Auto',
      amount: '$4,200',
      status: 'pending',
      date: '2024-01-14',
      policy: 'Auto Comprehensive'
    },
    {
      id: 'CLM-001236',
      type: 'Home',
      amount: '$8,700',
      status: 'processing',
      date: '2024-01-13',
      policy: 'Home Insurance'
    },
    {
      id: 'CLM-001237',
      type: 'Travel',
      amount: '$1,200',
      status: 'rejected',
      date: '2024-01-12',
      policy: 'Travel Protect'
    }
  ];

  const activities = [
    { action: 'Claim submitted', details: 'CLM-001234', time: '2 hours ago' },
    { action: 'Policy renewed', details: 'Health Premium Plan', time: '1 day ago' },
    { action: 'Payment received', details: '$2,500', time: '2 days ago' },
    { action: 'Document uploaded', details: 'Medical Report', time: '3 days ago' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('blockclaim_user');
    localStorage.removeItem('blockclaim_token');
    navigate('/');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <AlertCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">BlockClaim Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, {user?.email || 'User'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
          <div className="p-6">
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="mb-8 p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
            
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'overview' 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-100' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                {!sidebarCollapsed && <span>Overview</span>}
              </button>
              
              <button 
                onClick={() => setActiveTab('claims')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'claims' 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-100' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <FileCheck className="w-5 h-5" />
                {!sidebarCollapsed && <span>My Claims</span>}
              </button>
              
              <button 
                onClick={() => setActiveTab('policies')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'policies' 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-100' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                {!sidebarCollapsed && <span>My Policies</span>}
              </button>
              
              <button 
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'payments' 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-100' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                {!sidebarCollapsed && <span>Payments</span>}
              </button>
              
              <button 
                onClick={() => setActiveTab('documents')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'documents' 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-100' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <FileText className="w-5 h-5" />
                {!sidebarCollapsed && <span>Documents</span>}
              </button>
              
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'settings' 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-100' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Settings className="w-5 h-5" />
                {!sidebarCollapsed && <span>Settings</span>}
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${stat.color} rounded-xl text-white`}>
                    {stat.icon}
                  </div>
                  <div className="text-sm text-gray-500">{stat.change}</div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.title}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="font-medium text-gray-900">Submit New Claim</div>
                <div className="text-sm text-gray-500 mt-1">Start a claim process</div>
              </button>
              
              <button className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div className="font-medium text-gray-900">Buy Policy</div>
                <div className="text-sm text-gray-500 mt-1">Get insured now</div>
              </button>
              
              <button className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="font-medium text-gray-900">Upload Documents</div>
                <div className="text-sm text-gray-500 mt-1">Support your claims</div>
              </button>
              
              <button className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div className="font-medium text-gray-900">Track Payments</div>
                <div className="text-sm text-gray-500 mt-1">View payment history</div>
              </button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Claims */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Claims</h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentClaims.map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-all border border-gray-100">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="font-medium text-gray-900">{claim.id}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(claim.status)}`}>
                          {getStatusIcon(claim.status)}
                          {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">{claim.policy}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{claim.amount}</div>
                      <div className="text-sm text-gray-500">{claim.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 rounded-lg font-medium hover:from-indigo-100 hover:to-purple-100 transition-all border border-indigo-100">
                + Submit New Claim
              </button>
            </div>

            {/* Active Policies */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Active Policies</h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {policies.map((policy) => (
                  <div key={policy.id} className="p-4 border border-gray-100 rounded-lg hover:border-indigo-200 hover:bg-indigo-50/50 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {policy.type === 'Health' && <User className="w-4 h-4 text-green-600" />}
                          {policy.type === 'Auto' && <Car className="w-4 h-4 text-blue-600" />}
                          {policy.type === 'Home' && <Home className="w-4 h-4 text-orange-600" />}
                          <span className="text-sm font-medium text-gray-700">{policy.type}</span>
                        </div>
                        <h3 className="font-bold text-gray-900">{policy.name}</h3>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Active
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="text-sm text-gray-500">Coverage</div>
                        <div className="font-medium text-gray-900">{policy.coverage}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Premium</div>
                        <div className="font-medium text-gray-900">{policy.premium}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="text-sm text-gray-500">Expires on {policy.expiry}</div>
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all">
                + Get New Policy
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View All Activity
              </button>
            </div>
            
            <div className="space-y-4">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                    {idx === 0 && <FileText className="w-5 h-5 text-indigo-600" />}
                    {idx === 1 && <Shield className="w-5 h-5 text-indigo-600" />}
                    {idx === 2 && <DollarSign className="w-5 h-5 text-indigo-600" />}
                    {idx === 3 && <Download className="w-5 h-5 text-indigo-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.details}</div>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Blockchain Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-2 px-6 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Blockchain Network: Connected</span>
          </div>
          <span className="text-gray-400">|</span>
          <span>Last Block: #12,345,678</span>
          <span className="text-gray-400">|</span>
          <span>Gas Price: 45 Gwei</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-indigo-300 hover:text-white transition">
            <Settings className="w-4 h-4" />
          </button>
          <button className="text-indigo-300 hover:text-white transition">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;