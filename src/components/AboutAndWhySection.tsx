import { ABOUT_DATA, CONTACT_INFO, WHY_ALSADARA } from '../data/catalog';
import { UI_COPY, t, type Language } from '../data/i18n';

interface AboutAndWhySectionProps {
  lang: Language;
}

export function AboutAndWhySection({ lang }: AboutAndWhySectionProps) {
  return (
    <>
      {/* About Us Section (Page 2 of PDF) */}
      <section
        id="about"
        className="py-12 sm:py-16 lg:py-24 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Editorial Narrative + Vision, Mission, Values */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium text-[#0E6F3C] mb-2">
                  {t(UI_COPY.about.kickerPrefix, lang)} {CONTACT_INFO.foundedYear}
                </p>
                <h2
                  className="font-display font-bold text-[#0B1E3B] text-xl sm:text-3xl tracking-tight mb-4 sm:mb-5"
                  style={{ textWrap: 'balance' }}
                >
                  {t(UI_COPY.about.heading, lang)}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-[1.85] mb-8 sm:mb-10">
                  {t(ABOUT_DATA.intro, lang)}
                </p>
              </div>

              <div className="divide-y divide-slate-200/80 border-y border-slate-200/80">
                <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6">
                  <h3 className="sm:col-span-3 font-display font-bold text-[#0B1E3B] text-sm sm:text-base">
                    {t(UI_COPY.about.visionTitle, lang)}
                  </h3>
                  <p className="sm:col-span-9 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {t(ABOUT_DATA.vision, lang)}
                  </p>
                </div>

                <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6">
                  <h3 className="sm:col-span-3 font-display font-bold text-[#0B1E3B] text-sm sm:text-base">
                    {t(UI_COPY.about.missionTitle, lang)}
                  </h3>
                  <p className="sm:col-span-9 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {t(ABOUT_DATA.mission, lang)}
                  </p>
                </div>

                <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                  <h3 className="sm:col-span-3 font-display font-bold text-[#0B1E3B] text-sm sm:text-base">
                    {t(UI_COPY.about.valuesTitle, lang)}
                  </h3>
                  <div className="sm:col-span-9 grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2.5 text-sm sm:text-base text-[#0B1E3B] font-medium">
                    {ABOUT_DATA.values.map((val, idx) => (
                      <div key={val.en} className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#0E6F3C] tabular-nums shrink-0">
                          0{idx + 1}
                        </span>
                        <span>{t(val, lang)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Production Machine Photograph */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] aspect-[3/4] max-h-[300px] sm:max-h-[340px] rounded-xl overflow-hidden border border-slate-200/80 bg-[#0B1E3B]">
                <img
                  src="/images/alsadara/about_machine.jpg"
                  alt={t(UI_COPY.about.machineAlt, lang)}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Al-Sadara Section (Page 8 of PDF) */}
      <section id="why-us" className="py-12 sm:py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-xs font-medium text-[#0E6F3C] mb-2">
              {t(UI_COPY.about.whyKicker, lang)}
            </p>
            <h2
              className="font-display font-bold text-[#0B1E3B] text-xl sm:text-3xl tracking-tight mb-3"
              style={{ textWrap: 'balance' }}
            >
              {t(UI_COPY.about.whyHeading, lang)}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t(UI_COPY.about.whySubheading, lang)}
            </p>
          </div>

          {/* Wide Interior Production & Product Range Photo */}
          <div className="rounded-xl overflow-hidden border border-slate-200/80 bg-white mb-8 sm:mb-10 aspect-[16/10] sm:aspect-[21/9]">
            <img
              src="/images/alsadara/hero_factory_interior.jpg"
              alt={t(UI_COPY.about.interiorAlt, lang)}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Clean 4x2 Architectural Grid of All 8 PDF Reasons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white border border-slate-200/80 rounded-xl overflow-hidden divide-y sm:divide-y-0 sm:gap-px sm:bg-slate-200/80">
            {WHY_ALSADARA.map((item, idx) => (
              <div
                key={item.title.en}
                className="bg-white p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-slate-400 tabular-nums block mb-2.5 sm:mb-3">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display font-bold text-[#0B1E3B] text-base mb-1.5 sm:mb-2">
                    {t(item.title, lang)}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t(item.description, lang)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
