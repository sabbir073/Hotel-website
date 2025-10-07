'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-serif font-bold mb-8 text-gray-900">{t.privacy.title}</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>{t.privacy.lastUpdated}</strong> {t.privacy.lastUpdatedDate}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.privacy.section1.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.section1.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.privacy.section2.title}</h2>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.privacy.section2.subtitle1}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.privacy.section2.content1}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                {t.privacy.section2.items1.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.privacy.section2.subtitle2}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.privacy.section2.content2}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                {t.privacy.section2.items2.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.privacy.section3.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.privacy.section3.content}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                {t.privacy.section3.items.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.privacy.section4.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.privacy.section4.content1}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.section4.content2}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.privacy.section5.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.privacy.section5.content}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>{t.privacy.section5.serviceProviders}</strong> {t.privacy.section5.serviceProvidersDesc}</li>
                <li><strong>{t.privacy.section5.legalAuthorities}</strong> {t.privacy.section5.legalAuthoritiesDesc}</li>
                <li><strong>{t.privacy.section5.businessPartners}</strong> {t.privacy.section5.businessPartnersDesc}</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.section5.noSelling}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.privacy.section6.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.privacy.section6.content1}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.section6.content2}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>{t.privacy.section6.essentialCookies}</strong> {t.privacy.section6.essentialDesc}</li>
                <li><strong>{t.privacy.section6.analyticsCookies}</strong> {t.privacy.section6.analyticsDesc}</li>
                <li><strong>{t.privacy.section6.marketingCookies}</strong> {t.privacy.section6.marketingDesc}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.privacy.section7.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.privacy.section7.content}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>{t.privacy.section7.rightToAccess}</strong> {t.privacy.section7.accessDesc}</li>
                <li><strong>{t.privacy.section7.rightToRectification}</strong> {t.privacy.section7.rectificationDesc}</li>
                <li><strong>{t.privacy.section7.rightToErasure}</strong> {t.privacy.section7.erasureDesc}</li>
                <li><strong>{t.privacy.section7.rightToRestrict}</strong> {t.privacy.section7.restrictDesc}</li>
                <li><strong>{t.privacy.section7.rightToPortability}</strong> {t.privacy.section7.portabilityDesc}</li>
                <li><strong>{t.privacy.section7.rightToObject}</strong> {t.privacy.section7.objectDesc}</li>
                <li><strong>{t.privacy.section7.rightToWithdraw}</strong> {t.privacy.section7.withdrawDesc}</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.section7.contactInfo}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.privacy.section8.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.section8.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.privacy.section9.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.section9.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.privacy.section10.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.section10.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.privacy.section11.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.section11.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.privacy.section12.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.privacy.section12.content}
              </p>
              <div className="bg-gray-100 p-6 rounded-lg">
                <p className="text-gray-800"><strong>{t.privacy.section12.companyName}</strong></p>
                <p className="text-gray-700">{t.privacy.section12.address}</p>
                <p className="text-gray-700">{t.privacy.section12.email}</p>
                <p className="text-gray-700">{t.privacy.section12.phone}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.privacy.section13.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.section13.content}
              </p>
            </section>
          </div>

          {/* Navigation Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/terms" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-primary-700 font-semibold">{t.internalLinks.common.termsOfService}</span>
              </Link>
              <Link href="/contact" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-primary-700 font-semibold">{t.internalLinks.common.contactUs}</span>
              </Link>
              <Link href="/" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-primary-700 font-semibold">{t.internalLinks.common.backToHome}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
