import nodeMailer from 'nodemailer';

let adminEmail = 'sangiaodichbdsgreen@gmail.com';
let adminPassword = 'khoa2381998';
let mailHost = 'smtp.gmail.com';
let mailPort = 465;

let sendMail = (to, subject, htmlContent) =>{
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        host: mailHost,
        port: mailPort,
        secure: true, //use SSL - TLS
        auth:{
            user: adminEmail,
            pass: adminPassword
        }
    });
    let options = {
        from: adminEmail,
        to: to,
        subject: subject,
        html: htmlContent
    }
    return transporter.sendMail(options); // 

}
module.exports = sendMail