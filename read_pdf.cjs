const fs = require('fs');
const pdfParse = require('pdf-parse');

async function parsePdf(pdfPath, outPath) {
    try {
        let dataBuffer = fs.readFileSync(pdfPath);
        let data = await pdfParse(dataBuffer);
        fs.writeFileSync(outPath, data.text);
        console.log(`Successfully extracted ${pdfPath} to ${outPath}`);
    } catch (e) {
        console.error(`Error reading ${pdfPath}:`, e);
    }
}

async function main() {
    await parsePdf('C:/Users/Student/Desktop/alpino/Capstone Second Draft.pdf', 'C:/Users/Student/tmp_capstone_text.txt');
    await parsePdf('C:/Users/Student/Desktop/alpino/Alpino_SOPS.pdf', 'C:/Users/Student/tmp_sops_text.txt');
}

main();
