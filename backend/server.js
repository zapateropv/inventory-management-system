import { router } from './routes/routes.js';
import express from 'express';
import { configDotenv } from 'dotenv';
import { json } from 'express';
import cookieParser from 'cookie-parser';
configDotenv()
const app = express();
const PORT = process.env.PORT || 8080

app.use(json())
app.use(cookieParser())
app.use(router)

app.listen(PORT,async() => {
   
    console.log('port connected')
})