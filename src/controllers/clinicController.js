import clinicService from "../services/clinicService";

let createClinic = async (req, res) => {
    try {
        let infor = await clinicService.createClinic(req.body);
        return res.status(200).json(infor);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }
}
let getAllClinic = async (req, res) => {
    try {
        let infor = await clinicService.getAllClinic();
        return res.status(200).json(infor);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }
}
let getInforClinicById = async (req, res) => {
    try {
        let infor = await clinicService.getInforClinicById(req.query.id);
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
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getInforClinicById: getInforClinicById,
}