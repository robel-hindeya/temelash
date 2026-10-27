import TelegramEntry from '@/components/screens/customer/TelegramEntry';

export const metadata = { title: 'Your loyalty card — Telegram' };

// The Telegram Mini App URL registered with @BotFather points here.
export default function Page() {
  return <TelegramEntry />;
}
