import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailHandler {

    private transporter: nodemailer.Transporter;
    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('SMTP_HOST'),
            port: 465,
            secure: true,
            tls: { rejectUnauthorized: false },
            auth: {
                user: this.configService.get<string>('SMTP_USERNAME'),
                pass: this.configService.get<string>('SMTP_PASSWORD')
            }
        });
    }

    async sendMail(to: string | string[], subject: string, html: string, from: string = this.configService.get<string>('appName'))
    : Promise<any> {
        return await this.transporter.sendMail({from, to, subject, html});
    }
}
