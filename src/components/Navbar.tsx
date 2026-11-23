import { useState } from 'react';
import { ClipboardList, Globe, Menu, X } from 'lucide-react';
import { CONTACT_INFO } from '../data/catalog';
import { UI_COPY, t, type Language } from '../data/i18n';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  orderCount: number;
  onOpenOrderDrawer: () => void;
}

export function Navbar({
  lang,
  onToggleLang,
  orderCount,
  onOpenOrderDrawer,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#products', label: t(UI_COPY.nav.products, lang) },
    { href: '#printing', label: t(UI_COPY.nav.printing, lang) },
    { href: '#about', label: t(UI_COPY.nav.about, lang) },
    { href: '#why-us', label: t(UI_COPY.nav.whyUs, lang) },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-15 sm:h-16 flex items-center justify-between gap-2.5 sm:gap-6 lg:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2 sm:gap-2.5 text-[#0B1E3B] whitespace-nowrap shrink-0 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F3C] rounded-md"
        >
          <img
            src="/images/alsadara/logo.png"
            alt={t(CONTACT_INFO.companyName, lang)}
            referrerPolicy="no-referrer"
            className="h-8 sm:h-9 w-auto object-contain shrink-0"
          />
          <span className="font-display font-bold text-sm sm:text-lg tracking-tight whitespace-nowrap truncate">
            {t(CONTACT_INFO.companyName, lang)}
          </span>
        </a>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav
          aria-label={t(UI_COPY.nav.mainNavLabel, lang)}
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-1 text-slate-700 hover:text-[#0B1E3B] relative after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:bg-[#0E6F3C] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Language Switch & Primary Order Action */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={t(UI_COPY.nav.switchLangLabel, lang)}
            className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 min-h-[40px] text-xs font-semibold text-slate-700 hover:text-[#0B1E3B] hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
            <span>{t(UI_COPY.nav.switchLangShort, lang)}</span>
          </button>

          <button
            type="button"
            onClick={onOpenOrderDrawer}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 min-h-[40px] text-xs sm:text-sm font-semibold text-white bg-[#0B1E3B] hover:bg-[#112A52] active:scale-[0.99] rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F3C] focus-visible:ring-offset-2"
          >
            <ClipboardList className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t(UI_COPY.nav.orderList, lang)}</span>
            {orderCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold tabular-nums bg-[#0E6F3C] text-white rounded">
                {orderCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={
              mobileMenuOpen
                ? t(UI_COPY.nav.closeMenu, lang)
                : t(UI_COPY.nav.openMenu, lang)
            }
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-slate-700 hover:text-[#0B1E3B] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-[#0B1E3B] hover:bg-slate-50 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
