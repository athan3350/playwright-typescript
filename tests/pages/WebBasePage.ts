import { Page, Locator, TestInfo } from '@playwright/test';
import { promises as fs } from 'fs';
import path from 'path';

export class WebBasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  public async dynamicScroll(postLocator: Locator): Promise<void> {
    await postLocator.evaluate((el: HTMLElement) => {
      const { top, height } = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollOffset = (top + height / 2) - (viewportHeight / 2);
      window.scrollBy({ top: scrollOffset, behavior: 'smooth' });
    });
  }

  public async shortScroll(): Promise<void> {
    await this.page.evaluate(() => {
      const viewportHeight = window.innerHeight;
      window.scrollBy({ top: viewportHeight * 0.70, behavior: 'smooth' });
    });
  }

  public async takeScreenshot(
    folderPath: string,
    findArticle: string,
    idPost: number,
    testInfo: TestInfo
  ): Promise<void> {
    const uniqueId = Date.now();
    const screenshotName = `post_${findArticle.replace(/\s/g, '')}_${idPost + 1}_${uniqueId}.png`;
    const screenshotPath = path.join(folderPath, screenshotName);
    
    await this.page.screenshot({ path: screenshotPath });
    const screenshotBuffer = await fs.readFile(screenshotPath);
    
    await testInfo.attach(`post_${idPost + 1}_${uniqueId}`, {
      body: screenshotBuffer,
      contentType: 'image/png'
    });
  }
}
