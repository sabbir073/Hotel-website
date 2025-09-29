'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLanguage = () => setLanguage(language === 'en' ? 'hr' : 'en');

  return (
    <nav className="fixed w-full top-0 z-50 bg-black/95 backdrop-blur-md shadow-2xl border-b border-gold-600/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-48 h-12">
              <Image
                src="/logo.jpg"
                alt="Hotel du Théâtre"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-gold-400 transition-colors font-medium">
              {t.nav.home}
            </Link>
            <Link href="/about" className="text-white hover:text-gold-400 transition-colors font-medium">
              {t.nav.about}
            </Link>
            <Link href="/rooms" className="text-white hover:text-gold-400 transition-colors font-medium">
              {t.nav.rooms}
            </Link>
            <Link href="/careers" className="text-white hover:text-gold-400 transition-colors font-medium">
              {t.nav.careers}
            </Link>
            <Link href="/contact" className="text-white hover:text-gold-400 transition-colors font-medium">
              {t.nav.contact}
            </Link>

            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-white hover:text-gold-400 transition-colors"
              aria-label="Toggle language"
            >
              <FaGlobe className="text-lg" />
              <span className="font-medium">{language.toUpperCase()}</span>
            </button>

            <Link
              href="/booking"
              className="bg-gradient-to-r from-gold-500 to-gold-600 text-black px-6 py-2.5 rounded-full hover:from-gold-400 hover:to-gold-500 transition-all transform hover:scale-105 font-semibold shadow-lg"
            >
              {t.nav.bookNow}
            </Link>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="text-white hover:text-gold-400 transition-colors"
              aria-label="Toggle language"
            >
              <FaGlobe className="text-xl" />
            </button>

            <button
              onClick={toggleMenu}
              className="text-white hover:text-gold-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-black/95 border-t border-gold-600/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-white hover:text-gold-400 hover:bg-white/10 rounded-md font-medium"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-white hover:text-gold-400 hover:bg-white/10 rounded-md font-medium"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.about}
              </Link>
              <Link
                href="/rooms"
                className="block px-3 py-2 text-white hover:text-gold-400 hover:bg-white/10 rounded-md font-medium"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.rooms}
              </Link>
              <Link
                href="/careers"
                className="block px-3 py-2 text-white hover:text-gold-400 hover:bg-white/10 rounded-md font-medium"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.careers}
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-white hover:text-gold-400 hover:bg-white/10 rounded-md font-medium"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.contact}
              </Link>
              <Link
                href="/booking"
                className="block px-3 py-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black rounded-md font-medium text-center mt-4"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.bookNow}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}