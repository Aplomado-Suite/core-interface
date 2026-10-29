/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  allowedDevOrigins: ['127.0.0.1'],
  env: {
    AUTH_SESSION_KEY: process.env.AUTH_SESSION_KEY,
    AUTH_ENCRYPTION_KEY: process.env.AUTH_ENCRYPTION_KEY,
    AUTH_SESSION_DURATION: process.env.AUTH_SESSION_DURATION,
    API_KEY: process.env.API_KEY,
    APP_NAME: process.env.APP_NAME,
    APP_VERSION: process.env.APP_VERSION,
    DEFAULT_THEME: process.env.DEFAULT_THEME,
    LOCAL_DATA_PATH: process.env.LOCAL_DATA_PATH,
    USER_PREFERENCES_PATH: process.env.USER_PREFERENCES_PATH,
    APP_DATA_PATH: process.env.APP_DATA_PATH,
    ENCRYPTION_ENABLED: process.env.ENCRYPTION_ENABLED,
    MAX_LOGIN_ATTEMPTS: process.env.MAX_LOGIN_ATTEMPTS,
    SESSION_TIMEOUT: process.env.SESSION_TIMEOUT,
    DEV_MODE: process.env.DEV_MODE,
    DEBUG_LOGGING: process.env.DEBUG_LOGGING,
  },
}

module.exports = nextConfig
