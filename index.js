const axios = require('axios');
const AdmZip = require('adm-zip');
const fs = require('fs-extra');
const path = require('path');

// 🔒 The token is safely hidden in the Spaceify panel, not in this file!
const GITHUB_TOKEN =""; 

const downloadAndExtract = async () => {
    try {
        console.log('🔒 Fetching Private Bot Files using Key... 📥');

        if (!GITHUB_TOKEN) {
            throw new Error("GITHUB_TOKEN is missing! Please add it in your Spaceify panel Startup variables.");
        }

        // URL to download your private repo
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
        
        // Save the downloaded zip
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
            fs.removeSync(folderPath); // Delete the temporary folder
        }

        fs.unlinkSync(zipPath); // Delete the zip file
        console.log('✅ Private Files Ready!');

    } catch (error) {
        console.error('❌ Failed to download private repo:', error.message);
    }
};

const main = async () => {
    console.log('🚀 Starting Njabulo-Jb Public Loader...');
    
    // Download and extract the private files
    await downloadAndExtract();
    
    console.log('⚙️ Executing Bot...');
    
    // Run the real bot
    require('./index.js'); 
};

main();
