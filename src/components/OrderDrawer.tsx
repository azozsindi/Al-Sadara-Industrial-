import { useEffect, useState } from 'react';
import {
  X,
  Trash2,
  Phone,
  Copy,
  Check,
  Send,
  MessageSquare,
  RotateCcw,
  ClipboardList,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/catalog';
import { UI_COPY, t, type Language } from '../data/i18n';
import {
  formatOrderMessage,
  generateOrderReference,
  type CustomerDetails,
  type OrderItem,
} from '../types/order';

interface OrderDrawerProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onRemoveItem: (uid: string) => void;
  onClearItems: () => void;
  startInCustomMode?: boolean;
}

const INITIAL_CUSTOMER: CustomerDetails = {
  name: '',
  phone: '',
  city: '',
  businessName: '',
  notes: '',
};

export function OrderDrawer({
  lang,
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearItems,
  startInCustomMode = false,
}: OrderDrawerProps) {
  const [customer, setCustomer] = useState<CustomerDetails>(INITIAL_CUSTOMER);
  const [error, setError] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [copiedMessage, setCopiedMessage] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (items.length === 0 && !customer.notes.trim()) {
      setError(t(UI_COPY.drawer.errNoItems, lang));
      return;
    }

    if (customer.name.trim().length < 2) {
      setError(t(UI_COPY.drawer.errName, lang));
      return;
    }

    const cleanDigits = customer.phone.replace(/[^\d+]/g, '');
    if (cleanDigits.length < 9) {
      setError(t(UI_COPY.drawer.errPhone, lang));
      return;
    }

    const ref = generateOrderReference();
    const orderItemsToFormat: OrderItem[] =
      items.length > 0
        ? items
        : [
            {
              uid: 'custom-inquiry',
              productId: 'custom',
              productName:
                lang === 'ar' ? 'طلب بمواصفات خاصة' : 'Custom Specification Request',
              productImage: '',
              typeOption:
                lang === 'ar' ? 'حسب الملاحظات المرفقة' : 'Per attached notes',
              sizeOption: lang === 'ar' ? 'حسب الاتفاق' : 'To be confirmed',
              quantity: lang === 'ar' ? 'حسب الاتفاق' : 'To be confirmed',
              notes: '',
            },
          ];

    const message = formatOrderMessage(orderItemsToFormat, customer, ref, lang);
    setSubmittedRef(ref);
    setSubmittedMessage(message);
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(submittedMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2200);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleStartNewOrder = () => {
    setSubmittedRef(null);
    setSubmittedMessage('');
    setCustomer(INITIAL_CUSTOMER);
    onClearItems();
  };

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(
    submittedMessage
  )}`;
  const smsUrl = `sms:${CONTACT_INFO.phoneTel}?body=${encodeURIComponent(
    submittedMessage
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#071428]/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-drawer-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white h-[100dvh] flex flex-col border-s border-slate-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 shrink-0">
          <div>
            <h2
              id="order-drawer-title"
              className="font-display font-bold text-[#0B1E3B] text-base sm:text-lg"
            >
              {submittedRef
                ? t(UI_COPY.drawer.titleReady, lang)
                : t(UI_COPY.drawer.titleList, lang)}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {submittedRef
                ? `${t(UI_COPY.drawer.refPrefix, lang)} #${submittedRef} · ${t(
                    UI_COPY.drawer.contactVia,
                    lang
                  )} ${CONTACT_INFO.phoneDisplay}`
                : items.length > 0
                ? `${items.length} ${
                    items.length === 1
                      ? t(UI_COPY.drawer.itemSingular, lang)
                      : t(UI_COPY.drawer.itemPlural, lang)
                  }`
                : t(UI_COPY.drawer.emptySubtitle, lang)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t(UI_COPY.drawer.closeLabel, lang)}
            className="w-10 h-10 rounded-lg text-slate-500 hover:text-[#0B1E3B] hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5">
          {submittedRef ? (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#0E6F3C]/10 border border-[#0E6F3C]/25">
                <p className="font-display font-bold text-[#0B1E3B] text-base mb-1">
                  {t(UI_COPY.drawer.readyBannerPrefix, lang)} #{submittedRef}
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {t(UI_COPY.drawer.readyBannerBody1, lang)}{' '}
                  <span className="font-mono font-semibold text-[#0B1E3B] dir-ltr inline-block">
                    {CONTACT_INFO.phoneDisplay}
                  </span>{' '}
                  {t(UI_COPY.drawer.readyBannerBody2, lang)}
                </p>
              </div>

              {/* Direct Single-Phone Handoff Actions */}
              <div className="space-y-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] text-center text-sm font-semibold text-white bg-[#0E6F3C] hover:bg-[#0B5930] rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t(UI_COPY.drawer.sendWhatsapp, lang)}</span>
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={smsUrl}
                    className="inline-flex items-center justify-center gap-2 px-4 min-h-[44px] text-xs sm:text-sm font-semibold text-[#0B1E3B] bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{t(UI_COPY.drawer.sendSms, lang)}</span>
                  </a>

                  <a
                    href={`tel:${CONTACT_INFO.phoneTel}`}
                    className="inline-flex items-center justify-center gap-2 px-4 min-h-[44px] text-xs sm:text-sm font-semibold text-[#0B1E3B] bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
                  >
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{t(UI_COPY.drawer.directCall, lang)}</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[44px] text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="w-4 h-4 text-[#0E6F3C]" aria-hidden="true" />
                      <span className="text-[#0E6F3C]">
                        {t(UI_COPY.drawer.copiedSummary, lang)}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>{t(UI_COPY.drawer.copySummary, lang)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Order Summary Preview */}
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-2">
                  {t(UI_COPY.drawer.previewLabel, lang)}
                </p>
                <pre className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-sans overflow-x-auto">
                  {submittedMessage}
                </pre>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSubmittedRef(null)}
                  className="text-xs font-medium text-slate-600 hover:text-[#0B1E3B] underline cursor-pointer py-1"
                >
                  {t(UI_COPY.drawer.editDetails, lang)}
                </button>

                <button
                  type="button"
                  onClick={handleStartNewOrder}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#0B1E3B] cursor-pointer py-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t(UI_COPY.drawer.startNewOrder, lang)}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Selected Items List */}
              {items.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-[#0B1E3B]">
                      {t(UI_COPY.drawer.selectedProducts, lang)}
                    </h3>
                    <button
                      type="button"
                      onClick={onClearItems}
                      className="text-xs text-slate-500 hover:text-red-700 transition-colors cursor-pointer"
                    >
                      {t(UI_COPY.drawer.clearList, lang)}
                    </button>
                  </div>

                  <ul className="divide-y divide-slate-200/80 border border-slate-200/80 rounded-xl overflow-hidden bg-[#F8FAFC]">
                    {items.map((item) => (
                      <li
                        key={item.uid}
                        className="p-3.5 bg-white flex items-start gap-3"
                      >
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-lg object-cover border border-slate-200 bg-slate-50 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-display font-semibold text-sm text-[#0B1E3B] leading-snug">
                              {item.productName}
                            </p>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.uid)}
                              aria-label={`${t(UI_COPY.drawer.removeLabel, lang)} ${item.productName}`}
                              className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">
                            {item.typeOption}
                            {item.printColors ? ` · ${item.printColors}` : ''}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {t(UI_COPY.drawer.sizePrefix, lang)} {item.sizeOption} ·{' '}
                            {t(UI_COPY.drawer.qtyPrefix, lang)} {item.quantity}
                          </p>
                          {item.notes && (
                            <p className="text-xs text-slate-500 mt-1 pt-1 border-t border-slate-100">
                              {t(UI_COPY.drawer.notePrefix, lang)} {item.notes}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-slate-200/80 text-center">
                  <ClipboardList
                    className="w-7 h-7 text-slate-400 mx-auto mb-2"
                    aria-hidden="true"
                  />
                  <p className="font-display font-semibold text-sm text-[#0B1E3B] mb-1">
                    {startInCustomMode
                      ? t(UI_COPY.drawer.customModeTitle, lang)
                      : t(UI_COPY.drawer.emptyBoxTitle, lang)}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t(UI_COPY.drawer.emptyBoxBody, lang)}
                  </p>
                </div>
              )}

              {/* Customer Contact Details Form */}
              <form
                id="order-submit-form"
                onSubmit={handleConfirmOrder}
                className="space-y-4"
              >
                <div className="pt-2 border-t border-slate-200">
                  <h3 className="font-display font-semibold text-sm text-[#0B1E3B] mb-1">
                    {t(UI_COPY.drawer.formTitle, lang)}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t(UI_COPY.drawer.formSubtitle, lang)}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="customer-name"
                      className="block text-xs font-semibold text-[#0B1E3B] mb-1.5"
                    >
                      {t(UI_COPY.drawer.nameLabel, lang)}{' '}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      required
                      value={customer.name}
                      onChange={(e) =>
                        setCustomer((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder={t(UI_COPY.drawer.namePlaceholder, lang)}
                      className="w-full px-3.5 py-2.5 min-h-[44px] text-base sm:text-sm border border-slate-200 rounded-lg text-[#0B1E3B] placeholder:text-slate-400 focus:outline-none focus:border-[#0B1E3B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customer-phone"
                      className="block text-xs font-semibold text-[#0B1E3B] mb-1.5"
                    >
                      {t(UI_COPY.drawer.phoneLabel, lang)}{' '}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      required
                      dir="ltr"
                      value={customer.phone}
                      onChange={(e) =>
                        setCustomer((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      placeholder="05X XXX XXXX"
                      className={`w-full px-3.5 py-2.5 min-h-[44px] text-base sm:text-sm border border-slate-200 rounded-lg text-[#0B1E3B] font-mono placeholder:text-slate-400 focus:outline-none focus:border-[#0B1E3B] ${
                        lang === 'ar' ? 'text-right' : 'text-left'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="customer-business"
                      className="block text-xs font-semibold text-[#0B1E3B] mb-1.5"
                    >
                      {t(UI_COPY.drawer.businessLabel, lang)}
                    </label>
                    <input
                      id="customer-business"
                      type="text"
                      value={customer.businessName}
                      onChange={(e) =>
                        setCustomer((prev) => ({
                          ...prev,
                          businessName: e.target.value,
                        }))
                      }
                      placeholder={t(UI_COPY.drawer.businessPlaceholder, lang)}
                      className="w-full px-3.5 py-2.5 min-h-[44px] text-base sm:text-sm border border-slate-200 rounded-lg text-[#0B1E3B] placeholder:text-slate-400 focus:outline-none focus:border-[#0B1E3B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customer-city"
                      className="block text-xs font-semibold text-[#0B1E3B] mb-1.5"
                    >
                      {t(UI_COPY.drawer.cityLabel, lang)}
                    </label>
                    <input
                      id="customer-city"
                      type="text"
                      value={customer.city}
                      onChange={(e) =>
                        setCustomer((prev) => ({ ...prev, city: e.target.value }))
                      }
                      placeholder={t(UI_COPY.drawer.cityPlaceholder, lang)}
                      className="w-full px-3.5 py-2.5 min-h-[44px] text-base sm:text-sm border border-slate-200 rounded-lg text-[#0B1E3B] placeholder:text-slate-400 focus:outline-none focus:border-[#0B1E3B]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="customer-notes"
                    className="block text-xs font-semibold text-[#0B1E3B] mb-1.5"
                  >
                    {items.length === 0
                      ? t(UI_COPY.drawer.customNotesLabel, lang)
                      : t(UI_COPY.drawer.optionalNotesLabel, lang)}
                  </label>
                  <textarea
                    id="customer-notes"
                    rows={3}
                    value={customer.notes}
                    onChange={(e) =>
                      setCustomer((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    placeholder={t(UI_COPY.drawer.notesPlaceholder, lang)}
                    className="w-full px-3.5 py-2.5 text-base sm:text-sm border border-slate-200 rounded-lg text-[#0B1E3B] placeholder:text-slate-400 focus:outline-none focus:border-[#0B1E3B] resize-none"
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5"
                  >
                    {error}
                  </p>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {!submittedRef && (
          <div className="px-4 sm:px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-slate-200 bg-[#F8FAFC] space-y-2.5 shrink-0">
            <button
              type="submit"
              form="order-submit-form"
              className="w-full inline-flex items-center justify-center gap-2 px-5 min-h-[46px] text-sm font-semibold text-white bg-[#0E6F3C] hover:bg-[#0B5930] rounded-lg transition-colors cursor-pointer"
            >
              <span>{t(UI_COPY.drawer.submitBtn, lang)}</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span>{t(UI_COPY.drawer.orCall, lang)}</span>
              <a
                href={`tel:${CONTACT_INFO.phoneTel}`}
                className="font-mono font-semibold text-[#0B1E3B] hover:text-[#0E6F3C] dir-ltr"
              >
                {CONTACT_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
