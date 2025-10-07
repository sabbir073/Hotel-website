'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { FaAward, FaHandshake, FaLeaf, FaLightbulb, FaUsers, FaHistory, FaGlobe, FaStar } from 'react-icons/fa';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-about.jpg"
            alt="About THEATRE HOTEL d.o.o. Split Croatia - luxury boutique hotel with rich heritage and exceptional hospitality"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">{t.about.title}</h1>
          <p className="text-xl md:text-2xl">{t.about.subtitle}</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6 text-gray-900">{t.about.story.title}</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                {t.about.story.content}
              </p>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                {t.about.story.content2}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t.about.story.content3}
              </p>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about/about-building.jpg"
                alt="Historic architecture and elegant design of THEATRE HOTEL Split showcasing Croatian heritage and luxury hospitality"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-6 text-gray-900">{t.about.mission.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.about.mission.content}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.about.values.excellence}</h3>
              <p className="text-gray-600">{t.about.values.excellenceDesc}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHistory className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.about.values.heritage}</h3>
              <p className="text-gray-600">{t.about.values.heritageDesc}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.about.values.sustainability}</h3>
              <p className="text-gray-600">{t.about.values.sustainabilityDesc}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLightbulb className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.about.values.innovation}</h3>
              <p className="text-gray-600">{t.about.values.innovationDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900">{t.about.team.title}</h2>
            <p className="text-xl text-gray-600">{t.about.team.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/team/team-1.jpg"
                  alt="Director of THEATRE HOTEL d.o.o. Split Croatia - experienced hospitality leader"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{t.about.team.director.name}</h3>
              <p className="text-primary-600 mb-2">{t.about.team.director.title}</p>
              <p className="text-gray-600">{t.about.team.director.description}</p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/team/team-2.jpg"
                  alt="General Manager at luxury hotel Split - dedicated to exceptional guest service and hospitality excellence"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{t.about.team.manager.name}</h3>
              <p className="text-primary-600 mb-2">{t.about.team.manager.title}</p>
              <p className="text-gray-600">{t.about.team.manager.description}</p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/team/team-1.jpg"
                  alt="Operations Director THEATRE HOTEL Split - ensuring smooth daily operations and guest satisfaction"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{t.about.team.operations.name}</h3>
              <p className="text-primary-600 mb-2">{t.about.team.operations.title}</p>
              <p className="text-gray-600">{t.about.team.operations.description}</p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/team/team-3.jpg"
                  alt="Executive Chef at THEATRE HOTEL Split Croatia - culinary expert creating exceptional Mediterranean cuisine"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{t.about.team.chef.name}</h3>
              <p className="text-primary-600 mb-2">{t.about.team.chef.title}</p>
              <p className="text-gray-600">{t.about.team.chef.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900">{t.about.awards.title}</h2>
            <p className="text-xl text-gray-600">{t.about.awards.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FaStar className="text-4xl text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">{t.about.awards.tripadvisor}</h3>
              <p className="text-sm text-gray-600">{t.about.awards.tripadvisorDesc}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FaAward className="text-4xl text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">{t.about.awards.croatian}</h3>
              <p className="text-sm text-gray-600">{t.about.awards.croatianDesc}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FaGlobe className="text-4xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">{t.about.awards.worldLuxury}</h3>
              <p className="text-sm text-gray-600">{t.about.awards.worldLuxuryDesc}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FaHandshake className="text-4xl text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">{t.about.awards.greenKey}</h3>
              <p className="text-sm text-gray-600">{t.about.awards.greenKeyDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">45</p>
              <p className="text-lg">{t.about.stats.rooms}</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">15K+</p>
              <p className="text-lg">{t.about.stats.guests}</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">98%</p>
              <p className="text-lg">{t.about.stats.satisfaction}</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">10+</p>
              <p className="text-lg">{t.about.stats.awards}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900">{t.about.companyInfo.title}</h2>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-primary-600 mb-4">{t.about.companyInfo.companyName}</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">{t.about.companyInfo.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-800 w-32 flex-shrink-0">Activity:</span>
                    <span className="text-gray-600">{t.about.companyInfo.activity}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-800 w-32 flex-shrink-0">Address:</span>
                    <span className="text-gray-600">{t.about.companyInfo.address}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-800 w-32 flex-shrink-0">{t.about.companyInfo.contact.split(':')[0]}:</span>
                    <span className="text-gray-600">{t.about.companyInfo.contact.split(':')[1]}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-800 w-32 flex-shrink-0">OIB:</span>
                    <span className="text-gray-600">{t.about.companyInfo.oib.split(':')[1]}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-800 w-32 flex-shrink-0">MBS:</span>
                    <span className="text-gray-600">{t.about.companyInfo.mbs.split(':')[1]}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-800 w-32 flex-shrink-0">MBDS:</span>
                    <span className="text-gray-600">{t.about.companyInfo.mbds.split(':')[1]}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-800 w-32 flex-shrink-0">Established:</span>
                    <span className="text-gray-600">{t.about.companyInfo.established.split(':')[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6 text-gray-900">{t.internalLinks.about.title}</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t.internalLinks.about.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms"
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-semibold"
            >
              {t.internalLinks.about.viewRooms}
            </Link>
            <Link
              href="/booking"
              className="px-8 py-3 bg-white text-primary-700 border-2 border-primary-700 rounded-lg hover:bg-primary-50 transition-all font-semibold"
            >
              {t.internalLinks.about.bookStay}
            </Link>
            <Link
              href="/careers"
              className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all font-semibold"
            >
              {t.internalLinks.about.joinTeam}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}