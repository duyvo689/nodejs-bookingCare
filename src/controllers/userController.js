import { query } from 'express'
import userServices from '../services/userServices'

let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs paramer!!'
        })
    }

    let userData = await userServices.handleUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id

    if (!id) {
        return res.status(404).json({
            errCode: 0,
            message: 'Thiếu thông số cần thiết!',
            users: []
        })
    }
    let users = await userServices.getAllUsers(id)
    console.log(users)

    return res.status(200).json({
        errCode: 0,
        message: 'ok !',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userServices.createNewUser(req.body)
    console.log(message)
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Thiếu thông số cần thiết!!"
        })
    }
    let message = await userServices.deleteUser(req.body.id)
    return res.status(200).json(message)
}

// let handleEditUser = async (req, res) => {
//     let userId = await req.query.id
//     if (userId) {
//         let userData = await userServices.editUser(userId)
//         return res.status(200).json({
//             errCode: 0,
//             message: 'OK',
//             user: userData
//         }
//         )
//     } else {
//         return res.status(300).json({
//             errCode: 1,
//             message: 'Không tìm thấy id'
//         })
//     }
// }

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    // handleEditUser: handleEditUser,
}