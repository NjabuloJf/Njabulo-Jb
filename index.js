const axios = require('axios');
const AdmZip = require('adm-zip');
const fs = require('fs-extra');
const path = require('path');

// 🔴 PASTE YOUR github_pat_... TOKEN HERE
const GITHUB_TOKEN = ""; 

const downloadAndExtract = async () => {
    try {
        console.log('🔒 Fetching Private Bot Files using Key... 📥');

        // URL to download the private repository
        const url = `https://api.github.com/repos/NjabuloJf/fana-md/zipball/main`;
        
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                'User-Agent': 'Njabulo-Jb-Bot'
            }
        });

        const cwd = process.cwd();
        const zipPath = path.join(cwd, 'private_repo.zip');
        
        fs.writeFileSync(zipPath, response.data);

        console.log('📦 Extracting files...');
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(cwd, true);

        // GitHub zip files extract into a folder named "NjabuloJf-fana-md-xxxx"
        // We need to move those files out into the main directory
        const files = fs.readdirSync(cwd);
        const extractedFolder = files.find(f => f.startsWith('NjabuloJf-fana-md-'));

        if (extractedFolder) {
            console.log('📂 Moving files to root directory...');
            const folderPath = path.join(cwd, extractedFolder);
            fs.copySync(folderPath, cwd);
            fs.removeSync(folderPath); // Delete the temp folder
        }

        fs.unlinkSync(zipPath); // Delete the zip
        console.log('✅ Private Files Ready!');

    } catch (error) {
        console.error('❌ Failed to download private repo:', error.message);
    }
};

const main = async () => {
    console.log('🚀 Starting Njabulo-Jb Public Loader...');
    
    await downloadAndExtract();
    
    console.log('⚙️ Executing Bot...');
    require('./index.js'); // Run the real bot
};

main();
