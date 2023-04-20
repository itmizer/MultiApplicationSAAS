import { Invoice, Plan } from '@prisma/client';

export interface InvoiceActiveResult {
  hasActiveInvoice: boolean;
  activeInvoice?: Invoice;
}
export interface PlanInvoice extends Invoice {
  plans: Plan;
}
