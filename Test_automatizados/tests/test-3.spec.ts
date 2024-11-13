import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bienal-front-end-viuu.vercel.app/');
  await page.locator('.MuiGrid-root > div:nth-child(3) > div > div > .MuiBox-root').click();
  await page.getByRole('img', { name: 'Caskask' }).click();
  await page.getByRole('img', { name: 'Evento', exact: true }).click();
  await page.getByRole('img', { name: 'Evento Actual' }).click();
  await page.getByRole('img', { name: 'prueba' }).click();
});