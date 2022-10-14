import cors from 'cors'
import express, {Express} from 'express'
import morgan from 'morgan'
import path from 'path'

export default function () {
  const app: Express = express()

  app.use(morgan('combined', {skip: (req, res) => false}))
  app.use(express.static('dist'))
  app.use(cors)
  app.use(express.urlencoded({extended: false}))
  app.use(express.json())

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS') {
      res.header('AccessControl-Allow-Methods', 'GET')
      return res.status(200).json({})
    }
    next()
  })

  app.use('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'), (error) => {
      if (error) {
        res.status(500).send(error)
      }
    })
  })

  app.use((req, res, next) => {
    const error = new Error('not found')
    return res.status(404).json({
      message: error.message
    })
  })

  return app
}