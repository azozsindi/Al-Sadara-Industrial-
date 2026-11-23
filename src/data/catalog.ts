import type { LocalizedText } from './i18n';

export const CONTACT_INFO = {
  phoneDisplay: '+966 50 361 6574',
  phoneRaw: '966503616574',
  phoneTel: '+966503616574',
  companyName: {
    ar: 'شركة الصدارة للصناعة',
    en: 'Al-Sadara for Industry',
  },
  tagline: {
    ar: 'أكياس بلاستيكية · سفرة · شرنك · طباعة',
    en: 'Plastic Bags · Tablecloths · Shrink Film · Printing',
  },
  slogan: {
    ar: 'نصنع الجودة ... ونطبع الثقة',
    en: 'We Craft Quality ... We Print Trust',
  },
  foundedYear: '2012',
  location: {
    ar: 'المدينة الصناعية الثالثة، جدة - المملكة العربية السعودية',
    en: '3rd Industrial City, Jeddah – Saudi Arabia',
  },
} as const;

export type ProductCategory =
  | 'all'
  | 'food-tablecloth'
  | 'shrink'
  | 'garbage'
  | 'shopping-freezer'
  | 'printing-custom';

export interface ProductItem {
  id: string;
  name: LocalizedText;
  subtitle: LocalizedText;
  category: Exclude<ProductCategory, 'all'>;
  categoryLabel: LocalizedText;
  description: LocalizedText;
  image: string;
  secondaryImage?: string;
  specs: LocalizedText[];
  supportsPrinting: boolean;
  defaultTypeOptions: LocalizedText[];
  sizeOptions: LocalizedText[];
  quantitySuggestions: LocalizedText[];
}

export interface CategoryOption {
  id: ProductCategory;
  label: LocalizedText;
}

export const CATEGORIES: CategoryOption[] = [
  { id: 'all', label: { ar: 'جميع المنتجات', en: 'All Products' } },
  {
    id: 'food-tablecloth',
    label: { ar: 'السفرة وأكياس الطعام', en: 'Tablecloths & Food Bags' },
  },
  { id: 'shrink', label: { ar: 'رولات الشرنك', en: 'Shrink Film Rolls' } },
  { id: 'garbage', label: { ar: 'أكياس النفايات', en: 'Garbage Bags' } },
  {
    id: 'shopping-freezer',
    label: { ar: 'التسوق والمجمدات', en: 'Shopping & Freezer Bags' },
  },
  {
    id: 'printing-custom',
    label: { ar: 'الطباعة والمنتجات الخاصة', en: 'Printing & Custom' },
  },
];

