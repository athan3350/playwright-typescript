import { test as baseTest, Browser, BrowserContext, Page } from '@playwright/test';
import { WebBasePage } from '../pages/WebBasePage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SubredditPage } from '../pages/SubredditPage';
import { GeneralUtils } from '../utils/GeneralUtils';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let webBasePage: WebBasePage;
let loginPage: LoginPage;
let subredditPage: SubredditPage;
let homePage: HomePage;
let generalUtils: GeneralUtils;
let testCaseValue: string;

const test = baseTest.extend<{ page: Page }>({
  page: async ({}, use) => {
    await use(page);
  },
});

test.beforeAll(async ({ browser: pwBrowser }) => {
  browser = pwBrowser;
  context = await browser.newContext();
});

test.beforeEach(async () => {
  page = await context.newPage();
  webBasePage = new WebBasePage(page);
  loginPage = new LoginPage(page);
  subredditPage = new SubredditPage(page);
  homePage = new HomePage(page);
  generalUtils = new GeneralUtils();
  testCaseValue = generalUtils.getTestCaseValue();

  await page.route('https://accounts.google.com/**', (route) => {
    route.abort();
  });
  await webBasePage.navigateTo("https://www.reddit.com");
});

test.afterEach(async () => {
  await page.close();
});

test.afterAll(async () => {
  await context.close();
});

export { test, page, webBasePage, subredditPage, homePage, generalUtils, testCaseValue, loginPage };
