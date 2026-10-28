'use client';
import React from 'react';
import AdminPage, { NotAvailableYet } from './AdminPage';

// No backend for this yet: say so plainly instead of showing sample data.
export default function AdminSupport() {
  return (
    <AdminPage active="support" title="Support" subtitle="Questions from businesses and customers.">
      <NotAvailableYet
        what="Support inbox"
        plan="There is no in-app support channel yet. Messages sent to the Telegram bot that are not commands are not stored. This inbox will show conversations once support messaging is built."
      />
    </AdminPage>
  );
}
