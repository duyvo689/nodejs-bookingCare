import doctorServices from '../services/doctorServices'

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit
    if (!limit) limit = 10
    try {
        let response = await doctorServices.getTopDoctorHomeServices(+limit)
        return res.status(200).json(response)
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorServices.getAllDoctorServices()
        return res.status(200).json(doctors)
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }
}

let postInfoDoctors = async (req, res) => {
    try {
        let response = await doctorServices.saveDetailInfoDoctorServices(req.body)
        return res.status(200).json(response)
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }
}

let allInfoDetailDoctor = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Thiếu thông số cần thiết!!"
            })
        } else {
            let response = await doctorServices.allInfoDetailDoctorServices(req.query.id)
            return res.status(200).json(response)
        }
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorServices.bulkCreateScheduleServices(req.body)
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }
}

let getScheduleByDate = async (req, res) => {
    try {
        let infor = await doctorServices.getScheduleByDateServices(req.query.doctorId, req.query.date)
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }
}
let getExtraInforDoctorById = async (req, res) => {
    try {
        let infor = await doctorServices.getExtraInforDoctorById(req.query.doctorId);
        return res.status(200).json(infor);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }

}
let getProfileDoctorById = async (req, res) => {
    try {
        let infor = await doctorServices.getProfileDoctorById(req.query.doctorId);
        return res.status(200).json(infor);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }

}
let getListPatient = async (req, res) => {
    try {
        let infor = await doctorServices.getListPatient(req.query.doctorId, req.query.date); //cần truyền 2 thông số là Id bác sĩ và ngày để lọc danh sách bệnh nhân
        return res.status(200).json(infor);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }
}
let sendRemedy = async (req, res) => {
    try {
        let infor = await doctorServices.sendRemedy(req.body);
        return res.status(200).json(infor);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInfoDoctors: postInfoDoctors,
    allInfoDetailDoctor: allInfoDetailDoctor,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatient: getListPatient,
    sendRemedy: sendRemedy,
}

