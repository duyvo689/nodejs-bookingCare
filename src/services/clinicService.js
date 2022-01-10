const { reject } = require("lodash")
const db = require("../models")

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {//validate các trường thông tin
            if (!data.name || !data.address || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: -1,
                    errMessage: 'Thiếu thông số cần thiết'
                })
            } else {//nếu điền đủ thì insert vào database
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
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
let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {//nếu có data và data khác mảng rỗng
                data.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');//convert mã hóa ép kiểu dữ liệu sang binary
                })
            }
            resolve({
                errCode: 0,
                errMessage: `Lấy danh sách phòng khám thành công`,
                data,
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
let getInforClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: -1,
                    errMessage: 'Thiếu thông số cần thiết'
                })
            } else {

                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown', 'image'] //lấy 5 trường này để hiển thị thông tin về phong kham
                })
                if (data) {
                    let doctorClinic = [];

                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: {
                            clinicId: inputId,
                        },//tìm tất cả bác sĩ có specialtyId được truyền vào
                        attributes: ['doctorId'] //chỉ lấy 2 trường doctorId
                    })


                    data.doctorClinic = doctorClinic; //gán thuộc tính này vào data để truyền về

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
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getInforClinicById: getInforClinicById,
}