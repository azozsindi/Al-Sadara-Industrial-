import { useMemo, useState } from 'react';
import { Plus, Search, SlidersHorizontal, Check } from 'lucide-react';
import {
  CATEGORIES,
  PRODUCTS,
  type ProductCategory,
  type ProductItem,
} from '../data/catalog';
import { UI_COPY, t, type Language } from '../data/i18n';

interface ProductCatalogProps {
  lang: Language;
  onSelectProduct: (product: ProductItem) => void;
  onQuickAdd: (product: ProductItem) => void;
  orderedCounts: Record<string, number>;
}

export function ProductCatalog({
  lang,
  onSelectProduct,
  onQuickAdd,
  orderedCounts,
}: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        product.name.ar.toLowerCase().includes(q) ||
        product.name.en.toLowerCase().includes(q) ||
        product.subtitle.ar.toLowerCase().includes(q) ||
        product.subtitle.en.toLowerCase().includes(q) ||
        product.description.ar.toLowerCase().includes(q) ||
        product.description.en.toLowerCase().includes(q) ||
        product.categoryLabel.ar.toLowerCase().includes(q) ||
        product.categoryLabel.en.toLowerCase().includes(q) ||
        product.specs.some(
          (spec) =>
            spec.ar.toLowerCase().includes(q) || spec.en.toLowerCase().includes(q)
        )
      );
    });
  }, [activeCategory, searchQuery]);

  const containIds = new Set([
    'special-containers',
    'freezer-bags',
    'shopping-bags',
    'custom-printing-service',
  ]);

  return (
    <section id="products" className="py-12 sm:py-16 lg:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 mb-7 sm:mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#0E6F3C] mb-2">
              {t(UI_COPY.catalog.kickerPrefix, lang)} · {PRODUCTS.length}{' '}
              {t(UI_COPY.catalog.kickerSuffix, lang)}
            </p>
            <h2
              className="font-display font-bold text-[#0B1E3B] text-xl sm:text-3xl tracking-tight mb-2.5 sm:mb-3"
              style={{ textWrap: 'balance' }}
            >
              {t(UI_COPY.catalog.heading, lang)}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t(UI_COPY.catalog.subheading, lang)}
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search
              className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t(UI_COPY.catalog.searchPlaceholder, lang)}
              aria-label={t(UI_COPY.catalog.searchLabel, lang)}
              className="w-full ps-10 pe-3.5 py-2.5 min-h-[44px] text-base sm:text-sm bg-white border border-slate-200 rounded-lg text-[#0B1E3B] placeholder:text-slate-400 focus:outline-none focus:border-[#0B1E3B] focus:ring-1 focus:ring-[#0B1E3B] transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label={t(UI_COPY.catalog.categoriesLabel, lang)}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2.5 mb-6 sm:mb-8 border-b border-slate-200/80 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3.5 sm:px-4 min-h-[40px] text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0B1E3B] text-white'
                    : 'text-slate-600 hover:text-[#0B1E3B] hover:bg-slate-200/60'
                }`}
              >
                {t(category.label, lang)}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-xl p-8 sm:p-12 text-center">
            <p className="font-display font-semibold text-[#0B1E3B] text-lg mb-2">
              {t(UI_COPY.catalog.emptyTitle, lang)}
            </p>
            <p className="text-sm text-slate-500 mb-5">
              {t(UI_COPY.catalog.emptySubtitle, lang)}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 min-h-[44px] text-sm font-medium text-white bg-[#0B1E3B] hover:bg-[#112A52] rounded-lg transition-colors cursor-pointer"
            >
              {t(UI_COPY.catalog.showAll, lang)}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProducts.map((product) => {
              const countInOrder = orderedCounts[product.id] || 0;
              const useContain = containIds.has(product.id);
              const isDarkBackdrop = product.id === 'custom-printing-service';
              const productName = t(product.name, lang);
              const categoryLabel = t(product.categoryLabel, lang);

              return (
                <article
                  key={product.id}
                  className="group bg-white border border-slate-200/80 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300"
                >
                  {/* Product Image Frame */}
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className={`relative aspect-[4/3] w-full overflow-hidden border-b border-slate-100 cursor-pointer text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0E6F3C] ${
                      isDarkBackdrop ? 'bg-[#0B1E3B]' : 'bg-[#F8FAFC]'
                    }`}
                  >
                    {!failedImages[product.id] ? (
                      <img
                        src={product.image}
                        alt={productName}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [product.id]: true }))
                        }
                        className={`w-full h-full transition-transform duration-300 group-hover:scale-[1.03] ${
                          useContain ? 'object-contain p-3' : 'object-cover'
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-500">
                        <span className="font-display font-semibold text-base text-[#0B1E3B]">
                          {productName}
                        </span>
                        <span className="text-xs mt-1">{categoryLabel}</span>
                      </div>
                    )}
                  </button>

                  {/* Product Card Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    {/* Unboxed Metadata Line */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 mb-2">
                      <span>{categoryLabel}</span>
                      {product.supportsPrinting && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#0E6F3C] font-medium">
                            {t(UI_COPY.catalog.printableLabel, lang)}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-[#0B1E3B] text-base sm:text-lg leading-snug mb-1.5">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="text-start hover:text-[#0E6F3C] transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline"
                      >
                        {productName}
                      </button>
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                      {t(product.description, lang)}
                    </p>

                    {/* Clean Key Specs List */}
                    <ul className="space-y-1.5 text-xs text-slate-600 mb-4 sm:mb-5 mt-auto pt-3 border-t border-slate-100">
                      {product.specs.slice(0, 2).map((spec) => (
                        <li key={spec.en} className="flex items-start gap-2">
                          <span className="text-[#0E6F3C] font-semibold" aria-hidden="true">
                            —
                          </span>
                          <span>{t(spec, lang)}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Actions Row */}
                    <div className="flex items-center gap-2 pt-1.5">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 min-h-[44px] text-xs sm:text-sm font-semibold text-white bg-[#0B1E3B] hover:bg-[#112A52] rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{t(UI_COPY.catalog.configureBtn, lang)}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onQuickAdd(product)}
                        className={`inline-flex items-center justify-center gap-1.5 px-3 min-h-[44px] text-xs sm:text-sm font-semibold rounded-lg border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                          countInOrder > 0
                            ? 'bg-[#0E6F3C]/10 border-[#0E6F3C]/30 text-[#0E6F3C]'
                            : 'bg-white border-slate-200 text-[#0B1E3B] hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        {countInOrder > 0 ? (
                          <>
                            <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span className="tabular-nums">
                              {t(UI_COPY.catalog.addedPrefix, lang)} ({countInOrder})
                            </span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>{t(UI_COPY.catalog.quickAddBtn, lang)}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
