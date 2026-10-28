'use client';
import React from 'react';
import AdminPage, { NotAvailableYet } from './AdminPage';

// No backend for this yet: say so plainly instead of showing sample data.
export default function AdminSettings() {
  return (
    <AdminPage active="settings" title="Platform settings" subtitle="Plans, limits and platform-wide options.">
      <NotAvailableYet
        what="Platform settings"
        plan="Platform options are set by the operator in the server configuration for now (for example the Telegram bot, wallet passes and rate limits). This page will let administrators change them once they are stored in the database."
      />
    </AdminPage>
  );
}
