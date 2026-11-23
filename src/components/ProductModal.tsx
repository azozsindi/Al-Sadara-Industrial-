import { useEffect, useState } from 'react';
import { X, Check, Plus } from 'lucide-react';
import { PRINT_COLOR_OPTIONS, type ProductItem } from '../data/catalog';
import { UI_COPY, t, type Language } from '../data/i18n';
import type { OrderItem } from '../types/order';

interface ProductModalProps {
  lang: Language;
  product: ProductItem | null;
  onClose: () => void;
  onAddItem: (item: OrderItem) => void;
}

export function ProductModal({
  lang,
  product,
  onClose,
  onAddItem,
}: ProductModalProps) {
  const [selectedTypeIdx, setSelectedTypeIdx] = useState(0);
  const [printColorIdx, setPrintColorIdx] = useState(1);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);
  const [customSize, setCustomSize] = useState('');
  const [selectedQtyIdx, setSelectedQtyIdx] = useState(0);
  const [customQty, setCustomQty] = useState('');
  const [notes, setNotes] = useState('');
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (!product) return;
    setSelectedTypeIdx(0);
    setPrintColorIdx(1);
    setSelectedSizeIdx(0);
    setCustomSize('');
    setSelectedQtyIdx(0);
    setCustomQty('');
    setNotes('');
    setActiveImage(product.image);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const currentType = product.defaultTypeOptions[selectedTypeIdx] || product.defaultTypeOptions[0];
  const currentSize = product.sizeOptions[selectedSizeIdx] || product.sizeOptions[0];
  const currentQty = product.quantitySuggestions[selectedQtyIdx] || product.quantitySuggestions[0];
  const currentColor = PRINT_COLOR_OPTIONS[printColorIdx] || PRINT_COLOR_OPTIONS[0];

  const isPrintedType =
    product.supportsPrinting &&
    !currentType.ar.includes('سادة') &&
    !currentType.ar.includes('بدون طباعة');

  const needsCustomSize = currentSize.ar.includes('خاص');
  const needsCustomQty = currentQty.ar.includes('مخصصة');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSize =
      needsCustomSize && customSize.trim()
        ? customSize.trim()
        : t(currentSize, lang);
    const finalQty =
      needsCustomQty && customQty.trim()
        ? customQty.trim()
        : t(currentQty, lang);

    onAddItem({
      uid: `${product.id}-${Date.now()}`,
      productId: product.id,
      productName: t(product.name, lang),
      productImage: product.image,
      typeOption: t(currentType, lang),
      printColors: isPrintedType ? t(currentColor, lang) : undefined,
      sizeOption: finalSize,
      quantity: finalQty,
      notes: notes.trim(),
    });
    onClose();
  };

  const images = product.secondaryImage
    ? [product.image, product.secondaryImage]
    : [product.image];

  const containIds = new Set([
    'special-containers',
    'freezer-bags',
    'shopping-bags',
    'custom-printing-service',
  ]);
  const useContain = containIds.has(product.id);
  const productName = t(product.name, lang);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#071428]/60 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92dvh] bg-white rounded-t-2xl sm:rounded-2xl border border-slate-200 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t(UI_COPY.modal.closeLabel, lang)}
          className="absolute top-3 end-3 sm:top-3.5 sm:end-3.5 z-20 w-10 h-10 sm:w-9 sm:h-9 rounded-lg bg-white/95 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Visuals & Specs Column */}
        <div className="lg:w-5/12 bg-[#F8FAFC] border-b lg:border-b-0 lg:border-e border-slate-200 p-4 sm:p-6 flex flex-col justify-between lg:overflow-y-auto shrink-0">
          <div>
            <div
              className={`aspect-[16/10] sm:aspect-[4/3] w-full rounded-xl overflow-hidden border border-slate-200/80 mb-3.5 sm:mb-4 ${
                product.id === 'custom-printing-service' ? 'bg-[#0B1E3B]' : 'bg-white'
              }`}
            >
              <img
                src={activeImage || product.image}
                alt={productName}
                referrerPolicy="no-referrer"
                className={`w-full h-full ${
                  useContain ? 'object-contain p-3' : 'object-cover'
                }`}
              />
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2 mb-4 sm:mb-5">
                {images.map((imgUrl, idx) => (
                  <button
                    key={imgUrl}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 bg-white transition-colors cursor-pointer ${
                      activeImage === imgUrl
                        ? 'border-[#0E6F3C]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${productName} - ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}

            <p className="text-xs font-medium text-[#0E6F3C] mb-1">
              {t(product.categoryLabel, lang)}
            </p>
            <h3
              id="product-modal-title"
              className="font-display font-bold text-[#0B1E3B] text-lg sm:text-xl mb-1.5 sm:mb-2"
            >
              {productName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-5">
              {t(product.description, lang)}
            </p>
          </div>

          <div className="pt-3.5 sm:pt-4 border-t border-slate-200/80">
            <p className="text-xs font-semibold text-[#0B1E3B] mb-2">
              {t(UI_COPY.modal.specsHeading, lang)}
            </p>
            <ul className="space-y-1.5 sm:space-y-2 text-xs text-slate-600">
              {product.specs.map((spec) => (
                <li key={spec.en} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0E6F3C] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{t(spec, lang)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Specification Selector Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:w-7/12 p-4 sm:p-6 lg:overflow-y-auto flex flex-col justify-between gap-5 sm:gap-6"
        >
          <div className="space-y-4 sm:space-y-5">
            <div>
              <h4 className="font-display font-semibold text-[#0B1E3B] text-base mb-1">
                {t(UI_COPY.modal.formHeading, lang)}
              </h4>
              <p className="text-xs text-slate-500">
                {t(UI_COPY.modal.formSubheading, lang)}
              </p>
            </div>

            {/* Type Option */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1E3B] mb-2">
                {t(UI_COPY.modal.typeLabel, lang)}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.defaultTypeOptions.map((option, idx) => (
                  <button
                    key={option.en}
                    type="button"
                    onClick={() => setSelectedTypeIdx(idx)}
                    className={`px-3.5 min-h-[40px] text-xs sm:text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
                      selectedTypeIdx === idx
                        ? 'bg-[#0B1E3B] text-white border-[#0B1E3B]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {t(option, lang)}
                  </button>
                ))}
              </div>
            </div>

            {/* Printing Colors */}
            {isPrintedType && (
              <div>
                <label className="block text-xs font-semibold text-[#0B1E3B] mb-2">
                  {t(UI_COPY.modal.printColorsLabel, lang)}
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRINT_COLOR_OPTIONS.map((colorOpt, idx) => (
                    <button
                      key={colorOpt.en}
                      type="button"
                      onClick={() => setPrintColorIdx(idx)}
                      className={`px-3 min-h-[38px] text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        printColorIdx === idx
                          ? 'bg-[#0E6F3C] text-white border-[#0E6F3C]'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {t(colorOpt, lang)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Option */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1E3B] mb-2">
                {t(UI_COPY.modal.sizeLabel, lang)}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizeOptions.map((size, idx) => (
                  <button
                    key={size.en}
                    type="button"
                    onClick={() => setSelectedSizeIdx(idx)}
                    className={`px-3.5 min-h-[40px] text-xs sm:text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
                      selectedSizeIdx === idx
                        ? 'bg-[#0B1E3B] text-white border-[#0B1E3B]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {t(size, lang)}
                  </button>
                ))}
              </div>
              {needsCustomSize && (
                <input
                  type="text"
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                  placeholder={t(UI_COPY.modal.customSizePlaceholder, lang)}
                  className="mt-2.5 w-full px-3.5 py-2.5 text-base sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0B1E3B]"
                />
              )}
            </div>

            {/* Quantity Option */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1E3B] mb-2">
                {t(UI_COPY.modal.qtyLabel, lang)}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.quantitySuggestions.map((qty, idx) => (
                  <button
                    key={qty.en}
                    type="button"
                    onClick={() => setSelectedQtyIdx(idx)}
                    className={`px-3.5 min-h-[40px] text-xs sm:text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
                      selectedQtyIdx === idx
                        ? 'bg-[#0B1E3B] text-white border-[#0B1E3B]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {t(qty, lang)}
                  </button>
                ))}
              </div>
              {needsCustomQty && (
                <input
                  type="text"
                  value={customQty}
                  onChange={(e) => setCustomQty(e.target.value)}
                  placeholder={t(UI_COPY.modal.customQtyPlaceholder, lang)}
                  className="mt-2.5 w-full px-3.5 py-2.5 text-base sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0B1E3B]"
                />
              )}
            </div>

            {/* Optional Notes */}
            <div>
              <label
                htmlFor="product-item-notes"
                className="block text-xs font-semibold text-[#0B1E3B] mb-2"
              >
                {t(UI_COPY.modal.notesLabel, lang)}
              </label>
              <textarea
                id="product-item-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t(UI_COPY.modal.notesPlaceholder, lang)}
                className="w-full px-3.5 py-2.5 text-base sm:text-sm border border-slate-200 rounded-lg text-[#0B1E3B] placeholder:text-slate-400 focus:outline-none focus:border-[#0B1E3B] resize-none"
              />
            </div>
          </div>

          <div className="sticky bottom-0 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 sm:pt-4 sm:pb-0 bg-white border-t border-slate-200 flex items-center justify-end gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 min-h-[44px] text-sm font-medium text-slate-600 hover:text-[#0B1E3B] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              {t(UI_COPY.modal.cancel, lang)}
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 min-h-[44px] text-sm font-semibold text-white bg-[#0E6F3C] hover:bg-[#0B5930] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t(UI_COPY.modal.addToOrder, lang)}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
