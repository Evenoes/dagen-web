// import fs from "fs";
// import path from "path";
// import Papa from "papaparse";
// import { ProgramItem } from "@/types";

// export function getProgramText(filePath: string): ProgramItem[] {
//     const fullPath = path.join(process.cwd(), "content", filePath);

//     if (!fs.existsSync(fullPath)) return [];

//     const csv = fs.readFileSync(fullPath, "utf8");

//     const parsed = Papa.parse<ProgramItem>(csv, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: (h) => h.toLowerCase().trim(),
//     });

//     return parsed.data
//         .map((row) => ({
//             time: row.time?.trim() ?? "",
//             text: row.text?.trim() ?? "",
//         }))
//         .filter((row) => row.time || row.text);
// }