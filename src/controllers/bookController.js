
import db from "../models/index"
import bookService from "../services/bookService"

let getAllBooks = async (req, res) => {
    try {
        let books = await bookService.getAllBooksService()
        return res.status(200).json(books)
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }
}

let createOneBooks = async (req, res) => {
    try {
        let infor = await bookService.createOneBooksServices(req.body)
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Lỗi từ server"
        })
    }
}

module.exports = {
    getAllBooks: getAllBooks,
    createOneBooks: createOneBooks,
}