import { Page, Locator } from '@playwright/test';
import { WebBasePage } from './WebBasePage';
import { FileUtils } from '../utils/FileUtils';

export class SubredditPage {
  private readonly page: Page;
  private readonly webBasePage: WebBasePage;
  private readonly batchArticlesLocator: Locator;
  private readonly preLoadedArticlesLocator: Locator;
  private postTitles: string[] = [];

  constructor(page: Page) {
    this.page = page;
    this.webBasePage = new WebBasePage(page);
    this.batchArticlesLocator = page.locator(
      "#main-content > div:nth-child(4) > shreddit-feed > faceplate-batch > article"
    );
    this.preLoadedArticlesLocator = page.locator(
      "#main-content > div:nth-child(4) > shreddit-feed > article"
    );
  }


  private async getAllArticles(): Promise<Locator[]> {
    await this.preLoadedArticlesLocator.first().waitFor({ state: 'visible' });
    const preLoadedArticles = await this.preLoadedArticlesLocator.all();

    await this.webBasePage.shortScroll();
    await this.batchArticlesLocator.first().waitFor({ state: 'visible' });
    const batchArticles = (await this.batchArticlesLocator.all()).slice(0, 7);

    return [...preLoadedArticles, ...batchArticles];
  }


  async getTitles(): Promise<string[]> {
    const articles = await this.getAllArticles();
    this.postTitles = await Promise.all(
      articles.map(article =>
        article.locator("a[slot='title']").first().innerText()
      )
    );
    return this.postTitles;
  }


  async getFilteredTitlesCount(keyword: string): Promise<number> {
    return this.postTitles.filter(title =>
      title.toLowerCase().includes(keyword.toLowerCase())
    ).length;
  }


  private async getPostLocatorByTitle(locator: Locator, titleText: string): Promise<Locator> {
    const sanitizedTitle = titleText.replace(/(["\\])/g, '\\$1');
    return locator.locator(`shreddit-post[post-title="${sanitizedTitle}"]`).first();
  }


  private async clickShadowUpvoteButton(postLocator: Locator): Promise<boolean> {
    await postLocator.waitFor({ state: 'visible' });
    const shadowButtonHandle = await postLocator.evaluateHandle(host =>
      host.shadowRoot?.querySelector("button[upvote]")
    );
    if (!shadowButtonHandle) return false;

    await shadowButtonHandle.evaluate((button: HTMLElement) => button.click());
    const isLiked = await shadowButtonHandle.evaluate(
      (el: Element) => el.getAttribute("aria-pressed") === "true"
    );
    await shadowButtonHandle.dispose();
    return isLiked;
  }


  async upvoteFavoritePosts(testCaseValue: string, screenshotsFolder: string, testInfo: any): Promise<number> {
    let totalLikes = 0;
    const articles = await this.getAllArticles();
    const titles = await this.getTitles();
    console.log("tittles...", titles);
    
    await FileUtils.generateTitlesLog(screenshotsFolder, titles.filter(title =>
      title.toLowerCase().includes(testCaseValue.toLowerCase())))

    for (const [index, title] of titles.entries()) {
      if (!title.toLowerCase().includes(testCaseValue.toLowerCase())) continue;

      const postLocator = await this.getPostLocatorByTitle(articles[index], title);
      if (await postLocator.count() === 0) continue;

      await this.webBasePage.dynamicScroll(postLocator);

      if (await this.clickShadowUpvoteButton(postLocator)) totalLikes++;
      await this.webBasePage.takeScreenshot(screenshotsFolder, testCaseValue, index, testInfo);
      await this.clickShadowUpvoteButton(postLocator);
    }
    return totalLikes;
  }
}
