
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// API publicada no Render
const API_PUBLICADA = 'https://gs-2-entrega-java.onrender.com'

// Configuração do Vite
export default defineConfig(({ mode }) => {

  // Carrega as variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), '')

  // Define qual API será utilizada
  const alvo = env.VITE_API_PROXY || API_PUBLICADA

  return {
    plugins: [react(), tailwindcss()],

    server: {
      proxy: {
        '/api': {
          target: alvo,
          changeOrigin: true,
          secure: true,
          cookieDomainRewrite: '',
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
