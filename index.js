const fs = require('fs-extra');
const path = require('path');
const { File } = require('megajs');
const AdmZip = require('adm-zip');

// Your Mega Link
const MEGA_ZIP_LINK = "https://mega.nz/file/wEwB3SCK#36N0E_9zzjHveRiNh78JmB8MZSNusMSqXS1GUr_KqVw";

const downloadAndExtract = (megaLink) =>
  new Promise((resolve, reject) => {
    try {
      console.log('🔒 Downloading Private Bot Files from Mega... 📥');

      const file = File.fromURL(megaLink);
      const cwd = process.cwd();
      const zipPath = path.join(cwd, 'private_bot.zip');

      file.download((err, data) => {
        if (err) return reject(err);

        fs.writeFileSync(zipPath, data);

        console.log('📦 Extracting files...');
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(cwd, true); 
        
        // 🟢 THE FIX: Move files out of the 'fana-md-main' folder to the root
        const extractedFolder = path.join(cwd, 'fana-md-main');
        if (fs.existsSync(extractedFolder)) {
            console.log('📂 Moving files to root directory...');
            fs.copySync(extractedFolder, cwd);
            fs.removeSync(extractedFolder); // Delete the empty folder
        }

        fs.unlinkSync(zipPath);      
        console.log('✅ Private Files Extracted Successfully!');
        resolve();
      });
    } catch (e) {
      reject(e);
    }
  });

const main = async () => {
  try {
    console.log('🚀 Starting Njabulo-Jb Public Loader...');
    
    await downloadAndExtract(MEGA_ZIP_LINK);

    console.log('⚙️ Executing Bot...');
    
    // Start your real bot
    require('./index.js'); 
    
  } catch (err) {
    console.error('❌ An error occurred:', err.message);
  }
};

main();
