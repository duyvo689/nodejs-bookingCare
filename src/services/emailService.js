require('dotenv').config();
//dùng nodemailler https://nodemailer.com/about/
//link huong dan https://www.youtube.com/watch?v=nF9g1825mwk
import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // create reusable transporter object using the default SMTP transport

}

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'hanhgg78@gmail.com', // generated ethereal user
            pass: 'aopqnknntywfvksv', // generated ethereal password
            // user: process.env.EMAIL_APP, // generated ethereal user
            // pass: process.env.EMAIL_APP_PASSWORD, 

        },
    });

    // send mail with defined transport object aopqnknntywfvksv
    let info = await transporter.sendMail({
        from: '"NguyenNhon "<nhonnguyen2192@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Đặt lịch khám bệnh", // Subject line
        text: "Hello world?", // plain text body
        html: `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn đã thực hiện đặt lịch khám bệnh online thành công!</p>
        <div><b>Thời gian : ${dataSend.time}</b></div>
        <div><b>Bác sĩ : ${dataSend.doctorName}</b></div>        
        </div>
        
        `, // html body
    });
}

let sendAttechment = async (dataSend) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'nhonnguyen2192@gmail.com', // generated ethereal user
            pass: 'dwsoykateekgzfon', // generated ethereal password
            // user: process.env.EMAIL_APP, // generated ethereal user
            // pass: process.env.EMAIL_APP_PASSWORD, 
        },
    });

    // send mail with defined transport object aopqnknntywfvksv
    let info = await transporter.sendMail({
        from: '"NguyenNhon "<nhonnguyen2192@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Đặt lịch khám bệnh", // Subject line
        text: "Hello world?", // plain text body
        html: `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Cám ơn bạn đã lựa chọn DoctorCare</p>
        <p>DoctorCare chúc bạn luôn luôn mạnh khỏe!</p>   
        </div>
        
        `, // html body
        attechments:
        {   // encoded string as an attachment
            filename: 'text1.png',
            content: 'aGVsbG8gd29ybGQh',
            encoding: dataSend.imgBase64,
        },
    });
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttechment: sendAttechment,
}