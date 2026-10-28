'use client';
import React from 'react';
import AdminPage, { NotAvailableYet } from './AdminPage';

// No backend for this yet: say so plainly instead of showing sample data.
export default function AdminBilling() {
  return (
    <AdminPage active="billing" title="Billing" subtitle="Plans, invoices and payments.">
      <NotAvailableYet
        what="Subscriptions and payments"
        plan="Merchants are not charged through Temelash yet. This page will list each business’s plan, invoices and Telebirr or CBE Birr payments once a payment provider is connected."
      />
    </AdminPage>
  );
}
