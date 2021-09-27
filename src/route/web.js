import express from "express"
// import homeController from "../controllers/homeController"

let router = express.Router()

let webRouters = (app) => {
    // router.get('/', homeController.getHomePage)

    router.get('/', (req, res) => {
        return res.send('Hello world docter')
    })

    return app.use("/", router)
}

module.exports = webRouters