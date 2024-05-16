export const AppConfig = () => ({
    PORT: process.env.PORT || 3500,
    DATABASE_URL: process.env.DATABASE_URL || `mongodb+srv://chudalu:GvMkLmuaE7cSGOdR@payever.tybcaz6.mongodb.net/?retryWrites=true&w=majority&appName=payever`,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'PAYEVERKEY069613443223222',
});