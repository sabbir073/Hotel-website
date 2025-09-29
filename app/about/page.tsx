'use client';

import { useLanguage } from '@/contexts/LanguageContext';
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
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&h=1080&fit=crop"
            alt="Hotel du Théâtre"
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
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
                alt="Hotel History"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
                  alt="General Manager"
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
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
                  alt="Operations Director"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Ana Petrović</h3>
              <p className="text-primary-600 mb-2">Operations Director</p>
              <p className="text-gray-600">Expert in luxury hotel management</p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=400&fit=crop"
                  alt="Executive Chef"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Ivan Babić</h3>
              <p className="text-primary-600 mb-2">Executive Chef</p>
              <p className="text-gray-600">Michelin-starred culinary artist</p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900">Awards & Recognition</h2>
            <p className="text-xl text-gray-600">Honored for excellence in hospitality</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FaStar className="text-4xl text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">TripAdvisor</h3>
              <p className="text-sm text-gray-600">Travelers' Choice 2024</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FaAward className="text-4xl text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Croatian Tourism Board</h3>
              <p className="text-sm text-gray-600">Best Boutique Hotel 2023</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FaGlobe className="text-4xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">World Luxury Hotel</h3>
              <p className="text-sm text-gray-600">Regional Winner 2024</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FaHandshake className="text-4xl text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Green Key</h3>
              <p className="text-sm text-gray-600">Eco-Certification 2023</p>
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
              <p className="text-lg">Luxury Rooms</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">15K+</p>
              <p className="text-lg">Happy Guests</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">98%</p>
              <p className="text-lg">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">10+</p>
              <p className="text-lg">Awards Won</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}