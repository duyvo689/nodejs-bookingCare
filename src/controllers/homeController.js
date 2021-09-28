
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
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let mess = await CRUDservice.createNewUser(req.body)
    console.log(mess)
    return res.send('from post-crud')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser()
    return res.render('displayCrud.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId)
        console.log(userData)
        // let userData
        return res.render('editCRUD.ejs', {
            user: userData
        })
    }
    else {
        return res.send('User not found!!')
    }

}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUser = await CRUDservice.updateUserData(data)
    return res.render('displayCrud.ejs', {
        dataTable: allUser
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        await CRUDservice.deleteUserById(id)
        return res.send('delete user done')
    } else {
        return res.send('user not found!!')
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