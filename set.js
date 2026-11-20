
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