export const PRINT_COLOR_OPTIONS: LocalizedText[] = [
  { ar: 'لون واحد', en: '1 Color' },
  { ar: 'لونان', en: '2 Colors' },
  { ar: '3 – 4 ألوان', en: '3 – 4 Colors' },
  { ar: '5 – 8 ألوان', en: '5 – 8 Colors' },
  { ar: 'أحتاج تصميم شعار', en: 'Need Logo Design' },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'printed-tablecloth',
    name: { ar: 'سفرة طعام مطبوعة', en: 'Printed Dining Tablecloths' },
    subtitle: { ar: 'للمطاعم والكافيهات', en: 'For Restaurants & Cafes' },
    category: 'food-tablecloth',
    categoryLabel: { ar: 'السفرة وأكياس الطعام', en: 'Tablecloths & Food Bags' },
    description: {
      ar: 'سفرة مطبوعة بجودة عالية تناسب المطاعم والكافيهات، تتميز بجودة طباعة عالية ومناسبة للاستخدام اليومي.',
      en: 'High-quality printed disposable tablecloths tailored for restaurants and cafes, offering sharp print clarity for daily service.',
    },
    image: '/images/alsadara/product_tablecloth.jpg',
    specs: [
      { ar: 'جودة طباعة عالية وواضحة', en: 'Sharp, high-definition print quality' },
      {
        ar: 'مناسبة للاستخدام اليومي للمطاعم والكافيهات',
        en: 'Ideal for daily restaurant and cafe use',
      },
      {
        ar: 'طباعة الشعار والهوية البصرية حتى 8 ألوان',
        en: 'Custom logo & brand printing up to 8 colors',
      },
    ],
    supportsPrinting: true,
    defaultTypeOptions: [
      { ar: 'مطبوعة بشعار العميل', en: 'Custom Branded Print' },
      { ar: 'سادة بدون طباعة', en: 'Plain (Unprinted)' },
    ],
    sizeOptions: [
      { ar: 'مقاس قياسي (80×100 سم)', en: 'Standard (80×100 cm)' },
      { ar: 'مقاس كبير (100×120 سم)', en: 'Large (100×120 cm)' },
      { ar: 'مقاس خاص حسب الطلب', en: 'Custom Size' },
    ],
    quantitySuggestions: [
      { ar: '25 كرتون', en: '25 Cartons' },
      { ar: '50 كرتون', en: '50 Cartons' },
      { ar: '100 كرتون', en: '100 Cartons' },
      { ar: 'كمية مخصصة', en: 'Custom Quantity' },
    ],
  },
  {
    id: 'tablecloth-roll',
    name: { ar: 'رول السفرة المطبوعة', en: 'Printed Tablecloth Rolls' },
    subtitle: { ar: 'للمطاعم والمناسبات', en: 'For Restaurants & Events' },
    category: 'food-tablecloth',
    categoryLabel: { ar: 'السفرة وأكياس الطعام', en: 'Tablecloths & Food Bags' },
    description: {
      ar: 'رول سفرة مطبوعة بجودة عالية مثالية للمطاعم والمناسبات، بلف محكم وسهولة في السحب والقطع.',
      en: 'High-quality printed tablecloth rolls built for restaurants, catering, and events, with tight winding and effortless tear-off.',
    },
    image: '/images/alsadara/product_tablecloth_roll.jpg',
    specs: [
      {
        ar: 'مثالية للمطاعم والمناسبات والاستراحات',
        en: 'Ideal for restaurants, banquets, and gatherings',
      },
      { ar: 'ألوان ثابتة وواضحة', en: 'Vibrant, color-fast printing' },
      { ar: 'تتوفر بمقاسات وأطوال متعددة', en: 'Available in multiple widths and lengths' },
    ],
    supportsPrinting: true,
    defaultTypeOptions: [
      { ar: 'مطبوعة حسب الطلب', en: 'Custom Printed' },
      { ar: 'سادة', en: 'Plain' },
    ],
    sizeOptions: [
      { ar: 'رول مطاعم قياسي', en: 'Standard Restaurant Roll' },
      { ar: 'رول مناسبات عريض', en: 'Wide Event Roll' },
      { ar: 'مقاس وسماكة حسب الطلب', en: 'Custom Size & Thickness' },
    ],
    quantitySuggestions: [
      { ar: '20 كرتون', en: '20 Cartons' },
      { ar: '50 كرتون', en: '50 Cartons' },
      { ar: '100 كرتون', en: '100 Cartons' },
      { ar: 'كمية مخصصة', en: 'Custom Quantity' },
    ],
  },
  {
    id: 'food-bags',
    name: { ar: 'أكياس طعام (سادة / مطبوعة)', en: 'Food Bags (Plain / Printed)' },
    subtitle: { ar: 'حفظ ونقل آمن للطعام', en: 'Safe Food Storage & Takeaway' },
    category: 'food-tablecloth',
    categoryLabel: { ar: 'السفرة وأكياس الطعام', en: 'Tablecloths & Food Bags' },
    description: {
      ar: 'أكياس قوية وآمنة لحفظ ونقل الطعام، متوفرة سادة أو مطبوعة حسب الطلب بشعار مطعمك أو متجرك.',
      en: 'Strong, food-safe carrier bags for storing and delivering meals, available plain or custom printed with your restaurant branding.',
    },
    image: '/images/alsadara/product_food_bags.jpg',
    specs: [
      {
        ar: 'خامات نقية وآمنة لحفظ ونقل الطعام',
        en: 'Pure food-grade materials for safe transport',
      },
      {
        ar: 'قوة تحمل عالية للطلبات الساخنة والباردة',
        en: 'High load capacity for hot and cold takeaway orders',
      },
      {
        ar: 'متوفرة سادة أو مطبوعة حتى 8 ألوان',
        en: 'Available plain or printed up to 8 colors',
      },
    ],
    supportsPrinting: true,
    defaultTypeOptions: [
      { ar: 'مطبوعة بشعار العميل', en: 'Custom Branded Print' },
      { ar: 'سادة', en: 'Plain' },
    ],
    sizeOptions: [
      { ar: 'صغير (وجبة فردية)', en: 'Small (Single Meal)' },
      { ar: 'وسط (طلب عائلي)', en: 'Medium (Family Order)' },
      { ar: 'كبير (علب وبوكسات)', en: 'Large (Meal Boxes)' },
      { ar: 'مقاس خاص', en: 'Custom Size' },
    ],
    quantitySuggestions: [
      { ar: '200 كجم', en: '200 kg' },
      { ar: '500 كجم', en: '500 kg' },
      { ar: '1 طن', en: '1 Ton' },
      { ar: 'كمية مخصصة', en: 'Custom Quantity' },
    ],
  },
  {
    id: 'shrink-rolls',
    name: { ar: 'رولات الشرنك (تغليف حراري)', en: 'Shrink Film Rolls (Heat Wrap)' },
    subtitle: { ar: 'تغليف آمن وحماية مثالية', en: 'Secure Wrapping & Protection' },
    category: 'shrink',
    categoryLabel: { ar: 'رولات الشرنك', en: 'Shrink Film Rolls' },
    description: {
      ar: 'تغليف حراري احترافي يمنح المنتجات حماية مثالية ومظهراً متماسكاً لعبوات المياه والمشروبات والمعلبات ومختلف خطوط الإنتاج.',
      en: 'Professional heat-shrink wrapping delivering tight protection and crystal clarity for bottled water, beverage cans, jars, and production lines.',
    },
    image: '/images/alsadara/product_shrink_rolls.jpg',
    specs: [
      { ar: 'شفافية عالية ومظهر احترافي', en: 'High optical clarity & professional finish' },
      { ar: 'متانة وقوة شد ممتازة', en: 'Superior tensile strength & durability' },
      {
        ar: 'مقاومة للتمزق ومناسبة لجميع المنتجات',
        en: 'Tear-resistant and suitable for all packaged goods',
      },
    ],
    supportsPrinting: true,
    defaultTypeOptions: [
      { ar: 'شفاف سادة', en: 'Clear Plain' },
      { ar: 'مطبوع حسب الطلب', en: 'Custom Printed' },
    ],
    sizeOptions: [
      {
        ar: 'تغليف عبوات المياه والمشروبات',
        en: 'Water & Beverage Multipacks',
      },
      {
        ar: 'تغليف المعلبات والمنتجات الغذائية',
        en: 'Canned Goods & Food Jars',
      },
      {
        ar: 'سماكة وعرض خاص للمصانع',
        en: 'Custom Width & Micron for Factories',
      },
    ],
    quantitySuggestions: [
      { ar: '500 كجم', en: '500 kg' },
      { ar: '1 طن', en: '1 Ton' },
      { ar: '3 طن فأكثر', en: '3+ Tons' },
      { ar: 'كمية مخصصة', en: 'Custom Quantity' },
    ],
  },
  {
    id: 'garbage-bags',
    name: { ar: 'أكياس النفايات', en: 'Heavy-Duty Garbage Bags' },
    subtitle: { ar: 'مقاسات متعددة وتحمل عالي', en: 'Multiple Sizes & High Durability' },
    category: 'garbage',
    categoryLabel: { ar: 'أكياس النفايات', en: 'Garbage Bags' },
    description: {
      ar: 'أكياس نفايات متوفرة بمقاسات مختلفة تناسب الاستخدام المنزلي والتجاري والمطاعم والمصانع، بقاع محكم الإغلاق ومقاومة عالية للتمزق.',
      en: 'Available in multiple sizes for residential, commercial, restaurant, and industrial applications with leak-proof sealed bottoms.',
    },
    image: '/images/alsadara/product_garbage_bags.jpg',
    specs: [
      { ar: 'قاع محكم الإغلاق يمنع التسرب', en: 'Tightly sealed leak-proof bottom' },
      {
        ar: 'مقاومة للتمزق وقوة تحمل عالية',
        en: 'Tear-resistant with high weight capacity',
      },
      {
        ar: 'خامات عالية الجودة ومتوفرة رولات أو شدات',
        en: 'Premium materials available in rolls or packs',
      },
    ],
    supportsPrinting: false,
    defaultTypeOptions: [
      { ar: 'أسود شديد التحمل (رولات)', en: 'Heavy-Duty Black (Rolls)' },
      { ar: 'أسود شديد التحمل (مفرد/شدات)', en: 'Heavy-Duty Black (Loose Packs)' },
      { ar: 'أخضر / ألوان خاصة', en: 'Green / Custom Colors' },
    ],
    sizeOptions: [
      { ar: '10 جالون', en: '10 Gallon' },
      { ar: '30 جالون', en: '30 Gallon' },
      { ar: '50 جالون', en: '50 Gallon' },
      { ar: '55 – 70 جالون (تجاري/صناعي)', en: '55–70 Gallon (Commercial/Industrial)' },
      { ar: 'مقاسات متعددة', en: 'Assorted Sizes' },
    ],
    quantitySuggestions: [
      { ar: '30 كرتون', en: '30 Cartons' },
      { ar: '50 كرتون', en: '50 Cartons' },
      { ar: '100 كرتون', en: '100 Cartons' },
      { ar: 'كمية مخصصة', en: 'Custom Quantity' },
    ],
  },
  {
    id: 'shopping-bags',
    name: { ar: 'أكياس تسوق (سادة / مطبوعة)', en: 'Shopping Bags (Plain / Printed)' },
    subtitle: { ar: 'للمتاجر والأسواق والمطاعم', en: 'For Retail, Markets & Restaurants' },
    category: 'shopping-freezer',
    categoryLabel: { ar: 'التسوق والمجمدات', en: 'Shopping & Freezer Bags' },
    description: {
      ar: 'أكياس تسوق عملية بمقاسات متعددة وقوة فائقة لتحمل الأوزان الثقيلة، مع طباعة واضحة بألوان ثابتة تعكس هوية متجرك.',
      en: 'Practical shopping bags in multiple sizes engineered for heavy loads, paired with crisp, fade-resistant custom brand printing.',
    },
    image: '/images/alsadara/product_shopping_bags.jpg',
    secondaryImage: '/images/alsadara/product_shopping_printed.jpg',
    specs: [
      {
        ar: 'مواد عالية الجودة من خامات نقية ومعتمدة',
        en: 'Made from pure, certified high-grade resins',
      },
      { ar: 'تحمل عالي للأوزان الثقيلة', en: 'High tensile strength for heavy loads' },
      {
        ar: 'طباعة احترافية بألوان ثابتة وجودة عالية',
        en: 'Professional printing with consistent colors',
      },
    ],
    supportsPrinting: true,
    defaultTypeOptions: [
      { ar: 'مطبوعة بشعار المتجر', en: 'Custom Store Branding' },
      { ar: 'سادة (أبيض / أخضر / أسود)', en: 'Plain (White / Green / Black)' },
    ],
    sizeOptions: [
      { ar: 'صغير', en: 'Small' },
      { ar: 'وسط', en: 'Medium' },
      { ar: 'كبير', en: 'Large' },
      { ar: 'جامبو', en: 'Jumbo' },
      { ar: 'تشكيلة مقاسات', en: 'Mixed Sizes' },
    ],
    quantitySuggestions: [
      { ar: '200 كجم', en: '200 kg' },
      { ar: '500 كجم', en: '500 kg' },
      { ar: '1 طن', en: '1 Ton' },
      { ar: 'كمية مخصصة', en: 'Custom Quantity' },
    ],
  },
  {
    id: 'freezer-bags',
    name: { ar: 'أكياس مجمدات', en: 'Freezer & Cold-Storage Bags' },
    subtitle: { ar: 'حفظ وتبريد شديد التحمل', en: 'Heavy-Duty Cold Preservation' },
    category: 'shopping-freezer',
    categoryLabel: { ar: 'التسوق والمجمدات', en: 'Shopping & Freezer Bags' },
    description: {
      ar: 'أكياس مجمدات مصنوعة من خامات نقية ومعتمدة تتحمل درجات التبريد والتجميد دون تشقق أو تمزق، متوفرة بمقاسات مختلفة.',
      en: 'Crafted from pure certified food-grade materials engineered to withstand freezing temperatures without cracking or tearing.',
    },
    image: '/images/alsadara/product_freezer_bags.jpg',
    specs: [
      {
        ar: 'خامات نقية ومعتمدة للاستخدام الغذائي',
        en: 'Pure, certified food-contact grade materials',
      },
      {
        ar: 'تحمل عالي لدرجات التجميد المنخفضة',
        en: 'Built to endure sub-zero storage temperatures',
      },
      { ar: 'مقاسات متعددة وإغلاق محكم', en: 'Multiple sizes with secure sealing' },
    ],
    supportsPrinting: true,
    defaultTypeOptions: [
      { ar: 'مطبوعة حسب الطلب', en: 'Custom Printed' },
      { ar: 'سادة / ألوان قياسية', en: 'Plain / Standard Colors' },
    ],
    sizeOptions: [
      { ar: '1 كجم', en: '1 kg' },
      { ar: '2 كجم', en: '2 kg' },
      { ar: '5 كجم', en: '5 kg' },
      { ar: 'مقاس خاص للمصانع والمطاعم', en: 'Custom Industrial / Restaurant Size' },
    ],
    quantitySuggestions: [
      { ar: '200 كجم', en: '200 kg' },
      { ar: '500 كجم', en: '500 kg' },
      { ar: '1 طن', en: '1 Ton' },
      { ar: 'كمية مخصصة', en: 'Custom Quantity' },
    ],
  },
  {
    id: 'plastic-cutlery',
    name: { ar: 'أدوات بلاستيكية', en: 'Disposable Plastic Cutlery' },
    subtitle: { ar: 'ملاعق وشوك وسكاكين', en: 'Spoons, Forks & Knives' },
    category: 'printing-custom',
    categoryLabel: { ar: 'الطباعة والمنتجات الخاصة', en: 'Printing & Custom' },
    description: {
      ar: 'أدوات مائدة بلاستيكية عالية الجودة (ملاعق، شوك، سكاكين) مناسبة للاستخدام اليومي في المطاعم والكافيهات وشركات الإعاشة.',
      en: 'Durable food-grade plastic cutlery (spoons, forks, knives) designed for daily service in restaurants, cafes, and catering operations.',
    },
    image: '/images/alsadara/product_cutlery_hq.jpg',
    specs: [
      { ar: 'خامات غذائية عالية الجودة', en: 'High-quality food-grade material' },
      {
        ar: 'تصميم متين ومريح للاستخدام اليومي',
        en: 'Sturdy ergonomic finish for daily dining',
      },
      {
        ar: 'مناسبة للمطاعم وشركات التموين والإعاشة',
        en: 'Ideal for restaurants and catering services',
      },
    ],
    supportsPrinting: false,
    defaultTypeOptions: [
      { ar: 'ملاعق', en: 'Spoons' },
      { ar: 'شوك', en: 'Forks' },
      { ar: 'سكاكين', en: 'Knives' },
      {
        ar: 'طقم كامل (ملعقة + شوكة + سكين)',
        en: 'Full Set (Spoon + Fork + Knife)',
      },
    ],
    sizeOptions: [
      { ar: 'قياس مطاعم قياسي', en: 'Standard Restaurant Size' },
      { ar: 'تغليف فردي صحي', en: 'Individually Wrapped (Hygienic)' },
      { ar: 'تغليف جملة', en: 'Bulk Packaging' },
    ],
    quantitySuggestions: [
      { ar: '20 كرتون', en: '20 Cartons' },
      { ar: '50 كرتون', en: '50 Cartons' },
      { ar: '100 كرتون', en: '100 Cartons' },
      { ar: 'كمية مخصصة', en: 'Custom Quantity' },
    ],
  },
  {
    id: 'special-containers',
    name: {
      ar: 'منتجات خاصة وعلب تغليف مطبوعة',
      en: 'Custom Products & Printed Food Containers',
    },
    subtitle: { ar: 'حلول تغليف متكاملة حسب الطلب', en: 'Bespoke Packaging Solutions' },
    category: 'printing-custom',
    categoryLabel: { ar: 'الطباعة والمنتجات الخاصة', en: 'Printing & Custom' },
    description: {
      ar: 'منتجات تغليف خاصة وعلب وحافظات طعام مطبوعة بغطاء محكم لتلبية احتياجات المطاعم والكافيهات والعلامات التجارية.',
      en: 'Custom-branded packaging tubs and sealed food containers tailored for restaurants, cafes, delivery kitchens, and commercial brands.',
    },
    image: '/images/alsadara/product_special_containers.jpg',
    specs: [
      {
        ar: 'تنفيذ خاص حسب هوية ومتطلبات العميل',
        en: 'Custom execution matched to your brand identity',
      },
      {
        ar: 'أغطية محكمة الإغلاق مناسبة للتوصيل',
        en: 'Tight-fitting lids engineered for food delivery',
      },
      {
        ar: 'طباعة واضحة بألوان زاهية وثابتة',
        en: 'Vibrant, crisp, color-fast printing',
      },
    ],
    supportsPrinting: true,
    defaultTypeOptions: [
      { ar: 'مطبوعة بالهوية التجارية', en: 'Custom Branded Print' },
      { ar: 'سادة', en: 'Plain' },
    ],
    sizeOptions: [
      { ar: 'علب صوصات صغيرة', en: 'Small Sauce Cups' },
      { ar: 'علب وجبات وسط', en: 'Medium Meal Tubs' },
      { ar: 'علب كبيرة', en: 'Large Containers' },
      { ar: 'تشكيلة مقاسات', en: 'Assorted Sizes' },
    ],
    quantitySuggestions: [
      { ar: '20 كرتون', en: '20 Cartons' },
      { ar: '50 كرتون', en: '50 Cartons' },
      { ar: '100 كرتون', en: '100 Cartons' },
      { ar: 'كمية مخصصة', en: 'Custom Quantity' },
    ],
  },
  {
    id: 'custom-printing-service',
    name: {
      ar: 'خدمات قسم الطباعة (حتى 8 ألوان)',
      en: 'Custom Printing Services (Up to 8 Colors)',
    },
    subtitle: {
      ar: 'تصميم وتنفيذ الأكياس والرولات والأكواب',
      en: 'Design & Production for Bags, Rolls & Cups',
    },
    category: 'printing-custom',
    categoryLabel: { ar: 'الطباعة والمنتجات الخاصة', en: 'Printing & Custom' },
    description: {
      ar: 'طباعة متقدمة بأحدث التقنيات وبجودة عالية تصل إلى 8 ألوان على الأكياس البلاستيكية، الرولات، والأغلفة مع خدمة تصميم الشعار والهوية البصرية.',
      en: 'Advanced high-definition printing up to 8 colors across plastic bags, rolls, and wraps, complete with logo and visual identity setup.',
    },
    image: '/images/alsadara/printing_showcase.jpg',
    specs: [
      {
        ar: 'طباعة متقدمة تصل إلى 8 ألوان بدقة عالية',
        en: 'High-precision printing up to 8 colors',
      },
      {
        ar: 'تصميم الشعار والهوية البصرية وتنفيذ حسب الطلب',
        en: 'Logo & visual identity design with custom execution',
      },
      {
        ar: 'ألوان ثابتة وزاهية مع التزام بالمواعيد',
        en: 'Vivid color consistency with strict deadline commitment',
      },
    ],
    supportsPrinting: true,
    defaultTypeOptions: [
      { ar: 'طباعة أكياس بلاستيكية', en: 'Plastic Bag Printing' },
      { ar: 'طباعة رولات تغليف', en: 'Packaging Roll Printing' },
      { ar: 'طباعة أكواب ومستلزمات', en: 'Cups & Packaging Supplies' },
      { ar: 'تصميم هوية + طباعة', en: 'Brand Design + Printing' },
    ],
    sizeOptions: [{ ar: 'حسب المواصفات المطلوبة', en: 'Per Required Specifications' }],
    quantitySuggestions: [
      { ar: 'طلب تجريبي / استشارة', en: 'Sample / Consultation' },
      { ar: '500 كجم', en: '500 kg' },
      { ar: '1 طن فأكثر', en: '1+ Ton' },
      { ar: 'كمية مخصصة', en: 'Custom Quantity' },
    ],
  },
];

