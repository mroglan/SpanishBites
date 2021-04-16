import sgMail from '@sendgrid/mail'

export async function sendEmail(emailTo:string, emailFrom:string, templateId:string, templateData) {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: emailTo,
        from: emailFrom,
        templateId,
        dynamic_template_data: templateData
    }

    await sgMail.send(msg)
}

export async function sendToken(token:string, email:string) {

    const link = `${process.env.BASE_URL}/auth/verifyemail?token=${token}`

    await sendEmail(email, 'noreply@spanishbit.es', 'd-78f676c691bf4e38a1158fd474871f93', {link})
}

export async function sendPasswordResetToken(token:string, email:string) {

    const link = `${process.env.BASE_URL}/auth/forgotpassword?token=${token}`

    await sendEmail(email, 'noreply@spanishbit.es', 'd-bece4c51f0a54ce09889081f62aaa02a', {link})
}