import fs from 'fs';
import path from 'path';

export class FileUtils {
  static createFolder(): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const folderName = `posts_${timestamp}`;
    const folderPath = path.join(process.cwd(), folderName);
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Folder Created: ${folderPath}`);
    return folderPath;
  }

  static async generateTitlesLog(folderPath: string, titles: string[]): Promise<void> {
    const logFilePath = path.join(folderPath, 'titles.log');
    const logContent = titles.join('\n');
    await fs.promises.writeFile(logFilePath, logContent, 'utf8');
    console.log(`Titles log created: ${logFilePath}`);
  }
  
}