/// <reference types="vite/client" />
//env.d.ts

interface ImportMetaEnv {
  readonly NODE_ENV: string;
  readonly VITE_API_URL: string;
  readonly VITE_OUTDIR: string;
  // 更多环境变量...
}
