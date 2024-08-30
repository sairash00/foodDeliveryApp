// import Routes

import userRoute from './src/routes/user.routes.js'
import productRoute from './src/routes/product.routes.js'
import orderRoute from './src/routes/order.routes.js'
import otpRoute from './src/routes/otp.routes.js'

// packages imports
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(cors({
    origin: "https://food-delivery-app-frontend-teal.vercel.app",
    credentials: true,
}))

//middlewares setup

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


//routes setup here
app.use("/api/v1/users", userRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/order", orderRoute)
app.use("/api/otp", otpRoute )

export default app