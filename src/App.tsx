import { useEffect, useMemo, useState } from 'react';
import { Check, ClipboardList, Phone } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { PrintingSection } from './components/PrintingSection';
import { AboutAndWhySection } from './components/AboutAndWhySection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { OrderDrawer } from './components/OrderDrawer';
import { CONTACT_INFO, type ProductItem } from './data/catalog';
import { UI_COPY, t, type Language } from './data/i18n';
import type { OrderItem } from './types/order';

const STORAGE_KEY = 'alsadara_order_items_v1';
const LANG_STORAGE_KEY = 'alsadara_lang_v1';

function loadInitialItems(): OrderItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadInitialLang(): Language {
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    return saved === 'en' ? 'en' : 'ar';
  } catch {
    return 'ar';
  }
}

export default function App() {
  const [lang, setLang] = useState<Language>(loadInitialLang);
  const [orderItems, setOrderItems] = useState<OrderItem[]>(loadInitialItems);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [customDrawerMode, setCustomDrawerMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t(UI_COPY.pageTitle, lang);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  }, [lang]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orderItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [orderItems]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const orderedCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of orderItems) {
      counts[item.productId] = (counts[item.productId] || 0) + 1;
    }
    return counts;
  }, [orderItems]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleAddConfiguredItem = (item: OrderItem) => {
    setOrderItems((prev) => [...prev, item]);
    setToastMessage(
      lang === 'ar'
        ? `${t(UI_COPY.toast.addedPrefix, lang)} «${item.productName}» ${t(UI_COPY.toast.addedSuffix, lang)}`
        : `${t(UI_COPY.toast.addedPrefix, lang)} "${item.productName}" ${t(UI_COPY.toast.addedSuffix, lang)}`
    );
  };

  const handleQuickAdd = (product: ProductItem) => {
    const productName = t(product.name, lang);
    const defaultType = product.defaultTypeOptions[0]
      ? t(product.defaultTypeOptions[0], lang)
      : lang === 'ar'
      ? 'حسب الطلب'
      : 'Custom';
    const defaultSize = product.sizeOptions[0]
      ? t(product.sizeOptions[0], lang)
      : lang === 'ar'
      ? 'حسب الاتفاق'
      : 'To be confirmed';
    const defaultQty = product.quantitySuggestions[0]
      ? t(product.quantitySuggestions[0], lang)
      : lang === 'ar'
      ? 'حسب الاتفاق'
      : 'To be confirmed';

    const quickItem: OrderItem = {
      uid: `${product.id}-${Date.now()}`,
      productId: product.id,
      productName,
      productImage: product.image,
      typeOption: defaultType,
      printColors: product.supportsPrinting
        ? lang === 'ar'
          ? 'يحدد عند التواصل'
          : 'TBD upon contact'
        : undefined,
      sizeOption: defaultSize,
      quantity: defaultQty,
      notes: '',
    };
    setOrderItems((prev) => [...prev, quickItem]);
    setToastMessage(
      lang === 'ar'
        ? `${t(UI_COPY.toast.addedPrefix, lang)} «${productName}» ${t(UI_COPY.toast.addedSuffix, lang)}`
        : `${t(UI_COPY.toast.addedPrefix, lang)} "${productName}" ${t(UI_COPY.toast.addedSuffix, lang)}`
    );
  };

  const handleRemoveItem = (uid: string) => {
    setOrderItems((prev) => prev.filter((item) => item.uid !== uid));
  };

  const handleClearItems = () => {
    setOrderItems([]);
  };

  const handleOpenStandardDrawer = () => {
    setCustomDrawerMode(false);
    setIsDrawerOpen(true);
  };

  const handleOpenCustomRequest = () => {
    setCustomDrawerMode(true);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B1E3B] overflow-x-clip">
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        orderCount={orderItems.length}
        onOpenOrderDrawer={handleOpenStandardDrawer}
      />

      <main className="flex-1">
        <HeroSection lang={lang} onQuickCustomRequest={handleOpenCustomRequest} />

        <ProductCatalog
          lang={lang}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onQuickAdd={handleQuickAdd}
          orderedCounts={orderedCounts}
        />

        <PrintingSection
          lang={lang}
          onSelectPrintingService={(product) => setSelectedProduct(product)}
        />

        <AboutAndWhySection lang={lang} />

        {/* Direct Order & Single-Phone CTA Band */}
        <section className="py-12 sm:py-14 lg:py-16 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-5 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-medium text-[#0E6F3C] mb-2">
                  {t(UI_COPY.ctaBand.kicker, lang)}
                </p>
                <h2
                  className="font-display font-bold text-[#0B1E3B] text-lg sm:text-2xl tracking-tight mb-2"
                  style={{ textWrap: 'balance' }}
                >
                  {t(UI_COPY.ctaBand.heading, lang)}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {t(UI_COPY.ctaBand.body, lang)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleOpenStandardDrawer}
                  className="inline-flex items-center justify-center gap-2 px-6 min-h-[46px] text-sm font-semibold text-white bg-[#0E6F3C] hover:bg-[#0B5930] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <ClipboardList className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    {orderItems.length > 0
                      ? `${t(UI_COPY.ctaBand.reviewOrder, lang)} (${orderItems.length})`
                      : t(UI_COPY.ctaBand.newOrder, lang)}
                  </span>
                </button>

                <a
                  href={`tel:${CONTACT_INFO.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 px-5 min-h-[46px] text-sm font-semibold text-[#0B1E3B] bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap font-mono dir-ltr tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#0E6F3C] shrink-0" aria-hidden="true" />
                  <span>{CONTACT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} onOpenOrderDrawer={handleOpenStandardDrawer} />

      {/* Product Specification Modal */}
      <ProductModal
        lang={lang}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddItem={handleAddConfiguredItem}
      />

      {/* Order Basket & Direct Handoff Drawer */}
      <OrderDrawer
        lang={lang}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={orderItems}
        onRemoveItem={handleRemoveItem}
        onClearItems={handleClearItems}
        startInCustomMode={customDrawerMode}
      />

      {/* Subtle Transient Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] inset-x-4 sm:inset-x-auto sm:end-6 z-40 max-w-md bg-[#0B1E3B] text-white px-4 py-3 rounded-xl border border-white/10 shadow-lg flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2.5 text-xs sm:text-sm">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              handleOpenStandardDrawer();
            }}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 whitespace-nowrap shrink-0 cursor-pointer underline"
          >
            {t(UI_COPY.toast.viewOrder, lang)}
          </button>
        </div>
      )}
    </div>
  );
}
