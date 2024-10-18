import { useEffect, useState } from 'react';
import { TypographyH3 } from '@/components/ui/typography';
import { motion } from 'framer-motion';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: TelegramUser;
        };
        ready: () => void;
      };
    };
  }
}

export const Greeting = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();

      // Log initDataUnsafe
      console.log('initDataUnsafe:', window.Telegram.WebApp.initDataUnsafe);

      const userData = window.Telegram.WebApp.initDataUnsafe.user;
      console.log('userData:', userData);

      setUser(userData || null);
    } else {
      console.warn('Not running inside Telegram.');
      setUser({
        id: 0,
        first_name: 'Developer',
        last_name: 'User',
      });
    }
  }, []);

  return (
    <main className="w-full flex flex-col items-center h-screen justify-center gap-4 p-2">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 5,
        }}
      >
        {user ? (
          <TypographyH3>
            Welcome, {user.first_name} {user.last_name || ''}!
          </TypographyH3>
        ) : (
          <TypographyH3>Loading user data...</TypographyH3>
        )}
      </motion.span>
    </main>
  );
};
