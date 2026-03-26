const fs = require('fs');
const PDFParser = require('pdf2json');

function extractText(pdfPath, outPath) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);
        pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
        pdfParser.on("pdfParser_dataReady", pdfData => {
            fs.writeFileSync(outPath, pdfParser.getRawTextContent());
            console.log(`Success: ${outPath}`);
            resolve();
        });
        pdfParser.loadPDF(pdfPath);
    });
}

async function main() {
    await extractText('../Capstone Second Draft.pdf', '../capstone.txt');
    await extractText('../Alpino_SOPS.pdf', '../sops.txt');
    console.log("Done");
}
main();
