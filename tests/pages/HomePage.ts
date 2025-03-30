import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInputLocator: Locator;
  readonly subredditLink: (subreddit: string) => Locator;
  readonly loginModalButtonLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInputLocator = page.locator('#search-input span').nth(3);
    this.subredditLink = (subreddit: string) =>
      page.locator(`a[href="/r/${subreddit}/"] img`).first();
    this.loginModalButtonLocator = page.locator('auth-flow-modal button.login');
  }

  async searchSubreddit(subreddit: string): Promise<void> {
    await this.loginModalButtonLocator.waitFor({ state: 'hidden' });

    await this.searchInputLocator.fill(`/r/${subreddit}`);
    await this.searchInputLocator.press('Enter');
    await expect(this.subredditLink(subreddit)).toBeVisible();
    await this.subredditLink(subreddit).click();
  }
}
