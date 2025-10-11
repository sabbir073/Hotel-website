'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaDownload, FaTimes, FaCheckCircle, FaExclamationCircle, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Permit {
  id: number;
  license_number: string;
  date_of_issue: string;
  valid_from: string;
  valid_until: string;
  employee_name: string;
  employee_address: string;
  date_of_birth: string;
  passport_number: string;
  passport_issued_in: string;
  citizenship: string;
  company_name: string;
  company_address: string;
  mbs: string;
  oib: string;
  occupation: string;
  salary: number;
  email: string | null;
  contract_no: string | null;
  pdf_file_path: string | null;
  pdf_public_url: string | null;
  created_at: string;
}

type ToastType = 'success' | 'error';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

// Form state interface with Date objects for date fields
interface PermitFormData {
  id?: number;
  license_number?: string;
  date_of_issue?: Date | null;
  valid_from?: Date | null;
  valid_until?: Date | null;
  employee_name?: string;
  employee_address?: string;
  date_of_birth?: Date | null;
  passport_number?: string;
  passport_issued_in?: string;
  citizenship?: string;
  company_name?: string;
  company_address?: string;
  mbs?: string;
  oib?: string;
  occupation?: string;
  salary?: number;
  email?: string | null;
  contract_no?: string | null;
}

export default function PermitManagement() {
  const [permits, setPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPermit, setCurrentPermit] = useState<PermitFormData>({
    company_name: 'THEATRE HOTEL d.o.o.',
    company_address: 'Matošića 21, 21000, Split, Hrvatska',
    mbs: '060416714',
    oib: '13682410736',
  });
  const [generatingPdf, setGeneratingPdf] = useState<number | null>(null);
  const [savingData, setSavingData] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Helper function to convert string/Date to Date object
  const parseDate = (dateString: string | Date | null): Date | null => {
    if (!dateString) return null;
    if (dateString instanceof Date) return dateString;

    // Parse YYYY-MM-DD format from database
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) return date;
    return null;
  };

  // Helper function to convert Date to YYYY-MM-DD for database
  const formatDateToYYYYMMDD = (date: Date | null | undefined): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchPermits();
  }, []);

  const addToast = (type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const fetchPermits = async () => {
    try {
      const response = await fetch('/api/admin/permits');
      if (response.ok) {
        const data = await response.json();
        setPermits(data);
      }
    } catch (error) {
      console.error('Error fetching permits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingData(true);
    setFormError(''); // Clear previous errors

    try {
      // Convert dates from DD-MM-YYYY to YYYY-MM-DD for database
      const permitData = {
        ...currentPermit,
        date_of_issue: formatDateToYYYYMMDD(currentPermit.date_of_issue),
        valid_from: formatDateToYYYYMMDD(currentPermit.valid_from),
        valid_until: formatDateToYYYYMMDD(currentPermit.valid_until),
        date_of_birth: formatDateToYYYYMMDD(currentPermit.date_of_birth),
      };

      if (editMode) {
        // Update existing permit - Step 1: Delete old PDF
        setProgressMessage('Deleting old PDF...');
        const deleteResponse = await fetch(`/api/admin/permits/generate-pdf?permitId=${currentPermit.id}`, {
          method: 'DELETE',
        });

        if (!deleteResponse.ok) {
          console.warn('Failed to delete old PDF, continuing with update...');
        }

        // Step 2: Update permit data
        setProgressMessage('Updating permit...');
        const response = await fetch('/api/admin/permits', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(permitData),
        });

        if (!response.ok) {
          const error = await response.json();
          setFormError(error.error || 'Failed to update permit');
          addToast('error', error.error || 'Failed to update permit');
          setSavingData(false);
          setProgressMessage('');
          return;
        }

        // Step 3: Generate new PDF
        setProgressMessage('Generating new PDF...');
        const pdfResponse = await fetch('/api/admin/permits/generate-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ permitId: currentPermit.id }),
        });

        if (!pdfResponse.ok) {
          setFormError('Permit updated but PDF generation failed');
          addToast('error', 'Permit updated but PDF generation failed');
          setSavingData(false);
          setProgressMessage('');
          await fetchPermits();
          return;
        }

        const pdfResult = await pdfResponse.json();

        // Success!
        await fetchPermits();
        setShowModal(false);
        resetForm();
        addToast('success', 'Permit updated and PDF regenerated successfully!');

        // Open PDF in new tab
        if (pdfResult.pdfUrl) {
          window.open(pdfResult.pdfUrl, '_blank');
        }
      } else {
        // Create new permit - Step 1: Save data
        setProgressMessage('Saving permit data...');
        const saveResponse = await fetch('/api/admin/permits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(permitData),
        });

        if (!saveResponse.ok) {
          const error = await saveResponse.json();
          setFormError(error.error || 'Failed to save permit');
          addToast('error', error.error || 'Failed to save permit');
          setSavingData(false);
          setProgressMessage('');
          return;
        }

        const saveResult = await saveResponse.json();
        const newPermitId = saveResult.id;

        // Step 2: Generate PDF
        setProgressMessage('Generating PDF document...');
        const pdfResponse = await fetch('/api/admin/permits/generate-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ permitId: newPermitId }),
        });

        if (!pdfResponse.ok) {
          // PDF generation failed - delete the permit
          await fetch(`/api/admin/permits?id=${newPermitId}`, {
            method: 'DELETE',
          });
          setFormError('Failed to generate PDF. Permit not saved.');
          addToast('error', 'Failed to generate PDF. Permit not saved.');
          setSavingData(false);
          setProgressMessage('');
          return;
        }

        const pdfResult = await pdfResponse.json();

        // Step 3: Success message
        setProgressMessage('Uploading PDF to server...');

        // Success!
        await fetchPermits();
        setShowModal(false);
        resetForm();
        addToast('success', `Permit created successfully! PDF: ${pdfResult.filename}`);

        // Open PDF in new tab
        if (pdfResult.pdfUrl) {
          window.open(pdfResult.pdfUrl, '_blank');
        }
      }
    } catch (error) {
      console.error('Error saving permit:', error);
      addToast('error', 'An unexpected error occurred');
    } finally {
      setSavingData(false);
      setProgressMessage('');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this permit and its PDF?')) return;

    try {
      // Step 1: Delete PDF from FTP server
      const pdfDeleteResponse = await fetch(`/api/admin/permits/generate-pdf?permitId=${id}`, {
        method: 'DELETE',
      });

      if (!pdfDeleteResponse.ok) {
        console.warn('Failed to delete PDF from FTP, continuing with permit deletion...');
      }

      // Step 2: Delete permit from database
      const response = await fetch(`/api/admin/permits?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchPermits();
        addToast('success', 'Permit and PDF deleted successfully');
      } else {
        const error = await response.json();
        addToast('error', error.error || 'Failed to delete permit');
      }
    } catch (error) {
      console.error('Error deleting permit:', error);
      addToast('error', 'An unexpected error occurred while deleting permit');
    }
  };

  const handleEdit = (permit: Permit) => {
    // Convert date strings from database to Date objects for DatePicker
    setCurrentPermit({
      ...permit,
      date_of_issue: parseDate(permit.date_of_issue),
      valid_from: parseDate(permit.valid_from),
      valid_until: parseDate(permit.valid_until),
      date_of_birth: parseDate(permit.date_of_birth),
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleGeneratePdf = async (permitId: number) => {
    setGeneratingPdf(permitId);

    try {
      const response = await fetch('/api/admin/permits/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permitId }),
      });

      if (response.ok) {
        const result = await response.json();
        await fetchPermits();

        if (result.pdfUrl) {
          window.open(result.pdfUrl, '_blank');
          addToast('success', 'PDF generated successfully!');
        }
      } else {
        addToast('error', 'Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      addToast('error', 'Failed to generate PDF');
    } finally {
      setGeneratingPdf(null);
    }
  };

  const handleDownloadPdf = async (permit: Permit) => {
    if (permit.pdf_public_url) {
      window.open(permit.pdf_public_url, '_blank');
    } else {
      await handleGeneratePdf(permit.id);
    }
  };

  const resetForm = () => {
    setCurrentPermit({
      company_name: 'THEATRE HOTEL d.o.o.',
      company_address: 'Matošića 21, 21000, Split, Hrvatska',
      mbs: '060416714',
      oib: '13682410736',
    });
    setEditMode(false);
    setFormError(''); // Clear form errors
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      {/* Toast Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
              toast.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {toast.type === 'success' ? (
              <FaCheckCircle className="text-2xl" />
            ) : (
              <FaExclamationCircle className="text-2xl" />
            )}
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 hover:opacity-80"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Permit Management</h1>
          <p className="text-gray-600 mt-2">Manage work permits and employment contracts</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FaPlus />
          <span>Add Permit</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    License Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Occupation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valid From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valid Until
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {permits.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No permits yet
                    </td>
                  </tr>
                ) : (
                  permits.map((permit) => (
                    <tr key={permit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {permit.license_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {permit.employee_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {permit.occupation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(permit.valid_from)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(permit.valid_until)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                        <button
                          onClick={() => handleEdit(permit)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <FaEdit className="inline" />
                        </button>
                        <button
                          onClick={() => handleDelete(permit.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FaTrash className="inline" />
                        </button>
                        <button
                          onClick={() => handleDownloadPdf(permit)}
                          disabled={generatingPdf === permit.id}
                          className="text-green-600 hover:text-green-900 disabled:opacity-50"
                          title="Download PDF"
                        >
                          {generatingPdf === permit.id ? (
                            <span className="inline-block animate-spin">⏳</span>
                          ) : (
                            <FaDownload className="inline" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-gray-900">
                {editMode ? 'Edit Permit' : 'Add New Permit'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
                disabled={savingData}
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Permit Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Permit Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      License Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={savingData}
                      value={currentPermit.license_number || ''}
                      onChange={(e) => setCurrentPermit({ ...currentPermit, license_number: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                      placeholder="HR5182534WP2025"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Issue <span className="text-red-500">*</span>
                    </label>
                    <DatePicker
                      selected={currentPermit.date_of_issue}
                      onChange={(date) => setCurrentPermit({ ...currentPermit, date_of_issue: date })}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="DD-MM-YYYY"
                      disabled={savingData}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                      wrapperClassName="w-full"
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valid From <span className="text-red-500">*</span>
                    </label>
                    <DatePicker
                      selected={currentPermit.valid_from}
                      onChange={(date) => setCurrentPermit({ ...currentPermit, valid_from: date })}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="DD-MM-YYYY"
                      disabled={savingData}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                      wrapperClassName="w-full"
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valid Until <span className="text-red-500">*</span>
                    </label>
                    <DatePicker
                      selected={currentPermit.valid_until}
                      onChange={(date) => setCurrentPermit({ ...currentPermit, valid_until: date })}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="DD-MM-YYYY"
                      disabled={savingData}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                      wrapperClassName="w-full"
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                    />
                  </div>
                </div>
              </div>

              {/* Employee Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={savingData}
                      value={currentPermit.employee_name || ''}
                      onChange={(e) => setCurrentPermit({ ...currentPermit, employee_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <DatePicker
                      selected={currentPermit.date_of_birth}
                      onChange={(date) => setCurrentPermit({ ...currentPermit, date_of_birth: date })}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="DD-MM-YYYY"
                      disabled={savingData}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                      wrapperClassName="w-full"
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      maxDate={new Date()}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={savingData}
                      value={currentPermit.employee_address || ''}
                      onChange={(e) => setCurrentPermit({ ...currentPermit, employee_address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passport Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={savingData}
                      value={currentPermit.passport_number || ''}
                      onChange={(e) => setCurrentPermit({ ...currentPermit, passport_number: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passport Issued In <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={savingData}
                      value={currentPermit.passport_issued_in || ''}
                      onChange={(e) => setCurrentPermit({ ...currentPermit, passport_issued_in: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Citizenship <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={savingData}
                      value={currentPermit.citizenship || ''}
                      onChange={(e) => setCurrentPermit({ ...currentPermit, citizenship: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={savingData}
                      value={currentPermit.company_name || ''}
                      onChange={(e) => setCurrentPermit({ ...currentPermit, company_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={savingData}
                      value={currentPermit.company_address || ''}
                      onChange={(e) => setCurrentPermit({ ...currentPermit, company_address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      MBS <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={savingData}
                      value={currentPermit.mbs || ''}
                      onChange={(e) => setCurrentPermit({ ...currentPermit, mbs: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OIB <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={savingData}
                      value={currentPermit.oib || ''}
                      onChange={(e) => setCurrentPermit({ ...currentPermit, oib: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Employment Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Occupation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={savingData}
                      value={currentPermit.occupation || ''}
                      onChange={(e) => setCurrentPermit({ ...currentPermit, occupation: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary (EUR) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      disabled={savingData}
                      value={currentPermit.salary || ''}
                      onChange={(e) => setCurrentPermit({ ...currentPermit, salary: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      disabled={savingData}
                      value={currentPermit.email || ''}
                      onChange={(e) => setCurrentPermit({ ...currentPermit, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contract No
                    </label>
                    <input
                      type="text"
                      disabled={savingData}
                      value={currentPermit.contract_no || ''}
                      onChange={(e) => setCurrentPermit({ ...currentPermit, contract_no: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Error Message Display */}
              {formError && (
                <div className="px-6 py-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                  <div className="flex items-center gap-3">
                    <FaExclamationCircle className="text-red-600 text-xl flex-shrink-0" />
                    <span className="text-red-700 font-medium">{formError}</span>
                  </div>
                </div>
              )}

              {/* Progress Bar - Moved to Bottom */}
              {savingData && (
                <div className="px-6 py-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-blue-700 font-medium">{progressMessage}</span>
                  </div>
                  <div className="mt-3 w-full bg-blue-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full animate-pulse transition-all duration-500" style={{ width: '70%' }}></div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  disabled={savingData}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingData}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {savingData && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                  {editMode ? 'Update' : 'Create'} Permit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
