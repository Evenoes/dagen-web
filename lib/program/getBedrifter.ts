import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { BedriftItem } from "@/types";

const ALLOWED_EXTS = ["svg", "png", "jpg", "jpeg", "webp", "avif", "gif"] as const;

function fileExistsInPublic(relativeToPublic: string): boolean {
  const full = path.join(process.cwd(), "public", relativeToPublic);
  return fs.existsSync(full);
}

function normalizeCompanyNameToFileBase(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\p{L}\p{N}_-]/gu, "");
}

function findLogoFilename(name: string, logoFromCsv?: string): string | null {
  const tried: string[] = [];

  // 1) Prøv logo-feltet direkte (om det finnes)
  const logoRaw = (logoFromCsv ?? "").trim();
  if (logoRaw) {
    // Hvis den allerede har endelse: prøv den
    if (logoRaw.includes(".")) {
      const rel = path.posix.join("logos", logoRaw);
      tried.push(rel);
      if (fileExistsInPublic(rel)) return logoRaw;
    } else {
      // Hvis den mangler endelse: prøv med alle endelser
      for (const ext of ALLOWED_EXTS) {
        const filename = `${logoRaw}.${ext}`;
        const rel = path.posix.join("logos", filename);
        tried.push(rel);
        if (fileExistsInPublic(rel)) return filename;
      }
    }
  }

  // 2) Fallback: {navn}_logo.{suffix}
  const base = normalizeCompanyNameToFileBase(name);
  for (const ext of ALLOWED_EXTS) {
    const filename = `${base}_logo.${ext}`;
    const rel = path.posix.join("logos", filename);
    tried.push(rel);
    if (fileExistsInPublic(rel)) return filename;
  }

  return null;
}

export function getBedrifter(filePath: string): BedriftItem[] {
  const fullPath = path.join(process.cwd(), "content", filePath);
  if (!fs.existsSync(fullPath)) return [];

  const csv = fs.readFileSync(fullPath, "utf8");

  const parsed = Papa.parse<BedriftItem>(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.toLowerCase().trim(),
  });

  const missing: string[] = [];

  const items = (parsed.data ?? [])
    .map((row) => ({
      name: row.name?.trim() ?? "",
      logo: row.logo?.trim() ?? "",
    }))
    .filter((row) => row.name)
    .map((row) => {
      const found = findLogoFilename(row.name, row.logo);
      if (!found) {
        missing.push(row.name);
        return null;
      }
      return { name: row.name, logo: found } satisfies BedriftItem;
    })
    .filter((x): x is BedriftItem => x !== null);

  for (const name of missing) {
    console.error(`[getBedrifter] Fant ikke logo for: ${name}`);
  }

  return items;
}
