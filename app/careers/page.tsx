'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { FaBriefcase, FaClock, FaMapMarkerAlt, FaHeart, FaGraduationCap, FaTrophy, FaHandshake, FaUpload, FaTimes } from 'react-icons/fa';

const positions = [
  {
    id: 'manager',
    icon: FaBriefcase,
    location: 'Split, Croatia',
    experience: '5+ years',
    requirements: [
      'Bachelor\'s degree in Hospitality Management or related field',
      '5+ years of hotel management experience',
      'Fluent in English and Croatian',
      'Strong leadership and communication skills',
      'Experience with luxury hospitality brands'
    ]
  },
  {
    id: 'chef',
    icon: FaGraduationCap,
    location: 'Split, Croatia',
    experience: '8+ years',
    requirements: [
      'Culinary degree or equivalent experience',
      '8+ years in high-end restaurants or hotels',
      'Experience with Mediterranean and Croatian cuisine',
      'Leadership experience managing kitchen staff',
      'Creative menu development skills'
    ]
  },
  {
    id: 'concierge',
    icon: FaHandshake,
    location: 'Split, Croatia',
    experience: '3+ years',
    requirements: [
      'Excellent knowledge of Split and surrounding areas',
      'Fluent in English, Croatian, and preferably one more language',
      '3+ years in luxury hospitality',
      'Strong network of local contacts',
      'Problem-solving and customer service excellence'
    ]
  },
  {
    id: 'housekeeping',
    icon: FaTrophy,
    location: 'Split, Croatia',
    experience: '5+ years',
    requirements: [
      '5+ years housekeeping experience in luxury hotels',
      'Team management experience',
      'Knowledge of cleaning standards and procedures',
      'Attention to detail and quality control',
      'Ability to train and motivate staff'
    ]
  }
];

export default function Careers() {
  const { t } = useLanguage();
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Application submitted successfully! (Demo mode - no actual submission)');
    setShowApplicationForm(false);
    setFormData({
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
  };

  const getPositionData = (posId: string) => {
    const position = positions.find(p => p.id === posId);
    const positionInfo = t.careers.positions[posId as keyof typeof t.careers.positions];
    return { ...position, ...positionInfo };
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop"
            alt="Careers at Hotel du Théâtre"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">{t.careers.title}</h1>
          <p className="text-xl md:text-2xl mb-4">{t.careers.subtitle}</p>
          <p className="text-lg max-w-2xl mx-auto">{t.careers.intro}</p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">{t.careers.whyWorkWithUs.title}</h2>
            <p className="text-xl text-gray-600">{t.careers.whyWorkWithUs.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.careers.whyWorkWithUs.healthWellness.title}</h3>
              <p className="text-gray-600">{t.careers.whyWorkWithUs.healthWellness.description}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Development</h3>
              <p className="text-gray-600">Continuous learning and advancement opportunities</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recognition</h3>
              <p className="text-gray-600">Performance bonuses and employee appreciation programs</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Culture</h3>
              <p className="text-gray-600">Collaborative environment with team-building events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">Find your perfect role in our team</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {positions.map((position) => {
              const posData = getPositionData(position.id);
              const Icon = position.icon;

              return (
                <div
                  key={position.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedPosition(position.id === selectedPosition ? null : position.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="text-2xl text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{posData.title}</h3>
                      <p className="text-gray-600 mb-3">{posData.description}</p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="flex items-center text-gray-500">
                          <FaBriefcase className="mr-1" />
                          {posData.department}
                        </span>
                        <span className="flex items-center text-gray-500">
                          <FaClock className="mr-1" />
                          {posData.type}
                        </span>
                        <span className="flex items-center text-gray-500">
                          <FaMapMarkerAlt className="mr-1" />
                          {position.location}
                        </span>
                      </div>

                      {selectedPosition === position.id && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-semibold mb-2">Requirements:</h4>
                          <ul className="space-y-1">
                            {position.requirements.map((req, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                {req}
                              </li>
                            ))}
                          </ul>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData(prev => ({ ...prev, position: posData.title }));
                              setShowApplicationForm(true);
                            }}
                            className="mt-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-medium"
                          >
                            {t.careers.apply}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
            <h2 className="text-2xl font-semibold mb-6 pr-8">{t.careers.applicationForm.title}</h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t.careers.form.firstName} *
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
                    {t.careers.form.lastName} *
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
                    {t.careers.form.email} *
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
                    {t.careers.form.phone} *
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
                  {t.careers.form.passport} *
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
                    {t.careers.form.position} *
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
                    {t.careers.form.experience} *
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
                  {t.careers.form.coverLetter}
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
                  {t.careers.form.resume} *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <FaUpload className="text-3xl text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      {formData.resume ? formData.resume.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-gray-500">PDF, DOC, DOCX (max 5MB)</p>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-medium"
                >
                  {t.careers.form.submit}
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
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">What Our Team Says</h2>
            <p className="text-xl text-gray-600">Hear from the people who make Hotel du Théâtre special</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-600 mb-4 italic">
                "Working at Hotel du Théâtre has been an incredible journey. The team is like family, and the opportunities for growth are endless."
              </p>
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                    alt="Employee"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Petar Nikolić</p>
                  <p className="text-sm text-gray-500">Front Desk Manager, 3 years</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-600 mb-4 italic">
                "The hotel's commitment to excellence pushes me to be my best every day. I'm proud to be part of this amazing team."
              </p>
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                    alt="Employee"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Marina Jurić</p>
                  <p className="text-sm text-gray-500">Spa Manager, 5 years</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-600 mb-4 italic">
                "The training and development programs here have helped me advance my career beyond what I imagined possible."
              </p>
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                    alt="Employee"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Tomislav Horvat</p>
                  <p className="text-sm text-gray-500">Sous Chef, 2 years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}