'use client';
import dynamic from 'next/dynamic';

// Screens run in the browser only: they read localStorage and window size.
const SCREENS = {
  Main: dynamic(() => import('@/components/screens/Main'), { ssr: false, loading: () => <Loading /> }),
  Setup: dynamic(() => import('@/components/screens/Setup'), { ssr: false, loading: () => <Loading /> }),
  Overview: dynamic(() => import('@/components/screens/Overview'), { ssr: false, loading: () => <Loading /> }),
  CardDesign: dynamic(() => import('@/components/screens/CardDesign'), { ssr: false, loading: () => <Loading /> }),
  Rewards: dynamic(() => import('@/components/screens/Rewards'), { ssr: false, loading: () => <Loading /> }),
  Customers: dynamic(() => import('@/components/screens/Customers'), { ssr: false, loading: () => <Loading /> }),
  Offers: dynamic(() => import('@/components/screens/Offers'), { ssr: false, loading: () => <Loading /> }),
  Analytics: dynamic(() => import('@/components/screens/Analytics'), { ssr: false, loading: () => <Loading /> }),
  QRStand: dynamic(() => import('@/components/screens/QRStand'), { ssr: false, loading: () => <Loading /> }),
  Settings: dynamic(() => import('@/components/screens/Settings'), { ssr: false, loading: () => <Loading /> }),
  Landing: dynamic(() => import('@/components/screens/Landing'), { ssr: false, loading: () => <Loading /> }),
  StaffApp: dynamic(() => import('@/components/screens/StaffApp'), { ssr: false, loading: () => <Loading /> }),
  WebCard: dynamic(() => import('@/components/screens/WebCard'), { ssr: false, loading: () => <Loading /> }),
  CustomerFlow: dynamic(() => import('@/components/screens/CustomerFlow'), { ssr: false, loading: () => <Loading /> }),
  AdminOverview: dynamic(() => import('@/components/screens/AdminOverview'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  AdminBusinesses: dynamic(() => import('@/components/screens/AdminBusinesses'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  AdminApplications: dynamic(() => import('@/components/screens/AdminApplications'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  AdminBilling: dynamic(() => import('@/components/screens/AdminBilling'), { ssr: false, loading: () => <Loading /> }),
  AdminOrders: dynamic(() => import('@/components/screens/AdminOrders'), { ssr: false, loading: () => <Loading /> }),
  AdminSupport: dynamic(() => import('@/components/screens/AdminSupport'), { ssr: false, loading: () => <Loading /> }),
  AdminAnalytics: dynamic(() => import('@/components/screens/AdminAnalytics'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  AdminBroadcast: dynamic(() => import('@/components/screens/AdminBroadcast'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  AdminSettings: dynamic(() => import('@/components/screens/AdminSettings'), {
    ssr: false,
    loading: () => <Loading />,
  }),
};

const PHONE = new Set(['StaffApp', 'WebCard', 'CustomerFlow']);

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
