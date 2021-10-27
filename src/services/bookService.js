import { response } from "express"
import db from "../models/index"
require('dotenv').config()
import _, { differenceWith } from 'lodash'

let getAllBooksService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let books = await db.HandBook.findAll({
                where: {},
                attributes: {
                    exclude: []
                },
            })
            resolve({
                errCode: 0,
                data: books
            })
        } catch (e) {
            reject(e)
        }
    })
}

let createOneBooksServices = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.nameBook || !inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    errCode: -1,
                    errMessage: 'Thiếu thông số cần thiết'
                })
            } else {
                await db.HandBook.create({
                    image: inputData.avatar,
                    nameBook: inputData.nameBook,
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Đã lưu thành công'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllBooksService: getAllBooksService,
    createOneBooksServices: createOneBooksServices,
}
