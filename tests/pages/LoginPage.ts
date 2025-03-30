import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly loginLinkLocator: Locator;
    private readonly emailInputLocator: Locator;
    private readonly passwordInputLocator: Locator;
    private readonly loginButtonLocator: Locator;
    private readonly userProfileButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLinkLocator = page.getByRole('link', { name: 'Log In' });
        this.emailInputLocator = page.getByRole('textbox', { name: 'Email or username' });
        this.passwordInputLocator = page.getByRole('textbox', { name: 'Password' });
        this.loginButtonLocator = page.getByRole('button', { name: 'Log In' });
        this.userProfileButtonLocator = page.locator('faceplate-tooltip > activate-feature');
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async login(email?: string, password?: string): Promise<void> {
        const loginEmail = email || process.env.USER;
        const loginPassword = password || process.env.PASSWORD;
      
        if (!loginEmail || !loginPassword) {
          throw new Error('Email and/or password not provided and environment variables are missing.');
        }
      
        await this.loginLinkLocator.click();
        await expect(this.emailInputLocator).toBeVisible();
        await this.emailInputLocator.fill(loginEmail);
        await this.passwordInputLocator.fill(loginPassword);
        await this.loginButtonLocator.click();
      }

    async assertLoginSuccessful(): Promise<void> {
        await expect(this.userProfileButtonLocator).toBeVisible();
    }
}
