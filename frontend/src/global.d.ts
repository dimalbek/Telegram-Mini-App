export {};

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

interface Telegram {
  WebApp: TelegramWebApp;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    // Add other properties if needed
  };
  // Add other properties and methods as needed
  ready: () => void;
  // ...
}

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  // Add other user properties if needed
}
