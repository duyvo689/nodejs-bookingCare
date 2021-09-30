import userServices from '../services/userServices'

let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs paramer!!'
        })
    }

    let userData = await userServices.handleUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.body.id

    if (!id) {
        return res.status(404).json({
            errCode: 0,
            message: 'Thiếu thông số cần thiết!',
            users: []
        })
    }
    let users = await userServices.getAllUsers(id)
    console.log(users)

    return res.status(200).json({
        errCode: 0,
        message: 'ok !',
        users
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
}