import db from "../models/index"
import bcrypt from 'bcryptjs'
import { raw } from "body-parser"

const salt = bcrypt.genSaltSync(10); //salt hash password của thư viện bcrypt


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    // so sánh password ng dùng truyền lên và từ DB (giải hash), thư viện bcryptjs làm
                    let checkPassword = await bcrypt.compareSync(password, user.password)
                    if (checkPassword) {
                        userData.errCode = 0
                        userData.errMessage = ''

                        delete user.password // xoá property password khi trả về người dùng
                        userData.user = user
                    }
                    else {
                        userData.errCode = 3
                        userData.errMessage = 'Wrong password!!'
                    }
                }
                else {
                    userData.errCode = 2
                    userData.errMessage = 'User not found!!'
                }
            }
            else {
                userData.errCode = 1
                userData.errMessage = `Your's Email isn't exist in your system`
            }
            resolve(userData)
        }
        catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            }
            else { resolve(false) }
        }
        catch (e) {
            reject(e
            )
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = ''
            if (userId == 'ALL') {
                user = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            if (userId && userId !== 'ALL') {
                user = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            resolve(user)
        } catch (e) {
            reject(e)
        }
    })
}


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let checkEmail = await checkUserEmail(data.email)
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    message: 'Email đã tồn tại'
                })
            }
            let hashPassword = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender == 1 ? true : false,
                roleId: data.roleId,
            })
            resolve({
                errCode: 0,
                message: 'OK'
            })

        }
        catch (e) {
            reject(e)
        }
    })
}

let hashUserPassword = (password) => {

    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        }
        catch (e) {
            reject(e)
        }
    })

}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                await db.User.destroy({
                    where: { id: userId }
                })
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: "không tìm thấy người dùng!!"
                })
            }

            resolve({
                errCode: 0,
                message: "Đã xoá!!"
            })

        }
        catch (e) {

        }
    })
}

// let editUser = (data) => {
//     return new Promise((resolve, reject) => {
//         try {
//             let user = await db.User.findOne({
//                 where: { id: data.id }
//             })

//             if (user) {
//                 email = data.email
//                 firstName = data.firstName
//                 lastName = data.lastName
//                 address = data.address

//                 await user.save()
//                 let allUsers = await db.User.findAll()
//                 resolve(allUsers)
//             }
//             else {
//                 resolve()
//             }

//         }
//         catch (e) {
//             reject(e)
//         }
//     })
// }

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    // editUser: editUser,
}