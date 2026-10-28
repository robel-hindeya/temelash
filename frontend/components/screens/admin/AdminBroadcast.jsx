'use client';
import React from 'react';
import AdminPage, { NotAvailableYet } from './AdminPage';

// No backend for this yet: say so plainly instead of showing sample data.
export default function AdminBroadcast() {
  return (
    <AdminPage active="broadcast" title="Announcements" subtitle="Messages from Temelash to every business.">
      <NotAvailableYet
        what="Announcements to businesses"
        plan="Sending announcements to business owners is not built yet. Businesses already send their own offers to customers from Offers (Telegram, opted-in customers only)."
      />
    </AdminPage>
  );
}
