import db from "../models/index"
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10); //salt hash password của thư viện bcrypt


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {//kiem tra co nguoi dung
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'], //trả về 5 trường này
                    where: { email: email },//so sánh email
                    raw: true,
                    delete: 'password', //không trả về password phòng ngừa bị hack
                })
                if (user) {
                    // so sánh password ng dùng truyền lên và từ DB (giải hash), thư viện bcryptjs làm
                    let checkPassword = await bcrypt.compareSync(password, user.password)
                    if (checkPassword) {
                        userData.errCode = 0
                        userData.errMessage = 'Đăng nhập thành công'

                        delete user.password // xoá property password khi trả về người dùng
                        userData.user = user
                    }
                    else {
                        userData.errCode = 3
                        userData.errMessage = 'Sai mật khẩu!!'
                    }
                }
                else {
                    userData.errCode = 2
                    userData.errMessage = 'Không tìm thấy user!'
                }
            }
            else { //neu khong ton tai nguoi dung
                userData.errCode = 1
                userData.errMessage = 'Email không tồn tại trong hệ thống!'
            }
            resolve(userData)
        }
        catch (e) {
            reject(e)
        }
    })
}
//kiểm tra email của người dùng
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail } //kiem tra
            })
            if (user) {
                resolve(true);
            }
            else { resolve(false); }
        }
        catch (e) {
            reject(e);
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
                    errMessage: 'Email đã tồn tại'
                })
            } else {
                let hashPassword = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar,
                })
            }
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

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errCode: 2,
                    errCode: "Thiếu tham số cần thiết!!"
                })

            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save()

                resolve({
                    errCode: 0,
                    message: "Đã sửa thành công!!"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errCode: "Không thành công!!"
                })
            }

        }
        catch (e) {
            reject(e)
        }
    })
}

let getAllCodeServices = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: "Thiếu tham số cần thiết"
                })
            }
            else {
                let res = {}
                let allCode = await db.allCode.findAll({
                    where: { type: typeInput }
                })
                res.errCode = 0
                res.data = allCode
                resolve(res)
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
    getAllCodeServices: getAllCodeServices,
}