// Leser layout fra en CSV-fil og lager rader med bilder og/eller markdown-tekst
//
// CSV-filen ser slik ut:
//   Index,File,ButtonHref,ButtonLabel
//   0,hjem/tekst.md,/bedrift,Les mer
//   0,bilde.png,,
//   1,annen-tekst.md,#row-2,Gå til neste
//
// VIKTIG:
// - Markdown-filer (.md) forventes å ligge i content-mappen
// - Bilder forventes å ligge i public-mappen

import fs from "fs";
import path from "path";
import Papa from "papaparse";
import matter from "gray-matter";
import { ContentItem, ContentRow, LayoutCsvRow } from "@/types";


// Leser en CSV-fil og gjør den om til en liste med objekter

function readCsvFile(csvPath: string): LayoutCsvRow[] {
    // Bygger full path til CSV-fil fra root (process.cwd() = roten av prosjektet)
    const fullCsvPath = path.join(process.cwd(), "content", csvPath);

    // Hvis filen ikke finnes / feil path
    if (!fs.existsSync(fullCsvPath)) {
        console.error(`CSV-file for row layout not found ${fullCsvPath}`);
        return [];
    }

    // Leser filen til tekst (utf8 = vanlig tekstkoding)
    const csvFileContent = fs.readFileSync(fullCsvPath, "utf8");

    // Papa.parse gjør CSV-tekst om til objekter
    const { data } = Papa.parse<LayoutCsvRow>(csvFileContent, {
        header: true,               
        skipEmptyLines: true,       // Hopper over tomme linjer
        transformHeader: (h) => h.toLowerCase().trim(),
        transform: (v) => v?.trim(),  // .trim() = .strip() i Python
    });

    return data as LayoutCsvRow[];
}


// Sjekker om en href er et tall (index) eller en vanlig link
// Hvis ref = "2"      → returnerer "#row-2" (ankerpunkt på samme side)
// Hvis ref = "/bedrift" → returnerer "/bedrift" (link til annen side)
// Hvis ref = null     → returnerer null (ingen knapp)

function resolveButtonHref(ref?: string | null): string | null {
    if (!ref) return null;

    // Regex /^\d+$/ sjekker om ref kun består av tall (0-9)
    // ^ = start, \d = digit, + = ett eller flere, $ = slutt
    if (/^\d+$/.test(ref)) {
        return `#row-${ref}`;
    }

    // Ikke tall
    return ref;
}


// Leser CSV-filen og lager listen av ContentRow
export function getContentRowLayout(csvPath: string): ContentRow[] {
    
    // Les CSV-filen
    const rows: LayoutCsvRow[] = readCsvFile(csvPath);

    // Grupper filer etter index (som ordbok)
    const grouped: { [key: number]: ContentItem[] } = {};

    // Looper igjennom alle radene fra CSV-filen
    for (const row of rows) {

        // Hopper over ugyldige rader (mangler index eller fil)
        if (!row.index || !row.file) {
            continue;
        }

        // parseInt(tekst, 10) = int(tekst) i Python (10 = decimal)
        const index = parseInt(row.index, 10);

        // Hopper over hvis index ikke er et tall (isNaN = is Not a Number)
        if (isNaN(index)) {
            continue;
        }

        // Hvis det ikke finnes en liste for denne indexen enda, lag en
        if (!grouped[index]) {
            grouped[index] = [];
        }

        // Hvis filnavnet ender med ".md" - Behandles som markdown-tekst
        // Hvis ikke - anta at det er et bilde (Kunne vært bedre fail safe hvis brukergruppen var større)
        const isMarkdown = row.file.toLowerCase().endsWith(".md");

        // Lag id for raden (brukes av knapper for å scrolle til riktig sted)
        const rowId = `row-${index}`; // f.eks. "row-0", "row-1"

        // Hvis buttonhref, settes ref eller null
        const buttonHref = resolveButtonHref(row.buttonhref ?? null);
        const buttonLabel = row.buttonlabel && row.buttonlabel.length > 0 ? row.buttonlabel : null;

        // Relativ størrelse på elementet, f.eks: 2:8 fordeling, ett får 20% bredde det andre 80%
        let size: number | null = null;
        if (row.size) {
            const parsed = parseInt(row.size, 10);
            if (!isNaN(parsed)) {
                size = Math.min(8, Math.max(2, parsed));
            }
        }

        if (isMarkdown) {
            // Lag full path til markdown-filen
            const mdPath = path.join(process.cwd(), "content", row.file);

            // Sjekk at filen faktisk eksisterer
            if (fs.existsSync(mdPath)) {
                // Les filen til tekst (utf8)
                const mdContent = fs.readFileSync(mdPath, "utf8");
                
                // Gray-matter fjerner metadata fra markdown-filer
                // F.eks. hvis filen har:
                //   ---
                //   title: Min side
                //   ---
                //   # Hei
                // Så gir content bare "# Hei" (uten metadata)
                const { content } = matter(mdContent);

                // Legg til i ordboken
                grouped[index].push({
                    type: "markdown",
                    content,
                    buttonHref,
                    buttonLabel,
                    rowId,
                    size,
                });
            } else {
                // Filen finnes ikke
                console.error(`Markdown file not found: ${mdPath}`);
            }
            
        } else {
            // Hvis det er et bilde
            // Vi lagrer bare path til bildet
            grouped[index].push({
                type: "image",
                content: row.file,
                buttonHref,
                buttonLabel,
                rowId,
                size,
            });
        }
    }

    // Sorter og returner
    return Object.keys(grouped)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))  // Sorter numerisk
        .map((key) => grouped[parseInt(key, 10)]);           // Hent verdiene
}