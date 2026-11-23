import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  PRINTING_CAPABILITIES,
  PRINTING_GUARANTEES,
  PRODUCTS,
  type ProductItem,
} from '../data/catalog';
import { UI_COPY, t, type Language } from '../data/i18n';

interface PrintingSectionProps {
  lang: Language;
  onSelectPrintingService: (product: ProductItem) => void;
}

export function PrintingSection({
  lang,
  onSelectPrintingService,
}: PrintingSectionProps) {
  const printingProduct = PRODUCTS.find((p) => p.id === 'custom-printing-service');
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section
      id="printing"
      className="py-12 sm:py-16 lg:py-24 bg-[#0B1E3B] text-white border-y border-[#112A52]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Editorial Column */}
          <div className="lg:col-span-6">
            <p className="text-xs font-medium text-emerald-400 tracking-wide mb-2">
              {t(UI_COPY.printing.kicker, lang)}
            </p>
            <h2
              className="font-display font-bold text-xl sm:text-3xl lg:text-4xl text-white leading-tight tracking-tight mb-3.5 sm:mb-4"
              style={{ textWrap: 'balance' }}
            >
              {t(UI_COPY.printing.heading, lang)}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 sm:mb-8 max-w-xl">
              {t(UI_COPY.printing.bodyStart, lang)}{' '}
              <span className="font-semibold text-white tabular-nums">8</span>{' '}
              {t(UI_COPY.printing.bodyEnd, lang)}
            </p>

            {/* Numbered Editorial Capabilities */}
            <div className="divide-y divide-white/10 border-y border-white/10 mb-6 sm:mb-8">
              {PRINTING_CAPABILITIES.map((cap) => (
                <div key={cap.index} className="py-3.5 sm:py-4 flex items-start gap-3.5 sm:gap-4">
                  <span className="font-mono text-xs text-emerald-400 pt-1 tabular-nums shrink-0">
                    {cap.index}.
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm sm:text-base mb-1">
                      {t(cap.title, lang)}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {t(cap.detail, lang)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Clean Unboxed Guarantees Strip */}
            <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-2 text-xs sm:text-sm text-slate-300 mb-6 sm:mb-8">
              {PRINTING_GUARANTEES.map((item, idx) => (
                <span key={item.en} className="inline-flex items-center gap-2.5 sm:gap-3">
                  <span>{t(item, lang)}</span>
                  {idx < PRINTING_GUARANTEES.length - 1 && (
                    <span className="text-white/30" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>

            {printingProduct && (
              <button
                type="button"
                onClick={() => onSelectPrintingService(printingProduct)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 min-h-[46px] text-sm font-semibold text-white bg-[#0E6F3C] hover:bg-[#0B5930] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>{t(UI_COPY.printing.cta, lang)}</span>
                <ArrowIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Authentic Printing Press & Printed Output Visuals */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            <div className="rounded-xl overflow-hidden border border-white/15 bg-[#071428] aspect-[16/10]">
              <img
                src="/images/alsadara/printing_press.jpg"
                alt={t(UI_COPY.printing.pressAlt, lang)}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-xl overflow-hidden border border-white/15 bg-[#071428] aspect-[16/10]">
              <img
                src="/images/alsadara/printing_showcase.jpg"
                alt={t(UI_COPY.printing.showcaseAlt, lang)}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain bg-[#0B1E3B] p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
