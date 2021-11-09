import bcrypt from 'bcryptjs'
import { raw } from 'body-parser';
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);//thuật toán hash password của bcryptjs

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await hashUserPassword(data.password)//truyền biến password vào hàm để thực hiện hash
            await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender == 1 ? true : false,
                //image: DataTypes.STRING,
                //chưa thực hiện upload anh
                roleId: data.roleId,
                positionId: data.positionId,
            })
            console.log(data)
            console.log(hashPassword)
            resolve('Tạo user thành công')
        }
        catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);//hàm hash
            resolve(hashPassword);
        }
        catch (e) {
            reject(e);
        }
    })

}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            })//load ra tất cả user trong db
            resolve(users);
        }
        catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },//tìm user mà id =UserId
                raw: true
            })
            if (user) {
                resolve(user);//trả về thông tin user
            } else {
                resolve({});//trả về mảng rỗng nếu không tìm được
            }
        }
        catch (e) {
            reject(e);
        }
    })

}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id } //tìm user có id bằng id của user được truyền vào
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                //gán dữ liệu bằng dữ liệu mới
                await user.save();
                let allUsers = await db.User.findAll();//tìm tất cả user
                resolve(allUsers);//trả về danh sách các user
            }
            else {
                resolve()
            }
            await db.User.update({})//update
        }
        catch (e) {
            reject(e);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }//gán giá trị userId cho id x <- y
            })
            if (user) {
                await user.destroy();//dùng phương thức destroy để drop dữ liệu
                resolve();
            }

            else {
                reject();
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}