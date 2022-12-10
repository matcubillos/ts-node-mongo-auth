import { Response, Request } from "express"
import Usuario from "../models/User.model"
import bcrypt from "bcryptjs"
import generateJWT from '../helpers/jwt.helper';
import IGetUserAuthInfoRequest from '../interfaces/user-info-request.interface';

export const registerUser = async (req: Request, res: Response) => {

    const { user, email, password } = req.body

    try {

        const findUser = await Usuario.findOne({ email: email });
        if (findUser) {
            return res.json({
                success: false,
                message: 'El usuario ya existe'
            })
        };


        const doUserDB = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        doUserDB.password = bcrypt.hashSync(password, salt)

        const token = await generateJWT(user)

        await doUserDB.save();

        return res.status(201).json({
            success: true,
            user,
            token
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error al registrar'
        })
    }

}

export const loginUser = async (req: Request, res: Response) => {

    const { email, password, user } = req.body
    try {

        const findUserDB = await Usuario.findOne({ email })
        if (!findUserDB) {
            return res.status(400).json({
                success: false,
                message: "Correo/contraseña invalido/s"
            })
        }

        const validatePassword = bcrypt.compareSync(password, findUserDB.password)
        if (!validatePassword) {
            return res.status(400).json({
                success: false,
                message: "Correo/contraseña invalido/s"
            })
        }

        const token = await generateJWT(user)
        res.json({
            ok: true,
            token
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            sucess: false,
            message: 'Error al ingresar'
        })
    }
}

export const sessionCheck = (req: IGetUserAuthInfoRequest, res: Response) => {
    const user = req.user
    return res.json({
        success: true,
        user: user
    })
}