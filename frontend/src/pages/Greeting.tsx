import { TypographyH3 } from "@/components/ui/typography"
// @ts-ignore
const TG = window.Telegram.WebApp;
import { motion } from "framer-motion"
import { useEffect, useState } from "react";


export const Greeting = () => {

    const [user, setUser] = useState<any>();

    useEffect(() => {
        if (window.Telegram?.WebApp) {
        // Retrieve user data
        const userData = window.Telegram.WebApp.initDataUnsafe.user;
        console.log(userData);
        setUser(userData);
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
          <TypographyH3>Welcome, {user.first_name}!</TypographyH3>
        </motion.span>
        </main>
    )
}
