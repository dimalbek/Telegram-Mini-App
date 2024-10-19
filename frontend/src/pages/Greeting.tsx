
import { TypographyH3 } from '@/components/ui/typography';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useGlobalContext } from '@/context/GlobalContext';

export const Greeting = () => {

    const navigate = useNavigate();

    const { user } = useGlobalContext();

  
    return (
      <main
        className="w-full flex flex-col items-start h-screen border justify-center gap-8 p-2"
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
            duration: 2,
          }}
        >
          <Button size="lg" onClick={() => navigate('/courses')} className='w-full'>Let's start!</Button>
        </motion.div>

      </main>
    );
  
};
