
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
      NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
      STRIPE_PRIVATE_KEY: string;
    }
  }
}

export {}
