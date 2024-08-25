import User from "../models/user.model.js"
import {hash, compare } from "../utils/bcrypt.js"
import {generateToken, verifyToken} from "../utils/jwt.js"

export const register = async (req,res) => {
    
    try {

        const data = req.body
        if( !data || data.name === "" || data.email === "" || data.password === "" || !data.phoneNumber || !data.address) return res.status(403).json({
            success: false,
            message: "All fields are required"
        })

        if(!data?.address?.state || !data?.address?.city || !data?.address?.country) return res.status(403).json({
            success: false,
            message: "Invalid address"
        })

        const userExists = await User.findOne({email: data.email})
        if(userExists) return res.status(409).json({
            success: false,
            message: "User already exists"
        })

        const hashedPassword = await hash(data.password)
        console.log(hashedPassword)
        data.password = hashedPassword
        
        const user = await User.create(data)

        if(!user) return res.status(403).json({
            success: false,
            message: "Failed to create user"
        })

        const accessToken = await generateToken(user.email, user._id)
        const options = {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        }

        res.status(200)
        .cookie("accessToken", accessToken, options)
        .json({
            success: true,
            message: "User registered successfully",
            user
        })


        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const login = async (req,res) => {
    try {
        const data = req.body
        if(!data || data.email === "" || data.password === "") return res.status(403).json({
            success: false,
            message: "All fields are required"
        })

        const user = await User.findOne({email: data.email}).select("email password name ")

        if(!user) return res.status(403).json({
            success: false,
            message: "User not found"
        })

        const isMatch = await compare(data.password, user.password)

        if(!isMatch) return res.status(403).json({
            success: false,
            message: "Invalid credentials"
        })

        const accessToken = await generateToken(user.email, user._id)
        const options = {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        }

        res.status(200)
        .cookie("accessToken", accessToken, options)
        .json({
            success: true,
            message: "User logged in successfully",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {

        res.status(200)
        .clearCookie("accessToken")
        .json({
            success: true,
            message: "User logged out successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getUser = async (req,res) => {
    try {

        const token = req.cookies?.accessToken
        if(!token) return res.status(401).json({
            success: false,
            message: "Access denied, No token found"
        })

        const decodedToken = await verifyToken(token)
        if(!decodedToken) return res.status(403).json({
            success: false,
            message: "Access denied, Invalid token"
        })

        const user = await User.findById(decodedToken.id).select(" -password ").populate({
            path: "orders",
            populate: {
                path: "items.item",
                select: "name price quantity"
                }
            })
            .populate({
                path: "cart",
                populate: {
                    path: "cart.item",
                    select: "name price quantity"
                }
            })

        if(!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })

        res.status(200).json({
            success: false,
            message: "User fetched successfully",
            user
        })

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const isLoggedIn = async (req,res) => {
    try {
        
        const token = req.cookies?.accessToken
        if(!token) return res.status(200).json({
            success: false,
            message: "User not logged in"
        })
        
        const decodedToken = await verifyToken(token)
        if(!decodedToken) return res.status(403).json({
            success: false,
            message: "Invalid token"
        })

        const user = await User.findById(decodedToken.id).select("email")
        if(!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })

        res.status(200).json({
            success: true,
            message: "User logged in",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}