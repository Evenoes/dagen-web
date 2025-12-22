import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { InternGroup } from "../types";

const contentDir = path.join(process.cwd(), "content");

export async function getMarkdownContent(contentName: string): Promise<string> {
  const filePath = path.join(contentDir, `${contentName}.md`);

  if (!fs.existsSync(filePath)) {
    console.error(`Missing markdown file for content: ${contentName}`);
    return "# 404 - Page not found";
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { content } = matter(file);
  return content;
}

export async function getInternGroups(): Promise<InternGroup[]> {
  const internDir = path.join(process.cwd(), "content/intern/interngrupper");
  
  if (!fs.existsSync(internDir)) {
    console.error(`Missing interngrupper directory`);
    return [];
  }

  const files = fs.readdirSync(internDir).filter(file => file.endsWith('.md'));
  
  return files.map(file => {
    const filePath = path.join(internDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content } = matter(fileContent);
    
    return {
      content
    };
  });
}
