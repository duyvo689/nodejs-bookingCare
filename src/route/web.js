import express from "express"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
import doctorController from "../controllers/doctorController"
import bookController from "../controllers/bookController"
import patientController from "../controllers/patientController"
import specialtyController from "../controllers/specialtyController"
import clinicController from "../controllers/clinicController"
let router = express.Router()

let webRouters = (app) => {

    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.displayGetCRUD)
    router.get('/edit-crud', homeController.getEditCRUD)
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)

    // APIs for project

    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.put('/api/edit-user', userController.handleEditUser)

    router.get('/api/allcode', userController.getAllCode)
    //api cho bac si
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)
    router.get('/api/get-all-doctors', doctorController.getAllDoctors)
    router.post('/api/save-info-doctors', doctorController.postInfoDoctors)
    router.get('/api/get-all-info-detail-doctors', doctorController.allInfoDetailDoctor)
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)

    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate)
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById)
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById)
    router.get('/api/get-list-patient', doctorController.getListPatient)
    router.post('/api/send-remedy', doctorController.sendRemedy)
    //api cho benh nhan
    router.post('/api/patient-booking', patientController.postBooking)
    //api chuyen khoa
    router.post('/api/create-new-specialty', specialtyController.createSpecialty)
    router.get('/api/get-specialty', specialtyController.getAllSpecialty)
    router.get('/api/get-infor-specialty-by-id', specialtyController.getInforSpecialtyById)
    //api phòng khám
    router.post('/api/create-new-clinic', clinicController.createClinic)
    router.get('/api/get-clinic', clinicController.getAllClinic)
    router.get('/api/get-infor-clinic-by-id', clinicController.getInforClinicById)


    router.get('/api/get-all-books', bookController.getAllBooks)
    router.post('/api/create-one-handbook', bookController.createOneBooks)




    return app.use("/", router)
}

module.exports = webRouters