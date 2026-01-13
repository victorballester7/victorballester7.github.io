import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, rmSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function imageToBase64(imagePath) {
    const ext = imagePath.split('.').pop().toLowerCase();
    const imageContent = readFileSync(imagePath);
    const mimeType = ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/svg+xml';
    return `data:${mimeType};base64,${imageContent.toString('base64')}`;
}

async function generatePDF() {
    console.log('🚀 Generating CV PDF...');
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Rutas
    const htmlPath = join(__dirname, '../dist/cv-temp/index.html');
    const distPath = join(__dirname, '../dist');
    
    console.log(`📄 Loading HTML from: ${htmlPath}`);
    
    // Leer el HTML
    let htmlContent = readFileSync(htmlPath, 'utf-8');
    
    // Función para reemplazar imágenes con base64
    const replaceImages = (html) => {
        // Buscar todas las imágenes src="/images/..."
        const imgRegex = /src="\/images\/([^"]+)"/g;
        let match;
        
        while ((match = imgRegex.exec(html)) !== null) {
            const imagePath = match[1];
            const fullPath = join(distPath, 'images', imagePath);
        
            if (existsSync(fullPath)) {
                try {
                const base64 = imageToBase64(fullPath);
                html = html.replace(match[0], `src="${base64}"`);
                console.log(`✓ Converted image: ${imagePath}`);
                } catch (error) {
                console.error(`✗ Failed to convert: ${imagePath}`, error.message);
                }
            } else {
                console.warn(`⚠ Image not found: ${fullPath}`);
            }
        }
        
        return html;
    };
    
    htmlContent = replaceImages(htmlContent);
    
    // Cargar el HTML modificado
    await page.setContent(htmlContent, { 
        waitUntil: 'networkidle0',
        timeout: 30000
    });

    // Inyectar estilos
    const variablesCSS = readFileSync(join(__dirname, '../src/styles/variables.css'), 'utf-8');
    const cvPdfCSS = readFileSync(join(__dirname, '../src/styles/cv-pdf.css'), 'utf-8');
    
    await page.addStyleTag({ content: variablesCSS });
    await page.addStyleTag({ content: cvPdfCSS });
    
    // Crear la carpeta si no existe
    const pdfDir = join(__dirname, '../dist/pdfs/cv');
    if (!existsSync(pdfDir)) {
        mkdirSync(pdfDir, { recursive: true });
    }
    
    const pdfPath = join(pdfDir, 'victor-ballester-cv.pdf');
    
    // Generar PDF
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true
    });
    
    await browser.close();
    console.log('✅ CV PDF generated successfully at:', pdfPath);
    
    // Eliminar la carpeta cv-temp después de generar el PDF
    const cvTempDir = join(__dirname, '../dist/cv-temp');
    if (existsSync(cvTempDir)) {
        rmSync(cvTempDir, { recursive: true, force: true });
        console.log('🗑️  Removed temporary cv-temp folder');
    }
    
    // También eliminar el CSS generado para cv-temp si existe
    const astroDir = join(__dirname, '../dist/_astro');
    if (existsSync(astroDir)) {
        const fs = await import('fs/promises');
        const files = await fs.readdir(astroDir);
        
        for (const file of files) {
            if (file.includes('cv-temp')) {
                const filePath = join(astroDir, file);
                await fs.unlink(filePath);
                console.log(`🗑️  Removed temporary file: ${file}`);
            }
        }
    }
}

generatePDF().catch(error => {
    console.error('❌ Error generating PDF:', error);
    process.exit(1);
});