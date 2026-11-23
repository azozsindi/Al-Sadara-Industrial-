export type Language = 'ar' | 'en';

export interface LocalizedText {
  ar: string;
  en: string;
}

export function t(value: LocalizedText, lang: Language): string {
  return value[lang];
}

export const UI_COPY = {
  pageTitle: {
    ar: 'شركة الصدارة للصناعة | كتالوج المنتجات والطلبات',
    en: 'Al-Sadara for Industry | Product Catalog & Orders',
  },
  nav: {
    products: { ar: 'المنتجات', en: 'Products' },
    printing: { ar: 'قسم الطباعة', en: 'Printing' },
    about: { ar: 'من نحن', en: 'About Us' },
    whyUs: { ar: 'لماذا الصدارة', en: 'Why Us' },
    orderList: { ar: 'قائمة الطلب', en: 'Order List' },
    openMenu: { ar: 'فتح القائمة', en: 'Open menu' },
    closeMenu: { ar: 'إغلاق القائمة', en: 'Close menu' },
    mainNavLabel: { ar: 'التنقل الرئيسي', en: 'Main navigation' },
    switchLangLabel: { ar: 'Switch to English', en: 'التبديل إلى العربية' },
    switchLangShort: { ar: 'EN', en: 'عربي' },
  },
  hero: {
    foundedPrefix: { ar: 'تأسست عام', en: 'Est.' },
    shortLocation: { ar: 'المدينة الصناعية الثالثة، جدة', en: '3rd Industrial City, Jeddah' },
    introPrefix: {
      ar: 'كتالوج منتجات شركة الصدارة للصناعة — صناعة الأكياس البلاستيكية، السفرة المطبوعة، رولات الشرنك، وأكياس النفايات مع طباعة احترافية تصل حتى',
      en: 'Al-Sadara for Industry catalog — manufacturing plastic bags, printed tablecloths, shrink film rolls, and garbage bags with professional printing up to',
    },
    colorsSuffix: { ar: 'ألوان.', en: 'colors.' },
    subIntro: {
      ar: 'اختر المنتجات التي تحتاجها وحدد المقاس والكمية المناسبة، ثم أرسل طلبك مباشرة لنتواصل معك فوراً بالتسعيرة والتفاصيل.',
      en: 'Select the products you need, choose your preferred size and quantity, and send your list directly for a quick quote and follow-up.',
    },
    browseCta: { ar: 'تصفح المنتجات واختر طلبك', en: 'Browse Products & Order' },
    customCta: { ar: 'طلب بمواصفات خاصة', en: 'Custom Specification Request' },
    directContactLabel: { ar: 'للتواصل والاستفسار المباشر', en: 'Direct Phone Inquiries' },
    copyNumber: { ar: 'نسخ الرقم', en: 'Copy Number' },
    copiedNumber: { ar: 'تم نسخ الرقم', en: 'Copied' },
    heroImageAlt: {
      ar: 'مصنع شركة الصدارة للصناعة وتشكيلة الأكياس البلاستيكية والرولات',
      en: 'Al-Sadara for Industry facility and full plastic packaging lineup',
    },
    nationwideNote: { ar: 'توريد لجميع مدن المملكة', en: 'Nationwide Delivery Across KSA' },
  },
  catalog: {
    kickerSuffix: { ar: 'منتجات وخدمات', en: 'Products & Services' },
    kickerPrefix: { ar: 'الكتالوج الكامل', en: 'Full Catalog' },
    heading: { ar: 'اختر المنتجات التي تحتاجها', en: 'Select Your Products' },
    subheading: {
      ar: 'اضغط على أي منتج لتحديد المقاس ونوع الطباعة والكمية، أو أضفه مباشرة إلى قائمة طلبك وسنتواصل معك لتأكيد التفاصيل.',
      en: 'Tap any product to choose size, printing options, and quantity, or quick-add it directly to your order list.',
    },
    searchPlaceholder: {
      ar: 'ابحث عن منتج (سفرة، شرنك، نفايات...)',
      en: 'Search products (tablecloth, shrink, bags...)',
    },
    searchLabel: { ar: 'ابحث في المنتجات', en: 'Search products' },
    categoriesLabel: { ar: 'تصنيفات المنتجات', en: 'Product categories' },
    emptyTitle: { ar: 'لا توجد منتجات مطابقة لبحثك', en: 'No matching products found' },
    emptySubtitle: {
      ar: 'جرب البحث بكلمة أخرى أو استعرض جميع المنتجات المتوفرة.',
      en: 'Try another keyword or browse all available products.',
    },
    showAll: { ar: 'عرض جميع المنتجات', en: 'Show All Products' },
    printableLabel: { ar: 'قابل للطباعة حتى 8 ألوان', en: 'Printable up to 8 colors' },
    configureBtn: { ar: 'تحديد المواصفات', en: 'Configure' },
    quickAddBtn: { ar: 'إضافة سريعة', en: 'Quick Add' },
    addedPrefix: { ar: 'مضاف', en: 'Added' },
  },
  modal: {
    closeLabel: { ar: 'إغلاق نافذة المنتج', en: 'Close product dialog' },
    specsHeading: { ar: 'المميزات والمواصفات', en: 'Key Specifications' },
    formHeading: { ar: 'حدد مواصفات طلبك', en: 'Configure Your Request' },
    formSubheading: {
      ar: 'يمكنك اختيار الخيارات التقريبية وسنراجع معك كل التفاصيل قبل التنفيذ.',
      en: 'Choose approximate options and we will confirm every detail with you before production.',
    },
    typeLabel: { ar: 'النوع / التنفيذ', en: 'Type / Finish' },
    printColorsLabel: {
      ar: 'عدد ألوان الطباعة (متوفر حتى 8 ألوان)',
      en: 'Printing Colors (Up to 8 Colors)',
    },
    sizeLabel: { ar: 'المقاس أو الاستخدام', en: 'Size or Application' },
    customSizePlaceholder: {
      ar: 'اكتب المقاس المطلوب (مثال: 40×50 سم أو سماكة معينة)',
      en: 'Enter custom dimensions (e.g., 40×50 cm or specific thickness)',
    },
    qtyLabel: { ar: 'الكمية التقريبية', en: 'Estimated Quantity' },
    customQtyPlaceholder: {
      ar: 'اكتب الكمية المطلوبة (بالكرتون أو الكيلو أو الطن)',
      en: 'Enter desired quantity (cartons, kg, or tons)',
    },
    notesLabel: { ar: 'ملاحظات إضافية (اختياري)', en: 'Additional Notes (Optional)' },
    notesPlaceholder: {
      ar: 'مثال: يوجد شعار جاهز للطباعة، أو أرغب بعرض سعر لمقاسين...',
      en: 'Example: Artwork ready for printing, or quote needed for two sizes...',
    },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    addToOrder: { ar: 'إضافة إلى قائمة الطلب', en: 'Add to Order List' },
  },
  printing: {
    kicker: {
      ar: 'قسم الطباعة · طباعة متقدمة حتى 8 ألوان',
      en: 'Printing Department · Advanced Printing up to 8 Colors',
    },
    heading: {
      ar: 'طباعة احترافية بأحدث التقنيات تعكس هوية مشروعك',
      en: 'Precision Industrial Printing Built for Your Brand',
    },
    bodyStart: {
      ar: 'ننفذ الطباعة على الأكياس البلاستيكية، السفرة، رولات التغليف، والأغلفة التجارية بألوان ثابتة وواضحة تصل إلى',
      en: 'We print on plastic bags, tablecloths, packaging rolls, and commercial wraps with crisp, color-fast output up to',
    },
    bodyEnd: {
      ar: 'ألوان مع خدمة تجهيز وتصميم الشعار والهوية البصرية قبل التشغيل.',
      en: 'colors, including logo and visual identity preparation before production.',
    },
    cta: { ar: 'اطلب خدمة طباعة خاصة الآن', en: 'Request Custom Printing' },
    pressAlt: {
      ar: 'خطوط الطباعة الحديثة في شركة الصدارة للصناعة',
      en: 'Modern multi-color printing press at Al-Sadara for Industry',
    },
    showcaseAlt: {
      ar: 'نماذج منتجات مطبوعة من أكياس ورولات وأغلفة',
      en: 'Printed plastic bags, rolls, cups, and packaging samples',
    },
  },
  about: {
    kickerPrefix: { ar: 'من نحن · منذ عام', en: 'About Us · Since' },
    heading: {
      ar: 'خبرة صناعية متكاملة في التعبئة والتغليف',
      en: 'Integrated Industrial Packaging Expertise',
    },
    visionTitle: { ar: 'رؤيتنا', en: 'Our Vision' },
    missionTitle: { ar: 'رسالتنا', en: 'Our Mission' },
    valuesTitle: { ar: 'قيمنا', en: 'Our Values' },
    machineAlt: {
      ar: 'خطوط الإنتاج والتصنيع داخل مصنع شركة الصدارة للصناعة',
      en: 'Production machinery inside Al-Sadara for Industry factory',
    },
    whyKicker: { ar: 'لماذا تختار الصدارة؟', en: 'Why Choose Al-Sadara?' },
    whyHeading: {
      ar: 'معايير تصنيع وتوريد يعتمد عليها عملاؤنا في جميع مدن المملكة',
      en: 'Manufacturing & Supply Standards Trusted Nationwide',
    },
    whySubheading: {
      ar: 'من الخامة المعتمدة وحتى التسليم النهائي، نلتزم بجودة ثابتة وسرعة تنفيذ تناسب احتياجات المطاعم والمتاجر والمصانع.',
      en: 'From certified raw materials to on-time delivery, we maintain consistent quality built for restaurants, retailers, and factories.',
    },
    interiorAlt: {
      ar: 'خطوط الإنتاج الداخلية وتشكيلة منتجات شركة الصدارة للصناعة',
      en: 'Al-Sadara production lines and full packaging range',
    },
  },
  ctaBand: {
    kicker: { ar: 'تواصل مباشر وسريع', en: 'Fast Direct Response' },
    heading: {
      ar: 'جاهز لطلبك أو تحتاج استشارة في المقاسات والطباعة؟',
      en: 'Ready to Order or Need Sizing & Printing Advice?',
    },
    body: {
      ar: 'أرسل قائمة المنتجات التي اخترتها وسأتواصل معك مباشرة، أو اتصل على الجوال لأي استفسار سريع.',
      en: 'Send your selected product list and I will get right back to you, or call directly for quick inquiries.',
    },
    reviewOrder: { ar: 'مراجعة وإرسال الطلب', en: 'Review & Send Order' },
    newOrder: { ar: 'إرسال طلب جديد', en: 'Send New Request' },
  },
  drawer: {
    titleReady: { ar: 'تم تجهيز طلبك للإرسال', en: 'Your Order Is Ready to Send' },
    titleList: { ar: 'قائمة طلبك', en: 'Your Order List' },
    closeLabel: { ar: 'إغلاق قائمة الطلب', en: 'Close order list' },
    refPrefix: { ar: 'مرجع الطلب', en: 'Order Ref' },
    contactVia: { ar: 'التواصل عبر الرقم', en: 'Direct mobile' },
    emptySubtitle: {
      ar: 'اختر المنتجات أو اكتب طلبك الخاص وسنتواصل معك مباشرة',
      en: 'Pick products or describe your custom request for direct follow-up',
    },
    itemSingular: { ar: 'منتج محدد للتسعير والتواصل', en: 'item selected for quote' },
    itemPlural: { ar: 'منتجات محددة للتسعير والتواصل', en: 'items selected for quote' },
    readyBannerPrefix: { ar: 'طلبك جاهز — مرجع رقم', en: 'Order Ready — Ref' },
    readyBannerBody1: {
      ar: 'اختر طريقة الإرسال المناسبة لك لإرسال هذا الملخص مباشرة على الرقم',
      en: 'Choose your preferred way to send this order summary directly to',
    },
    readyBannerBody2: { ar: 'وسأتواصل معك فوراً.', en: 'and I will contact you shortly.' },
    sendWhatsapp: {
      ar: 'إرسال تفاصيل الطلب على الجوال (واتساب)',
      en: 'Send Order Details via WhatsApp',
    },
    sendSms: { ar: 'إرسال رسالة نصية SMS', en: 'Send via SMS' },
    directCall: { ar: 'اتصال مباشر', en: 'Call Directly' },
    copySummary: { ar: 'نسخ ملخص الطلب', en: 'Copy Order Summary' },
    copiedSummary: { ar: 'تم نسخ نص الطلب بالكامل', en: 'Order Summary Copied' },
    previewLabel: { ar: 'معاينة نص الطلب', en: 'Order Message Preview' },
    editDetails: { ar: 'تعديل البيانات', en: 'Edit Details' },
    startNewOrder: { ar: 'بدء طلب جديد', en: 'Start New Order' },
    selectedProducts: { ar: 'المنتجات المختارة', en: 'Selected Products' },
    clearList: { ar: 'تفريغ القائمة', en: 'Clear List' },
    removeLabel: { ar: 'حذف', en: 'Remove' },
    sizePrefix: { ar: 'المقاس:', en: 'Size:' },
    qtyPrefix: { ar: 'الكمية:', en: 'Qty:' },
    notePrefix: { ar: 'ملاحظة:', en: 'Note:' },
    customModeTitle: { ar: 'طلب بمواصفات خاصة', en: 'Custom Specification Request' },
    emptyBoxTitle: { ar: 'قائمة الطلب فارغة حالياً', en: 'Your Order List Is Empty' },
    emptyBoxBody: {
      ar: 'يمكنك اختيار منتجات من الكتالوج، أو كتابة طلبك الخاص مباشرة في النموذج أدناه وسنتواصل معك.',
      en: 'Choose products from the catalog, or write your custom requirements below and we will follow up.',
    },
    formTitle: { ar: 'بياناتك لنتواصل معك', en: 'Your Contact Details' },
    formSubtitle: {
      ar: 'لا حاجة لبريد إلكتروني — فقط اسمك ورقم جوالك وسأتواصل معك مباشرة.',
      en: 'No email required — just your name and mobile number for direct follow-up.',
    },
    nameLabel: { ar: 'الاسم', en: 'Full Name' },
    namePlaceholder: { ar: 'الاسم الكريم', en: 'Your name' },
    phoneLabel: { ar: 'رقم الجوال', en: 'Mobile Number' },
    businessLabel: {
      ar: 'اسم المطعم / المتجر (اختياري)',
      en: 'Business / Restaurant Name (Optional)',
    },
    businessPlaceholder: { ar: 'إن وجد', en: 'If applicable' },
    cityLabel: { ar: 'المدينة (اختياري)', en: 'City (Optional)' },
    cityPlaceholder: { ar: 'جدة، الرياض، الدمام...', en: 'Jeddah, Riyadh, Dammam...' },
    customNotesLabel: { ar: 'تفاصيل طلبك الخاص', en: 'Custom Request Details' },
    optionalNotesLabel: {
      ar: 'ملاحظات إضافية (اختياري)',
      en: 'Additional Notes (Optional)',
    },
    notesPlaceholder: {
      ar: 'اكتب أي تفاصيل إضافية مثل وقت التواصل المفضل أو مقاسات خاصة...',
      en: 'Preferred call time, special measurements, or delivery notes...',
    },
    errNoItems: {
      ar: 'أضف منتجاً واحداً على الأقل أو اكتب تفاصيل طلبك الخاص في خانة الملاحظات.',
      en: 'Please add at least one product or describe your custom request in the notes field.',
    },
    errName: {
      ar: 'يرجى كتابة الاسم لكي نتمكن من التواصل معك.',
      en: 'Please enter your name so we can reach out to you.',
    },
    errPhone: {
      ar: 'يرجى كتابة رقم جوال صحيح للتواصل معك.',
      en: 'Please enter a valid mobile number.',
    },
    submitBtn: { ar: 'تجهيز الطلب للتواصل', en: 'Prepare Order Summary' },
    orCall: { ar: 'أو اتصل مباشرة:', en: 'Or call directly:' },
  },
  footer: {
    sectionsTitle: { ar: 'الأقسام', en: 'Sections' },
    catalogLink: { ar: 'كتالوج المنتجات', en: 'Product Catalog' },
    printingLink: { ar: 'قسم الطباعة حتى 8 ألوان', en: '8-Color Printing' },
    aboutLink: { ar: 'من نحن', en: 'About Us' },
    whyLink: { ar: 'لماذا الصدارة', en: 'Why Al-Sadara' },
    orderLink: { ar: 'قائمة الطلب وإرسال طلبك', en: 'Order List & Request' },
    contactTitle: { ar: 'التواصل المباشر', en: 'Direct Contact' },
    phoneLabel: { ar: 'رقم الجوال المباشر', en: 'Direct Mobile Number' },
    copy: { ar: 'نسخ', en: 'Copy' },
    copied: { ar: 'تم النسخ', en: 'Copied' },
    summaryEnd: {
      ar: 'صناعة مواد التعبئة والتغليف، الأكياس البلاستيكية، السفرة، ورولات الشرنك بجودة عالية منذ عام',
      en: 'Manufacturing plastic bags, tablecloths, shrink rolls, and printed packaging since',
    },
    rights: { ar: 'جميع الحقوق محفوظة.', en: 'All rights reserved.' },
  },
  toast: {
    addedPrefix: { ar: 'تمت إضافة', en: 'Added' },
    addedSuffix: { ar: 'إلى قائمة الطلب', en: 'to your order list' },
    viewOrder: { ar: 'عرض الطلب', en: 'View Order' },
  },
} as const;
