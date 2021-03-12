import sgMail from '@sendgrid/mail'

export async function sendToken(token:string, email:string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const link = `${process.env.BASE_URL}/auth/verifyemail?token=${token}`

    const msg = {
        to: email,
        from: 'noreply@spanishbit.es',
        subject: 'Verify your account',
        text: `Welcome to Spanish Bites. Copy the following link into your browswer to verify your account: ${link}`,
        html: `<html>
            <body>
            <h1>Welcome to Spanish Bites</h1>
            <p> Click the link below or copy it into your browser to verify your account</p>
            <p><a href=${link}>${link}</a></p>
            </body>
            </html>
        `
    }
    
    await sgMail.send(msg)
}