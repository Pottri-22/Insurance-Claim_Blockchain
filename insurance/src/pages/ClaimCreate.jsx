import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Upload, X, FileText, CheckCircle, Loader,
  Shield, Calendar, DollarSign, Building, User, Stethoscope,
  ChevronRight, AlertCircle
} from 'lucide-react';

const ClaimCreate = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [claimId, setClaimId] = useState('');

  const [formData, setFormData] = useState({
    claimType: '',
    treatmentDescription: '',
    hospitalName: '',
    doctorName: '',
    admissionDate: '',
    dischargeDate: '',
    claimAmount: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const claimTypes = [
    'Emergency Surgery',
    'Hospitalization',
    'Diagnostic Tests',
    'Consultation',
    'Preventive Care'
  ];

  const mockPolicy = {
    number: 'HLTH-2024-5678',
    coverageType: 'Comprehensive Health Insurance',
    sumInsured: 500000,
    availableBalance: 260000,
    status: 'Active'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateStep1 = () => {
    const required = ['claimType', 'treatmentDescription', 'hospitalName', 'doctorName', 'admissionDate', 'claimAmount'];
    return required.every(field => formData[field].trim() !== '');
  };

  const validateStep2 = () => {
    return uploadedFiles.length > 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newClaimId = `CLM-2025-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      setClaimId(newClaimId);
      setLoading(false);
      setSuccess(true);
      // Redirect after showing success
      setTimeout(() => {
        navigate('/dashboard/user');
      }, 3000);
    }, 2000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Claim Submitted Successfully!</h2>
            <p className="text-slate-600 mb-6">
              Your claim has been submitted and is pending blockchain validation.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-slate-500">Claim ID</p>
              <p className="text-lg font-bold text-slate-900">{claimId}</p>
            </div>
            <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-200">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard/user')}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <h1 className="text-xl font-bold bg-linear-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Submit New Claim
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          {[
            { step: 1, label: 'Claim Details' },
            { step: 2, label: 'Documents' },
            { step: 3, label: 'Review & Submit' }
          ].map((item) => (
            <div key={item.step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= item.step
                  ? 'bg-slate-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {currentStep > item.step ? <CheckCircle className="w-5 h-5" /> : item.step}
              </div>
              <span className={`ml-3 font-medium ${
                currentStep >= item.step ? 'text-slate-900' : 'text-slate-500'
              }`}>
                {item.label}
              </span>
              {item.step < 3 && (
                <ChevronRight className={`w-5 h-5 ml-3 ${
                  currentStep > item.step ? 'text-slate-600' : 'text-slate-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

          {/* Step 1: Claim Details */}
          {currentStep === 1 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Claim Details</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Claim Type *
                  </label>
                  <select
                    name="claimType"
                    value={formData.claimType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                    required
                  >
                    <option value="">Select claim type</option>
                    {claimTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Treatment Description *
                  </label>
                  <textarea
                    name="treatmentDescription"
                    value={formData.treatmentDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                    placeholder="Describe the treatment received..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Hospital Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                        placeholder="Hospital name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Doctor Name *
                    </label>
                    <div className="relative">
                      <Stethoscope className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="doctorName"
                        value={formData.doctorName}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                        placeholder="Doctor name"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Admission Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <input
                        type="date"
                        name="admissionDate"
                        value={formData.admissionDate}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Discharge Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <input
                        type="date"
                        name="dischargeDate"
                        value={formData.dischargeDate}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Claim Amount (INR) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      name="claimAmount"
                      value={formData.claimAmount}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Document Upload */}
          {currentStep === 2 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Upload Documents</h2>

              <div className="space-y-6">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-slate-700 mb-2">Drop files here or click to upload</p>
                  <p className="text-sm text-slate-500 mb-4">
                    Supported formats: PDF, JPG, PNG (Max 10MB each)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-900">Uploaded Documents</h3>
                    {uploadedFiles.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-slate-600" />
                          <div>
                            <p className="font-medium text-slate-900">{file.name}</p>
                            <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 mb-1">Required Documents</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Hospital Bill</li>
                        <li>• Discharge Summary</li>
                        <li>• Doctor Prescription</li>
                        <li>• Lab Reports (if applicable)</li>
                        <li>• Payment Receipt</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Review & Submit Claim</h2>

              <div className="space-y-8">
                {/* Claim Summary */}
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Claim Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">Type:</span> {formData.claimType}</div>
                    <div><span className="font-medium">Amount:</span> {formatCurrency(formData.claimAmount)}</div>
                    <div><span className="font-medium">Hospital:</span> {formData.hospitalName}</div>
                    <div><span className="font-medium">Doctor:</span> {formData.doctorName}</div>
                    <div><span className="font-medium">Admission:</span> {formData.admissionDate}</div>
                    <div><span className="font-medium">Discharge:</span> {formData.dischargeDate || 'N/A'}</div>
                  </div>
                  <div className="mt-4">
                    <span className="font-medium">Description:</span>
                    <p className="text-slate-600 mt-1">{formData.treatmentDescription}</p>
                  </div>
                </div>

                {/* Documents Summary */}
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Uploaded Documents ({uploadedFiles.length})</h3>
                  {uploadedFiles.length > 0 ? (
                    <div className="space-y-2">
                      {uploadedFiles.map(file => (
                        <div key={file.id} className="flex items-center gap-3 text-sm">
                          <FileText className="w-4 h-4 text-slate-600" />
                          <span>{file.name}</span>
                          <span className="text-slate-500">({formatFileSize(file.size)})</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500">No documents uploaded</p>
                  )}
                </div>

                {/* Policy Preview */}
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Policy Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">Policy Number:</span> {mockPolicy.number}</div>
                    <div><span className="font-medium">Coverage Type:</span> {mockPolicy.coverageType}</div>
                    <div><span className="font-medium">Sum Insured:</span> {formatCurrency(mockPolicy.sumInsured)}</div>
                    <div><span className="font-medium">Available Balance:</span> {formatCurrency(mockPolicy.availableBalance)}</div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Status:</span>
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {mockPolicy.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-3 text-slate-600 hover:text-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed font-medium"
            >
              Back
            </button>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/dashboard/user')}
                className="px-6 py-3 text-slate-600 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !validateStep1()) ||
                    (currentStep === 2 && !validateStep2())
                  }
                  className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:bg-slate-400 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:bg-slate-400 disabled:cursor-not-allowed font-medium transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Submit Claim
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClaimCreate;