import { useState } from 'react';
import { ArrowDownLeft, ArrowDownRight, Phone, Check, Copy } from 'lucide-react';
import { CONTACT_INFO, CORE_PILLARS } from '../data/catalog';
import { UI_COPY, t, type Language } from '../data/i18n';

interface HeroSectionProps {
  lang: Language;
  onQuickCustomRequest: () => void;
}

export function HeroSection({ lang, onQuickCustomRequest }: HeroSectionProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.phoneDisplay);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const ArrowIcon = lang === 'ar' ? ArrowDownLeft : ArrowDownRight;

  return (
    <section id="top" className="bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-10 sm:pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-stretch">
          {/* Lead Editorial Column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-0.5">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mb-3 sm:mb-5 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>
                  {t(UI_COPY.hero.foundedPrefix, lang)} {CONTACT_INFO.foundedYear}
                </span>
                <span aria-hidden="true">·</span>
                <span>{t(UI_COPY.hero.shortLocation, lang)}</span>
              </p>

              <h1
                className="font-display font-bold text-[#0B1E3B] leading-[1.22] tracking-tight mb-4 sm:mb-5"
                style={{
                  fontSize: 'clamp(1.85rem, 3.6vw, 3.25rem)',
                  textWrap: 'balance',
                }}
              >
                {t(CONTACT_INFO.slogan, lang)}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3 sm:mb-4 max-w-xl">
                {t(UI_COPY.hero.introPrefix, lang)}{' '}
                <span className="font-semibold text-[#0B1E3B] tabular-nums">8</span>{' '}
                {t(UI_COPY.hero.colorsSuffix, lang)}
              </p>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 sm:mb-8 max-w-xl">
                {t(UI_COPY.hero.subIntro, lang)}
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-6 min-h-[46px] text-sm font-semibold text-white bg-[#0E6F3C] hover:bg-[#0B5930] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F3C] focus-visible:ring-offset-2"
                >
                  <span>{t(UI_COPY.hero.browseCta, lang)}</span>
                  <ArrowIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={onQuickCustomRequest}
                  className="inline-flex items-center justify-center px-5 min-h-[46px] text-sm font-semibold text-[#0B1E3B] bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {t(UI_COPY.hero.customCta, lang)}
                </button>
              </div>
            </div>

            {/* Direct Single Phone Contact Bar */}
            <div className="mt-7 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-slate-500 mb-1">
                  {t(UI_COPY.hero.directContactLabel, lang)}
                </p>
                <a
                  href={`tel:${CONTACT_INFO.phoneTel}`}
                  className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-[#0B1E3B] hover:text-[#0E6F3C] transition-colors font-mono tabular-nums dir-ltr"
                >
                  <Phone className="w-4 h-4 text-[#0E6F3C] shrink-0" aria-hidden="true" />
                  <span>{CONTACT_INFO.phoneDisplay}</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyPhone}
                className="inline-flex items-center gap-1.5 px-3 min-h-[38px] text-xs font-medium text-slate-600 hover:text-[#0B1E3B] border border-slate-200 hover:border-slate-300 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#0E6F3C]" aria-hidden="true" />
                    <span className="text-[#0E6F3C]">
                      {t(UI_COPY.hero.copiedNumber, lang)}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t(UI_COPY.hero.copyNumber, lang)}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dominant Visual Anchor: Authentic Factory & Product Lineup */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[440px] rounded-xl overflow-hidden border border-slate-200/80 bg-[#0B1E3B]">
              {!imgError ? (
                <img
                  src="/images/alsadara/hero_factory_exterior.jpg"
                  alt={t(UI_COPY.hero.heroImageAlt, lang)}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-white/90 text-center">
                  <p className="font-display text-2xl font-bold mb-2">
                    {t(CONTACT_INFO.companyName, lang)}
                  </p>
                  <p className="text-sm text-slate-300">
                    {t(CONTACT_INFO.tagline, lang)}
                  </p>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-[#071428]/80 via-[#071428]/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 sm:bottom-4 inset-x-4 sm:inset-x-5 flex items-center justify-between gap-3 text-[11px] sm:text-xs text-white/95">
                <span className="font-medium truncate">
                  {t(CONTACT_INFO.tagline, lang)}
                </span>
                <span className="hidden sm:inline text-white/80 shrink-0">
                  {t(UI_COPY.hero.nationwideNote, lang)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width 5-Pillar Strip (Matches Page 1 PDF Pillars) */}
      <div className="border-t border-slate-200/80 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-slate-200/80 sm:bg-transparent sm:divide-x ${
              lang === 'ar' ? 'sm:divide-x-reverse' : ''
            } sm:divide-slate-200/80`}
          >
            {CORE_PILLARS.map((pillar, index) => (
              <div
                key={pillar.en}
                className={`bg-[#F8FAFC] py-3.5 sm:py-4 px-3 sm:px-4 flex items-center justify-center gap-2 text-xs sm:text-sm ${
                  index === CORE_PILLARS.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <span className="font-mono text-[11px] sm:text-xs text-slate-400 tabular-nums">
                  0{index + 1}
                </span>
                <span className="font-medium text-[#0B1E3B] whitespace-nowrap">
                  {t(pillar, lang)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
