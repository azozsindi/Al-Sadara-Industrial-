import type { Language } from '../data/i18n';

export interface OrderItem {
  uid: string;
  productId: string;
  productName: string;
  productImage: string;
  typeOption: string;
  printColors?: string;
  sizeOption: string;
  quantity: string;
  notes: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  city: string;
  businessName: string;
  notes: string;
}

export function generateOrderReference(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `SD-${num}`;
}

export function formatOrderMessage(
  items: OrderItem[],
  customer: CustomerDetails,
  referenceCode: string,
  lang: Language
): string {
  if (lang === 'en') {
    const lines: string[] = [
      `Hello,`,
      `New inquiry from Al-Sadara for Industry Catalog`,
      `Reference: #${referenceCode}`,
      ``,
      `Customer Details:`,
      `- Name: ${customer.name.trim()}`,
      `- Mobile: ${customer.phone.trim()}`,
    ];

    if (customer.businessName.trim()) {
      lines.push(`- Business: ${customer.businessName.trim()}`);
    }
    if (customer.city.trim()) {
      lines.push(`- City: ${customer.city.trim()}`);
    }

    lines.push(``, `Requested Items (${items.length}):`);

    items.forEach((item, idx) => {
      lines.push(`${idx + 1}. ${item.productName}`);
      lines.push(`   • Type: ${item.typeOption}`);
      if (item.printColors) {
        lines.push(`   • Printing Colors: ${item.printColors}`);
      }
      lines.push(`   • Size: ${item.sizeOption}`);
      lines.push(`   • Est. Quantity: ${item.quantity}`);
      if (item.notes.trim()) {
        lines.push(`   • Note: ${item.notes.trim()}`);
      }
    });

    if (customer.notes.trim()) {
      lines.push(``, `Additional Notes:`, customer.notes.trim());
    }

    lines.push(``, `Looking forward to confirming pricing and availability.`);
    return lines.join('\n');
  }

  const lines: string[] = [
    `السلام عليكم ورحمة الله وبركاته`,
    `طلب جديد من كتالوج شركة الصدارة للصناعة`,
    `رقم المرجع: #${referenceCode}`,
    ``,
    `بيانات العميل:`,
    `- الاسم: ${customer.name.trim()}`,
    `- رقم الجوال: ${customer.phone.trim()}`,
  ];

  if (customer.businessName.trim()) {
    lines.push(`- النشاط / الجهة: ${customer.businessName.trim()}`);
  }
  if (customer.city.trim()) {
    lines.push(`- المدينة: ${customer.city.trim()}`);
  }

  lines.push(``, `المنتجات المطلوبة (${items.length}):`);

  items.forEach((item, idx) => {
    lines.push(`${idx + 1}. ${item.productName}`);
    lines.push(`   • النوع: ${item.typeOption}`);
    if (item.printColors) {
      lines.push(`   • ألوان الطباعة: ${item.printColors}`);
    }
    lines.push(`   • المقاس: ${item.sizeOption}`);
    lines.push(`   • الكمية التقريبية: ${item.quantity}`);
    if (item.notes.trim()) {
      lines.push(`   • ملاحظة: ${item.notes.trim()}`);
    }
  });

  if (customer.notes.trim()) {
    lines.push(``, `ملاحظات عامة:`, customer.notes.trim());
  }

  lines.push(``, `بانتظار تواصلكم لتأكيد التفاصيل والسعر.`);
  return lines.join('\n');
}
