import { response } from "express"
import db from "../models/index"
require('dotenv').config()
import _, { differenceWith } from 'lodash'

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
                    exclude: ['password']
                },
                include: [
                    { model: db.allCode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown', 'description', 'doctorId'] }
                ],
                raw: false,
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
            reject(e)
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

                })
                if (!dataSchedule) dataSchedule = []

                resolve({
                    errCode: 0,
                    data: dataSchedule
                })
            }
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
    bulkCreateScheduleServices: bulkCreateScheduleServices,
    getScheduleByDateServices: getScheduleByDateServices,
}
