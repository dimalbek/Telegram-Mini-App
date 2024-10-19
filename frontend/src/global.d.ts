export {};

declare global {
  interface Window {
    Telegram: Telegram;
  }
}
export interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    tokens_balance: number;
    photo_url: string;
  }
  
  export interface ThemeParams {
    backgroundColor?: string;
    textColor?: string;
    hintColor?: string;
    linkColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    secondaryBackgroundColor?: string;
  }
  
  export interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
      user?: TelegramUser;
    };
    themeParams: ThemeParams;
    onEvent: (eventType: string, callback: () => void) => void;
    offEvent: (eventType: string, callback: () => void) => void;
    ready: () => void;
    // Other methods and properties as needed
  }
  