import fs from "fs";
import path from "path";
import Papa from "papaparse";
import matter from "gray-matter";
import { ContentItem, ContentRow } from "../types";

export async function getHomePageLayout(csvPath: string): Promise<ContentRow[]> {
  const fullPath = path.join(process.cwd(), `content/${csvPath}`);
  
  if (!fs.existsSync(fullPath)) {
    console.error(`CSV file not found: ${fullPath}`);
    return [];
  }

  const fileContent = fs.readFileSync(fullPath, "utf8");
  const { data } = Papa.parse<string[]>(fileContent, {
    skipEmptyLines: true,
  });

  // Group items by index
  const grouped: { [key: number]: ContentItem[] } = {};

  data.forEach((row) => {
    const [indexStr, contentPath] = row;
    
    // Skip invalid rows
    if (!indexStr || !contentPath) {
      return;
    }
    
    const index = parseInt(indexStr, 10);
    
    // Skip rows with invalid index
    if (isNaN(index)) {
      return;
    }

    if (!grouped[index]) {
      grouped[index] = [];
    }

    // Check if it's a markdown file, otherwise assume it's an image
    const isMarkdown = contentPath.toLowerCase().endsWith('.md');

    if (isMarkdown) {
      // It's a markdown file - read and parse it
      const mdPath = path.join(process.cwd(), `content/${contentPath}`);
      
      if (fs.existsSync(mdPath)) {
        const mdContent = fs.readFileSync(mdPath, "utf8");
        const { content } = matter(mdContent);
        
        grouped[index].push({
          type: "markdown",
          content,
        });
      } else {
        console.error(`Markdown file not found: ${mdPath}`);
      }
    } else {
      // It's an image - just store the path
      grouped[index].push({
        type: "image",
        content: contentPath,
      });
    }
  });

  // Convert to array sorted by index
  return Object.keys(grouped)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((key) => grouped[parseInt(key)]);
}
