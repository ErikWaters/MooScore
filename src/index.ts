import {debug} from 'console'

import createServer from './server/server'

const server = createServer().listen(8000, async () => {
  console.log(`Server is running on port 8000`)
})

const close = (signal: 'SIGINT' | 'SIGTERM') => {
  debug(`${signal} received, closing server`)
  server.close(() => {
    debug('server shut down gracefully')
  })
}

process.once('SIGTERM', () => close('SIGTERM'))
process.once('SIGINT', () => close('SIGINT'))