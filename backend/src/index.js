import express from 'express'
import logger from 'node-color-log'
import cors from 'cors'
import morgan from 'morgan'
import authRouter from './controllers/auth.controller.js'
import patchRouter from './controllers/patch.controller.js'
import { config } from 'dotenv'

config()

logger.setDate(() => new Date().toISOString())

const app = express()
app.listen(3000, () => logger.info('Server running on port 3000'))

app.use(cors())
app.use(morgan(':date[iso] :method :url :status :response-time ms - :res[content-length]'))
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/patch', patchRouter)

export {
    logger
}