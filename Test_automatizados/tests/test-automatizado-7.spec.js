import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bienal-front-end-viuu.vercel.app/');
  await page.locator('.MuiGrid-root > div > div > .MuiBox-root').first().click();
  await page.getByText('Participan 10 Escultores').click();
  await page.getByText('Participan 10 Escultores').click();
  await page.getByText('LLuis BernardiArgentina').click();
  const result = page.locator('text=Link'); // Ajusta este texto con el esperado
  await expect(result).toBeVisible();
});
