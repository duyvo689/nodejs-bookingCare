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
                    item.image = Buffer.from(item.image, 'base64').toString('binary');//convert mã hóa ép kiểu dữ liệu sang binary
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
let getInforSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {//validate
                resolve({
                    errCode: -1,
                    errMessage: 'Thiếu thông số cần thiết'
                })
            } else {

                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown'] //lấy 2 trường này để hiển thị thông tin về chuyên khoa
                })
                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {//tìm toàn quốc, tất cả các tỉnh
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                            },//tìm tất cả bác sĩ có specialtyId được truyền vào
                            attributes: ['doctorId', 'provinceId'] //chỉ lấy 2 trường doctorId và provinceId
                        })
                    } else {//tìm theo tỉnh
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location,
                            },//tìm tất cả bác sĩ có specialtyId được truyền vào
                            attributes: ['doctorId', 'provinceId'] //chỉ lấy 2 trường doctorId và provinceId
                        })
                    }

                    data.doctorSpecialty = doctorSpecialty; //gán thuộc tính này vào data để truyền về

                } else {
                    data = {};
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Lấy thông tin chuyên khoa thành công',
                    data,
                })

            }
        }
        catch (e) {
            reject(e);
        }
    })


}
module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getInforSpecialtyById: getInforSpecialtyById,
}