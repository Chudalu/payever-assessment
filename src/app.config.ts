export const AppConfig = () => ({
    PORT: process.env.PORT || 3500,
    APP_NAME: process.env.APP_NAME || 'Payever',
    WEBSITE_URL: process.env.WEBSITE_URL || 'Payever Assessment',
    SMTP_HOST: process.env.SMTP_HOST || `mail.chudaluezenwafor.com`,
    SMTP_USERNAME: process.env.SMTP_USERNAME || `fivehiver@chudaluezenwafor.com`,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || `fivehiver123`,
    DATABASE_URL: process.env.DATABASE_URL || `mongodb+srv://chudalu:GvMkLmuaE7cSGOdR@payever.tybcaz6.mongodb.net/?retryWrites=true&w=majority&appName=payever`,
});