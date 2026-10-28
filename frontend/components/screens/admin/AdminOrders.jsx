'use client';
import React from 'react';
import AdminPage, { NotAvailableYet } from './AdminPage';

// No backend for this yet: say so plainly instead of showing sample data.
export default function AdminOrders() {
  return (
    <AdminPage active="orders" title="Shop orders" subtitle="QR stands, stickers and signs ordered by businesses.">
      <NotAvailableYet
        what="Printed QR materials"
        plan="Businesses cannot order printed stands or stickers through Temelash yet. Until then they can print the QR code from their dashboard (Card design or Shop). Orders will appear here once ordering is built."
      />
    </AdminPage>
  );
}
