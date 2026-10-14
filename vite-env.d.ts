/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly VITE_API_BASE_URL: string
    readonly VITE_GEMINI_API_KEY: string
    // Add other env vars as needed
  }
}