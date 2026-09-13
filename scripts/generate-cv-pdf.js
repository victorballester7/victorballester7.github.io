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

// Chrome escribe un objeto /Type /Page por página; /Count es el respaldo.
function countPdfPages(pdf) {
    const raw = Buffer.from(pdf).toString('latin1');
    const pages = (raw.match(/\/Type\s*\/Page[^s]/g) || []).length;
    if (pages > 0) return pages;
    
    const count = raw.match(/\/Count\s+(\d+)/);
    return count ? Number(count[1]) : 1;
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
    
    const pdfOptions = {
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true
    };
    
    // El pie va anclado al final de la última página, así que primero se
    // imprime sin él para saber cuántas páginas ocupa el contenido y cuánto
    // mide el pie. Esos dos datos se le pasan al CSS como variables.
    const hiddenFooter = await page.addStyleTag({ content: 'footer { display: none }' });
    const probe = await page.pdf(pdfOptions);
    await hiddenFooter.evaluate(style => style.remove());
    
    const totalPages = countPdfPages(probe);
    const footerHeight = await page.evaluate(
        () => Math.ceil(document.querySelector('footer').getBoundingClientRect().height)
    );
    
    await page.addStyleTag({
        content: `:root { --total-pages: ${totalPages}; --footer-height: ${footerHeight}px; }`
    });
    console.log(`📐 ${totalPages} page(s), footer ${footerHeight}px tall`);
    
    // Si el contenido llega hasta el pie, hay que recortar algo
    const overlap = await page.evaluate(() => {
        const main = document.querySelector('main').getBoundingClientRect().bottom;
        const footer = document.querySelector('footer').getBoundingClientRect().top;
        return Math.ceil(main - footer);
    });
    if (overlap > 0) {
        console.warn(`⚠ The content overlaps the footer by ${overlap}px`);
    }
    
    // Generar PDF
    await page.pdf({ path: pdfPath, ...pdfOptions });
    
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