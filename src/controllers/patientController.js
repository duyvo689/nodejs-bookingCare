import patientService from '../services/patientService';
let postBooking = async (req, res) => {
    try {
        let infor = await patientService.postBooking(req.body);
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
    postBooking: postBooking,
}