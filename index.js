const fs = require('fs-extra');
const path = require('path');
const { File } = require('megajs');
const AdmZip = require('adm-zip');

// Your Mega Link is inserted here
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

        // Save the zip file
        fs.writeFileSync(zipPath, data);

        // Extract the zip
        console.log('📦 Extracting files...');
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(cwd, true); // true = overwrite existing files
        fs.unlinkSync(zipPath);      // Delete the zip after extracting

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
    
    // Download and extract the private files
    await downloadAndExtract(MEGA_ZIP_LINK);

    console.log('⚙️ Executing Bot...');
    
    // 🔴 RUN YOUR MAIN FILE (change to ./index.js if that is your main file)
    require('./index.js'); 
    
  } catch (err) {
    console.error('❌ An error occurred:', err.message);
  }
};

main();
