import { useEffect, useState } from 'react';
import { TypographyH3 } from '@/components/ui/typography';
import { motion } from 'framer-motion';
import { TelegramUser } from '@/global';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export const Greeting = () => {
    const [user, setUser] = useState<TelegramUser | null>(null);
    const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');
    const [textColor, setTextColor] = useState<string>('#000000');

    const navigate = useNavigate();
  
    useEffect(() => {
      if (window.Telegram?.WebApp) {
        const { WebApp } = window.Telegram;
  
        WebApp.ready();
  
        const userData = WebApp.initDataUnsafe.user;
        setUser(userData || null);
  
        const bgColor = WebApp.themeParams.backgroundColor || '#FFFFFF';
        const txtColor = WebApp.themeParams.textColor || '#000000';
  
        setBackgroundColor(bgColor);
        setTextColor(txtColor);
  
        // Apply CSS variables
        document.documentElement.style.setProperty('--tg-background-color', bgColor);
        document.documentElement.style.setProperty('--tg-text-color', txtColor);
  
        const onThemeChanged = () => {
          const newBgColor = WebApp.themeParams.backgroundColor || '#FFFFFF';
          const newTxtColor = WebApp.themeParams.textColor || '#000000';
  
          setBackgroundColor(newBgColor);
          setTextColor(newTxtColor);
  
          document.documentElement.style.setProperty('--tg-background-color', newBgColor);
          document.documentElement.style.setProperty('--tg-text-color', newTxtColor);
        };
  
        WebApp.onEvent('themeChanged', onThemeChanged);
  
        return () => {
          WebApp.offEvent('themeChanged', onThemeChanged);
        };
      } else {
        console.warn('Not running inside Telegram.');
        setUser({
          id: 0,
          first_name: 'Developer',
          last_name: 'User',
        });
        setBackgroundColor('#FFFFFF');
        setTextColor('#000000');
      }
    }, []);


  
    return (
      <main
        className="w-full flex flex-col items-start h-screen border justify-center gap-8 p-2"
        style={{ backgroundColor: backgroundColor, color: textColor }}
      >
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

        <motion.div
        className='w-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 5,
          }}
        >
          <Button size="lg" onClick={() => navigate('/courses')} className='w-full'>Let's start!</Button>
        </motion.div>

      </main>
    );
  
};
