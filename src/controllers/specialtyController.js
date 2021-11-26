import specialtyService from "../services/specialtyService"
let createSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(infor);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }
}
let getAllSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.getAllSpecialty();
        return res.status(200).json(infor);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }
}
let getInforSpecialtyById = async (req, res) => {
    try {
        let infor = await specialtyService.getInforSpecialtyById(req.query.id, req.query.location); //truy vấn 2 trường id và location để lấy thông tin tất cả bác sĩ thuộc chuyên khoa(để tìm phòng khám theo khu vực)
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
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getInforSpecialtyById: getInforSpecialtyById,
}