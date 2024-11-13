import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bienal-front-end-viuu.vercel.app/');
  await page.locator('.MuiGrid-root > div > div > .MuiBox-root').first().click();
  await page.locator('div').filter({ hasText: 'LLuis BernardiArgentina' }).nth(3).click();
  await page.getByText('LLuis BernardiArgentina').click();
  await page.locator('div').filter({ hasText: 'LLuis BernardiArgentina' }).nth(3).click();
  await page.getByText('LLuis BernardiArgentina').click();
  await page.getByRole('heading', { name: 'Luis Bernardi' }).click();
  await page.getByRole('heading', { name: 'Luis Bernardi' }).click();
  await page.locator('div:nth-child(2) > div > div > .MuiBox-root').click();
  await page.locator('div').filter({ hasText: /^Luis BernardiLuis Bernardi$/ }).nth(1).click();
  await page.getByRole('heading', { name: 'Luis Bernardi' }).click();
  await page.getByRole('heading', { name: 'pepe' }).click();
  await page.getByRole('img', { name: 'pepe' }).click();
});