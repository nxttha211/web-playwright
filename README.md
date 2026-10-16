# Web and API Test Automation with Playwright

![Playwright Tests](https://github.com/nxttha211/web-playwright/actions/workflows/playwright.yml/badge.svg)

Hi, I'm Natthaphon. This project is a small test automation framework built with Playwright and TypeScript. It has UI tests for [Sauce Demo](https://www.saucedemo.com), a practice shop made by Sauce Labs, and API tests for [DummyJSON](https://dummyjson.com), a practice REST API.

I tried to keep the tests easy to read. Each test is a few lines of steps followed by `expect` checks, and every element lives in the page object under `el`, for example `loginPage.el.errorMessage`.

```ts
test('TC_03 ไม่กรอกอะไรเลย', { tag: ['@login'] }, async ({ loginPage }) => {

  await loginPage.goto('/');
  await loginPage.loginWithoutData();
  await expect(loginPage.el.errorMessage).toHaveText('Epic sadface: Username is required');
});
```

## Test cases

| TC | Test | Layer | Tags |
|---|---|---|---|
| TC_01 | log in with a valid account | UI | login, smoke |
| TC_02 | log in with a locked account | UI | login |
| TC_03 | click login without filling anything | UI | login |
| TC_04 | username without password | UI | login |
| TC_05 | wrong password | UI | login |
| TC_06 | product page shows 6 products | UI | products, smoke |
| TC_07 | sort by name Z to A | UI | products |
| TC_08 | sort by price low to high | UI | products |
| TC_09 | add 2 products to cart | UI | cart, smoke |
| TC_10 | remove a product from cart | UI | cart |
| TC_11 | cart page shows the selected products | UI | cart |
| TC_12 | complete an order | UI | checkout, smoke |
| TC_13 | continue checkout without customer info | UI | checkout |
| TC_14 | checkout without postal code | UI | checkout |
| API_01 | log in and get a token | API | api, smoke |
| API_02 | get my own profile with the token | API | api |
| API_05 | get a product by id | API | api, smoke |
| API_06 | product that doesn't exist returns 404 | API | api |

UI tests after login run on Chromium and Firefox. Tests marked `test.fixme` are still in progress.

![Test report](docs/report.png)

## Project structure

```
api/                  one class per API service (AuthApi, ProductApi, CartApi)
config/env.ts         base URLs, can be overridden with BASE_URL / API_URL
fixtures/index.ts     gives page objects, API clients and a login token to each test
pages/                one class per page
test-data/            test accounts and customer info
tests/auth.setup.ts   logs in once and saves the session
tests/e2e/            UI tests: login, products, cart, checkout
tests/api/            API tests: auth, products
playwright.config.ts
```

- **Log in once**: `tests/auth.setup.ts` logs in and saves the session to `.auth/`. UI tests start from the products page already logged in, which saves a login per test. Login tests run in their own project without a saved session.
- **Page objects with `el`**: locators are grouped in `this.el` so tests read like `productsPage.el.cartBadge`. Actions like `login()` or `fillInformation()` are methods on the page.
- **API clients**: each class wraps the endpoints of one service, so tests call `productApi.getById(1)` instead of building URLs.
- **Fixtures**: `fixtures/index.ts` passes page objects, API clients and a ready-to-use `token` straight into each test.
- **`data-test` locators**: Sauce Demo has `data-test` on its elements, so I set `testIdAttribute: 'data-test'` and use `getByTestId()`.
- **Tags**: run a group with `--grep @smoke` or `--grep @cart`.
- **Environments**: change the target with environment variables instead of editing code.

## Running it

Needs Node.js 20+.

```bash
npm install
npx playwright install
```

```bash
npx playwright test
```

Only smoke tests, only API tests or only UI tests:

```bash
npm run test:smoke
npm run test:api
npm run test:e2e
```

With the browser window open:

```bash
npx playwright test --headed --project=chromium
```

Open the report:

```bash
npx playwright show-report
```

## CI

GitHub Actions runs:

| When | What runs |
|---|---|
| Pull request | smoke tests only, for fast feedback |
| Push to main | full regression |
| Every night (01:00 Bangkok time) | full regression |

The HTML report is uploaded as an artifact on every run, and a trace is kept for any test that needs a retry.
