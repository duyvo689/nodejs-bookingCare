import db from "../models/index"
import bcrypt from 'bcryptjs'
import { raw } from "body-parser"

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


module.exports = {
    handleUserLogin: handleUserLogin,
}