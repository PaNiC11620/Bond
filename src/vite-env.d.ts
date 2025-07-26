/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_ADMIN_USERNAME: string
  readonly VITE_ADMIN_PASSWORD: string
  readonly VITE_AUTH_COOKIE_NAME: string
  readonly VITE_AUTH_COOKIE_EXPIRES: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}