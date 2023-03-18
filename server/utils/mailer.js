const AWS = require("aws-sdk");

const sendEmailNotif_HTML = async (email, mailSubject, body, textBody) => {
    try {
        console.log("SES Mailer HTML")
        const ses = new AWS.SES({
            accessKeyId: process.env.AWS_ACCESS_KEY_1,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_1,
            region: process.env.REGION_1,
        });
        const sesParams = {
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Html: {
                        // HTML Format of the email
                        Charset: "UTF-8",
                        Data: body,
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: textBody,
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: mailSubject,
                },
            },
            Source: '"System Admin" <sysad.revels23@gmail.com>',
            ReplyToAddresses: ["sysad.revels23@gmail.com"],
        };
        const notify = await ses.sendEmail(sesParams).promise();
        console.log(email);
        return {
            success: true,
            message: notify,
        };
    } catch (error) {
        return {
            success: false,
            error: error,
        };
    }
};
const sendEmailNotif_Text = async (email, mailSubject, textBody) => {
    try {
        console.log("SES Mailer Text")
        const ses = new AWS.SES({
            accessKeyId: process.env.AWS_ACCESS_KEY_1,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_1,
            region: process.env.REGION_1,
        });

        const sesParams = {
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Text: {
                        Charset: "UTF-8",
                        Data: textBody,
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: mailSubject,
                },
            },
            Source: '"System Admin" <sysad.revels23@gmail.com>',
        };
        // console.log(sesParams)
        const notify = await ses.sendEmail(sesParams).promise();
        console.log("mailed to: " + email);
        // console.log(notify);
        return {
            success: true,
            message: notify,
        };
    } catch (error) {
        return {
            success: false,
            error: error,
        };
    }
};

module.exports = { sendEmailNotif_HTML, sendEmailNotif_Text };