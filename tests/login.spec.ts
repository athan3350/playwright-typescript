import { test } from '@playwright/test';
import { subredditPage, homePage, testCaseValue, loginPage } from './support/hooks';
import { expect } from '@playwright/test';
import { FileUtils } from './utils/FileUtils';

let totalLikes: number;

test('Validate that it is possible to upvote favorite posts from the r/Aww subreddit.', async ({ }, testInfo) => {
  const screenshotsFolder: string = FileUtils.createFolder();
  totalLikes = 0;

  await test.step('Sebastian tries to log in to Reddit', async () => {
    await loginPage.login();
    await loginPage.assertLoginSuccessful();
  });

  await test.step('Sebastian searches for a subreddit', async () => {
    await homePage.searchSubreddit('Awww');
  });

  await test.step('Sebastian upvotes posts he likes', async () => {
    totalLikes = await subredditPage.upvoteFavoritePosts(testCaseValue, screenshotsFolder, testInfo);
  });

  await test.step('Sebastian checks all his favorite posts are upvoted.', async () => {
    const expectedLikes = await subredditPage.getFilteredTitlesCount(testCaseValue);
    console.log(`Number of titles expected: ${expectedLikes} vs Number of titles upvoted: ${totalLikes}`);
    expect(totalLikes, `The number of liked posts does not match. Expected ${expectedLikes}, but got ${totalLikes}`).toBe(expectedLikes);
  });
});
