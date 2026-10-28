'use client';
import dynamic from 'next/dynamic';

// Screens run in the browser only: they read localStorage and window size.
const SCREENS = {
  Main: dynamic(() => import('@/components/screens/marketing/Main'), { ssr: false, loading: () => <Loading /> }),
  Setup: dynamic(() => import('@/components/screens/merchant/Setup'), { ssr: false, loading: () => <Loading /> }),
  Overview: dynamic(() => import('@/components/screens/merchant/Overview'), { ssr: false, loading: () => <Loading /> }),
  CardDesign: dynamic(() => import('@/components/screens/merchant/CardDesign'), { ssr: false, loading: () => <Loading /> }),
  Rewards: dynamic(() => import('@/components/screens/merchant/Rewards'), { ssr: false, loading: () => <Loading /> }),
  Customers: dynamic(() => import('@/components/screens/merchant/Customers'), { ssr: false, loading: () => <Loading /> }),
  Offers: dynamic(() => import('@/components/screens/merchant/Offers'), { ssr: false, loading: () => <Loading /> }),
  Analytics: dynamic(() => import('@/components/screens/merchant/Analytics'), { ssr: false, loading: () => <Loading /> }),
  QRStand: dynamic(() => import('@/components/screens/merchant/QRStand'), { ssr: false, loading: () => <Loading /> }),
  Settings: dynamic(() => import('@/components/screens/merchant/Settings'), { ssr: false, loading: () => <Loading /> }),
  Landing: dynamic(() => import('@/components/screens/merchant/Landing'), { ssr: false, loading: () => <Loading /> }),
  StaffApp: dynamic(() => import('@/components/screens/staff/StaffApp'), { ssr: false, loading: () => <Loading /> }),
  WebCard: dynamic(() => import('@/components/screens/customer/WebCard'), { ssr: false, loading: () => <Loading /> }),
  AdminOverview: dynamic(() => import('@/components/screens/admin/AdminOverview'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  AdminBusinesses: dynamic(() => import('@/components/screens/admin/AdminBusinesses'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  AdminApplications: dynamic(() => import('@/components/screens/admin/AdminApplications'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  AdminBilling: dynamic(() => import('@/components/screens/admin/AdminBilling'), { ssr: false, loading: () => <Loading /> }),
  AdminOrders: dynamic(() => import('@/components/screens/admin/AdminOrders'), { ssr: false, loading: () => <Loading /> }),
  AdminSupport: dynamic(() => import('@/components/screens/admin/AdminSupport'), { ssr: false, loading: () => <Loading /> }),
  AdminAnalytics: dynamic(() => import('@/components/screens/admin/AdminAnalytics'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  AdminBroadcast: dynamic(() => import('@/components/screens/admin/AdminBroadcast'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  AdminSettings: dynamic(() => import('@/components/screens/admin/AdminSettings'), {
    ssr: false,
    loading: () => <Loading />,
  }),
};

const PHONE = new Set(['StaffApp', 'WebCard']);

function Loading() {
  return <div style={{ minHeight: '100vh', background: '#f7f7f9' }} />;
}

export default function Screen({ name, ...props }) {
  const C = SCREENS[name];
  if (!C) return null;
  if (PHONE.has(name)) {
    return (
      <div className="tm-phone-stage">
        <div className="tm-phone">
          <C {...props} />
        </div>
      </div>
    );
  }
  return <C {...props} />;
}
