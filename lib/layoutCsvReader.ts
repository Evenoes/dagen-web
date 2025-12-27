// Hjelpefunksjon for å bygge ContentRow[] fra en CSV-fil
// Leser CSV-filer på formatet:
// Index,File
// 0,tekst.md
// 0,bilde.png
//
// Index avgjør hilken rekkefølge det skal vises i
// File er path til et bilde eller markdown.fil

import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { LayoutCsvRow } from "@/types";

// Path til CSV-fil som argument, returnerer liste med LayoutCsvRow
export function readLayoutCsv(csvPath: string): LayoutCsvRow[] {
    // Bygger full path til CSV-fil fra root
    const fullCsvPath = path.join(process.cwd(), "content", csvPath);

    // Hvis file ikke finnes / feil path
    if (!fs.existsSync(fullCsvPath)) {
        console.error(`CSV-file for row layout not found ${fullCsvPath}`);
        return [];
    }

    // Leser filen til tekst (utf8)
    const csvFileContent = fs.readFileSync(fullCsvPath, "utf8");

    // Parser fra tekst til LayoutCsvRow-objekter
    const { data } = Papa.parse<LayoutCsvRow>(csvFileContent, {
        // Leser header som eget
        header: true,
        // Hopper over tomme linjer
        skipEmptyLines: true,
        // Gjør header til lower case, just in case. .trim() = .strip() i Python
        transformHeader: (h) => h.toLowerCase().trim(),
        // Fjerner evt. white space i resten av innholdet
        transform: (v) => v?.trim(),
    });

    return data as LayoutCsvRow[];
}