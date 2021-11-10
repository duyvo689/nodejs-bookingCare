
import db from "../models/index"
import CRUDservice from "../services/CRUDservice"
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }

}
let getCRUD = (req, res) => {
    return res.render('crud.ejs')//render file giao diện nhập dữ liệu
}

let postCRUD = async (req, res) => {
    let mess = await CRUDservice.createNewUser(req.body)
    console.log(mess)
    return res.send('Đã thêm user')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser()
    return res.render('displayCrud.ejs', {
        dataTable: data
    })
}// gán biến dataTable cho data + render file giao diện getCRUD

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId)//nếu tồn tại userId thì trả về thông tin của user đó
        console.log(userData)
        // let userData
        return res.render('editCRUD.ejs', {
            user: userData// gán giá trị biến userData cho biến user
        })
    }
    else {
        return res.send('Không tìm thấy user');
    }

}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUser = await CRUDservice.updateUserData(data)
    return res.render('displayCrud.ejs', {
        dataTable: allUser//gán biến allUsers bằng biến dataTable trong file getCRUD.ejs
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        await CRUDservice.deleteUserById(id)
        return res.send('Xóa user thành công')
    } else {
        return res.send('Không tìm thấy user')
    }
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,

}