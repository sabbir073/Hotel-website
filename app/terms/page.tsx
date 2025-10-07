'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function TermsOfService() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-serif font-bold mb-8 text-gray-900">{t.terms.title}</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>{t.terms.lastUpdated}</strong> {t.terms.lastUpdatedDate}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section1.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.terms.section1.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section2.title}</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>{t.terms.section2.hotel}</strong> {t.terms.section2.hotelDesc}</li>
                <li><strong>{t.terms.section2.guest}</strong> {t.terms.section2.guestDesc}</li>
                <li><strong>{t.terms.section2.booking}</strong> {t.terms.section2.bookingDesc}</li>
                <li><strong>{t.terms.section2.services}</strong> {t.terms.section2.servicesDesc}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section3.title}</h2>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section3.subtitle1}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section3.content1}
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section3.subtitle2}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section3.content2}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                {t.terms.section3.items2.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section3.subtitle3}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t.terms.section3.content3}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section4.title}</h2>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section4.subtitle1}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section4.content1}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                {t.terms.section4.items1.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section4.subtitle2}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section4.content2}
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section4.subtitle3}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section4.content3}
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section4.subtitle4}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t.terms.section4.content4}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section5.title}</h2>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section5.subtitle1}</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>{t.terms.section5.item1}</strong> {t.terms.section5.item1Desc}</li>
                <li><strong>{t.terms.section5.item2}</strong> {t.terms.section5.item2Desc}</li>
                <li><strong>{t.terms.section5.item3}</strong> {t.terms.section5.item3Desc}</li>
                <li><strong>{t.terms.section5.item4}</strong> {t.terms.section5.item4Desc}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section5.subtitle2}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section5.content2}
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section5.subtitle3}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section5.content3}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>{t.terms.section5.email}</li>
                <li>{t.terms.section5.phone}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section5.subtitle4}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t.terms.section5.content4}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section6.title}</h2>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section6.subtitle1}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section6.content1}
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section6.subtitle2}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section6.content2}
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section6.subtitle3}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t.terms.section6.content3}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section7.title}</h2>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section7.subtitle1}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section7.content1}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                {t.terms.section7.items1.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section7.subtitle2}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section7.content2}
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section7.subtitle3}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section7.content3}
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section7.subtitle4}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t.terms.section7.content4}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section8.title}</h2>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section8.subtitle1}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section8.content1}
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section8.subtitle2}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section8.content2}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                {t.terms.section8.items2.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.terms.section8.subtitle3}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t.terms.section8.content3}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section9.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.terms.section9.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section10.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section10.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section11.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.terms.section11.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section12.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section12.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section13.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.terms.section13.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section14.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.terms.section14.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section15.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.terms.section15.content}
              </p>
              <div className="bg-gray-100 p-6 rounded-lg">
                <p className="text-gray-800"><strong>{t.terms.section15.companyName}</strong></p>
                <p className="text-gray-700">{t.terms.section15.address}</p>
                <p className="text-gray-700">{t.terms.section15.email}</p>
                <p className="text-gray-700">{t.terms.section15.phone1}</p>
                <p className="text-gray-700">{t.terms.section15.phone2}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t.terms.section16.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.terms.section16.content}
              </p>
            </section>
          </div>

          {/* Navigation Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/privacy" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-primary-700 font-semibold">{t.internalLinks.common.privacyPolicy}</span>
              </Link>
              <Link href="/booking" className="text-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                <span className="text-primary-700 font-semibold">{t.internalLinks.common.bookYourStay}</span>
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
