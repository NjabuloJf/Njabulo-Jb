
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');

if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const path = require("path");
const databasePath = path.join(__dirname, './database.db');

// ========== FIXED DATABASE CONFIGURATION ==========
// Use environment DATABASE_URL first, then fallback
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway";

// Clean the URL - remove any trailing spaces
const cleanDbUrl = DATABASE_URL.trim();

module.exports = { 
    // ========== SESSION CONFIGURATION ==========
    // Your base64 session with njabulo~ prefix
    SESSION_ID: process.env.SESSION_ID || "njabulo~",
    session: process.env.session || "njabulo~",
    
    // ========== FORCE QR MODE ==========
    FORCE_QR: process.env.FORCE_QR || "no",
    
    // ========== PREFIX ==========
    PREFIXE: process.env.PREFIX || ".",
    
    // ========== OWNER INFORMATION ==========
    OWNER_NAME: process.env.OWNER_NAME || "NJABULO JB",
    NUMERO_OWNER: process.env.NUMERO_OWNER || "26777821911",
    NUMERO_OWNERFANA: process.env.NUMERO_OWNERFANA || "26777821911",
    
    // ========== LANGUAGE SETTINGS ==========
    LANGUAGE: process.env.LANGUAGE || "en",
    FOOTBALL_API_KEY: process.env.FOOTBALL_API_KEY || "352fade05a47351eaf530a4bc2c00026",
    GEMINI_API_KEY: process.GEMINI_API_KEY || "AQ.Ab8RN6Icb3MS6aB-r3MrWMlLG8Mu1JXRkhQSL1Nyz_nKfhqzDA",
    POLLINATIONS_API_KEY: process.env.POLLINATIONS_API_KEY || "sk_zH7nKAAmdP8RA0ZZgRUQB3pri9XvwSE0",
    AUDD_API_TOKEN: process.env.AUDD_API_TOKEN || "b132bfc095eb6baf79e759c7f0f981b3",
    HEAVSTAL_API_KEY: process.env.HEAVSTAL_API_KEY || "ht_live_weaJ6WPkcm5lcAfveaHKhToxetFJz3AGRtuTtkItzHnCw7SY",
    ACEDATA_API_KEY: process.env.ACEDATA_API_KEY || "1b2ce7b948ce43bda5eebc549b589e82", 
    AGNES_API_KEY: process.env.AGNES_API_KEY || "sk-0Q1FOogISyQalaLebezGe2qQBsKxaJe5azxSeTDZ1JPCFtxB",
    
    // ========== SPEED OPTIMIZATION ==========
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",
    EMOJIS: process.env.EMOJIS || "👻,☺️,❤️,🦚",
    // ========== BOT INFORMATION ==========
    BOT_NAME: process.env.BOT_NAME || 'NJABULO JB',
    BOT: process.env.BOT_NAME || 'NJABULO JB',
    
    // ========== MEDIA LINKS ==========
    URL: process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/NjabuloJf/njabulo-data/main/njabuloimg/njabuloimg.png',
    GURL: process.env.GURL || 'https://whatsapp.com/channel/0029VbE0fXdBVJkvka7HPw3m',
    WEBSITEOWNER: process.env.WEBSITEOWNER || 'https://njabulo-ai.vercel.app',
    REPOSITORY: process.env.REPOSITORY ||'https://github.com/NjabuloJf/Njabulo-Jb',
    PAIR_API: process.env.PAIR_API || 'https://pairqr-ba69c42c51f7.herokuapp.com',
    GREET : process.env.GREET || "yes",
    // ========== MODE SETTINGS ==========
    MODE: process.env.PUBLIC_MODE || "yes",
    
    // ========== HEROKU SETTINGS ==========
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || 'njabulo-fff30a63bf82',
    HEROKU_APP_URL: process.env.HEROKU_APP_URL || 'https://njabulo-fff30a63bf82.herokuapp.com',
    HEROKU_APY_KEY: process.env.HEROKU_APY_KEY,
    

    // ========== PRESENCE SETTINGS ==========
    // 1 = online, 2 = typing, 3 = recording, empty = unavailable
    ETAT: process.env.PRESENCE || '',
    

    // ========== DISPLAY SETTINGS ==========
    DP: process.env.STARTING_BOT_MESSAGE || "yes",
    
    // ========== DATABASE ==========
    DATABASE_URL: cleanDbUrl,
    DATABASE: cleanDbUrl,
    
    // ========== DATABASE POOL SETTINGS ==========
    DB_POOL_SIZE: parseInt(process.env.DB_POOL_SIZE) || 5,
    DB_IDLE_TIMEOUT: parseInt(process.env.DB_IDLE_TIMEOUT) || 30000,
    DB_CONNECTION_TIMEOUT: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 5000,
    
    // ========== KEEP ALIVE SETTINGS ==========
    KEEP_ALIVE_INTERVAL: parseInt(process.env.KEEP_ALIVE_INTERVAL) || 240000, // 4 minutes
    AUTO_RESTART: process.env.AUTO_RESTART || "yes",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
