import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';

export default defineConfig({
  server: {
    port: process.env.PORT as unknown as number,
  },
  plugins: [vercel()],
});

// export default defineConfig(() => {
//   return {
//     define: {
//       __APP_ENV__: process.env.VITE_BACKEND_URL,
//     },
//   };
// });