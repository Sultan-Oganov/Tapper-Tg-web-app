export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        openTelegramLink;
        (url: string): void;
        // добавь другие нужные типы
      };
    };
  }
}
