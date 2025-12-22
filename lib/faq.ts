import fs from "fs";
import path from "path";
import Papa from "papaparse";
import matter from "gray-matter";

export type FAQ = {
  question: string;
  answer: string;
};

export async function getFAQs(faqDirectory: string): Promise<FAQ[]> {
  const csvPath = path.join(process.cwd(), `content/${faqDirectory}/faq.csv`);
  const faqDir = path.join(process.cwd(), `content/${faqDirectory}`);
  
  if (!fs.existsSync(csvPath)) {
    console.error(`FAQ CSV file not found at ${csvPath}`);
    return [];
  }

  const fileContent = fs.readFileSync(csvPath, "utf8");
  const { data } = Papa.parse<string[]>(fileContent, {
    skipEmptyLines: true,
  });

  return data.map((row) => {
    const [question, filename] = row;
    const mdPath = path.join(faqDir, `${filename}.md`);
    
    if (!fs.existsSync(mdPath)) {
      console.error(`FAQ markdown file not found: ${mdPath}`);
      return { question, answer: "" };
    }

    const file = fs.readFileSync(mdPath, "utf8");
    const { content } = matter(file);
    
    return {
      question,
      answer: content,
    };
  });
}
