/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    PUBLIC_URL: string
    REACT_APP_FIREBASE_API_KEY: string
    REACT_APP_FIREBASE_AUTH_DOMAIN: string
    REACT_APP_FIREBASE_PROJECT_ID: string
    }
}
