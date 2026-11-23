import { useState } from 'react';
import { Phone, MapPin, Copy, Check } from 'lucide-react';
import { CONTACT_INFO } from '../data/catalog';
import { UI_COPY, t, type Language } from '../data/i18n';

interface FooterProps {
  lang: Language;
  onOpenOrderDrawer: () => void;
}

export function Footer({ lang, onOpenOrderDrawer }: FooterProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.phoneDisplay);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore if clipboard unavailable
    }
  };

  return (
    <footer className="bg-[#071428] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-10 border-b border-white/10">
          {/* Brand Summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg p-1.5 shrink-0">
                <img
                  src="/images/alsadara/logo.png"
                  alt={t(CONTACT_INFO.companyName, lang)}
                  referrerPolicy="no-referrer"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div>
                <p className="font-display font-bold text-lg text-white">
                  {t(CONTACT_INFO.companyName, lang)}
                </p>
                <p className="text-xs text-slate-400">
                  {t(CONTACT_INFO.tagline, lang)}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              {t(CONTACT_INFO.slogan, lang)}. {t(UI_COPY.footer.summaryEnd, lang)}{' '}
              {CONTACT_INFO.foundedYear}.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-display font-semibold text-sm text-white mb-4">
              {t(UI_COPY.footer.sectionsTitle, lang)}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  {t(UI_COPY.footer.catalogLink, lang)}
                </a>
              </li>
              <li>
                <a href="#printing" className="hover:text-white transition-colors">
                  {t(UI_COPY.footer.printingLink, lang)}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {t(UI_COPY.footer.aboutLink, lang)}
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  {t(UI_COPY.footer.whyLink, lang)}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenOrderDrawer}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  {t(UI_COPY.footer.orderLink, lang)}
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact: Strictly One Mobile Number + Location Only */}
          <div className="md:col-span-4">
            <h3 className="font-display font-semibold text-sm text-white mb-4">
              {t(UI_COPY.footer.contactTitle, lang)}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 mb-1.5">
                  {t(UI_COPY.footer.phoneLabel, lang)}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${CONTACT_INFO.phoneTel}`}
                    className="inline-flex items-center gap-2 text-lg font-mono font-semibold text-white hover:text-emerald-400 transition-colors dir-ltr tabular-nums"
                  >
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>{CONTACT_INFO.phoneDisplay}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white border border-white/15 hover:border-white/30 rounded-md transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span>{t(UI_COPY.footer.copied, lang)}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t(UI_COPY.footer.copy, lang)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-sm text-slate-300">
                <MapPin
                  className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{t(CONTACT_INFO.location, lang)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {t(CONTACT_INFO.companyName, lang)} —{' '}
            {t(UI_COPY.footer.rights, lang)}
          </p>
          <p>{t(CONTACT_INFO.slogan, lang)}</p>
        </div>
      </div>
    </footer>
  );
}
