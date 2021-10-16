import db from "../models/index"

let getTopDoctorHomeServices = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.allCode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.allCode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}


let getAllDoctorServices = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}

let saveDetailInfoDoctorServices = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    errCode: -1,
                    errMessage: 'Thiếu thông số cần thiết'
                })
            } else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Đã lưu thành công'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let allInfoDetailDoctorServices = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataInfo = await db.User.findOne({
                where: { id: inputId },
                attributes: {
                    exclude: ['password', 'image']
                },
                include: [
                    { model: db.allCode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown', 'description', 'doctorId'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: dataInfo
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getTopDoctorHomeServices: getTopDoctorHomeServices,
    getAllDoctorServices: getAllDoctorServices,
    saveDetailInfoDoctorServices: saveDetailInfoDoctorServices,
    allInfoDetailDoctorServices: allInfoDetailDoctorServices,
}
