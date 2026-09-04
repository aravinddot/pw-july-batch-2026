import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic');
  await page.getByTestId('single-click-btn').click();
  await expect(page.getByTestId('single-click-status')).toContainText('Single click completed.');
  await page.getByTestId('double-click-btn').dblclick();
  await expect(page.getByTestId('double-click-status')).toContainText('Double click completed playwrihght.');
  await page.getByTestId('static-practice-select').selectOption('Easy');
  await expect(page.getByTestId('static-dropdown-status')).toContainText('Static dropdown selected: Easy.');
});



// console.log()

// npx playwright test -- debug

// page.pause() - npx playwright test tests/codegen.spec.ts --headed

// npx playwright show-trace