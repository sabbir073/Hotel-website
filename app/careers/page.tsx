'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import RecaptchaProvider from '@/components/RecaptchaProvider';
import Link from 'next/link';
import Image from 'next/image';
import { FaBriefcase, FaClock, FaMapMarkerAlt, FaHeart, FaGraduationCap, FaTrophy, FaHandshake, FaUpload, FaTimes, FaCheckCircle } from 'react-icons/fa';

interface Job {
  id: number;
  title: string;
  description: string;
  department: string;
  type: string;
  location: string;
  requirements: string;
}

const iconMap: Record<string, any> = {
  'Management': FaBriefcase,
  'Culinary': FaGraduationCap,
  'Guest Services': FaHandshake,
  'Housekeeping': FaTrophy,
  'default': FaBriefcase
};

function CareersPage() {
  const { t } = useLanguage();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    jobId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passport: '',
    position: '',
    experience: '',
    coverLetter: '',
    resume: null as File | null
  });


  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      // Error fetching jobs
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);
    setUploadStatus('Preparing application...');

    try {
      // Step 1: Get client IP (10%)
      setUploadProgress(10);
      setUploadStatus('Getting client information...');
      let clientIp = 'unknown';
      try {
        const ipResponse = await fetch('https://api64.ipify.org?format=json');
        const ipData = await ipResponse.json();
        clientIp = ipData.ip;
      } catch {}

      // Step 2: Prepare form data (20%)
      setUploadProgress(20);
      setUploadStatus('Preparing form data...');
      const formDataToSend = new FormData();
      formDataToSend.append('jobId', formData.jobId.toString());
      formDataToSend.append('jobTitle', formData.position);
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('passport', formData.passport);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('clientIp', clientIp);
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      // Step 3: Upload to server (30% - 90%)
      setUploadProgress(30);
      setUploadStatus('Uploading resume to server...');

      // Create XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();

      const uploadPromise = new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = 30 + Math.round((e.loaded / e.total) * 60);
            setUploadProgress(percentComplete);
            setUploadStatus(`Uploading resume... ${percentComplete}%`);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(xhr.statusText));
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Upload failed')));
        xhr.addEventListener('abort', () => reject(new Error('Upload aborted')));

        xhr.open('POST', '/api/jobs/apply');
        xhr.send(formDataToSend);
      });

      // Step 4: Wait for response (90%)
      setUploadProgress(90);
      setUploadStatus('Saving to database...');
      const data: any = await uploadPromise;

      // Step 5: Complete (100%)
      setUploadProgress(100);
      setUploadStatus(t?.careers?.applicationForm?.uploadProgress || 'Application submitted successfully!');

      setTimeout(() => {
        setShowApplicationForm(false);
        setShowSuccessModal(true);
        setFormData({
          jobId: 0,
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          passport: '',
          position: '',
          experience: '',
          coverLetter: '',
          resume: null
        });
        setUploadProgress(0);
        setUploadStatus('');
      }, 1000);

    } catch (error: any) {
      setErrorMessage(error?.message || t?.careers?.applicationForm?.errorMessage || 'An error occurred. Please try again.');
      setShowErrorModal(true);
      setUploadProgress(0);
      setUploadStatus('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop"
            alt="Careers at THEATRE HOTEL d.o.o. Split Croatia - join our professional hospitality team and build your career"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">{t?.careers?.title || "Join Our Team"}</h1>
          <p className="text-xl md:text-2xl mb-4">{t?.careers?.subtitle || "Build Your Career with THEATRE HOTEL d.o.o."}</p>
          <p className="text-lg max-w-2xl mx-auto">{t?.careers?.intro || "We're always looking for talented individuals who share our passion for hospitality"}</p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">{t?.careers?.whyWorkWithUs?.title || "Why Work With Us"}</h2>
            <p className="text-xl text-gray-600">{t?.careers?.whyWorkWithUs?.subtitle || "Join a team that values excellence, growth, and well-being"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t?.careers?.whyWorkWithUs?.healthWellness?.title || "Health & Wellness"}</h3>
              <p className="text-gray-600">{t?.careers?.whyWorkWithUs?.healthWellness?.description || "Comprehensive health insurance and wellness programs"}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t?.careers?.whyWorkWithUs?.careerDevelopment?.title || "Career Development"}</h3>
              <p className="text-gray-600">{t?.careers?.whyWorkWithUs?.careerDevelopment?.description || "Continuous learning and advancement opportunities"}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t?.careers?.whyWorkWithUs?.recognition?.title || "Recognition"}</h3>
              <p className="text-gray-600">{t?.careers?.whyWorkWithUs?.recognition?.description || "Performance bonuses and employee appreciation programs"}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t?.careers?.whyWorkWithUs?.teamCulture?.title || "Team Culture"}</h3>
              <p className="text-gray-600">{t?.careers?.whyWorkWithUs?.teamCulture?.description || "Collaborative environment with team-building events"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">{t?.careers?.openPositions?.title || "Open Positions"}</h2>
            <p className="text-xl text-gray-600">{t?.careers?.openPositions?.subtitle || "Find your perfect role in our team"}</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading positions...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No open positions at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {jobs.map((job) => {
                const Icon = iconMap[job.department] || iconMap['default'];
                let requirements: string[] = [];
                try {
                  requirements = JSON.parse(job.requirements);
                } catch {
                  requirements = job.requirements.split('\n').filter(r => r.trim());
                }

                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => setSelectedPosition(job.id === selectedPosition ? null : job.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="text-2xl text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                        <p className="text-gray-600 mb-3">{job.description}</p>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="flex items-center text-gray-500">
                            <FaBriefcase className="mr-1" />
                            {job.department}
                          </span>
                          <span className="flex items-center text-gray-500">
                            <FaClock className="mr-1" />
                            {job.type}
                          </span>
                          <span className="flex items-center text-gray-500">
                            <FaMapMarkerAlt className="mr-1" />
                            {job.location}
                          </span>
                        </div>

                        {selectedPosition === job.id && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-semibold mb-2">Requirements:</h4>
                            <ul className="space-y-1">
                              {requirements.map((req, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start">
                                  <span className="text-primary-600 mr-2">•</span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData(prev => ({ ...prev, jobId: job.id, position: job.title }));
                                setShowApplicationForm(true);
                              }}
                              className="mt-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-medium"
                            >
                              {t?.careers?.apply || "Apply Now"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setShowApplicationForm(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <FaTimes className="text-lg" />
            </button>
            <h2 className="text-2xl font-semibold mb-6 pr-8">{t?.careers?.applicationForm?.title || "Job Application Form"}</h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t?.careers?.form?.firstName || "First Name"} *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t?.careers?.form?.lastName || "Last Name"} *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t?.careers?.form?.email || "Email"} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t?.careers?.form?.phone || "Phone"} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  {t?.careers?.form?.passport || "Passport Number"} *
                </label>
                <input
                  type="text"
                  name="passport"
                  value={formData.passport}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t?.careers?.form?.position || "Position"} *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t?.careers?.form?.experience || "Years of Experience"} *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  {t?.careers?.form?.coverLetter || "Cover Letter"}
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Tell us why you're the perfect fit for this position..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  {t?.careers?.form?.resume || "Upload Resume"} * (PDF only)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                    accept=".pdf"
                    required
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <FaUpload className="text-3xl text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      {formData.resume ? formData.resume.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-gray-500">PDF only (max 5MB)</p>
                  </label>
                </div>
              </div>

              {/* Progress Bar */}
              {isSubmitting && (
                <div className="mb-6">
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">{uploadStatus}</span>
                      <span className="text-gray-600">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-600 to-primary-700 transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      >
                        <div className="h-full w-full bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : (t?.careers?.form?.submit || "Submit Application")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employee Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">{t?.careers?.employeeTestimonials?.title || "What Our Team Says"}</h2>
            <p className="text-xl text-gray-600">{t?.careers?.employeeTestimonials?.subtitle || "Hear from the people who make THEATRE HOTEL d.o.o. special"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-600 mb-4 italic">
                &ldquo;{t?.careers?.employeeTestimonials?.testimonial1?.text || "Working at THEATRE HOTEL d.o.o. has been an incredible journey. The team is like family, and the opportunities for growth are endless."}&rdquo;
              </p>
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                    alt="THEATRE HOTEL employee testimonial - Front Desk Manager sharing career growth experience"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{t?.careers?.employeeTestimonials?.testimonial1?.name || "Petar Nikolić"}</p>
                  <p className="text-sm text-gray-500">{t?.careers?.employeeTestimonials?.testimonial1?.position || "Front Desk Manager, 3 years"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-600 mb-4 italic">
                &ldquo;{t?.careers?.employeeTestimonials?.testimonial2?.text || "The hotel's commitment to excellence pushes me to be my best every day. I'm proud to be part of this amazing team."}&rdquo;
              </p>
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                    alt="Spa Manager at luxury hotel Split Croatia - employee success story and testimonial"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{t?.careers?.employeeTestimonials?.testimonial2?.name || "Marina Jurić"}</p>
                  <p className="text-sm text-gray-500">{t?.careers?.employeeTestimonials?.testimonial2?.position || "Spa Manager, 5 years"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-600 mb-4 italic">
                &ldquo;{t?.careers?.employeeTestimonials?.testimonial3?.text || "The training and development programs here have helped me advance my career beyond what I imagined possible."}&rdquo;
              </p>
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                    alt="Sous Chef THEATRE HOTEL Split - culinary professional sharing training and development experience"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{t?.careers?.employeeTestimonials?.testimonial3?.name || "Tomislav Horvat"}</p>
                  <p className="text-sm text-gray-500">{t?.careers?.employeeTestimonials?.testimonial3?.position || "Sous Chef, 2 years"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">{t.internalLinks.careers.exploreHotel}</h2>
            <p className="text-gray-600">{t.internalLinks.careers.exploreDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/about" className="group p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors">{t.internalLinks.careers.aboutHotel}</h3>
              <p className="text-gray-600">{t.internalLinks.careers.aboutDesc}</p>
            </Link>
            <Link href="/rooms" className="group p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors">{t.internalLinks.careers.luxuryAccommodations}</h3>
              <p className="text-gray-600">{t.internalLinks.careers.accommodationsDesc}</p>
            </Link>
            <Link href="/contact" className="group p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors">{t.internalLinks.careers.getInTouch}</h3>
              <p className="text-gray-600">{t.internalLinks.careers.getInTouchDesc}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-4xl text-green-600" />
              </div>

              <h2 className="text-2xl font-semibold mb-2 text-gray-900">{t?.careers?.applicationForm?.successTitle || "Application Submitted!"}</h2>
              <p className="text-gray-600 mb-6">
                {t?.careers?.applicationForm?.successMessage || "Thank you for your application! We have received your resume and will review it shortly."}
                <br />
                <span className="text-green-600 text-sm mt-2 block font-medium">
                  {t?.careers?.applicationForm?.successContact || "We will contact you soon via email."}
                </span>
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-medium w-full"
              >
                {t?.careers?.applicationForm?.close || "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowErrorModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTimes className="text-4xl text-red-600" />
              </div>

              <h2 className="text-2xl font-semibold mb-2 text-gray-900">{t?.careers?.applicationForm?.errorTitle || "Submission Failed"}</h2>
              <p className="text-gray-600 mb-6">
                {errorMessage}
                <br />
                <span className="text-sm mt-2 block text-gray-500">
                  {t?.careers?.applicationForm?.errorContact || "Please try again or contact us if the problem persists."}
                </span>
              </p>

              <button
                onClick={() => setShowErrorModal(false)}
                className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium w-full"
              >
                {t?.careers?.applicationForm?.close || "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Careers() {
  return (
    <RecaptchaProvider>
      <CareersPage />
    </RecaptchaProvider>
  );
}