import jwt from "jsonwebtoken"
import "dotenv/config"

const generateJWT = (user: string) => {
    const payload = { user }
    const seed = <string>process.env.PRIVATE_JWT_SEED

    return new Promise((resolve, reject) => {

        jwt.sign(payload, seed, {
            expiresIn: '12h'
        },
            (err, token) => {

                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(token)
                }

            }
        )
    })

}

export default generateJWT