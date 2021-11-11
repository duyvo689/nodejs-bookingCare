import { response } from "express"
import db from "../models/index"
require('dotenv').config()
import _, { differenceWith, reject } from 'lodash'

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE

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
                raw: false,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e);
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
            //validate - cần truyền đủ tham số
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown
                || !inputData.action || !inputData.selectedPrice || !inputData.selectedPayment
                || !inputData.selectedProvince || !inputData.nameClinic
                || !inputData.note) {
                resolve({
                    errCode: -1,
                    errMessage: 'Thiếu thông số cần thiết'
                })
            } else {
                //Update hoặc insert vào markdown
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                    })
                } else if (inputData.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })

                    if (doctorMarkdown) //nếu tìm thấy doctorMarkdown thì thực hiện ghi đè dữ liệu mới
                    {
                        doctorMarkdown.contentHTML = inputData.contentHTML,
                            doctorMarkdown.contentMarkdown = inputData.contentMarkdown,
                            doctorMarkdown.description = inputData.description,
                            doctorMarkdown.updateAt = new Date();
                        await doctorMarkdown.save();
                    }

                }
                //Update hoặc insert vào Doctor_infor
                let doctorInfor = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: inputData.doctorId
                    },
                    raw: false
                })
                // inputData.selectedPrice || !inputData.selectedPayment
                // || !inputData.selectedProvince || !inputData.nameClinic
                //  || !inputData.note
                if (doctorInfor) {
                    //nếu có trong db thì thao tác này là update
                    doctorInfor.priceId = inputData.selectedPrice;
                    doctorInfor.provinceId = inputData.selectedProvince;
                    doctorInfor.paymentId = inputData.selectedPayment;
                    doctorInfor.nameClinic = inputData.nameClinic;
                    doctorInfor.addressClinic = inputData.addressClinic;
                    doctorInfor.note = inputData.note;
                    doctorInfor.doctorId = inputData.doctorId;
                    await doctorInfor.save();


                }
                else {
                    //nếu không có trong db thì thao tác này là create
                    await db.Doctor_Infor.create({
                        priceId: inputData.selectedPrice,
                        provinceId: inputData.selectedProvince,
                        paymentId: inputData.selectedPayment,
                        nameClinic: inputData.nameClinic,
                        addressClinic: inputData.addressClinic,
                        note: inputData.note,
                        doctorId: inputData.doctorId,
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Đã lưu thành công'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let allInfoDetailDoctorServices = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataInfo = await db.User.findOne({
                where: { id: inputId },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.allCode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown', 'description', 'doctorId'] },
                    {
                        model: db.Doctor_Infor, attributes: {
                            exclude: ['id', 'doctorId']
                        },
                        include: [
                            { model: db.allCode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                            { model: db.allCode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                            { model: db.allCode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                        ]

                    },
                ],
                raw: false,
                nest: true
            })
            resolve({
                errCode: 0,
                data: dataInfo
            })
        } catch (e) {
            reject(e);
        }
    })
}


let bulkCreateScheduleServices = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.date) {
                resolve({
                    errCode: -1,
                    errMessage: 'Thiếu thông số cần thiết'
                })
            }
            else {
                let schedule = data.arrSchedule

                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE
                        return item
                    })
                }

                console.log('check data bulkCreateScheduleServices:, ', schedule)

                //gọi từ database lên
                let existing = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.date },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true
                })

                //chuyển đổi dữ liệu ngày 
                if (existing && existing.length > 0) {
                    existing = existing.map(item => {
                        item.date = new Date(item.date).getTime()
                        return item
                    })
                }
                console.log("......check toCreate >>>", existing)
                // so sánh dữ liệu khác nhau
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date
                })


                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate)
                }


                resolve({
                    errCode: 0,
                    errMessage: 'Đã lưu thành công'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}


let getScheduleByDateServices = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu thông số cần thiết'
                })
            }
            else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        { model: db.allCode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: false,
                    nest: true

                })
                if (!dataSchedule) dataSchedule = []

                resolve({
                    errCode: 0,
                    data: dataSchedule
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getExtraInforDoctorById = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) //nếu không truyền id
            {
                resolve({
                    errCode: -1,
                    errMessage: 'Thiếu thông số cần thiết'
                })
            } else {//nếu truyền id thì bắt đầu get thông tin doctor bằng id
                let data = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: idInput
                    },

                    attributes: {
                        exclude: ['id', 'doctorId']//2 trường id và doctorId không cần dùng nên exclude
                    },
                    include: [
                        { model: db.allCode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.allCode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.allCode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: false,
                    nest: true
                })
                if (!data) { data = {}; } //nếu không có id thì truyền về mảng rỗng
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getTopDoctorHomeServices: getTopDoctorHomeServices,
    getAllDoctorServices: getAllDoctorServices,
    saveDetailInfoDoctorServices: saveDetailInfoDoctorServices,
    allInfoDetailDoctorServices: allInfoDetailDoctorServices,
    bulkCreateScheduleServices: bulkCreateScheduleServices,
    getScheduleByDateServices: getScheduleByDateServices,
    getExtraInforDoctorById: getExtraInforDoctorById,
}
