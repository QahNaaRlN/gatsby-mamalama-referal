declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: any[]) => void;
    fbq?: (event: string, value: string) => void;
    gtag?: (command: string, target: string, fieldName: string, callback: (value: string) => void) => void;
  }
}

export {};