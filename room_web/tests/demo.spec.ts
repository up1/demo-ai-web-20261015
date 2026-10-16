import { test, expect } from '@playwright/test';


test('Mock API response', async ({ page }) => {
  // Intercept network requests
  await page.route('https://demo-backend-nodejs.vercel.app/**', route => {
    // Respond with a mock response
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'XYZ' })
    });
  });

  await page.goto('https://demo-frontend-reactjs.vercel.app/');
  await page.waitForSelector('[data-testid="hello_text"]');
  const hello_text = await page.getByTestId('hello_text').textContent();
  expect(hello_text).toBe('XYZ');
});
