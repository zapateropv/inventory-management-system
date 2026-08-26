import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv';
import bcrypt, { hash } from 'bcrypt'
import cookieParser from 'cookie-parser';
import {pool} from '../db/db.js'
import { generate_refresh_token, generate_access_token } from '../utils/utils.js';


export const register = async (req, res) => {
    try {
        const {first_name, last_name, password, email, birthdate, username} = req.body;
        const hash_password = await bcrypt.hash(password, 10)

        const [user_username] = await pool.query('SELECT * FROM users WHERE username = ?', [username])

        if(first_name == "" || last_name == "" || password == "" || email == "" || birthdate == "" || username == ""){
            return res.status(400).json({message: "inputs cant be empty"})
        }
        if(user_username.length > 0){
            
            return res.status(409).json({message: 'user is already registered'})
            
        
        }else{
            const db_query = 'INSERT INTO users (first_name, last_name, user_password, email, birthdate, username) VALUES (?, ?, ?, ?, ?, ?)'
            await pool.query(db_query, [first_name, last_name, hash_password, email, birthdate, username])
        
            return res.status(201).json({message: 'data inserted' })
        }
    } catch (error) {
        res.status(400).json({message: "server error"})
    }
   
  
}

export const login = async (req, res) => {
    try {
        const {email, username, password} = req.body
        const [user_username] = await pool.query('SELECT * FROM users WHERE username = ? ', [username])
        
         if(user_username.length === 0){
           return res.status(404).json({message: "user not found"})
        }

        if(user_username[0].email != email){
           return res.status(404).json({message: "wrong email"})
        }
       
        const user = {
            first_name: user_username[0].first_name,
            last_name: user_username[0].last_name,
            email: user_username[0].email,
            username: user_username[0].username,
            birthdate: user_username[0].birthdate,
        }

        const db_password = user_username[0].user_password
        const hash_password = await bcrypt.compare(password, db_password )
        if(hash_password === false){
            return res.status(404).json({message: "incorrect password"})
        }
        
        const access_token = generate_access_token(user)
        const refresh_token = generate_refresh_token(user)
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false, 
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        })
        res.status(200).json({message: "log in successfully", access_token:  access_token })
    } catch (error) {
        res.status(400).json({message: "server error"})
    }
}


export const refreshNewToken = (req, res) => {
    const refresh_token = req.cookies.refresh_token
    configDotenv()
    if(!refresh_token) return res.status(401).json({message: 'no token found'})

    jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, user) => {
          if(err) return res.status(401).json({message: 'Invalid or expired refresh token'});
            const newUser = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username,
                birthdate: user.birthdate,
            }
            const access_token = generate_access_token(newUser)
            res.json({new_access_token: access_token})
    } )
}

//CHECK ROUTE

export const checkRoute = async (req, res) => {
    const user = req.user
    try {
        if(!user){
            return res.json({message: "user not found"})
        }

           res.status(200).json({success: true, user: user})   
    } catch (error) {
        res.json({message: "no token found"})
    }
  
}

//MAIN PAGE ROUTES

export const dashboard = (req, res) => {
    res.send('test')
}