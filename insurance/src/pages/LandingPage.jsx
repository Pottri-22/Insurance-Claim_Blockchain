import React, { useState, useEffect, useRef } from 'react';
import { Shield, Zap, Lock, TrendingUp, ArrowRight, Menu, X, Clock, DollarSign, Mail, Eye, EyeOff, Database, Server, Code, X as XIcon, AlertCircle, CheckCircle, Wallet, Layers, GitBranch, Cpu as Chip, ShieldCheck, Play, Pause, RefreshCw, UserPlus, AlertOctagon, Loader } from "lucide-react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [animationPlaying, setAnimationPlaying] = useState(true);
  const [demoStep, setDemoStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [portalHover, setPortalHover] = useState(false);
  const [problemDays, setProblemDays] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', confirmPassword: '', fullName: '', agreeToTerms: false });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setScrollProgress((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (animationPlaying) {
      const interval = setInterval(() => setDemoStep(p => (p + 1) % 4), 3000 / animationSpeed);
      return () => clearInterval(interval);
    }
  }, [animationPlaying, animationSpeed]);

  useEffect(() => {
    const interval = setInterval(() => setProblemDays(p => p >= 30 ? 1 : p + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      const idToken = await userCredential.user.getIdToken();
      
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('blockclaim_user', JSON.stringify(data.user));
        localStorage.setItem('blockclaim_token', idToken);
        setShowLoginModal(false);
        navigate('/dashboard');
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
      const idToken = await userCredential.user.getIdToken();
      
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('blockclaim_user', JSON.stringify(data.user));
        localStorage.setItem('blockclaim_token', idToken);
        setShowRegisterModal(false);
        navigate('/dashboard');
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const demoSteps = [
    { number: 1, title: "Claim Submission", description: "User submits claim", time: "5 min", gradient: "from-slate-400 to-slate-600" },
    { number: 2, title: "Smart Validation", description: "Auto-validates", time: "2 min", gradient: "from-gray-400 to-gray-600" },
    { number: 3, title: "Transparent Review", description: "Blockchain tracking", time: "30 min", gradient: "from-zinc-400 to-zinc-600" },
    { number: 4, title: "Instant Payment", description: "Wallet transfer", time: "15 min", gradient: "from-slate-500 to-gray-700" }
  ];

  const features = [
    { icon: <Zap />, title: "Automated Processing", description: "Smart contracts validate claims instantly", gradient: "from-slate-400 to-slate-600" },
    { icon: <Layers />, title: "Blockchain Transparency", description: "Immutable record on Polygon testnet", gradient: "from-gray-400 to-gray-600" },
    { icon: <ShieldCheck />, title: "Smart Contract Security", description: "Auditable with no single point of failure", gradient: "from-zinc-400 to-zinc-600" },
    { icon: <Wallet />, title: "Instant Disbursement", description: "Immediate wallet payment on approval", gradient: "from-slate-500 to-gray-700" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-100 text-gray-900">
      {/* Metallic texture */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Progress bar */}
      <div className="fixed top-0 w-full h-1 z-50">
        <div className="h-full bg-gradient-to-r from-slate-400 via-gray-400 to-zinc-400 transition-all" style={{ width: `${scrollProgress}%`, boxShadow: '0 0 20px rgba(148,163,184,0.6)' }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-300 via-gray-400 to-zinc-500 rounded-lg flex items-center justify-center shadow-xl border border-white/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-700 to-gray-900 bg-clip-text text-transparent">BlockClaim</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#problem" className="text-gray-600 hover:text-slate-700 font-medium">Problem</a>
              <a href="#solution" className="text-gray-600 hover:text-slate-700 font-medium">Solution</a>
              <a href="#demo" className="text-gray-600 hover:text-slate-700 font-medium">Demo</a>
              <button onClick={() => navigate('/login')} className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium">Sign In</button>
              <button onClick={() => navigate('/register')} className="px-4 py-2 bg-gradient-to-r from-slate-400 to-gray-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition">Get Started</button>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="pt-32 pb-20 px-6 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-slate-200/40 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-gray-200/40 to-transparent blur-3xl" />
        </div>

        {/* Portal */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20" onMouseEnter={() => setPortalHover(true)} onMouseLeave={() => setPortalHover(false)}>
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-slate-300 via-gray-300 to-zinc-300 rounded-full opacity-30 blur-3xl animate-pulse" />
            <div className="absolute -inset-4 bg-gradient-to-r from-slate-400 to-gray-400 rounded-full opacity-80 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="relative w-56 h-56 bg-gradient-to-br from-slate-300 via-gray-400 to-zinc-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/40 hover:scale-105 transition-transform" style={{ boxShadow: '0 0 80px rgba(148,163,184,0.7), inset 0 0 40px rgba(255,255,255,0.4)' }}>
              <div className="absolute inset-10 bg-gradient-to-br from-white/50 to-transparent rounded-full blur-xl" />
              <Shield className="w-24 h-24 text-white relative z-10" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} />
            </div>
          </div>
        </div>

        <div className="relative z-30 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-slate-100 to-gray-100 border border-slate-300 rounded-full text-sm font-medium mb-8 shadow-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Backend Running
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Insurance Claims
            <span className="block bg-gradient-to-r from-slate-500 via-gray-600 to-zinc-700 bg-clip-text text-transparent mt-2">
              Automated by Blockchain
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Submit claims in minutes, track on blockchain, receive payments automatically
          </p>
          
          <div className="flex gap-4 justify-center">
            <button onClick={() => setShowLoginModal(true)} className="px-8 py-4 bg-gradient-to-r from-slate-400 to-gray-500 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-white/20">
              Start a Claim <ArrowRight className="inline w-5 h-5 ml-2" />
            </button>
            <button onClick={() => setShowRegisterModal(true)} className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all hover:scale-105">
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-red-100 text-red-700 rounded-full mb-6">
              <AlertOctagon className="inline w-4 h-4 mr-2" />The Problem
            </div>
            <h2 className="text-5xl font-bold mb-6">Traditional Insurance is <span className="text-red-600">Broken</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Clock />, title: "30+ Days", desc: "Manual processing creates bottlenecks", color: "red" },
              { icon: <AlertCircle />, title: "Zero Visibility", desc: "No tracking for weeks", color: "orange" },
              { icon: <DollarSign />, title: "$200-500 per Claim", desc: "High processing costs", color: "yellow" }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 border border-gray-100">
                <div className={`w-16 h-16 bg-${item.color}-100 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                  {React.cloneElement(item.icon, { className: `w-8 h-8 text-${item.color}-600` })}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-24 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-slate-100 to-gray-100 border border-slate-300 rounded-full mb-6">
              <Zap className="inline w-4 h-4 mr-2" />The Solution
            </div>
            <h2 className="text-5xl font-bold mb-6">How <span className="bg-gradient-to-r from-slate-600 to-gray-800 bg-clip-text text-transparent">BlockClaim</span> Solves This</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div key={i} className="group bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition-all hover:scale-105 hover:border-slate-300">
                <div className={`w-14 h-14 bg-gradient-to-br ${f.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {React.cloneElement(f.icon, { className: "w-7 h-7" })}
                </div>
                <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 px-6 bg-gradient-to-b from-slate-50 to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">Live <span className="bg-gradient-to-r from-slate-600 to-gray-800 bg-clip-text text-transparent">Interactive</span> Demo</h2>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">Processing Timeline</h3>
              <div className="flex gap-3">
                <select value={animationSpeed} onChange={e => setAnimationSpeed(+e.target.value)} className="border rounded-lg px-3 py-2">
                  <option value="0.5">0.5x</option>
                  <option value="1">1x</option>
                  <option value="2">2x</option>
                </select>
                <button onClick={() => setAnimationPlaying(!animationPlaying)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                  {animationPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button onClick={() => setDemoStep(0)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="h-3 bg-gray-200 rounded-full mb-12">
              <div className={`h-full bg-gradient-to-r ${demoSteps[demoStep].gradient} rounded-full transition-all`} style={{ width: `${(demoStep + 1) * 25}%` }} />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {demoSteps.map((step, i) => (
                <div key={i} className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold transition-all ${i <= demoStep ? `bg-gradient-to-br ${step.gradient} shadow-lg animate-pulse` : 'bg-gray-300'}`}>
                    {step.number}
                  </div>
                  <div className={`font-bold mb-2 ${i <= demoStep ? 'text-slate-700' : 'text-gray-400'}`}>{step.title}</div>
                  <div className="text-sm text-gray-600">{step.description}</div>
                  <div className={`text-xs font-medium mt-2 px-3 py-1 rounded-full inline-block ${i <= demoStep ? `bg-gradient-to-r ${step.gradient} text-white` : 'bg-gray-100 text-gray-600'}`}>
                    {step.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-400 via-gray-500 to-zinc-600" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M0 0h30v30H0z' fill='%23fff' opacity='0.1'/%3E%3C/svg%3E")` }} />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="text-5xl font-bold mb-6">Ready to Experience Automated Claims?</h2>
          <p className="text-xl mb-10 text-slate-100">Submit a test claim and see blockchain processing in action</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setShowLoginModal(true)} className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl hover:shadow-2xl transition-all hover:scale-105">
              Sign In to Start
            </button>
            <button onClick={() => setShowRegisterModal(true)} className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all hover:scale-105">
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gradient-to-b from-slate-900 to-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-gray-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">BlockClaim</span>
          </div>
          <p className="mb-2">© 2025 BlockClaim Project. Educational blockchain demonstration.</p>
          <p className="text-sm text-gray-500">Built with React, Express, and Solidity on Polygon Testnet</p>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-slate-400 to-gray-500 p-8 text-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Welcome Back</h2>
                    <p className="text-slate-100">Access your account</p>
                  </div>
                </div>
                <button onClick={() => setShowLoginModal(false)} className="text-white/80 hover:text-white">
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-8">
              {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" value={loginData.email} onChange={e => setLoginData({...loginData, email: e.target.value})} className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-400" placeholder="you@example.com" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type={showPassword ? "text" : "password"} value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} className="w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-slate-400" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-slate-400 to-gray-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50">
                  {loading ? <Loader className="w-5 h-5 animate-spin mx-auto" /> : 'Sign In'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-slate-400 to-gray-500 p-8 text-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Join BlockClaim</h2>
                    <p className="text-slate-100">Create your account</p>
                  </div>
                </div>
                <button onClick={() => setShowRegisterModal(false)} className="text-white/80 hover:text-white">
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-8">
              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input type="text" value={registerData.fullName} onChange={e => setRegisterData({...registerData, fullName: e.target.value})} className="w-full px-4 py-3 border rounded-xl" placeholder="John Doe" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" value={registerData.email} onChange={e => setRegisterData({...registerData, email: e.target.value})} className="w-full px-4 py-3 border rounded-xl" placeholder="you@example.com" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input type="password" value={registerData.password} onChange={e => setRegisterData({...registerData, password: e.target.value})} className="w-full px-4 py-3 border rounded-xl" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm</label>
                    <input type="password" value={registerData.confirmPassword} onChange={e => setRegisterData({...registerData, confirmPassword: e.target.value})} className="w-full px-4 py-3 border rounded-xl" placeholder="••••••••" />
                  </div>
                </div>
                
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={registerData.agreeToTerms} onChange={e => setRegisterData({...registerData, agreeToTerms: e.target.checked})} className="rounded" />
                  <span className="text-sm">I agree to Terms & Privacy Policy</span>
                </label>
                
                <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-slate-400 to-gray-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50">
                  {loading ? <Loader className="w-5 h-5 animate-spin mx-auto" /> : 'Create Account'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-subtle { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.05); } }
        @keyframes bounce-soft { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes shimmer-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default App;