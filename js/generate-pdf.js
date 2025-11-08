// generate-pdf.js
// AQUEST SCRIPT CONVERTEIX EL cv-creator.html EN PDF

const puppeteer = require('puppeteer');  // Navegador headless
const fs = require('fs');                // Sistema d'arxius
const path = require('path');            // Gestió de paths

async function generatePDF() {
    // OBRE UN NAVEGADOR INVISIBLE (headless)
    const browser = await puppeteer.launch({
        headless: true,                      // Sense interfície gràfica
        args: ['--no-sandbox', '--disable-setuid-sandbox']  // Per GitHub Actions
    });
    
    // CREA UNA NOVA PÀGINA (pestanya)
    const page = await browser.newPage();
    
    // LLEGEIX EL cv-creator.html DEL DISC
    const htmlPath = path.resolve('./cv-creator.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // LLEGEIX ELS CSS I ELS INCLOU INLINE
    const cssFiles = [
        './css/variables.css',
        './css/cv-creator.css'
    ];
    
    let inlineCSS = '<style>';
    cssFiles.forEach(cssFile => {
        try {
        const cssContent = fs.readFileSync(cssFile, 'utf8');
        inlineCSS += cssContent + '\n';
        } catch (error) {
        console.log(`CSS no trobat: ${cssFile}`);
        }
    });
    inlineCSS += '</style>';
    
    // SUBSTITUEIX ELS ENLLAÇOS CSS PER CSS INLINE
    htmlContent = htmlContent.replace(/<link[^>]*stylesheet[^>]*>/gi, '');
    htmlContent = htmlContent.replace('</head>', inlineCSS + '</head>');
    
    // CONVERTEIX IMATGES A BASE64 (si en tens)
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
    let match;

    while ((match = imgRegex.exec(htmlContent)) !== null) {
        const originalTag = match[0];
        const src = match[1];
        
        try {
            // Neteja el path
            let imagePath = src.replace(/^\/portfolio\//, './');
            
            if (fs.existsSync(imagePath)) {  // Aquí estava el problema: "existsExists"
                const imageBuffer = fs.readFileSync(imagePath);
                const ext = path.extname(imagePath).toLowerCase();
                let mimeType = 'image/jpeg';
                
                if (ext === '.png') mimeType = 'image/png';
                if (ext === '.gif') mimeType = 'image/gif';
                if (ext === '.svg') mimeType = 'image/svg+xml';
                
                const base64 = imageBuffer.toString('base64');
                const newSrc = `data:${mimeType};base64,${base64}`;
                const newTag = originalTag.replace(src, newSrc);
                
                htmlContent = htmlContent.replace(originalTag, newTag);
                console.log(`Imatge convertida: ${src}`);
            } else {
                console.log(`Imatge no trobada: ${imagePath}`);
            }
        } catch (error) {
            console.log(`Error amb imatge: ${src} - ${error.message}`);
        }
    }

    // CARREGA L'HTML A LA PÀGINA I ESPERA QUE TOT ES CARREGUI
    await page.setContent(htmlContent, {
        waitUntil: 'networkidle0'    // Espera fins que no hi hagi requests pendents
    });
    
    // GENERA EL PDF AMB CONFIGURACIÓ PROFESSIONAL
    const pdfBuffer = await page.pdf({
        format: 'A4',                // Mida A4
        printBackground: true,       // Inclou colors de fons
        margin: {                    // Marges mínims
            top: '2cm',     // Marge superior
            right: '1.5cm', // Marge dret
            bottom: '2cm',  // Marge inferior  
            left: '1.5cm'   // Marge esquerre
        },
        displayHeaderFooter: false, // Sense capçaleres/peus automàtics
        outline: true, // AFEGEIX AQUESTA OPCIÓ PER GENERAR BOOKMARKS
        preferCSSPageSize: true, // I aquesta per millorar els enllaços
        pageRanges: '' // Respecta els page breaks del CSS
    });
    
    // CREA EL DIRECTORI SI NO EXISTEIX (des de l'arrel del projecte)
    const outputDir = path.dirname('./assets/pdfs/cv/victor-ballester-cv.pdf');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // GUARDA EL PDF AL DISC (des de l'arrel del projecte)
    fs.writeFileSync('./assets/pdfs/cv/victor-ballester-cv.pdf', pdfBuffer);
    
    // TANCA EL NAVEGADOR
    await browser.close();
    console.log('PDF generat correctament!');
}

// EXECUTA LA FUNCIÓ I CAPTURA ERRORS
generatePDF().catch(console.error);