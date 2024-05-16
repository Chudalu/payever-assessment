import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt/bcrypt.service';
import { MailHandler } from './mailer/mail.handler';

@Module({
  providers: [
    BcryptService,
    MailHandler,
  ],
  exports: [
    MailHandler,
    BcryptService
  ]
})
export class UtilitiesModule {}
