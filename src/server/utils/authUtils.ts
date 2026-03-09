import { hash, compare } from "bcrypt"
import { Algorithm, SignOptions, sign, verify } from "jsonwebtoken";

export const isPhoneNumber = (value: string): boolean => {
    return /^(0|\+98)?9\d{9}$/.test(value);
};

const hashPassword = async (password: string) => {

    const hashedPassword = await hash(password, Number(process.env.SALT_ROUNDS ?? 12))
    return hashedPassword
}

const verifyPassword = async (password: string, hashedPassword: string) => {

    const isVerify = await compare(password, hashedPassword)
    return isVerify
}

const generateToken = (data: any) => {

    const privateKey = process.env.PRIVET_KEY;
    if (!privateKey) {
        throw new Error("JWT private key is not defined");
    }

    const options: SignOptions = {
        algorithm: (process.env.ALGORITHM ?? "HS256") as Algorithm,
        expiresIn: (process.env.EXPIRESIN_HOURS ? process.env.EXPIRESIN_HOURS + "h" : "24h") as SignOptions["expiresIn"],
    };

    const token = sign(data, privateKey, options)

    return token;
}

const verifyToken = (token: string) => {
    const privateKey = process.env.PRIVET_KEY;
    if (!privateKey) {
        throw new Error("JWT private key is not defined");
    }

    try {
        const validationResult = verify(token, privateKey)
        return validationResult;
    } catch (error) {
        console.log("veify token error:", error);
        return false
    }

}




export {
    hashPassword,
    verifyPassword,
    generateToken
}