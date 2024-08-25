import bcrypt from 'bcrypt'


const hash = async (password) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    return hashedPassword
}

const compare = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword)
    return match
}

export {hash, compare}