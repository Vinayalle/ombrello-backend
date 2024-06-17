const nodemailer= require("nodemailer");

module.exports=async(to,subject,text)=>{
//     try{
//         const transporter=nodemailer.createTransport({


//             host:process.env.HOST,
//             service:process.env.SERVICE,
//             post:Number(process.env.EMAIL_PORT),
//             secure:Boolean(process.env.SECURE),
//             auth:{
//                 user:process.env.USER,
//                 pass:process.env.PASS
//             }

   
//         });

//         await transporter.sendMail({
//             from:process.env.USER,
//             to:email,
//             subject:subject,
//             text:text
//         });
//         console.log("email sent Succesfully");
//     }catch(err){
//         console.log(err);
//     }
    
// }

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER, // Your email address
        pass: process.env.PASS, // Your app password
    },
});

try {
    let info = await transporter.sendMail({
        from: `"Your Name" <${process.env.USER}>`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
    });

    console.log('Message sent: %s', info.messageId);
} catch (error) {
    console.error('Error sending email:', error);
}
}