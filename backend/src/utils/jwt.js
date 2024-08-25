import jwt from 'jsonwebtoken'

const generateToken = async (email, id) => {
    const token = await jwt.sign({email,id}, process.env.JWT_SECRET_KEY)
    return token;
}

const verifyToken = async( token ) => {
    const accesstoken = await jwt.verify( token, process.env.JWT_SECRET_KEY)
    return accesstoken
}

export {generateToken, verifyToken}