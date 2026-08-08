import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'

configDotenv()
export const checkAuth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
         return res.json({message: 'no token found'})
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
         if(err) return res.json({message: 'error'})
         req.user = user
        next()
    })


    const refresh_token = req.cookies.refresh_token
    if(!refresh_token) return res.status(401).json({ message: 'no token found' })

    jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, user) => {
         if (err) {
          return res.status(401).json({ message: 'invalid refresh token' })
        }

        req.user = user
        next()
    })
}