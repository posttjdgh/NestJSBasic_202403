import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

@Injectable()
export class EmailService {
    private transpoter: Mail;

    constructor(){
        this.transpoter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'posttjdgh@gmail.com',
                pass: 'lnzs qpza kxwh pwzg',
            }
        });
    }


    async sendMemberJoinVerification( emailAddress: string, signupVefityToken: string){
        const baseUrl = 'http://localhost:3000';

        const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVefityToken}`;

        const mailOptions: EmailOptions = {
            to: emailAddress,
            subject: '가입 인증 메일',
            html: `
                가입확인 버튼을 부르시면 가입 인증이 완료됩ㄴ디ㅏ.<br/>
                <form action="${url}" method="POST">
                    <button>가입확인</button>
                </form>
            `
        }

        return await this.transpoter.sendMail(mailOptions);
    }

   
    



}