export const PRINTING_CAPABILITIES: Array<{
  index: string;
  title: LocalizedText;
  detail: LocalizedText;
}> = [
  {
    index: '01',
    title: {
      ar: 'تصميم الشعار والهوية البصرية',
      en: 'Logo & Visual Identity Preparation',
    },
    detail: {
      ar: 'نجهز التصميم ونضبط الألوان والمقاسات قبل التشغيل لضمان ظهور علامتك بأفضل صورة.',
      en: 'We prepare artwork, calibrate colors, and verify dimensions before production so your brand stands out cleanly.',
    },
  },
  {
    index: '02',
    title: { ar: 'تنفيذ حسب الطلب', en: 'Tailored Production Runs' },
    detail: {
      ar: 'مرونة كاملة في المقاسات، السماكات، ونوع الخامة لتناسب طبيعة نشاطك التجاري أو الصناعي.',
      en: 'Full flexibility across sizes, micron thickness, and film grades to match your retail, restaurant, or factory needs.',
    },
  },
  {
    index: '03',
    title: {
      ar: 'ألوان ثابتة وواضحة حتى 8 ألوان',
      en: 'Crisp, Color-Fast Output up to 8 Colors',
    },
    detail: {
      ar: 'خطوط طباعة متقدمة بأحدث التقنيات تمنحك ألواناً زاهية ودقة عالية في التفاصيل.',
      en: 'Modern multi-color flexographic presses deliver rich saturation and razor-sharp registration on every run.',
    },
  },
  {
    index: '04',
    title: { ar: 'سرعة في التنفيذ والتسليم', en: 'Fast Turnaround & On-Time Delivery' },
    detail: {
      ar: 'الالتزام بالمواعيد وكفاءة إنتاجية عالية لتوريد طلباتك في الوقت المحدد.',
      en: 'High production capacity and reliable scheduling ensure your orders arrive right when your operations need them.',
    },
  },
];

