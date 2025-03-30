import { testData } from '../fixtures/testData';

export class GeneralUtils {
  private testCaseKey: string;

  constructor() {
    this.testCaseKey = process.env.TEST_CASE as keyof typeof testData;

    if (!this.testCaseKey || !testData[this.testCaseKey]) {
      throw new Error(
        `TEST_CASE "${this.testCaseKey}" is not valid. Use one of: ${Object.keys(testData).join(', ')}`
      );
    }
  }

  public getTestCaseValue(): string {
    return testData[this.testCaseKey];
  }
}