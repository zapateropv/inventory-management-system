import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'

configDotenv()
export const generate_access_token = (data) => {
  return  jwt.sign(data, process.env.ACCESS_TOKEN, {expiresIn: '5m'})
}


export const generate_refresh_token = (data) =>{
  return jwt.sign(data, process.env.REFRESH_TOKEN, {expiresIn: '7d'})
}