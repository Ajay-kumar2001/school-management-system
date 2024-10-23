import nodemailer from "nodemailer";

export const sendemail = async (body: any): Promise<any> => {
    try {
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS  
            }
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.EMAIL_USER, 
            to: body.toRecepients,         
            cc: '',                         
            bcc: '',                       
            replyTo: '',                   
            subject: body.subject,         
            html: '<h1>This is an HTML email</h1>',
            text: 'This is a test email sent using Nodemailer with Reply-All support.', 

            // attachments: [
            //     {
            //         filename: 'file.txt', // Name of the file to be sent
            //         content: 'Hello World!' // Content of the file
            //     },
            //     {
            //         path: 'path/to/image.jpg' // Path to a file on the disk
            //     }
            // ]
        };

        // Send the email
        const emailResponse = await transporter.sendMail(mailOptions);
        return emailResponse.response
            ? { error: false, message: "Email sent successfully" }
            : { error: true, message: "Something went wrong; could not send the email" };
    } catch (error: any) {
        return { error: true, message: error.message };
    }
};
