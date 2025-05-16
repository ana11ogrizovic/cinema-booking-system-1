import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { MovieRoute } from './routes/movie.route'
import morgan from 'morgan'
import { config, configDotenv } from 'dotenv'
import { AppDataSource } from './db'
import { CinemaRoute } from './routes/cinema.route'
import { UserRoute } from './routes/user.route'
import { UserService } from './services/user.service'

const app = express()
app.use(cors())
app.use(morgan('short'))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'PSEP 2025'
    })
})

//app routes
app.use(UserService.validateToken)
app.use('/api/user', UserRoute)
app.use('/api/movie', MovieRoute)
app.use('/api/cinema', CinemaRoute)


//404 not found
app.get('{/*path}', function (req, res){
   res.status(404).json({
    message: 'NOT_FOUND',
    timestamp: new Date()
   })
})

configDotenv()
const port = Number(process.env.SERVER_PORT)

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database.')
        app.listen(3000, () => {
        console.log('Server started at port 3000')
    })
})
.catch((e) => console.log('Database connection failed', e))