export const PRINTING_GUARANTEES: LocalizedText[] = [
  { ar: 'جودة مضمونة', en: 'Guaranteed Quality' },
  { ar: 'الالتزام بالمواعيد', en: 'On-Time Delivery' },
  { ar: 'خامات ممتازة', en: 'Premium Materials' },
  { ar: 'ألوان زاهية', en: 'Vivid Colors' },
  { ar: 'دقة عالية', en: 'High Precision' },
];

export const ABOUT_DATA = {
  intro: {
    ar: 'تأسست شركة الصدارة للصناعة سنة 2012، وهي شركة رائدة في مجال صناعة مواد التعبئة والتغليف وتصنيع مستلزمات المصانع باختلاف أنواعها وطباعة الأكياس البلاستيكية بأنواعها، والسفرة، ورولات الشرنك بجودة عالية وكفاءة إنتاجية تلبي احتياجات عملائنا في السوق المحلي والدولي.',
    en: 'Founded in 2012, Al-Sadara for Industry is a leading Saudi manufacturer of packaging materials, industrial supplies, custom-printed plastic bags, disposable tablecloths, and heat-shrink rolls — delivering high quality and production efficiency for local and international markets.',
  },
  vision: {
    ar: 'أن نكون الخيار الأول في صناعة المنتجات البلاستيكية في المملكة والمنطقة.',
    en: 'To be the first choice in plastic product manufacturing across the Kingdom and the region.',
  },
  mission: {
    ar: 'تقديم منتجات عالية الجودة تلائم معايير الجودة العالمية بأفضل الأسعار والخدمات.',
    en: 'Delivering high-quality products aligned with international standards at the best prices and service levels.',
  },
  values: [
    { ar: 'الجودة والالتزام', en: 'Quality & Commitment' },
    { ar: 'الابتكار والإبداع', en: 'Innovation & Creativity' },
    { ar: 'النزاهة والمصداقية', en: 'Integrity & Credibility' },
    { ar: 'رضا العملاء', en: 'Customer Satisfaction' },
  ] as LocalizedText[],
};

