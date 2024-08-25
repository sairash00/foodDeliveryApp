import { verifyToken } from "../utils/jwt.js"

export const authenticate = async(req,res,next) => {
    try {

        const token = req.cookies?.accessToken
        if(!token) return res.status(401).json({
            success: false,
            message: "Unauthorized access, No token found"
        })
        const decodedToken = await verifyToken(token)
        if(!decodedToken) return res.status(403).json({
            success: false,
            message: "Invalid Token"
        })
        req.user = decodedToken.id
        next()
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}