declare global {
  export interface Window {
    Go: any;
    helloWorld: (name: string) => string;
    myGolangFunction: (num1: number, num2: number) => number
  }
}

export {};