export const WHY_ALSADARA: Array<{
  title: LocalizedText;
  description: LocalizedText;
}> = [
  {
    title: { ar: 'جودة عالية', en: 'High Quality' },
    description: {
      ar: 'ضبط مستمر لمراحل الإنتاج لضمان ثبات المواصفات والسماكة.',
      en: 'Continuous quality control across every production stage for uniform thickness and strength.',
    },
  },
  {
    title: { ar: 'خامات معتمدة', en: 'Certified Materials' },
    description: {
      ar: 'مصنوعة من خامات نقية ومعتمدة تلائم الاستخدامات الغذائية والتجارية.',
      en: 'Manufactured from pure, certified raw resins suited for food-contact and commercial packaging.',
    },
  },
  {
    title: { ar: 'أسعار منافسة', en: 'Competitive Pricing' },
    description: {
      ar: 'تسعير مباشر ومناسب يوازن بين جودة التصنيع والتكلفة الاقتصادية.',
      en: 'Direct factory pricing balancing dependable quality with practical commercial value.',
    },
  },
  {
    title: { ar: 'تغطية جميع مدن المملكة', en: 'Kingdom-Wide Delivery' },
    description: {
      ar: 'شحن وتوريد من مقرنا في جدة إلى كافة مناطق ومدن المملكة.',
      en: 'Reliable shipping from our Jeddah facility to every region and city across Saudi Arabia.',
    },
  },
  {
    title: { ar: 'طباعة احترافية', en: 'Professional Printing' },
    description: {
      ar: 'تقنيات طباعة متقدمة تصل إلى 8 ألوان بوضوح وثبات عالٍ.',
      en: 'Advanced printing up to 8 colors with crisp detail and lasting color fidelity.',
    },
  },
  {
    title: { ar: 'خبرة طويلة', en: 'Proven Experience' },
    description: {
      ar: 'مسيرة صناعية ممتدة منذ عام 2012 في قطاع التعبئة والتغليف.',
      en: 'Over a decade of industrial packaging expertise since our founding in 2012.',
    },
  },
  {
    title: { ar: 'سرعة في التنفيذ', en: 'Fast Execution' },
    description: {
      ar: 'طاقة إنتاجية عالية تضمن إنجاز الطلبات والالتزام بمواعيد التسليم.',
      en: 'High-output lines built to complete orders quickly and meet tight delivery schedules.',
    },
  },
  {
    title: { ar: 'خدمة عملاء مميزة', en: 'Dedicated Support' },
    description: {
      ar: 'متابعة مباشرة من لحظة اختيار المنتج وحتى استلام الطلب.',
      en: 'Direct personal follow-up from initial product selection through final delivery.',
    },
  },
];

export const CORE_PILLARS: LocalizedText[] = [
  { ar: 'جودة عالية', en: 'High Quality' },
  { ar: 'خامات ممتازة', en: 'Premium Materials' },
  { ar: 'طباعة احترافية', en: 'Pro Printing' },
  { ar: 'أسعار منافسة', en: 'Competitive Prices' },
  { ar: 'سرعة في التنفيذ', en: 'Fast Turnaround' },
];
