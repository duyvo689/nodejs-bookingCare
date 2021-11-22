const { reject } = require("lodash")
const db = require("../models")

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {//validate các trường thông tin
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: -1,
                    errMessage: 'Thiếu thông số cần thiết'
                })
            } else {//nếu điền đủ thì insert vào database
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                })
                resolve({
                    errCode: 0,
                    errMessage: `Tạo thành công`
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');//convert ép kiểu dữ liệu để hiển thị ảnh (dạng BLOB-> binary)
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'Lấy thông tin chuyên khoa thành công',
                data,
            })
        }
        catch (e) {
            reject(e);
        }

    })
}
module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
}