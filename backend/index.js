import dotenv from 'dotenv'
dotenv.config()

import app from "./app.js"
import connectDB from './src/database/index.js'

// Connect to MongoDB
connectDB()

// start the server
app.listen(process.env.PORT || 3000 , () => {
    console.log(`server listening on port ${process.env.PORT}`)
})