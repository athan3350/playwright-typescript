# QA Automation Engineer Technical Challenge

Welcome to the coding challenge for the QA Automation Engineer position at Vetspire! In this exercise, you'll use [Playwright](https://playwright.dev/) to automate a real-world test scenario involving Reddit. The goal is not just to complete every requirement, but to demonstrate how you think through automating complex, dynamic user flows.

---

### 🛠 Installation and Setup

**1. Install Dependencies**  
Ensure you have Node.js and npm installed. Then run:

```bash
npm install
```

**2. Install Playwright Browsers**
```bash
npx playwright install
```

You can refer to the [Playwright Documentation](https://playwright.dev/docs/api/class-test) as needed. Feel free to use any external resources or tools (including ChatGPT) that help you work through the challenge.

You can use the provided architecture as a starting point, or create your own structure (Like POM).

---

### ✅ Test Scenario

> **Note**: You will need to create a Reddit account to complete some of the steps (like logging in and upvoting posts).

Please automate the following test scenario:

1. **Navigate to** `reddit.com`
2. **Log in** to Reddit
3. **Search** for `r/aww` or a similar wholesome subreddit
4. **Extract** all post titles from the subreddit page and **log** them to the console
5. **Upvote** any post with a title that contains the keyword `dog` (or a similar pet-related keyword)
6. **Assert** that the number of upvoted posts matches the number of posts containing the keyword

---

### 🌟 Bonus Tasks (Optional)

If you complete the main scenario and want to go a step further:

- **📸 Screenshot Capture**: Take a screenshot of each upvoted post and save it to a designated folder
- **📝 Logging**: Create a log file that records the titles of all upvoted posts

---

### 🔍 What We’re Looking For

This isn’t a “finish every checkbox” type of challenge. We're more interested in how you approach:

- **Problem-solving**
- **Handling edge cases** (e.g., login issues, lazy-loaded content, changing DOM)
- **Error handling**
- **Parameterization and reusability**
- **Bot detection workarounds** (Reddit is known for them! Hint: Consider saving localstorage to an auth file)
- **Dealing with shadow DOMs and dynamic selectors**
- **Writing clean, modular, and readable code using best practices**

---

### 💡 Tips

- If you're stuck, don't hesitate to reach out! We're here to support you.  
  Contact: **James Kip** at [james.kip@vetspire.com](mailto:james.kip@vetspire.com)
  
- Don’t feel pressured to complete every single task. This challenge is meant to simulate a tough real-world automation scenario and assess your thinking, not perfection.

- If you can't automate the login step due to bot detection, you can add a manual step to log in before running the rest of the script.

- We fully understand that you're a human and have a life outside of this. If you need extra time, just reach out and let us know — this will not affect your evaluation.

- Provide a brief explanation of your approach, any challenges you faced, and any assumptions you made. This will help us understand your thought process.

---

Thanks again for your interest in joining Vetspire. We’re excited to see how you think through and approach challenges like this!

Good luck 🐾