import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Serves the Vercel-style functions in /api during `vite dev` (production uses Vercel itself).
function localApi(): Plugin {
  return {
    name: 'local-api',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))

      server.middlewares.use('/api', async (req, res, next) => {
        const name = (req.url ?? '').split('?')[0].replace(/^\/|\/$/g, '')
        if (!/^[\w-]+$/.test(name) || name === 'profile') return next()

        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)
        const raw = Buffer.concat(chunks).toString()
        let body: unknown = raw
        try { body = raw ? JSON.parse(raw) : {} } catch { /* keep raw string */ }

        const response = {
          status(code: number) { res.statusCode = code; return response },
          setHeader(key: string, value: string) { res.setHeader(key, value) },
          json(payload: unknown) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
          },
        }

        try {
          const mod = await server.ssrLoadModule(`/api/${name}.ts`)
          await mod.default({ method: req.method, body }, response)
        } catch (error) {
          server.config.logger.error(String(error))
          response.status(500).json({ error: 'Local API error.' })
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localApi(),
  ],
  build: {
    outDir: 'dist'
  }
})
